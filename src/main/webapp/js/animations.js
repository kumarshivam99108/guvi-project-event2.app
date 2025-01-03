// Enhanced Animation Controller
class AnimationController {
    constructor() {
        this.initializeAnimations();
        this.setupEventListeners();
    }

    initializeAnimations() {
        // Add hover classes to elements
        this.addHoverEffects();
        // Initialize scroll animations
        this.reveal();
        // Initialize counters
        this.initializeCounters();
        // Add tilt effects
        this.initializeTiltEffect();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.reveal());
        window.addEventListener('mousemove', (e) => this.handleParallax(e));
        
        // Add hover listeners for cards
        document.querySelectorAll('.hover-trigger').forEach(element => {
            element.addEventListener('mouseenter', (e) => this.handleHoverEnter(e));
            element.addEventListener('mouseleave', (e) => this.handleHoverLeave(e));
        });
    }

    addHoverEffects() {
        // Add hover effects to various elements
        const elements = {
            '.btn': 'hover-scale',
            '.card': 'hover-float',
            '.feature-icon': 'hover-rotate',
            '.nav-link': 'hover-slide',
            '.social-icon': 'hover-bounce',
            'img': 'hover-brightness',
            '.price-card': 'hover-shadow',
            '.testimonial-card': 'hover-transform'
        };

        for (let [selector, effect] of Object.entries(elements)) {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add(effect);
                element.classList.add('hover-trigger');
            });
        }
    }

    handleHoverEnter(e) {
        const element = e.target;
        
        // Add ripple effect for buttons
        if (element.classList.contains('btn')) {
            this.createRipple(e);
        }

        // Add glow effect for cards
        if (element.classList.contains('card')) {
            element.style.transform = 'translateY(-10px)';
            element.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        }

        // Rotate icons on hover
        if (element.classList.contains('feature-icon')) {
            element.style.transform = 'rotate(360deg)';
        }
    }

    handleHoverLeave(e) {
        const element = e.target;
        
        // Reset transformations
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    createRipple(e) {
        const button = e.target;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                
                // Add sequential animation to child elements
                if (element.classList.contains('sequence-animation')) {
                    this.animateSequentially(element);
                }
            }
        });
    }

    animateSequentially(parent) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.2}s`;
            child.classList.add('fade-in');
        });
    }

    handleParallax(e) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 5;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                counter.textContent = Math.round(current);

                if (current < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start counter when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.disconnect();
                }
            });

            observer.observe(counter);
        });
    }

    initializeTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
