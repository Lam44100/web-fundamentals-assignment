// Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Dark Mode
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    // Simple logic to switch SVG content could go here, 
    // but for no-library simplicity, we just toggle the class.
    // The CSS variables handle the color changes automatically.
}

// Search Overlay
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');

    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        setTimeout(() => input.focus(), 100);
    } else {
        overlay.classList.add('hidden');
    }
}

// Auth Modal
function toggleAuth(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        switchAuthTab(tab);
    } else {
        modal.classList.add('hidden');
    }
}

function switchAuthTab(tabName) {
    const loginForm = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');
    const loginTab = document.getElementById('tab-login');
    const signupTab = document.getElementById('tab-signup');

    if (tabName === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}

function handleAuth(event, title, message) {
    event.preventDefault();
    toggleAuth();
    showToast(message, title);
}

// Cart Logic
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

// Newsletter
function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input');
    if (emailInput.value) {
        showToast("Thank you for subscribing!", "Welcome!");
        emailInput.value = '';
    }
}

// Toast System
let toastTimeout;
function showToast(message, title = "Notification") {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    document.getElementById('toast-title').innerText = title;

    toast.classList.remove('hidden-toast');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden-toast');
    }, 3000);
}

// Smooth Scroll (Native behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu if open
            if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
                toggleMenu();
            }
        }
    });
});

// Close Modals on Escape
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        document.getElementById('auth-modal').classList.add('hidden');
        document.getElementById('search-overlay').classList.add('hidden');
    }
});