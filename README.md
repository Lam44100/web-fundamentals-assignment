# Project Nexus — Team Page

A small, responsive team showcase built with vanilla HTML, CSS, and JavaScript.
This repo contains a single-page site with team member cards, a contact form, and simulated authentication.

## What this is
- A lightweight demo site used for learning and demonstrating front-end fundamentals: responsive layout, accessible markup, CSS components, and small JavaScript behaviors (search filter, modals, form validation).

## Folder structure
```
assignment/
├─ index.html         # Main site (team, contact, modals)
├─ cv.html            # Secondary CV/example page
├─ css/
│  ├─ index_styles.css  # Primary styles for the site
│  └─ styles.css        # Additional styles / theme overrides
├─ js/
│  ├─ index_script.js   # Page behavior: nav, modals, forms, filter
│  └─ script.js         # (if present) additional scripts
├─ img/               # Image assets (portraits, icons)
└─ README.md          # This file
```

> Note: file listing may vary if additional files are added later.

## Quick start (local)
Prerequisites: a modern browser and optionally Python or VS Code with Live Server.

1. Clone the repo (or copy the folder) and open the `assignment` folder in your editor.

2. Quick one-off preview (open file directly):
   - In Windows Explorer: double-click `index.html`.


3. Recommended — run a local HTTP server (better for loading assets and future XHR/fetch):

```powershell
# Using Python 3
python -m http.server 8000
# open http://localhost:8000 in your browser
```

4. Developer preview in VS Code:
   - Install the Live Server extension and click "Go Live" to get a live-reloading local server.

## Development notes
- Edit HTML in `index.html`.
- Styles are in `css/index_styles.css` (main) and `css/styles.css` (theme/overrides). Keep components reusable.
- JavaScript behavior is in `js/index_script.js`. It uses simple helpers ($ / $$) — modify carefully and keep accessibility in mind (focus states, aria attributes).

### Common tasks
- Add a new member: duplicate an `.member` article in `index.html`, update `data-*` attributes (name, role, skills, intro), swap the avatar `img` src.
- Adjust modal content: JS builds the member modal from `.member` content; if you change the markup, update `js/index_script.js` accordingly.

## Accessibility
- The site uses semantic markup, aria attributes for modals, and a visible skip link. When editing interactive behavior, preserve focus order and ARIA states (e.g., `aria-hidden`, `aria-expanded`).

## Coding style / formatting
- Keep indentation consistent with existing files (two spaces). Use descriptive class names and avoid inline styles where possible (prefer adding rules in CSS files).

## Testing
- Manual cross-browser checks: Chrome, Edge, Firefox, and Safari (if available).
- Keyboard-only test: Tab through interactive elements and verify focus states and modal focus behavior.

## Contributing
- Branch off `main` (or `master`) with a short descriptive name, e.g. `feature/modal-accessibility`.
- Open a pull request with a clear description of changes.
- Keep commits small and focused; write an explanatory message for non-trivial changes.

---

If you'd like, I can also:
- Add a `CONTRIBUTING.md` with PR/checklist guidance,
- Add a simple `package.json` and npm scripts for common tasks (lint, format), or
- Create a GitHub Actions workflow for basic linting/tests.