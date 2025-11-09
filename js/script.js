// Utility
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Set year
$("#year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = $("#navToggle");
const navMenu = $("#nav-menu");
navToggle?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(open));
});

// Progress meters
$$(".meter").forEach(m => {
    const lvl = m.dataset.level || "0";
    m.style.setProperty("--level", `${lvl}%`);
});

// CONTACT FORM VALIDATION (client-side)
const contactForm = $("#contactForm");
const contactStatus = $("#contactStatus");

function setError(id, msg) {
    const el = document.getElementById(`error-${id}`);
    if (el) el.textContent = msg || "";
}
function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    let ok = true;

    if (!name) { setError("name", "Please enter your full name."); ok = false; } else setError("name", "");
    if (!email) { setError("email", "Email is required."); ok = false; }
    else if (!isEmail(email)) { setError("email", "Please enter a valid email (e.g., name@example.com)."); ok = false; }
    else setError("email", "");

    if (!message) { setError("message", "Message cannot be empty."); ok = false; } else setError("message", "");

    if (!ok) {
        contactStatus.textContent = "Please correct the highlighted issues.";
        return;
    }

    // Simulated submit (no backend)
    contactForm.reset();
    contactStatus.textContent = "Thanks! Your message has been recorded (simulation).";
});

// Clear inline errors on input
["name", "email", "message"].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener("input", () => setError(id, ""));
});

// (Auth modal removed) — login/signup UI and handlers have been removed.

// Theme toggle: light / dark
const themeToggle = $("#themeToggle");
const docEl = document.documentElement;

function updateThemeToggleUI() {
    if (!themeToggle) return;
    const isLight = docEl.classList.contains("light-theme");
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

function applyTheme(theme) {
    if (theme === "light") docEl.classList.add("light-theme");
    else docEl.classList.remove("light-theme");
    try { localStorage.setItem("theme", theme); } catch (e) { }
    updateThemeToggleUI();
}

function initTheme() {
    try {
        const saved = localStorage.getItem("theme");
        if (saved) {
            applyTheme(saved);
            return;
        }
    } catch (e) { }
    // No saved pref: follow system
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
}

themeToggle?.addEventListener("click", () => {
    const next = docEl.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(next);
});

initTheme();
