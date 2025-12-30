// Theme Toggle
function toggleResumeTheme() {
    document.documentElement.classList.toggle('dark');
    updateThemeIcons();

    // Save preference
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const moon = document.getElementById('moon-icon');
    const sun = document.getElementById('sun-icon');

    if (isDark) {
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
    } else {
        moon.classList.remove('hidden');
        sun.classList.add('hidden');
    }
}

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}
updateThemeIcons();

// Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

// Toast Notification
let toastTimeout;
function showToast(message, title = "Skill Insight") {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    document.getElementById('toast-title').innerText = title;

    toast.classList.add('visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        closeToast();
    }, 3000);
}

function closeToast() {
    document.getElementById('toast').classList.remove('visible');
}

/* --- VALIDATION LOGIC --- */
function handleCVContact(event) {
    event.preventDefault();

    // Reset errors
    document.getElementById('err-cv-name').innerText = '';
    document.getElementById('err-cv-email').innerText = '';
    document.getElementById('err-cv-message').innerText = '';

    const name = document.getElementById('cv-name').value.trim();
    const email = document.getElementById('cv-email').value.trim();
    const message = document.getElementById('cv-message').value.trim();
    let isValid = true;

    // Validate Name
    if (!name) {
        document.getElementById('err-cv-name').innerText = "Name is required.";
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('err-cv-email').innerText = "Email is required.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('err-cv-email').innerText = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate Message
    if (!message) {
        document.getElementById('err-cv-message').innerText = "Please write a message.";
        isValid = false;
    }

    if (isValid) {
        showToast('Thanks for reaching out! I will get back to you soon.', 'Message Sent');
        document.getElementById('cv-contact-form').reset();
    }
}