# Contributing to Project Nexus

Thanks for contributing! This document explains how to contribute, the preferred workflow, and who the current contributors are.

## Contributors
- Member1: Aaron — lead contributor
- Member2: Ben — UI/UX and visual polish
- Member3: Chandra — QA and testing
- Member4: Diana — Documentation and onboarding

> Progress to date (high-level)
> - Navigation alignment and modal stacking fixed so modals appear above header and nav items were vertically aligned.
> - Modal behavior improved: auth modal and a new member details modal added; modal stacking and z-index corrected.
> - Contact form textarea width adjusted to align with other inputs.
> - `details`/`summary` UI improved with animated bullets and caret; transitioned to opening member details in a modal rather than inline expansion.
> - Visual tweaks: larger member avatars, filled pill-style chips, improved spacing, and modal header/intro content populated from member data attributes.
> - Smooth interaction transitions added: modal fade/scale, bullets animation, chip hover lift, and subtle card lift on hover.
> - README.md created with project overview and local development instructions.
>
> Primary credit for the progress above: Aaron

## How to contribute
1. Fork the repository (if on GitHub) and create a topic branch named with the pattern `feature/short-description` or `fix/short-description`.
2. Make small, focused commits with clear messages (use present tense, reference issue numbers if available).
3. Push your branch to your fork and open a Pull Request targeting `main` (or the default branch).
4. Add a clear description of what you changed and why. Include screenshots or short GIFs for UI changes.

## Branch & PR workflow
- Keep your branch up to date with `main` while working.
- Use feature branches for new work and small, separate commits for logical steps.
- When ready, open a PR and request reviews from at least one teammate.
- Address review comments with follow-up commits; squash or clean up commits before merge if requested by reviewers.

## Tests & validation
- Manual tests: keyboard navigation, modal focus behavior, responsive layout (desktop/tablet/mobile), and basic form validation.
- Linting: follow consistent formatting; consider running Prettier/ESLint if configured.

## A note about credit
We try to keep good records of who implemented each feature. For the current snapshot of the project, Aaron (Member1) is credited as the primary implementer of the features listed above. If you'd like to adjust contributor roles or credit, open an issue or a PR and we'll update this file.