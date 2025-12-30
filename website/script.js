// Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Dark Mode
function toggleTheme() {
    const html = document.documentElement;
    const moon = document.getElementById('theme-moon');
    const sun = document.getElementById('theme-sun');

    html.classList.toggle('dark');

    if (html.classList.contains('dark')) {
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
    } else {
        moon.classList.remove('hidden');
        sun.classList.add('hidden');
    }
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

/* --- HELPER: Clear Errors --- */
function clearErrors(formId) {
    const form = document.getElementById(formId);
    document.querySelectorAll('.error-text').forEach(el => el.innerText = '');
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('invalid'));
}

/* --- HELPER: Validate Email Regex --- */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --- HELPER: Show Error --- */
function showError(elementId, message) {
    const errorEl = document.getElementById('error-' + elementId);
    const inputEl = document.getElementById(elementId);
    if (errorEl) errorEl.innerText = message;
    if (inputEl) inputEl.classList.add('invalid');
}

/* --- AUTH SIMULATION: Login (Success & Failure States) --- */
function handleLogin(event) {
    event.preventDefault();
    clearErrors();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    let isValid = true;

    // Validation Logic
    if (!email) {
        showError('login-email', 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('login-email', 'Please enter a valid email.');
        isValid = false;
    }

    if (!password) {
        showError('login-password', 'Password is required.');
        isValid = false;
    }

    if (!isValid) return;

    // SIMULATION: Failure State (Mocking wrong credentials)
    if (password.length < 6) {
        showError('login-password', 'Password must be at least 6 characters.');
        return;
    }


    // SIMULATION: Success State
    toggleAuth(); 
    showToast("Welcome back to Famasi!", "Login Successful");
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

/* --- AUTH SIMULATION: Signup --- */
function handleSignup(event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    let isValid = true;

    if (!name) {
        showError('signup-name', 'Full Name is required.');
        isValid = false;
    }

    if (!email) {
        showError('signup-email', 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('signup-email', 'Please enter a valid email.');
        isValid = false;
    }

    if (!password) {
        showError('signup-password', 'Password is required.');
        isValid = false;
    } else if (password.length < 6) {
        showError('signup-password', 'Password must be at least 6 chars.');
        isValid = false;
    }

    if (isValid) {
        toggleAuth();
        showToast("Your account has been created.", "Account Created");
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
    }
}

/* --- FOOTER CONTACT FORM VALIDATION --- */
function handleContact(event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    let isValid = true;

    if (!name) {
        showError('contact-name', 'Name is required.');
        isValid = false;
    }

    if (!email) {
        showError('contact-email', 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('contact-email', 'Enter a valid email address.');
        isValid = false;
    }

    if (!message) {
        showError('contact-message', 'Message cannot be empty.');
        isValid = false;
    }

    if (isValid) {
        showToast("Message sent successfully!", "Contact");
        document.getElementById('footer-contact-form').reset();
    }
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