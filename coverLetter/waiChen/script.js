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