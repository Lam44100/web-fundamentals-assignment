# Web Fundamentals Assignment

## Directory Structure

```
coverLetter/
  aaronLim/
    index.html
  shengJun/
    index.html
  teZhi/
    index.html
  waiChen/
    index.html
website/
  index.html
  script.js
  styles.css
```

### Explanation
- **coverLetter/**: Contains individual folders for each group member. Each folder (e.g., `aaronLim`, `shengJun`, `teZhi`, `waiChen`) has an `index.html` file, which is the personal cover letter webpage for that member.
- **website/**: Contains the main group website files:
  - `index.html`: The homepage or main entry point for the group website.
  - `script.js`: JavaScript file for website interactivity.
  - `styles.css`: CSS file for website styling.

## How to View the Websites Locally

1. **Open the Project Folder**
   - Navigate to the project directory in your file explorer

2. **View Individual Cover Letters**
   - Open any group member's cover letter by double-clicking their `index.html` file:
     - Example: `coverLetter/teZhi/index.html`
   - This will open the personal cover letter in your default web browser.

3. **View the Main Group Website**
   - Open `website/index.html` in your browser to view the main group website.
   - The website will use `script.js` and `styles.css` automatically if opened via a browser.

## Tips for Group Members
- You do **not** need a web server to view these pages; just double-click the `.html` files.
- If you want to test advanced features (like AJAX or fetch requests), you may need to use a local server (e.g., with VS Code Live Server extension or Python's `http.server`).
- Make sure all files are in the correct folders as shown above.

## Example (Windows)
1. Open `File Explorer` and go to your project folder.
2. Double-click `website/index.html` to view the main site.
3. Double-click any `coverLetter/<member>/index.html` to view a member's cover letter.

---

If you have any questions, ask your group leader or refer to this README for guidance.

---

## Working with Git

### How to Pull the Codebase
1. Open your terminal (PowerShell or Git Bash).
2. Navigate to your project directory:
  ```powershell
  cd "pathToProjectDirectory"
  ```
3. Pull the latest changes from the remote repository:
  ```powershell
  git pull origin main
  ```

### How to Write a Proper Git Commit Message
- Use clear, concise messages that describe the change.
- Use the present tense (e.g., "Add new cover letter for Aaron").
- If fixing a bug, start with "Fix" (e.g., "Fix broken link in website/index.html").
- If adding a feature, start with "Add" (e.g., "Add styles for homepage").
- If updating something, use "Update" (e.g., "Update README with setup instructions").

**Example:**
```powershell
git add website/index.html
git commit -m "Add navigation bar to main website"
git push origin main
```

---
