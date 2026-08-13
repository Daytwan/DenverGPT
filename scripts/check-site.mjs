import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const requiredFiles = [
  'public/favicon.svg',
  'public/apple-touch-icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/social-preview.png',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/site.webmanifest',
  'public/404.html',
  'public/_headers',
  'dist/index.html',
]

const failures = []

for (const file of requiredFiles) {
  try {
    await access(resolve(root, file))
  } catch {
    failures.push(`Missing required file: ${file}`)
  }
}

const index = await readFile(resolve(root, 'index.html'), 'utf8')
const app = await readFile(resolve(root, 'src/App.jsx'), 'utf8')
const robots = await readFile(resolve(root, 'public/robots.txt'), 'utf8')
const sitemap = await readFile(resolve(root, 'public/sitemap.xml'), 'utf8')

const requiredIndexFragments = [
  '<link rel="canonical" href="https://denvergpt.com/"',
  'property="og:image"',
  'name="twitter:card"',
  'type="application/ld+json"',
  'name="description"',
]

for (const fragment of requiredIndexFragments) {
  if (!index.includes(fragment)) failures.push(`index.html is missing: ${fragment}`)
}

if (!robots.includes('https://denvergpt.com/sitemap.xml')) {
  failures.push('robots.txt does not reference the canonical sitemap URL')
}

if (!sitemap.includes('<loc>https://denvergpt.com/</loc>')) {
  failures.push('sitemap.xml does not contain the canonical homepage URL')
}

const hrefs = [...app.matchAll(/href="(#[^"]+)"/g)].map((match) => match[1])
const ids = new Set([...app.matchAll(/id="([^"]+)"/g)].map((match) => `#${match[1]}`))

for (const href of hrefs) {
  if (!ids.has(href)) failures.push(`Broken in-page target in App.jsx: ${href}`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Site integrity check passed (${requiredFiles.length} files, ${hrefs.length} in-page links).`)
}
