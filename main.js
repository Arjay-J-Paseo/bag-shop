// Cart functionality
let cartItems = [];
let cartCount = 0;

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

function addToCart(product) {
    cartItems.push(product);
    cartCount++;
    updateCartCount();
    showNotification('Product added to cart successfully!');
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    cartCount--;
    updateCartCount();
    updateCartTotal();
    showNotification('Product removed from cart.');
}

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const subtotalElement = document.querySelector('.summary-item span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Product quantity controls
function initQuantityControls() {
    const quantityControls = document.querySelectorAll('.quantity-controls');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('input');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateProductTotal(control);
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue < 10) {
                input.value = currentValue + 1;
                updateProductTotal(control);
            }
        });

        input.addEventListener('change', () => {
            const value = parseInt(input.value);
            if (value < 1) input.value = 1;
            if (value > 10) input.value = 10;
            updateProductTotal(control);
        });
    });
}

function updateProductTotal(control) {
    const cartItem = control.closest('.cart-item');
    if (cartItem) {
        const price = parseFloat(cartItem.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(control.querySelector('input').value);
        const total = price * quantity;
        cartItem.querySelector('.item-price .price').textContent = `$${total.toFixed(2)}`;
        updateCartTotal();
    }
}

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}

// Product Gallery
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
            // Update main image
            mainImage.src = thumb.src.replace('-thumb', '');
        });
    });
}

// Newsletter Form
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!');
                form.reset();
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form validation and submission logic here
            showNotification('Thank you for your message. We will get back to you soon!');
            form.reset();
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.nav-container');
    nav.insertBefore(menuButton, nav.firstChild);
    
    menuButton.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initQuantityControls();
    initFaqAccordion();
    initProductGallery();
    initNewsletterForm();
    initContactForm();
    initMobileMenu();
    
    // Update cart count on page load
    updateCartCount();
});

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 