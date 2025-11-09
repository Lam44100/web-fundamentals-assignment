// Helpers
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

// Year
$("#year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
navToggle?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(open));
});

// --- Team search filter ---
const search = $("#search");
const clearSearch = $("#clearSearch");
const cards = $$(".member");

function applyFilter() {
    const q = (search.value || "").toLowerCase().trim();
    cards.forEach(card => {
        const hay = [
            card.dataset.name,
            card.dataset.role,
            card.dataset.skills,
            card.querySelector(".summary")?.textContent
        ].join(" ").toLowerCase();
        card.style.display = hay.includes(q) ? "" : "none";
    });
}
search?.addEventListener("input", applyFilter);
clearSearch?.addEventListener("click", () => { search.value = ""; applyFilter(); });

// --- Contact form validation (client-side only) ---
const contactForm = $("#contactForm");
const statusEl = $("#contactStatus");

function setError(id, msg) {
    const el = document.getElementById(`error-${id}`);
    if (el) el.textContent = msg || "";
}
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#fullName").value.trim();
    const email = $("#email").value.trim();
    const subj = $("#subject").value.trim();
    const msg = $("#message").value.trim();

    let ok = true;
    if (!name) { setError("fullName", "Please enter your name."); ok = false } else setError("fullName", "");
    if (!email) { setError("email", "Email is required."); ok = false }
    else if (!isEmail(email)) { setError("email", "Enter a valid email (name@example.com)."); ok = false }
    else setError("email", "");
    if (!subj) { setError("subject", "Please add a subject."); ok = false } else setError("subject", "");
    if (!msg) { setError("message", "Message cannot be empty."); ok = false } else setError("message", "");

    if (!ok) { statusEl.textContent = "Please correct the highlighted fields."; return; }

    // Simulated submission
    contactForm.reset();
    statusEl.textContent = "Thanks! Your message has been recorded (simulation).";
});
["fullName", "email", "subject", "message"].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener("input", () => setError(id, ""));
});

// --- Auth modal (simulated sign-up / log-in) ---
const modal = $("#authModal");
const openLoginBtn = $("#openLogin");
const openSignupBtn = $("#openSignup");
const closeEls = $$("[data-close-modal]");
const memberModal = $("#memberModal");

// helper to close member modal specifically
function closeMemberModal() {
    if (!memberModal) return;
    memberModal.classList.remove("show");
    memberModal.setAttribute("aria-hidden", "true");
    // clear content to avoid stale nodes
    const content = memberModal.querySelector(".member-modal-content");
    if (content) content.innerHTML = "";
}

function openModal(tab = "login") {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    setTab(tab);
}
function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}
closeEls.forEach(el => {
    // elements with data-close-modal can close either modal; attach handler that closes both if present
    el.addEventListener("click", () => {
        closeModal();
        closeMemberModal();
    });
});
openLoginBtn?.addEventListener("click", () => openModal("login"));
openSignupBtn?.addEventListener("click", () => openModal("signup"));
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        if (modal.classList.contains("show")) closeModal();
        if (memberModal && memberModal.classList.contains("show")) closeMemberModal();
    }
});

// Tabs
const tabLogin = $("#tabLogin");
const tabSignup = $("#tabSignup");
const panelLogin = $("#panelLogin");
const panelSignup = $("#panelSignup");

function setTab(which) {
    const loginActive = which === "login";
    tabLogin.classList.toggle("active", loginActive);
    tabSignup.classList.toggle("active", !loginActive);
    tabLogin.setAttribute("aria-selected", String(loginActive));
    tabSignup.setAttribute("aria-selected", String(!loginActive));
    panelLogin.classList.toggle("hidden", !loginActive);
    panelSignup.classList.toggle("hidden", loginActive);
}
tabLogin?.addEventListener("click", () => setTab("login"));
tabSignup?.addEventListener("click", () => setTab("signup"));

// Log in (simulated)
$("#loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim();
    const pwd = $("#loginPassword").value;
    let ok = true;

    if (!email) { $("#error-login-email").textContent = "Email is required."; ok = false }
    else if (!isEmail(email)) { $("#error-login-email").textContent = "Invalid email format."; ok = false }
    else $("#error-login-email").textContent = "";

    if (!pwd) { $("#error-login-password").textContent = "Password is required."; ok = false }
    else if (pwd.length < 6) { $("#error-login-password").textContent = "Minimum 6 characters."; ok = false }
    else $("#error-login-password").textContent = "";

    if (!ok) return;

    const status = $("#loginStatus");
    if (pwd === "letmein") {
        status.textContent = "Login successful (simulation). Welcome!";
        setTimeout(closeModal, 700);
    } else {
        status.textContent = "Login failed (simulation). Try password 'letmein' to see success.";
    }
});

// Sign up (simulated)
$("#signupForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#signupName").value.trim();
    const email = $("#signupEmail").value.trim();
    const pwd = $("#signupPassword").value;
    let ok = true;

    if (!name) { $("#error-signup-name").textContent = "Please enter your name."; ok = false } else $("#error-signup-name").textContent = "";
    if (!email) { $("#error-signup-email").textContent = "Email is required."; ok = false }
    else if (!isEmail(email)) { $("#error-signup-email").textContent = "Invalid email format."; ok = false }
    else $("#error-signup-email").textContent = "";
    if (!pwd) { $("#error-signup-password").textContent = "Password is required."; ok = false }
    else if (pwd.length < 6) { $("#error-signup-password").textContent = "Minimum 6 characters."; ok = false }
    else $("#error-signup-password").textContent = "";

    if (!ok) return;
    $("#signupStatus").textContent = "Account created (simulation). You can now log in.";
    setTab("login");
});

// Close modal when clicking the backdrop

// Attach backdrop click handlers for both modals where present
$("#authModal .modal-backdrop")?.addEventListener("click", closeModal);
$("#memberModal .modal-backdrop")?.addEventListener("click", closeMemberModal);

// --- Member details popup (open member info in a modal instead of inline details) ---
function buildMemberHtml(member) {
    const name = member.querySelector('.name')?.textContent || '';
    const role = member.querySelector('.role')?.textContent || '';
    const avatar = member.querySelector('.avatar')?.getAttribute('src') || '';
    const summary = member.querySelector('.summary')?.innerHTML || '';
    const intro = member.dataset.intro || '';
    const chips = Array.from(member.querySelectorAll('.chips li')).map(li => li.textContent);
    const bullets = Array.from(member.querySelectorAll('.bullets li')).map(li => li.innerHTML);
    return `
        <div class="member-modal">
            <h2 id="memberTitle">Member Details</h2>
            <header style="display:flex;gap:1rem;align-items:center;margin-bottom:.5rem;">
                <img src="${avatar}" alt="${name} avatar" style="width:120px;height:120px;border-radius:12px;object-fit:cover;border:2px solid rgba(255,255,255,.06);">
                <div>
                    <h3 style="margin:0 0 .25rem;">${name}</h3>
                    <p style="margin:0;color:var(--muted);">${role}</p>
                </div>
            </header>
            <p class="intro">${intro}</p>
            <div class="summary" style="color:var(--text);margin-bottom:.6rem;">${summary}</div>
            <ul class="chips" style="margin-bottom:.6rem;display:flex;flex-wrap:nowrap;gap:.5rem;">${chips.map(c => `<li>${c}</li>`).join('')}</ul>
            <ul class="bullets" style="padding-left:1.1rem;">${bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>
    `;
}

// Intercept the native <details> toggle and open a modal instead
$$('article.member details summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const member = summary.closest('.member');
        if (!member || !memberModal) return;
        const content = memberModal.querySelector('.member-modal-content');
        content.innerHTML = buildMemberHtml(member);
        memberModal.classList.add('show');
        memberModal.setAttribute('aria-hidden', 'false');
        // move focus into modal
        const close = memberModal.querySelector('.modal-close');
        if (close) close.focus();
        // ensure the native details element is closed to avoid double-open
        const details = member.querySelector('details');
        if (details) details.removeAttribute('open');
    });
});
