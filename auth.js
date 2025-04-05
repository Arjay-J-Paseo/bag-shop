document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js loaded'); // Debug log

    // Clear any existing auth state when landing page loads
    if (window.location.pathname.includes('landing.html')) {
        localStorage.clear();
    }

    // Check if user is already logged in
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentPath = window.location.pathname;
        console.log('Current path:', currentPath); // Debug log
        console.log('Login status:', isLoggedIn); // Debug log
        
        if (isLoggedIn === 'true') {
            // If on landing page and logged in, redirect to home
            if (currentPath.includes('landing.html')) {
                window.location.href = '../index.html';
            }
        } else {
            // If not on landing page and not logged in, redirect to landing
            if (!currentPath.includes('landing.html')) {
                window.location.href = 'pages/landing.html';
            }
        }
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    if (tabBtns && authForms) {
        // Set initial state - show login form by default
        const loginTab = document.querySelector('[data-tab="login"]');
        const loginForm = document.getElementById('loginForm');
        if (loginTab && loginForm) {
            loginTab.classList.add('active');
            loginForm.classList.add('active');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                console.log('Tab clicked:', tabName); // Debug log
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show corresponding form
                authForms.forEach(form => {
                    if (form.id === `${tabName}Form`) {
                        form.classList.add('active');
                    } else {
                        form.classList.remove('active');
                    }
                });
            });
        });
    }

    // Password visibility toggle
    const toggleBtns = document.querySelectorAll('.toggle-password');
    if (toggleBtns) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                if (input) {
                    const type = input.getAttribute('type');
                    input.setAttribute('type', type === 'password' ? 'text' : 'password');
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                }
            });
        });
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('Login form found'); // Debug log
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted'); // Debug log
            
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            const rememberMe = this.querySelector('input[name="rememberMe"]')?.checked || false;

            console.log('Login attempt:', { email, rememberMe }); // Debug log

            // Basic validation
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }

            try {
                // Simulate successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }

                console.log('Login successful, redirecting...'); // Debug log
                // Redirect to home page
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Login error:', error); // Debug log
                showError('An error occurred during login');
            }
        });
    }

    // Signup form handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Signup form submitted'); // Debug log
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;
            const agreeTerms = this.querySelector('input[name="agreeTerms"]')?.checked || false;

            // Basic validation
            if (!name || !email || !password || !confirmPassword) {
                showError('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            if (!agreeTerms) {
                showError('Please agree to the Terms & Conditions');
                return;
            }

            try {
                // Simulate successful signup
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', name);

                console.log('Signup successful, redirecting...'); // Debug log
                // Redirect to home page
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Signup error:', error); // Debug log
                showError('An error occurred during signup');
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicked'); // Debug log
            
            try {
                // Clear all auth data
                localStorage.clear();
                console.log('Logged out, redirecting...'); // Debug log
                // Redirect to landing page
                window.location.href = 'pages/landing.html';
            } catch (error) {
                console.error('Logout error:', error); // Debug log
            }
        });
    }

    // Error handling
    function showError(message) {
        console.log('Showing error:', message); // Debug log
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const activeForm = document.querySelector('.auth-form.active');
        if (activeForm) {
            activeForm.insertBefore(errorDiv, activeForm.firstChild);
            
            // Remove error after 3 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
    }

    // Initialize
    console.log('Initializing auth system...'); // Debug log
    checkLoginStatus();
}); 