// ==========================================
// SCROLL ANIMATIONS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer para animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todas las secciones de contenido
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // ==========================================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('article[id], section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // TYPING EFFECT FOR HERO (opcional)
    // ==========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }

    // ==========================================
    // PARALLAX EFFECT FOR FLOATING CARDS
    // ==========================================
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==========================================
    // READING PROGRESS INDICATOR
    // ==========================================
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #6B8E6B, #2B4A6F);
            z-index: 999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    createProgressBar();

    // ==========================================
    // LAZY LOADING IMAGES (si se agregan después)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('🏓 Blog UNIMINUTO - Proyecto Social de Formación');
    console.log('✨ Cargado exitosamente');
});

// ==========================================
// CSS ADICIONAL PARA MOBILE MENU (inyectado)
// ==========================================
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 767px) {
        .nav-links {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            display: none;
        }
        
        .nav-links.active {
            display: flex;
        }
        
        .nav-link {
            padding: 0.75rem 1rem;
            border-radius: 8px;
        }
        
        .nav-link:hover {
            background: #f0f4f7;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .nav-link.active {
        color: #2B4A6F;
        font-weight: 600;
    }
`;
document.head.appendChild(mobileStyles);
