import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('has no serious or critical automated accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  const materialViolations = results.violations.filter(({ impact }) =>
    impact === 'serious' || impact === 'critical',
  )

  expect(materialViolations).toEqual([])
})
