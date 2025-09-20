// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        document.body.style.overflow = 'visible';
        
        // Initialize animations after loading
        initializeAnimations();
    }, 1000);
});

// Navigation functionality
let currentSection = 'home';

// Mobile menu toggle
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Navigation link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Calculate offset for fixed navbar
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Smooth scroll to section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            updateActiveNavLink(targetId);
        }
    });
});

// Update active navigation link
function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
    currentSection = activeId;
}

// Scroll effects
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar background change
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active section based on scroll position
    updateActiveSectionOnScroll();
    
    // Parallax effects
    applyParallaxEffects(scrollY);
}

// Update active section based on scroll position
function updateActiveSectionOnScroll() {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    const navbarHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 50;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            if (currentSection !== sections[i]) {
                updateActiveNavLink(sections[i]);
            }
            break;
        }
    }
}

// Parallax effects
function applyParallaxEffects(scrollY) {
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        const scrollRatio = Math.min(scrollY / heroHeight, 1);
        
        // Fade out hero elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = 1 - scrollRatio * 0.5;
            heroContent.style.transform = `translateY(${scrollRatio * 30}px)`;
        }
    }
}

// Initialize animations
function initializeAnimations() {
    // Hero section animations
    animateHeroElements();
    
    // Set up intersection observer for scroll animations
    setupIntersectionObserver();
    
    // Initialize skill bars
    initializeSkillBars();
}

// Hero section animations
function animateHeroElements() {
    const titleLines = document.querySelectorAll('.title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');
    
    // Animate title lines
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            line.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 200);
    });
    
    // Animate other hero elements
    const heroElements = [heroSubtitle, heroDescription, heroCta];
    heroElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }, (titleLines.length * 200) + (index * 200));
        }
    });
}

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animate elements based on their class
                if (target.classList.contains('timeline-item')) {
                    animateTimelineItem(target);
                } else if (target.classList.contains('project-card')) {
                    animateProjectCard(target);
                } else if (target.classList.contains('skill-category')) {
                    animateSkillCategory(target);
                } else if (target.classList.contains('contact-item')) {
                    animateContactItem(target);
                }
                
                // Unobserve after animation
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = [
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.contact-item')
    ];
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        observer.observe(element);
    });
}

// Animation functions
function animateTimelineItem(element) {
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

function animateProjectCard(element) {
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

function animateSkillCategory(element) {
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Animate skill bars after category animation
    setTimeout(() => {
        animateSkillBars(element);
    }, 400);
}

function animateContactItem(element) {
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

// Skill bars functionality
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars(category) {
    const skillBars = category.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width') || '0';
            bar.style.width = width + '%';
            
            // Add pulse effect
            setTimeout(() => {
                bar.style.boxShadow = '0 0 10px rgba(50, 196, 205, 0.3)';
                setTimeout(() => {
                    bar.style.boxShadow = 'none';
                }, 300);
            }, 800);
        }, index * 100);
    });
}

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" type="button">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16) var(--space-20);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 350px;
    `;
    
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'error') {
        notification.style.borderLeftColor = 'var(--color-error)';
        notification.style.borderLeftWidth = '4px';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        margin-left: var(--space-12);
        color: var(--color-text-secondary);
        padding: 0;
        line-height: 1;
    `;
    
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Handle all anchor links with smooth scrolling
document.addEventListener('click', (e) => {
    // Handle internal anchor links
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav
            updateActiveNavLink(targetId);
        }
    }
    
    // Handle external links - ensure they open in new tabs
    if (e.target.matches('a[href^="http"], a[href^="https"]')) {
        e.target.setAttribute('target', '_blank');
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            closeNotification(notification);
        }
    }
});

// Performance optimizations
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Handle resize events
const handleResize = debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Recalculate scroll position for active section
    updateActiveSectionOnScroll();
}, 250);

window.addEventListener('resize', handleResize);

// Preload critical animations
function preloadAnimations() {
    const testElement = document.createElement('div');
    testElement.style.transform = 'translateX(0)';
    testElement.style.opacity = '1';
    document.body.appendChild(testElement);
    document.body.removeChild(testElement);
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        preloadAnimations();
        initializeFormElements();
    });
} else {
    preloadAnimations();
    initializeFormElements();
}

// Initialize form elements to ensure they're interactive
function initializeFormElements() {
    // Ensure form inputs are properly initialized
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Remove any potential readonly attributes
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
        
        // Ensure proper input types
        if (input.name === 'email') {
            input.type = 'email';
        }
        
        // Add focus/blur events for better UX
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Make sure all external links work
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Add custom cursor effects for interactive elements
function addCursorEffects() {
    const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-category, .contact-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
}

// Initialize cursor effects
addCursorEffects();

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after hero animation
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 100);
    }
}, 2000);

// Add smooth hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .contact-item, .detail-item, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize card hover effects
addCardHoverEffects();

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-message {
        flex: 1;
        color: var(--color-text);
    }
    
    .notification-close:hover {
        color: var(--color-text);
    }
    
    .form-group.focused .form-control {
        border-color: var(--mocha-medium);
        box-shadow: 0 0 0 3px rgba(180, 162, 143, 0.1);
    }
`;
document.head.appendChild(style);
