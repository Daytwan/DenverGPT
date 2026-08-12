# DenverGPT Review Brief

## Objective

Review the completed DenverGPT implementation for concrete defects that could keep it from satisfying `plan.md` and the direct acceptance checks below.

## Review Priorities

1. Functional correctness: navigation, CTA targets, form validation/status behavior, and broken links.
2. Responsive risks: horizontal overflow, fixed sizing, clipped hero content, unreadable mobile type, and stacking failures.
3. Accessibility: semantic landmarks/headings, form labels, keyboard focus, color contrast risks, decorative SVG treatment, and reduced-motion behavior.
4. Design-spec fit: full-bleed poster-like hero, unmistakable DenverGPT brand, one dominant visual idea per section, restrained color/type system, and no generic card/dashboard composition.
5. Trust: no invented testimonials, customer claims, guaranteed savings, misleading form submission behavior, or unsupported hard statistics.
6. Quality: build/lint configuration, obvious runtime errors, stale placeholders, dead code, and missing metadata.

## Expected Output

- Lead with actionable findings ordered by severity, each with exact file and line references.
- Distinguish defects from optional polish.
- If there are no material findings, state that directly and name any residual browser-only checks.
- Do not edit files; review only.

