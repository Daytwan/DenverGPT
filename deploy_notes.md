# DenverGPT 

Denver-based technical practice focused on practical automation, data systems, integrations, and focused custom software.

This site is a static React application built with Vite and served through Cloudflare Workers static assets. It has no runtime API, analytics, database, or form backend.

## Requirements

- Node.js 22 or newer
- npm
- Chromium for browser tests and Lighthouse (`npx playwright install chromium`)
- A Cloudflare account only when deploying

## Local setup

```bash
npm ci
npx playwright install chromium
npm run dev
```

Vite prints the local development URL. No environment variables are required for development, tests, builds, or local preview; see [`.env.example`](.env.example).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check JavaScript and JSX with TypeScript |
| `npm test` | Run Vitest component tests once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Build and serve with the local Cloudflare Workers runtime |
| `npm run test:e2e` | Test behavior at eight responsive viewports with Playwright |
| `npm run test:a11y` | Run the automated axe accessibility suite |
| `npm run check:links` | Check metadata files and in-page links |
| `npm run lighthouse` | Audit mobile and desktop production previews and enforce score/metric gates |
| `npm run validate` | Run lint, type-checking, component tests, build, and integrity checks |
| `npm run deploy` | Build and deploy through Wrangler; requires authorized Cloudflare credentials |

Playwright HTML reports are written to `playwright-report/`. Lighthouse HTML and JSON reports are written to `.lighthouse/`. Both directories are ignored by Git.

## Project structure

```text
src/
  components/       Shared interactive components
  test/             Vitest setup
  App.jsx            Homepage composition
  content.js         Factual service and workflow content
  styles.css         Design tokens and responsive visual system
public/
  _headers           Cloudflare security and cache headers
  404.html           Static not-found page
  robots.txt         Crawler policy
  sitemap.xml        Canonical route inventory
  site.webmanifest   Installable icon metadata
scripts/
  check-site.mjs     Metadata and link integrity checks
  run-lighthouse.mjs Production performance gate
tests/e2e/           Browser behavior and accessibility tests
```

## Production behavior

- Canonical origin: `https://denvergpt.com/`
- Hosting target: Cloudflare Workers static assets
- Unknown paths return the custom `404.html` response with HTTP 404.
- Security and caching policy is defined in `public/_headers`.
- The application contains no analytics or client-side tracking, submits no visitor-entered data, and loads no third-party scripts or fonts.
- The inquiry area deliberately does not render a form or claim delivery until a verified business contact destination is configured.

## Brand assets

The current repository does not contain the authoritative DenverGPT continuous-line petal logo. The interface therefore uses a restrained text wordmark and neutral typographic favicon/social image instead of recreating or approximating the missing mark. Replace those derivatives only after adding the original source asset and verifying its exact coral, gold, and teal colors.

## Deployment

`wrangler.jsonc` configures a Cloudflare Worker with static assets and a real 404 fallback. To deploy from an authenticated environment:

```bash
npm run validate
npm run test:e2e
npm run test:a11y
npm run lighthouse
npm run deploy
```

Deployment is intentionally separate from local validation and is not performed by the test suite.
