// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation for contact page
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (name && email) {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        }
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if elements are already in view on page load
    checkElementsInView();
    
    // Set up intersection observer for scroll animations
    setupIntersectionObserver();
});

function checkElementsInView() {
    const elements = document.querySelectorAll('.fade-in, .timeline-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special case for skill bars
                if (entry.target.classList.contains('bar-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .timeline-item, .bar-fill').forEach(element => {
        observer.observe(element);
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.bar-fill');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
        
        observer.observe(bar);
    });
}

// Initialize skill bar animation
animateSkillBars();