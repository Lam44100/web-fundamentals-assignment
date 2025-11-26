// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.querySelector('button[onclick="toggleMenu()"]');
    menu.classList.toggle('hidden');
    const isExpanded = menu.classList.contains('hidden') ? 'false' : 'true';
    btn.setAttribute('aria-expanded', isExpanded);
}

// Dark Mode Toggle
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');

    if (document.documentElement.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Search Overlay Toggle
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');

    if (overlay.classList.contains('hidden-overlay')) {
        overlay.classList.remove('hidden-overlay');
        overlay.classList.add('visible-overlay');
        setTimeout(() => input.focus(), 100);
    } else {
        overlay.classList.remove('visible-overlay');
        overlay.classList.add('hidden-overlay');
    }
}

// Auth Modal Toggle
function toggleAuth(tab = 'login') {
    const modal = document.getElementById('auth-modal');

    if (modal.classList.contains('hidden-overlay')) {
        modal.classList.remove('hidden-overlay');
        modal.classList.add('visible-overlay');
        switchAuthTab(tab);
        // Trap focus logic would ideally go here for full a11y compliance
    } else {
        modal.classList.remove('visible-overlay');
        modal.classList.add('hidden-overlay');
    }
}

// Switch Auth Tabs
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');
    const loginTab = document.getElementById('tab-login');
    const signupTab = document.getElementById('tab-signup');

    // Reset Styles & Aria
    loginTab.classList.remove('text-brand-gold', 'border-brand-gold', 'bg-gray-50', 'dark:bg-brand-cardDark');
    loginTab.classList.add('text-gray-600', 'dark:text-gray-400', 'border-transparent', 'bg-gray-100', 'dark:bg-black');
    loginTab.setAttribute('aria-selected', 'false');

    signupTab.classList.remove('text-brand-gold', 'border-brand-gold', 'bg-gray-50', 'dark:bg-brand-cardDark');
    signupTab.classList.add('text-gray-600', 'dark:text-gray-400', 'border-transparent', 'bg-gray-100', 'dark:bg-black');
    signupTab.setAttribute('aria-selected', 'false');

    if (tabName === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');

        loginTab.classList.add('text-brand-gold', 'border-brand-gold', 'bg-gray-50', 'dark:bg-brand-cardDark');
        loginTab.classList.remove('text-gray-600', 'dark:text-gray-400', 'border-transparent', 'bg-gray-100', 'dark:bg-black');
        loginTab.setAttribute('aria-selected', 'true');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');

        signupTab.classList.add('text-brand-gold', 'border-brand-gold', 'bg-gray-50', 'dark:bg-brand-cardDark');
        signupTab.classList.remove('text-gray-600', 'dark:text-gray-400', 'border-transparent', 'bg-gray-100', 'dark:bg-black');
        signupTab.setAttribute('aria-selected', 'true');
    }
}

// Handle Login/Signup Form Submit
function handleAuth(event, title, message) {
    event.preventDefault();
    toggleAuth();
    setTimeout(() => {
        showToast(message, title);
    }, 300);
}

// Cart Logic Mockup
let cartItems = 0;

function toggleCart() {
    if (cartItems === 0) {
        showToast("Your cart is currently empty.", "Cart Empty");
    } else {
        showToast(`You have ${cartItems} items in your cart.`, "Your Cart");
    }
}

function addToCart(itemName) {
    cartItems++;
    const countEl = document.getElementById('cart-count');
    countEl.innerText = cartItems;
    countEl.classList.remove('hidden');

    showToast(`${itemName} has been added to your cart.`);
}

// Newsletter Handler
function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');

    if (emailInput.value) {
        showToast("Thank you for subscribing to our inner circle!", "Welcome!");
        emailInput.value = '';
    }
}

// Toast Notification System
let toastTimeout;
function showToast(message, title = "Notification") {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastTitle = document.getElementById('toast-title');

    toastMsg.innerText = message;
    if (title) toastTitle.innerText = title;

    toast.classList.remove('translate-y-24');

    if (toastTimeout) clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-24');
    }, 3000);
}

// Smooth Scroll Fix
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        }
    });
});

// Keyboard accessibility: Close modals on ESC key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        const authModal = document.getElementById('auth-modal');
        const searchOverlay = document.getElementById('search-overlay');

        if (!authModal.classList.contains('hidden-overlay')) {
            toggleAuth();
        }
        if (!searchOverlay.classList.contains('hidden-overlay')) {
            toggleSearch();
        }
    }
});