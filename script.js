// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Tab Functionality for Courses
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Form Submission with Response
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if(!name || !email || !subject || !message) {
        showFormResponse('Please fill in all fields.', 'error');
        return;
    }
    
    // Simulate form submission (in a real scenario, you would send to a server)
    showFormResponse('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

function showFormResponse(message, type) {
    formResponse.textContent = message;
    formResponse.className = 'form-response ' + type;
    formResponse.style.display = 'block';
    
    // Hide response after 5 seconds
    setTimeout(() => {
        formResponse.style.display = 'none';
    }, 5000);
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        header.style.background = 'white';
    }
});

// Enhanced Scroll Animation for both directions
let lastScrollY = window.scrollY;
let ticking = false;

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

function handleScrollAnimation() {
    const elementsToAnimate = document.querySelectorAll('.about-text, .about-image, .service-card, .course-item, .community-text, .community-image, .future-item, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate');
        } else {
            // Remove animation when element is out of viewport (for re-triggering)
            // Only remove if we're scrolling up significantly
            if (window.scrollY < lastScrollY - 100) {
                element.classList.remove('animate');
            }
        }
    });
    
    lastScrollY = window.scrollY;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScrollAnimation();
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize scroll animation for both directions
window.addEventListener('scroll', onScroll);
window.addEventListener('load', handleScrollAnimation);

// Add animation delay to service cards for staggered effect
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const futureItems = document.querySelectorAll('.future-item');
    futureItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Initial animation check
    handleScrollAnimation();
});