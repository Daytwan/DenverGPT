import { chromium, defineConfig } from '@playwright/test'

const projects = [
  { name: 'mobile-320', use: { viewport: { width: 320, height: 568 } } },
  { name: 'mobile-375', use: { viewport: { width: 375, height: 812 } } },
  { name: 'mobile-430', use: { viewport: { width: 430, height: 932 } } },
  { name: 'tablet-768', use: { viewport: { width: 768, height: 1024 } } },
  { name: 'landscape-1024', use: { viewport: { width: 1024, height: 768 } } },
  { name: 'desktop-1280', use: { viewport: { width: 1280, height: 800 } } },
  { name: 'desktop-1440', use: { viewport: { width: 1440, height: 900 } } },
  { name: 'desktop-1920', use: { viewport: { width: 1920, height: 1080 } } },
]

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  workers: 4,
  forbidOnly: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4317',
    launchOptions: {
      executablePath: chromium.executablePath(),
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects,
  webServer: {
    command: 'npm run build && python3 -m http.server 4317 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4317',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
