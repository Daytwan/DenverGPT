import { expect, test } from '@playwright/test'

test('renders the production page without runtime or layout failures', async ({ page }, testInfo) => {
  /** @type {string[]} */
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page).toHaveTitle(/DenverGPT/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Practical automation')
  await expect(page.getByRole('link', { name: /discuss a project/i }).first()).toBeVisible()

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(1)
  expect(errors).toEqual([])

  await page.screenshot({
    path: testInfo.outputPath(`${testInfo.project.name}-homepage.png`),
    fullPage: true,
    animations: 'disabled',
  })
})

test('the skip link moves keyboard focus past the navigation', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')

  const skipLink = page.getByRole('link', { name: /skip to main content/i })
  await expect(skipLink).toBeFocused()
  await skipLink.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('the mobile menu releases its scroll lock when the desktop breakpoint is crossed', async ({ page }, testInfo) => {
  const viewport = testInfo.project.use.viewport
  test.skip(!viewport || viewport.width >= 900, 'This regression starts from a compact viewport.')

  await page.goto('/')
  const toggle = page.locator('button[aria-controls="primary-navigation"]')
  await toggle.click()
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden')

  await page.setViewportSize({ width: 1024, height: 768 })
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
})

test('navigation and contact state stay honest and usable', async ({ page }, testInfo) => {
  await page.goto('/')
  const viewport = testInfo.project.use.viewport
  const isCompact = Boolean(viewport && viewport.width < 900)

  if (isCompact) {
    const toggle = page.locator('button[aria-controls="primary-navigation"]')
    await expect(toggle).toHaveAccessibleName(/open navigation/i)
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden')
    const navigation = page.getByRole('navigation', { name: /primary navigation/i })
    for (const name of ['Services', 'Approach', 'Examples', 'About', 'Discuss a project']) {
      await expect(navigation.getByRole('link', { name })).toBeVisible()
    }
    await page.screenshot({
      path: testInfo.outputPath(`${testInfo.project.name}-navigation-open.png`),
      animations: 'disabled',
    })
    const menuBounds = await navigation.boundingBox()
    if (!menuBounds) throw new Error('The open navigation panel has no rendered bounds.')
    await page.mouse.click(Math.max(1, menuBounds.x / 2), menuBounds.y + 50)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
    await toggle.click()
    await page.keyboard.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  }

  await page.getByRole('link', { name: /discuss a project/i }).first().click()
  await expect(page.locator('#contact')).toBeInViewport()
  await expect(page.getByText(/contact channel is being finalized/i)).toBeVisible()
  await expect(page.locator('form')).toHaveCount(0)
})

test('all local anchors resolve and reduced motion remains usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href && href.length > 1 && !document.querySelector(href)),
  )
  expect(missingTargets).toEqual([])

  const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
  expect(behavior).toBe('auto')
})

test('the full flow diagram only appears where its labels remain readable', async ({ page }, testInfo) => {
  await page.goto('/')
  const viewport = testInfo.project.use.viewport
  const diagram = page.locator('figure[aria-labelledby="flow-caption"]')

  if (viewport && viewport.width <= 430) {
    await expect(diagram).toBeHidden()
  } else {
    await expect(diagram).toBeVisible()
  }
})
