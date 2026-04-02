// Main JavaScript for Manasa Hari's Portfolio
(function () {
    const SELECTORS = {
        hamburger: '.hamburger',
        navMenu: '.nav-menu',
        navLinks: '.nav-link',
        anchorLinks: 'a[href^="#"]',
        animatedElements: '.timeline-item, .timeline__box, .testimonial, .profile-card, .content-card, .achievement-item',
        timelineItems: '.timeline-item',
        externalLinks: 'a[target="_blank"]',
        copyButtons: '[data-copy]',
        lazyImages: 'img[data-src]'
    };

    const injectedStyles = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-md);
        }

        .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }

        .lazy.loaded {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .back-to-top {
                width: 45px;
                height: 45px;
                bottom: 15px;
                right: 15px;
            }
        }
    `;

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    function injectStyles(id, cssText) {
        if (document.getElementById(id)) {
            return;
        }

        const style = document.createElement('style');
        style.id = id;
        style.textContent = cssText;
        document.head.appendChild(style);
    }

    function setupMobileNavigation() {
        const hamburger = $(SELECTORS.hamburger);
        const navMenu = $(SELECTORS.navMenu);
        const navLinks = $$(SELECTORS.navLinks);

        if (!hamburger || !navMenu || navLinks.length === 0) {
            return;
        }

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        };

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });
    }

    function setupSmoothScrolling() {
        $$(SELECTORS.anchorLinks).forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') {
                    return;
                }

                const targetElement = $(targetId);
                if (!targetElement) {
                    return;
                }

                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    function setupActiveNavLinks() {
        const currentPage = window.location.pathname;

        $$(SELECTORS.navLinks).forEach((item) => {
            const href = item.getAttribute('href');
            if (href === currentPage || (currentPage === '/' && href === '/')) {
                item.classList.add('active');
            }
        });
    }

    function setupAnimations() {
        const animatedElements = $$(SELECTORS.animatedElements);
        if (animatedElements.length === 0) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            animatedElements.forEach((element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                currentObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    function createBackToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fa fa-arrow-up" aria-hidden="true"></i>';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        return button;
    }

    function setupBackToTop() {
        const backToTopButton = createBackToTopButton();
        document.body.appendChild(backToTopButton);

        window.addEventListener('scroll', () => {
            const isVisible = window.pageYOffset > 300;
            backToTopButton.style.opacity = isVisible ? '1' : '0';
            backToTopButton.style.visibility = isVisible ? 'visible' : 'hidden';
        });
    }

    function setupTimelineHoverEffects() {
        $$(SELECTORS.timelineItems).forEach((item) => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateX(5px)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    function setupExternalLinkFeedback() {
        $$(SELECTORS.externalLinks).forEach((link) => {
            link.addEventListener('click', function () {
                this.style.opacity = '0.7';
                window.setTimeout(() => {
                    this.style.opacity = '1';
                }, 1000);
            });
        });
    }

    function setupCopyButtons() {
        if (!navigator.clipboard) {
            return;
        }

        $$(SELECTORS.copyButtons).forEach((button) => {
            button.addEventListener('click', async function () {
                const textToCopy = this.getAttribute('data-copy');
                if (!textToCopy) {
                    return;
                }

                const originalText = this.textContent;

                try {
                    await navigator.clipboard.writeText(textToCopy);
                    this.textContent = 'Copied!';
                    this.style.background = 'var(--accent-color)';

                    window.setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                } catch (error) {
                    console.error('Failed to copy text:', error);
                }
            });
        });
    }

    function setupLazyLoading() {
        const images = $$(SELECTORS.lazyImages);
        if (images.length === 0) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            images.forEach((img) => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            });
        });

        images.forEach((img) => imageObserver.observe(img));
    }

    function init() {
        injectStyles('site-enhancements', injectedStyles);
        setupMobileNavigation();
        setupSmoothScrolling();
        setupActiveNavLinks();
        setupAnimations();
        setupBackToTop();
        setupTimelineHoverEffects();
        setupExternalLinkFeedback();
        setupCopyButtons();
        setupLazyLoading();

        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
