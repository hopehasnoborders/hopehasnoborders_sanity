(function () {
    // 1. Load Partials (Announcement Bar, Nav & Footer)
    async function loadPartials() {
        try {
            // Load Announcement Bar (only if not dismissed)
            const announcementDismissed = localStorage.getItem('hhnb-announcement-dismissed');
            if (!announcementDismissed) {
                const announcementRes = await fetch('/partials/announcement-bar.html');
                if (announcementRes.ok) {
                    const announcementHtml = await announcementRes.text();
                    const announcementContainer = document.getElementById('site-announcement');
                    if (announcementContainer) {
                        announcementContainer.innerHTML = announcementHtml;
                    }
                }
            }

            const navRes = await fetch('/partials/nav.html');
            if (navRes.ok) {
                const navHtml = await navRes.text();
                const navContainer = document.getElementById('site-nav');
                if (navContainer) {
                    navContainer.innerHTML = navHtml;
                    initNavLogic(); // Re-run logic after injection
                }
            }

            const footerRes = await fetch('/partials/footer.html');
            if (footerRes.ok) {
                const footerHtml = await footerRes.text();
                const footerContainer = document.getElementById('site-footer');
                if (footerContainer) footerContainer.innerHTML = footerHtml;
            }

            // Re-init generic UI stuff
            if (window.lucide && typeof window.lucide.createIcons === "function") {
                window.lucide.createIcons();
            }

            // Initialize counters after DOM is ready
            initCounters();

        } catch (e) {
            console.error("Error loading partials:", e);
        }
    }

    // Announcement Bar Dismiss Function (global)
    window.dismissAnnouncement = function () {
        const bar = document.getElementById('announcement-bar');
        if (bar) {
            bar.style.transform = 'translateY(-100%)';
            bar.style.opacity = '0';
            setTimeout(() => {
                bar.remove();
            }, 300);
        }
        localStorage.setItem('hhnb-announcement-dismissed', 'true');
    };

    // Expandable Service Cards (global)
    window.toggleServiceCard = function (card) {
        const details = card.querySelector('.service-details');
        const summary = card.querySelector('.service-summary');
        const icon = card.querySelector('.expand-icon');

        if (details.classList.contains('hidden')) {
            details.classList.remove('hidden');
            if (summary) summary.classList.add('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
            card.classList.add('border-orange-600');
        } else {
            details.classList.add('hidden');
            if (summary) summary.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
            card.classList.remove('border-orange-600');
        }

        // Re-init icons in case new ones are visible
        if (window.lucide) window.lucide.createIcons();
    };

    // Animated Counters
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        if (counters.length === 0) return;

        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(target * easeOut);
                el.textContent = currentValue.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target.toLocaleString() + suffix;
                }
            }
            requestAnimationFrame(updateCounter);
        };

        // Use IntersectionObserver to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Testimonial Carousel
    function initTestimonialCarousel() {
        const carousel = document.getElementById('testimonial-carousel');
        const dotsContainer = document.getElementById('testimonial-dots');
        if (!carousel || !dotsContainer) return;

        const slides = carousel.querySelectorAll('.testimonial-slide');
        const dots = dotsContainer.querySelectorAll('[data-dot]');
        let currentSlide = 0;
        let autoplayInterval;

        function goToSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) slide.classList.add('active');
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-orange-600', i === index);
                dot.classList.toggle('bg-neutral-300', i !== index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Dot click handlers
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.getAttribute('data-dot'), 10));
                stopAutoplay();
                startAutoplay();
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    // Initialize testimonials after partials load
    const originalLoadPartials = loadPartials;
    loadPartials = async function () {
        await originalLoadPartials.call(this);
        initTestimonialCarousel();
        initLanguageToggle();
    };

    // Language Toggle Logic
    function initLanguageToggle() {
        const toggles = document.querySelectorAll('.lang-toggle');
        if (toggles.length === 0) return;

        const currentPath = window.location.pathname;
        const isSpanish = currentPath.startsWith('/es/') || currentPath === '/es';
        const currentLang = isSpanish ? 'es' : 'en';
        const targetLang = isSpanish ? 'en' : 'es';

        toggles.forEach(toggle => {
            const lang = toggle.getAttribute('data-lang');

            // Highlight current language
            if (lang === currentLang) {
                toggle.classList.add('font-bold', 'text-orange-600');
            }

            // Set href for language switch
            if (lang === targetLang) {
                let newPath;
                if (isSpanish) {
                    // Currently on Spanish, switch to English
                    newPath = currentPath.replace('/es/', '/en/').replace('/es', '/en');
                } else {
                    // Currently on English, switch to Spanish
                    newPath = currentPath.replace('/en/', '/es/').replace('/en', '/es');
                }
                // Handle root path case
                if (currentPath === '/' || currentPath === '/index.html') {
                    newPath = lang === 'es' ? '/es/' : '/en/';
                }
                toggle.setAttribute('href', newPath);
            } else {
                // Current language link goes to current page
                toggle.setAttribute('href', currentPath);
            }
        });
    }

    // 2. Nav Logic (Mobile Menu, Scroll, Active State)
    function initNavLogic() {
        const navbar = document.getElementById('navbar');
        const navDivider = document.getElementById('nav-divider');
        const mobileIcon = document.getElementById('mobile-menu-icon');
        const logo = document.getElementById('nav-logo');

        // Active State Logic
        const currentPath = window.location.pathname; // e.g. "/pages/about.html"
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === '/index.html') || (currentPath === '/index.html' && href === '/index.html')) {
                link.classList.add('text-orange-600');
            }
        });

        // Scroll Logic
        function handleScroll() {
            if (!navbar) return;
            const isHome = document.body.classList.contains('home-page');
            const scrollY = window.scrollY;

            // If it's NOT home page, it should always be white/visible background
            // If it IS home page, it starts transparent and becomes white

            if (!isHome) {
                // Ensure default state for non-home pages
                return;
            }

            // Home Page Logic
            if (scrollY > 50) {
                navbar.classList.remove('bg-transparent', 'text-white');
                navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'text-black', 'shadow-sm');
                if (navDivider) navDivider.classList.replace('bg-white/30', 'bg-neutral-300');
                if (mobileIcon) mobileIcon.style.color = 'black';
                if (logo) {
                    logo.classList.remove('logo-white-filter');
                    logo.classList.add('logo-normal');
                }
            } else {
                navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'text-black');
                navbar.classList.add('bg-transparent', 'text-white');
                if (navDivider) navDivider.classList.replace('bg-neutral-300', 'bg-white/30');
                if (mobileIcon) mobileIcon.style.color = 'white';
                if (logo) {
                    logo.classList.remove('logo-normal');
                    logo.classList.add('logo-white-filter');
                }
            }
        }

        // Initial generic setup for transparent vs white nav on load
        if (document.body.classList.contains('home-page')) {
            // Start transparent
        } else {
            // For subpages, ensure we are in "scrolled" state style but without the check
            if (navbar) {
                navbar.classList.remove('bg-transparent', 'text-white');
                // Note: The partial has default classes. We might need to override if we want consistency.
                // The partial definition has `bg-white/95 text-black`. 
                // We only need to force transparency on Home Page at top.
            }
        }

        if (document.body.classList.contains('home-page')) {
            // Force transparent start if at top
            if (window.scrollY < 50 && navbar) {
                navbar.classList.remove('bg-white/95', 'text-black', 'shadow-sm');
                navbar.classList.add('bg-transparent', 'text-white');
                if (logo) { logo.classList.add('logo-white-filter'); logo.classList.remove('logo-normal'); }
                if (navDivider) { navDivider.classList.replace('bg-neutral-300', 'bg-white/30'); }
                if (mobileIcon) { mobileIcon.style.color = 'white'; }
            }
            window.addEventListener('scroll', handleScroll);
        }

        // Mobile Menu Toggle Global Function
        window.toggleMobileMenu = function () {
            const menu = document.getElementById("mobile-menu");
            const icon = document.getElementById("mobile-menu-icon");
            const body = document.body;
            if (!menu) return;

            const isHidden = menu.classList.contains("hidden");

            if (isHidden) {
                menu.classList.remove("hidden");
                // Small delay to allow display:block to apply before opacity transition
                requestAnimationFrame(() => {
                    menu.classList.remove("opacity-0");
                    menu.classList.add("opacity-100");
                });
                if (icon) icon.setAttribute("data-lucide", "x");
                // We need to handle icon color if we are on transparent home
                if (document.body.classList.contains('home-page') && window.scrollY < 50) {
                    // Keep white or switch to black? Usually menu overlay is white, so icon should be black
                    if (icon) icon.style.color = 'black';
                }

                body.classList.add("overflow-hidden");
            } else {
                menu.classList.remove("opacity-100");
                menu.classList.add("opacity-0");
                setTimeout(() => menu.classList.add("hidden"), 300);
                if (icon) icon.setAttribute("data-lucide", "menu");

                // Revert icon color for home page transparency
                if (document.body.classList.contains('home-page') && window.scrollY < 50) {
                    if (icon) icon.style.color = 'white';
                }

                body.classList.remove("overflow-hidden");
            }
            if (window.lucide) window.lucide.createIcons();
        };
    }

    // Run
    document.addEventListener("DOMContentLoaded", () => {
        loadPartials();
    });

    // global lucide init in case
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }

})();
