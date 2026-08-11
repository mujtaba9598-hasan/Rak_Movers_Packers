document.addEventListener('DOMContentLoaded', () => {
    // 1. Truck Loader Logic
    const preloader = document.getElementById('preloader');
    const loaderPercentage = document.getElementById('loader-percentage');
    const loaderBarFill = document.getElementById('loader-bar-fill');
    const loaderTruck = document.getElementById('loader-truck');

    if (preloader) {
        let loadProgress = 0;
        // Simulate loading time (e.g., 1.5 seconds to reach 100%)
        const loadInterval = setInterval(() => {
            loadProgress += Math.floor(Math.random() * 10) + 5;
            if (loadProgress >= 100) {
                loadProgress = 100;
                clearInterval(loadInterval);
                finishLoading();
            }
            loaderPercentage.innerText = loadProgress + '%';
            loaderBarFill.style.width = loadProgress + '%';
        }, 100);

        function finishLoading() {
            // Tell truck to drive off screen
            loaderTruck.classList.add('drive-out');
            
            // Fade out preloader after truck drives away
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 800);
        }
    }

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Mega Menu Hover Logic for active states
    const megaItems = document.querySelectorAll('.mega-col:first-child .mega-item');
    const megaTargetPanels = document.querySelectorAll('.mega-col:nth-child(2) .mega-panel');

    if (megaItems.length > 0 && megaTargetPanels.length > 0) {
        megaItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                // Remove active from all
                megaItems.forEach(i => i.classList.remove('active'));
                megaTargetPanels.forEach(p => p.style.display = 'none');
                
                // Add active to current
                e.target.classList.add('active');
                const targetId = e.target.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.style.display = 'block';
                }
            });
        });
    }

    // 4. WhatsApp Form Logic
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const service = document.getElementById('service').value;
            const details = document.getElementById('details').value;

            // Format message
            const message = `Hello RAK Movers,
My name is *${name}*.
Phone: ${phone}
Location: ${location}
*Service Required:* ${service}

*Additional Details:*
${details}

Please let me know the quote and availability.`;

            // Encode for URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = '971557385338';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // 5. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    // The complete services submenu remains visible inside the opened mobile navigation.
});
