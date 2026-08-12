# DenverGPT Implementation Brief

## Objective

Implement the approved `plan.md` as a production-quality, responsive single-page website in this empty repository.

## Required Scope

- Use Vite + React with ordinary CSS and the smallest sensible dependency set.
- Build the complete page described in `plan.md`: header/hero, proof, services, process, use cases, final audit CTA/form, and footer.
- Follow the approved “Mile-high precision” art direction: obsidian, alpine white, one glacier-blue accent, oversized editorial type, original Denver/topographic/workflow graphics.
- The hero must be full-bleed and composition-led, not a generic SaaS card/dashboard.
- Use no stock assets, client logos, fake testimonials, or unsupported performance statistics.
- Include at least three purposeful motions: hero entrance, scroll/reveal or path motion, and hover/focus feedback. Respect `prefers-reduced-motion`.
- Build semantic landmarks, keyboard-visible focus states, usable navigation, and accessible form labels/validation.
- The form must clearly behave as a front-end consultation request demo without transmitting data.
- Support common mobile and desktop widths with no horizontal overflow.

## Content Direction

- Outcome-first language: remove repetitive work, recover time, reduce handoff errors, respond faster.
- Keep copy concise and concrete. Use illustrative examples only; label them as examples where needed.
- Primary CTA text: “Book a free workflow audit”.
- Denver tone should feel local and confident without resorting to tourist clichés.

## Verification

- Install only the dependencies required by the chosen Vite/React scaffold.
- Run build and any configured lint check.
- Inspect the resulting page structure for semantic/accessibility basics.
- Report files changed, commands run, results, and any remaining risks.

## Boundaries

- Do not deploy or connect a live backend, CRM, analytics, or email service.
- Do not modify `plan.md`.
- Do not add paid or remotely hosted runtime dependencies.

