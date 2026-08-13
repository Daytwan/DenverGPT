# DenverGPT Production Redesign Plan

Status: approved on 2026-08-13.

## Goal

Rebuild the existing single-page Vite/React site around the thesis **“Practical systems, clearly explained.”** Replace the current mountain/5280/electric-blue AI aesthetic with a warm, restrained editorial system focused on automation, data workflows, integrations, and custom internal tools.

Keep the existing React/Vite architecture and in-progress Cloudflare configuration. Use `https://denvergpt.com` for canonical metadata. Preserve all existing uncommitted work.

## Implementation

- Recompose the homepage as: accessible header, concrete hero, services, operational problems/outcomes, engagement process, representative workflows, factual founder credibility, honest contact state, and complete footer.
- Make “Discuss a project” the dominant CTA without simulating submission or inventing an email. Until a destination exists, clearly state that the inquiry channel is not yet published.
- Remove unsupported promises, the “free workflow audit,” implied client outcomes, the invented mountain mark, 5280 language, topography, glowing workflow graphics, tiny uppercase text, fake interactivity, and unsafe reveal behavior.
- Build centralized tokens for warm neutrals, known teal `#247D90`, typography, spacing, widths, borders, radii, focus, and motion. Do not approximate the unavailable coral/gold brand colors or petal geometry.
- Add an accessible mobile navigation disclosure with Escape, outside-click, focus restoration, and background-scroll locking.
- Keep the static React SPA and split the monolith only into useful layout/content components. Add no routing, server, CMS, analytics, state, or animation framework.
- Add factual canonical, Open Graph, social, local-business structured data, sitemap, robots, manifest, theme metadata, and a typography-only social preview that does not counterfeit the missing logo.
- Add Cloudflare-compatible security headers and complete developer documentation.

## Quality Gates

- Add ESLint, JavaScript type checking, Vitest, React Testing Library, Playwright, axe accessibility checks, link/metadata checks, and Lighthouse automation.
- Use red-green-refactor for navigation, mobile-menu behavior, CTA routing, honest contact messaging, metadata, and accessibility-critical interactions.
- Inspect `320x568`, `375x812`, `430x932`, `768x1024`, `1024x768`, `1280x800`, `1440x900`, and a desktop viewport near 1920 pixels.
- Require passing build, lint, type-check, unit/component tests, E2E, link checks, and zero serious or critical axe violations; meet the requested Lighthouse thresholds where locally measurable.
- Complete an independent adversarial review covering code, visual UX, accessibility, SEO, performance, and security, then fix all material findings.

## Approved Assumptions and External Limitations

- `https://denvergpt.com` is the production origin.
- The authoritative logo master is unavailable by user choice. Do not redraw or approximate it. Exact logo integration, coral/gold sampling, official favicon derivatives, and logo-based social artwork remain externally blocked.
- No verified email address or form endpoint is available. Do not collect or pretend to deliver visitor data; activating project inquiries remains externally blocked.
- Do not introduce clients, testimonials, statistics, measured outcomes, addresses, phone numbers, certifications, or partnerships.
- Do not deploy or change DNS or production data.
