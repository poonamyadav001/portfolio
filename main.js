// =====================
// THREE.JS HERO SECTION
// =====================
function initThreeJS() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    try {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);
        canvas.appendChild(renderer.domElement);

        camera.position.z = 5;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x667eea,
            sizeAttenuation: true,
        });

        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 10;
            posArray[i + 1] = (Math.random() - 0.5) * 10;
            posArray[i + 2] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Create animated cube
        const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x764ba2,
            emissive: 0x667eea,
            shininess: 100,
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cube);

        // Add lights
        const light1 = new THREE.PointLight(0x667eea, 1, 100);
        light1.position.set(5, 5, 5);
        scene.add(light1);

        const light2 = new THREE.PointLight(0xf093fb, 1, 100);
        light2.position.set(-5, -5, 5);
        scene.add(light2);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate cube
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.007;
            cube.rotation.z += 0.003;

            // Move particles
            particles.rotation.x += 0.0001;
            particles.rotation.y += 0.0002;

            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        animate();
    } catch (e) {
        console.warn('Three.js initialization skipped:', e.message);
    }
}

// =====================
// NAVIGATION & SCROLL
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================
// SCROLL ANIMATIONS
// =====================
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

// =====================
// PROGRESS BAR ANIMATION
// =====================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// =====================
// FORM HANDLING
// =====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.disabled = true;

        // Reset after 3 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// =====================
// SMOOTH SCROLL BEHAVIOR
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =====================
// PARALLAX EFFECT
// =====================
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .about, .projects');

        parallaxElements.forEach((element, index) => {
            if (index % 2 === 0) {
                element.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
            }
        });
    });
}

// =====================
// MOUSE GRADIENT FOLLOW
// =====================
function mouseGradientFollow() {
    const gradientElements = document.querySelectorAll('.gradient-text, .section-title');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        gradientElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;

            const angle = Math.atan2(y - elementY, x - elementX) * (180 / Math.PI);
            element.style.setProperty('--mouse-angle', `${angle}deg`);
        });
    });
}

// =====================
// INTERSECTION OBSERVER FOR CARD ANIMATIONS
// =====================
function setupCardAnimations() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .about-text');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// =====================
// LAZY LOADING
// =====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// =====================
// SCROLL TO TOP BUTTON
// =====================
function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        font-size: 1.2rem;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollButton.addEventListener('mouseover', () => {
        scrollButton.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseout', () => {
        scrollButton.style.transform = 'scale(1)';
    });
}

// =====================
// TYPING ANIMATION
// =====================
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';

    let index = 0;
    const speed = 50;

    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a small delay
    setTimeout(type, 500);
}

// =====================
// PARTICLE EFFECT ON SCROLL
// =====================
function createParticleEffect() {
    window.addEventListener('click', (e) => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: particleFloat 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    });

    // Add animation
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.textContent = `
            @keyframes particleFloat {
                to {
                    transform: translate(${Math.random() * 100 - 50}px, -100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// =====================
// INITIALIZE ON LOAD
// =====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }

    initThreeJS();
    animateOnScroll();
    animateProgressBars();
    setupCardAnimations();
    lazyLoadImages();
    setupScrollToTop();
    parallaxEffect();
    mouseGradientFollow();
    typeWriterEffect();
    createParticleEffect();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// =====================
// WINDOW LOAD EVENT
// =====================
window.addEventListener('load', () => {
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// =====================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// =====================
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

// =====================
// KEYBOARD SHORTCUTS
// =====================
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' || e.key === 'H') {
        const homeEl = document.querySelector('#home');
        if (homeEl) homeEl.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'a' to go to about
    if (e.key === 'a' || e.key === 'A') {
        const aboutEl = document.querySelector('#about');
        if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 's' to go to skills
    if (e.key === 's' || e.key === 'S') {
        const skillsEl = document.querySelector('#skills');
        if (skillsEl) skillsEl.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'p' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        const projectsEl = document.querySelector('#projects');
        if (projectsEl) projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'c' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        const contactEl = document.querySelector('#contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('%c🚀 Poonama Yadav Portfolio Loaded!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts: H-Home, A-About, S-Skills, P-Projects, C-Contact', 'color: #764ba2');
