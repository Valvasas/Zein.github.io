/* ============================================
   PORTFOLIO - RIZKY MAULANA ZEIN
   JAVASCRIPT UTAMA
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================
       1. LOADING SCREEN
       ===================== */
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Trigger hero animation setelah loading
        setTimeout(() => {
            document.querySelector('.hero-content.fade-up')?.classList.add('visible');
        }, 200);
    }, 2000);

    /* =====================
       2. CUSTOM CURSOR
       ===================== */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        document.querySelectorAll('a, button, .project-card, .service-card, .skill-tag, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('expand');
                follower.classList.add('expand');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('expand');
                follower.classList.remove('expand');
            });
        });
    }

    /* =====================
       3. NAVBAR SCROLL
       ===================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* =====================
       4. HAMBURGER MENU
       ===================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    /* =====================
       5. PARTICLES HERO
       ===================== */
    const particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size = Math.random() * 4 + 2;
            p.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 8 + 6}s;
                animation-delay: ${Math.random() * 6}s;
            `;
            particlesContainer.appendChild(p);
        }
    }

    /* =====================
       6. TECH BADGES (floating around photo)
       ===================== */
    const bubblePhotos = [
        { src: 'asset/HTML5.webp', label: 'HTML5' },
        { src: 'asset/CSS3.webp', label: 'CSS3' },
        { src: 'asset/es6.jpg', label: 'JavaScript' },
        { src: 'asset/node.png', label: 'MySQL' },
        { src: 'asset/laravel.png', label: 'Node.js' },
        { src: 'asset/SQL.webp', label: 'UI/UX' },
        { src: 'asset/TS.png', label: 'PHP' },
        { src: 'asset/code.jpg', label: 'Firebase' },
    ];

    const abstractSlots = [
        { x: [-18, 10], y: [6, 18] },
        { x: [74, 92], y: [8, 22] },
        { x: [-20, 2], y: [34, 48] },
        { x: [84, 100], y: [36, 50] },
        { x: [-8, 18], y: [70, 86] },
        { x: [70, 94], y: [72, 90] },
        { x: [24, 42], y: [-6, 8] },
        { x: [40, 62], y: [92, 104] },
    ];

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const techOrbit = document.querySelector('.tech-orbit');
    if (techOrbit) {
        bubblePhotos.forEach((photo, i) => {
            const slot = abstractSlots[i % abstractSlots.length];
            const size = randomBetween(62, 84);
            const x = randomBetween(slot.x[0], slot.x[1]);
            const y = randomBetween(slot.y[0], slot.y[1]);
            const delay = randomBetween(0, 1.8);
            const speed = randomBetween(3.4, 5.8);
            const rotate = randomBetween(-16, 16);
            const floatX = randomBetween(-14, 16);
            const floatY = randomBetween(-28, -12);

            const badge = document.createElement('div');
            badge.classList.add('tech-badge');
            badge.setAttribute('title', photo.label);
            badge.style.cssText = `
                left: ${x}%; top: ${y}%;
                --badge-size: ${size}px;
                --float-speed: ${speed}s;
                --rotate: ${rotate}deg;
                --float-x: ${floatX}px;
                --float-y: ${floatY}px;
                animation-delay: ${delay}s;
            `;

            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.label;
            badge.appendChild(img);
            techOrbit.appendChild(badge);
        });

        // Make badges visible after loading
        setTimeout(() => {
            document.querySelectorAll('.tech-badge').forEach((b, i) => {
                setTimeout(() => {
                    b.style.opacity = '1';
                    b.style.transition = 'opacity 0.5s ease';
                }, i * 120);
            });
        }, 2500);
    }

    /* =====================
       7. FADE-UP OBSERVER
       ===================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /* =====================
       8. SKILL BARS ANIMATION
       ===================== */
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                });
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skills-categories').forEach(el => skillBarObserver.observe(el));

    /* =====================
       9. PROJECT FILTERS
       ===================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const cats = card.getAttribute('data-category') || '';
                if (filter === 'all' || cats.includes(filter)) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* =====================
       10. PROJECT MODAL
       ===================== */
    const modalOverlay = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    window.openModal = function(data) {
        document.getElementById('modalTag').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;

        // Handle images array for slider
        const sliderContainer = document.getElementById('sliderContainer');
        const sliderDots = document.getElementById('sliderDots');
        const images = Array.isArray(data.img) ? data.img : [data.img];

        sliderContainer.innerHTML = '';
        sliderDots.innerHTML = '';

        images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${data.title} - Image ${index + 1}`;
            sliderContainer.appendChild(img);

            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });

        // Show/hide navigation based on image count
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            sliderDots.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            sliderDots.style.display = 'flex';
        }

        document.getElementById('modalDesc').textContent = data.desc;

        // Teknologi
        const techList = document.getElementById('modalTech');
        techList.innerHTML = '';
        (data.tech || []).forEach(t => {
            const span = document.createElement('span');
            span.className = 'modal-tech'; span.textContent = t;
            techList.appendChild(span);
        });

        // Links
        const linksEl = document.getElementById('modalLinks');
        linksEl.innerHTML = '';
        if (data.liveUrl) {
            const a = document.createElement('a');
            a.href = data.liveUrl; a.className = 'btn btn-gold'; a.target = '_blank';
            a.textContent = 'Lihat Live';
            linksEl.appendChild(a);
        }
        if (data.githubUrl) {
            const a = document.createElement('a');
            a.href = data.githubUrl; a.className = 'btn'; a.target = '_blank';
            a.textContent = 'GitHub';
            linksEl.appendChild(a);
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize slider
        currentSlide = 0;
        updateSlider();
    };

    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* =====================
       12. SLIDER FUNCTIONALITY
       ===================== */
    let currentSlide = 0;

    function updateSlider() {
        const sliderContainer = document.getElementById('sliderContainer');
        const dots = document.querySelectorAll('.slider-dot');
        const totalSlides = sliderContainer.children.length;

        if (totalSlides > 0) {
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }

    function goToSlide(slideIndex) {
        const sliderContainer = document.getElementById('sliderContainer');
        const totalSlides = sliderContainer.children.length;
        currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
        updateSlider();
    }

    function nextSlide() {
        const sliderContainer = document.getElementById('sliderContainer');
        const totalSlides = sliderContainer.children.length;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        const sliderContainer = document.getElementById('sliderContainer');
        const totalSlides = sliderContainer.children.length;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event listeners for slider buttons
    document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
    document.getElementById('prevBtn')?.addEventListener('click', prevSlide);

    /* =====================
       13. PHOTO UPLOAD (removed - now static photo)
       ===================== */
    // Removed upload functionality - profile photo is now static

    /* =====================
       12. COUNTER ANIMATION
       ===================== */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    let current = 0;
                    const inc = target / 60;
                    const timer = setInterval(() => {
                        current += inc;
                        if (current >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
                        else el.textContent = Math.floor(current) + (el.dataset.suffix || '');
                    }, 20);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.profile-stats').forEach(el => counterObserver.observe(el));

    /* =====================
       13. SMOOTH REVEAL (stagger)
       ===================== */
    document.querySelectorAll('.service-card').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.1) + 's';
    });

});
