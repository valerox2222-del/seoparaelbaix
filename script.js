// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Form Submission Handler (you can customize this to send to your backend)
const auditForm = document.getElementById('auditForm');

if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(auditForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send to your backend
        console.log('Form submitted with data:', data);
        
        // Show success message
        alert('¡Gracias! Tu solicitud ha sido enviada. Recibirás tu auditoría SEO gratuita en 24-48 horas.');
        
        // Reset form
        auditForm.reset();
        
        // Optional: Redirect to WhatsApp
        // window.open('https://wa.me/34640329880?text=Hola, me gustaría solicitar una auditoría SEO gratuita', '_blank');
    });
}

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateOnScroll = document.querySelectorAll('.service-card, .step, .case-card, .why-item, .pricing-card');

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const prefix = text.includes('+') ? '+' : '';
                const suffix = text.includes('%') ? '%' : '';
                
                stat.textContent = '0';
                
                let current = 0;
                const increment = number / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = prefix + number + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = prefix + Math.floor(current) + suffix;
                    }
                }, 20);
            });
            
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Chart bars animation
const chartBars = document.querySelectorAll('.chart-bar');
chartBars.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.1}s`;
});

console.log('✅ SEO Experto website loaded successfully!');