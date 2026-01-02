// Theme Switcher
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Navbar with glassmorphism
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const theme = html.getAttribute('data-theme');

    if (currentScroll > 50) {
        if (theme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.85)';
            navbar.style.boxShadow = '0 8px 32px rgba(10, 132, 255, 0.1)';
        }
    } else {
        if (theme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with stagger effect
const animatedElements = document.querySelectorAll('.project-card, .skill-card, .achievement-card, .contact-card');
animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Removed parallax effect for cleaner minimalism

// Enhanced project card interactions (NO CURSOR TRACKING)
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const hasPreview = card.getAttribute('data-has-preview') === 'true';
    const preview = card.querySelector('.project-preview');

    // Reset preview scroll position when mouse leaves
    if (preview) {
        card.addEventListener('mouseleave', function() {
            preview.style.transition = 'transform 0.6s ease';
            preview.style.transform = 'scale(0.25) translateY(0)';

            setTimeout(() => {
                preview.style.transition = 'transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 600);
        });
    }
});

// Skill cards subtle pulse on hover
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.animation = 'subtle-pulse 0.6s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.animation = '';
        }
    });
});

// Dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes subtle-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Typing effect for hero subtitle (faster, smoother)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.opacity = '1';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }

    setTimeout(typeWriter, 300);
}

// Smooth gradient orb floating
const heroOrb = document.querySelector('.rotating-cube');
if (heroOrb) {
    let orbPosition = 0;

    function animateOrb() {
        orbPosition += 0.005;
        const floatY = Math.sin(orbPosition) * 20;
        const floatX = Math.cos(orbPosition * 0.5) * 10;
        heroOrb.style.transform = `translate(${floatX}px, ${floatY}px)`;
        requestAnimationFrame(animateOrb);
    }

    animateOrb();
}

// Project preview lazy loading optimization
const projectPreviews = document.querySelectorAll('.project-preview');
const previewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (!iframe.dataset.loaded) {
                iframe.dataset.loaded = 'true';
            }
        }
    });
}, {
    rootMargin: '100px'
});

projectPreviews.forEach(preview => {
    previewObserver.observe(preview);
});

// Console easter egg
console.log('%c🔐 Security Portfolio', 'color: #0a84ff; font-size: 24px; font-weight: bold; text-shadow: 0 2px 10px rgba(10, 132, 255, 0.5);');
console.log('%cWelcome, fellow security enthusiast!', 'color: #fff; font-size: 14px; padding: 8px 0;');
console.log('%cBuilt with Apple-inspired design principles, Flask, and lots of care ✨', 'color: #a0a0b0; font-size: 12px; font-style: italic;');
console.log('%c\n[Hint] Check the network tab to see how efficiently this portfolio loads! 🚀', 'color: #64b5ff; font-size: 11px;');

// Handle viewport resize for project previews
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        projectPreviews.forEach(preview => {
            preview.style.transition = 'none';
            preview.style.transform = 'scale(0.25) translateY(0)';
            setTimeout(() => {
                preview.style.transition = 'transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 100);
        });
    }, 250);
});

// Prevent iframe interaction (security)
document.addEventListener('DOMContentLoaded', () => {
    projectPreviews.forEach(preview => {
        preview.addEventListener('load', () => {
            preview.style.pointerEvents = 'none';
        });
    });
});

// Smooth scroll reveal for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add subtle hover effect to tech badges
const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Removed dynamic glass effect for cleaner minimalism
