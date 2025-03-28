// Typing animation
const typingTexts = ["Brian Muuo", "a Developer", "a Student", "an AL ethusiam","a ML zealousness"];
const typingElement = document.querySelector('.typing-animation');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing animation
if (typingElement) {
    type();
}

// Create floating shapes
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;
    
    const shapes = ['circle', 'triangle'];
    const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--secondary-color)'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.className = `shape ${shapeType}`;
        
        // Random properties
        const size = Math.random() * 50 + 20;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.2 + 0.05;
        
        // Apply styles
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.animationDuration = `${animationDuration}s`;
        shape.style.animationDelay = `${delay}s`;
        shape.style.opacity = opacity;
        
        if (shapeType === 'circle') {
            shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        } else if (shapeType === 'triangle') {
            shape.style.borderBottomColor = colors[Math.floor(Math.random() * colors.length)];
        }
        
        shapesContainer.appendChild(shape);
    }
}

// Initialize floating shapes
createFloatingShapes();

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize timeline animation
animateTimeline();