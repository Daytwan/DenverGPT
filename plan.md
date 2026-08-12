# DenverGPT Website Plan

## Goal

Design and build a polished, responsive lead-generation website for DenverGPT, a Denver-based AI workflow consultancy that automates repetitive business work and reduces operating costs.

## Assumptions Requiring Approval

- Build a single-page marketing site in a lightweight Vite/React stack unless the repository reveals another preferred stack.
- Use original art direction and local CSS/SVG/HTML visuals; do not depend on stock photography or paid assets.
- Primary conversion action: book a free workflow audit through an on-page contact form.
- Contact form is a polished front-end interaction only until a form destination, email service, or backend is supplied.
- Voice: direct, practical, locally confident, and credible rather than futuristic hype.

## Visual Thesis

“Mile-high precision”: a dark obsidian and warm alpine-white composition with electric glacier-blue accents, oversized editorial typography, a Denver contour-line motif, and a kinetic workflow visual that turns operational chaos into one clear automated path.

## Content Plan

1. **Hero — Make busywork disappear**
   - DenverGPT brand, outcome-first promise, concise explanation, and primary CTA.
   - Dominant full-bleed animated workflow/topography composition.
2. **Proof — Show the operational value**
   - Outcome language around hours recovered, errors reduced, and faster response times.
   - No invented client logos, testimonials, or unsupported hard performance claims.
3. **Services — What DenverGPT automates**
   - Lead handling and follow-up.
   - Document/data processing and reporting.
   - Internal operations and customer support workflows.
4. **Process — From bottleneck to working system**
   - Audit, design, build, launch/iterate.
5. **Use cases — Concrete before/after stories**
   - A few short, clearly illustrative examples that make the service understandable.
6. **Final CTA — Free workflow audit**
   - Low-friction form and clear expectation for what happens next.
7. **Footer**
   - Denver positioning, contact details if supplied, and basic navigation.

## Interaction Thesis

- A restrained hero entrance sequence establishes brand hierarchy and makes the workflow visual assemble itself.
- Scroll-linked path/progress movement turns scattered manual tasks into a single automated output.
- Purposeful hover and focus transitions sharpen service links, buttons, and the audit form without ornamental motion.
- Respect `prefers-reduced-motion` and preserve complete keyboard accessibility.

## Engineering Plan

1. Scaffold the smallest maintainable app structure and define brand tokens.
2. Build the semantic page and original visual system.
3. Add responsive behavior, interactions, reduced-motion support, and accessible states.
4. Add lightweight form validation and a clear non-submitting/demo behavior unless a live destination is provided.
5. Run the repository's lint/build checks.
6. Review the final diff for correctness and unintended changes.
7. Serve locally and use the requested Chrome integration for direct visual and interaction checks at desktop and mobile widths.
8. Fix material issues found in that review, rerun the affected checks, and deliver the finished site.

## Delegation Plan

- One implementation agent will own the page build against this approved specification.
- One review agent will independently inspect the finished code and test coverage for actionable defects.
- The primary agent will own integration, browser verification, fixes, and final acceptance.

## Verification / Done Condition

- Production build succeeds.
- Relevant lint/type checks succeed if configured.
- No critical browser console errors on the tested page.
- Chrome review confirms hero hierarchy, navigation, CTA/form interaction, overflow, legibility, and responsive layout at common desktop and mobile sizes.
- Keyboard focus and reduced-motion behavior are present.
- No fabricated customer evidence or unsupported guaranteed savings claims appear.
- The working site and all source files are present in this repository.

## Out of Scope Without Separate Approval

- Production deployment or DNS changes.
- Live email/form integrations, CRM connections, analytics, credentials, or paid services.
- Fabricated client work, testimonials, or precise ROI statistics.

