import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { launch } from 'chrome-launcher'
import lighthouse, { generateReport } from 'lighthouse'
import { chromium } from 'playwright'

const root = resolve(import.meta.dirname, '..')
const reportDirectory = resolve(root, '.lighthouse')
const previewUrl = 'http://127.0.0.1:8787/'

/** @type {NodeJS.ProcessEnv} */
const cleanEnvironment = { ...process.env }
delete cleanEnvironment.FORCE_COLOR
cleanEnvironment.NO_COLOR = '1'

const preview = spawn('npm', ['run', 'preview'], {
  cwd: root,
  detached: true,
  env: cleanEnvironment,
  stdio: ['ignore', 'pipe', 'pipe'],
})

let previewOutput = ''

for (const stream of [preview.stdout, preview.stderr]) {
  stream.on('data', (chunk) => {
    const text = chunk.toString()
    previewOutput += text
    process.stdout.write(text)
  })
}

/**
 * @param {number} timeoutMs
 */
async function waitForPreview(timeoutMs) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (preview.exitCode !== null) {
      throw new Error(`Production preview exited before it became ready.\n${previewOutput}`)
    }

    try {
      const response = await fetch(previewUrl)
      if (response.ok) return
    } catch {
      // Wrangler is still starting.
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 300))
  }

  throw new Error(`Timed out waiting for ${previewUrl}.\n${previewOutput}`)
}

async function verifyProductionBehavior() {
  const homepage = await fetch(previewUrl)
  const html = await homepage.text()
  const missingRoute = await fetch(new URL('/definitely-not-a-route', previewUrl))
  const missingBody = await missingRoute.text()
  const assetPath = html.match(/src="(\/assets\/[^"]+\.js)"/)?.[1]

  const failures = []
  const requiredHeaders = [
    'content-security-policy',
    'cross-origin-opener-policy',
    'permissions-policy',
    'referrer-policy',
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
  ]

  if (!homepage.ok) failures.push(`homepage returned HTTP ${homepage.status}`)
  if (missingRoute.status !== 404) failures.push(`unknown route returned HTTP ${missingRoute.status}, not 404`)
  if (!missingBody.includes('404 / Page not found')) failures.push('unknown route did not render the custom 404 page')

  for (const header of requiredHeaders) {
    if (!homepage.headers.has(header)) failures.push(`homepage is missing the ${header} header`)
  }

  if (!assetPath) {
    failures.push('production HTML does not reference a hashed JavaScript asset')
  } else {
    const asset = await fetch(new URL(assetPath, previewUrl))
    const cacheControl = asset.headers.get('cache-control') ?? ''
    if (!asset.ok) failures.push(`${assetPath} returned HTTP ${asset.status}`)
    if (!cacheControl.includes('immutable')) failures.push(`${assetPath} is missing immutable caching`)
  }

  if (failures.length) throw new Error(`Production behavior check failed:\n- ${failures.join('\n- ')}`)
  console.log('Production route, custom 404, security header, and immutable asset checks passed.')
}

/**
 * @param {string} name
 * @param {'mobile' | 'desktop'} formFactor
 * @param {number} port
 */
async function audit(name, formFactor, port) {
  const result = await lighthouse(previewUrl, {
    port,
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    ...(formFactor === 'desktop' ? { preset: 'desktop' } : {}),
  })

  if (!result) throw new Error(`Lighthouse returned no result for ${name}.`)

  const { lhr } = result
  /** @param {'performance' | 'accessibility' | 'best-practices' | 'seo'} category */
  const categoryScore = (category) => Math.round((lhr.categories[category].score ?? 0) * 100)
  /** @param {string} auditId */
  const metric = (auditId) => lhr.audits[auditId]?.numericValue ?? null

  const summary = {
    performance: categoryScore('performance'),
    accessibility: categoryScore('accessibility'),
    bestPractices: categoryScore('best-practices'),
    seo: categoryScore('seo'),
    largestContentfulPaintMs: metric('largest-contentful-paint'),
    cumulativeLayoutShift: metric('cumulative-layout-shift'),
    totalBlockingTimeMs: metric('total-blocking-time'),
  }

  await writeFile(resolve(reportDirectory, `${name}.json`), JSON.stringify(lhr, null, 2))
  await writeFile(resolve(reportDirectory, `${name}.html`), generateReport(lhr, 'html'))

  console.log(`\n${name}: ${JSON.stringify(summary)}`)
  return summary
}

/**
 * @param {string[]} failures
 * @param {string} profile
 * @param {Awaited<ReturnType<typeof audit>>} result
 */
function applyThresholds(failures, profile, result) {
  const minimumPerformance = profile === 'desktop' ? 90 : 85
  /** @type {Array<['performance' | 'accessibility' | 'bestPractices' | 'seo', number]>} */
  const categoryThresholds = [
    ['performance', minimumPerformance],
    ['accessibility', 95],
    ['bestPractices', 95],
    ['seo', 95],
  ]

  for (const [category, minimum] of categoryThresholds) {
    if (result[category] < minimum) {
      failures.push(`${profile} ${category}: ${result[category]} (minimum ${minimum})`)
    }
  }

  if (result.largestContentfulPaintMs === null || result.largestContentfulPaintMs > 2_500) {
    failures.push(`${profile} LCP: ${result.largestContentfulPaintMs ?? 'unavailable'} ms (maximum 2500 ms)`)
  }

  if (result.cumulativeLayoutShift === null || result.cumulativeLayoutShift >= 0.1) {
    failures.push(`${profile} CLS: ${result.cumulativeLayoutShift ?? 'unavailable'} (must be below 0.1)`)
  }

  if (result.totalBlockingTimeMs === null || result.totalBlockingTimeMs > 200) {
    failures.push(
      `${profile} total blocking time: ${result.totalBlockingTimeMs ?? 'unavailable'} ms (maximum 200 ms)`,
    )
  }
}

let chrome

try {
  await waitForPreview(120_000)
  await verifyProductionBehavior()
  await mkdir(reportDirectory, { recursive: true })

  chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
    logLevel: 'error',
  })

  const mobile = await audit('mobile', 'mobile', chrome.port)
  const desktop = await audit('desktop', 'desktop', chrome.port)
  /** @type {string[]} */
  const failures = []

  applyThresholds(failures, 'mobile', mobile)
  applyThresholds(failures, 'desktop', desktop)

  if (failures.length) {
    throw new Error(`Lighthouse thresholds failed:\n- ${failures.join('\n- ')}`)
  }

  console.log('\nLighthouse thresholds passed. Total blocking time is used as the lab responsiveness proxy.')
} finally {
  chrome?.kill()

  if (preview.pid && preview.exitCode === null) {
    try {
      process.kill(-preview.pid, 'SIGTERM')
    } catch {
      preview.kill('SIGTERM')
    }
  }
}
