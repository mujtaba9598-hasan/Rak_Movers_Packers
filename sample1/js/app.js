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
            const whatsappNumber = '971527529598';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // 5. Mobile Dropdown Toggle
    const dropdownWrapper = document.querySelector('.dropdown-wrapper > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownWrapper && dropdownMenu && window.innerWidth <= 992) {
        dropdownWrapper.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });
    }
});

// --- Quartermasters Prototype Notice & Lead Capture ---
(function() {
    const DEVELOPER_PHONE = '+971 52 7529598';
    const DEVELOPER_TEL = '+971527529598';
    const DEVELOPER_WA_LINK = 'https://wa.me/971527529598?text=' + encodeURIComponent('Hello Quartermasters, I saw the website prototype and I want to purchase/customize it for my business.');

    function initNotice() {
        if (document.getElementById('qm-notice-modal')) return;

        document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"]').forEach(link => {
            if (link.href.startsWith('tel:')) {
                link.href = 'tel:' + DEVELOPER_TEL;
            } else if (link.href.includes('wa.me')) {
                link.href = DEVELOPER_WA_LINK;
            }
        });

        const style = document.createElement('style');
        style.innerHTML = `
            #qm-notice-overlay {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(15, 23, 42, 0.82);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                z-index: 9999999;
                display: flex; align-items: center; justify-content: center;
                padding: 16px; box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                animation: qmFadeIn 0.3s ease-out;
            }
            @keyframes qmFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes qmSlideUp {
                from { opacity: 0; transform: translateY(24px) scale(0.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            #qm-notice-modal {
                background: #ffffff; color: #0f172a; width: 100%; max-width: 530px;
                border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(226, 232, 240, 0.9);
                overflow: hidden; position: relative; animation: qmSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .qm-header-strip {
                background: linear-gradient(135deg, #ef4444, #b91c1c);
                padding: 14px 22px; color: #ffffff; display: flex; align-items: center; justify-content: space-between;
                font-weight: 700; font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase;
            }
            .qm-header-badge { display: flex; align-items: center; gap: 8px; }
            .qm-header-strip svg { width: 20px; height: 20px; flex-shrink: 0; fill: currentColor; }
            .qm-content { padding: 22px 24px; line-height: 1.55; }
            .qm-alert-box {
                background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px;
                padding: 12px 16px; margin-bottom: 18px;
            }
            .qm-alert-title { color: #991b1b; font-weight: 700; font-size: 0.92rem; margin-bottom: 4px; }
            .qm-alert-text { color: #7f1d1d; font-size: 0.88rem; margin: 0; }
            .qm-marketing-box {
                background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px;
                padding: 18px 20px; text-align: center; margin-bottom: 20px;
            }
            .qm-agency-pill {
                display: inline-block; background: #0284c7; color: #ffffff; font-size: 0.72rem;
                font-weight: 800; padding: 4px 12px; border-radius: 9999px; letter-spacing: 0.6px;
                margin-bottom: 10px; text-transform: uppercase;
            }
            .qm-marketing-heading { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
            .qm-marketing-desc { font-size: 0.9rem; color: #475569; margin-bottom: 14px; }
            .qm-direct-phone-box {
                background: #ffffff; border: 1.5px dashed #0284c7; border-radius: 10px;
                padding: 10px 14px; margin-bottom: 14px; display: flex; flex-direction: column; gap: 4px;
            }
            .qm-direct-phone-label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; }
            .qm-direct-phone-val { font-size: 1.25rem; font-weight: 800; color: #0284c7; text-decoration: none; }
            .qm-direct-phone-val:hover { text-decoration: underline; }
            .qm-cta-buttons { display: flex; flex-direction: column; gap: 10px; }
            .qm-btn {
                display: flex; align-items: center; justify-content: center; gap: 8px;
                padding: 12px 18px; border-radius: 10px; font-size: 0.95rem; font-weight: 700;
                text-decoration: none; transition: all 0.2s ease; cursor: pointer; border: none;
            }
            .qm-btn-whatsapp { background: #25d366; color: #ffffff !important; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35); }
            .qm-btn-whatsapp:hover { background: #1eb956; transform: translateY(-1px); }
            .qm-btn-call { background: #0f172a; color: #ffffff !important; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25); }
            .qm-btn-call:hover { background: #1e293b; transform: translateY(-1px); }
            .qm-footer-actions {
                display: flex; align-items: center; justify-content: space-between;
                border-top: 1px solid #f1f5f9; padding: 12px 24px; background: #fafafa;
            }
            .qm-btn-dismiss {
                background: #e2e8f0; color: #334155; border: none; font-size: 0.85rem;
                font-weight: 600; cursor: pointer; padding: 8px 14px; border-radius: 8px; transition: all 0.2s;
            }
            .qm-btn-dismiss:hover { color: #0f172a; background: #cbd5e1; }
            .qm-agency-tag { font-size: 0.78rem; color: #64748b; font-weight: 600; }
            #qm-sticky-bar {
                position: fixed; top: 0; left: 0; width: 100%; background: #0f172a; color: #f8fafc;
                font-size: 0.85rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 10px 18px; z-index: 999999; display: flex; align-items: center;
                justify-content: space-between; box-shadow: 0 2px 12px rgba(0,0,0,0.25); box-sizing: border-box; flex-wrap: wrap; gap: 8px;
            }
            .qm-sticky-left { display: flex; align-items: center; gap: 8px; }
            .qm-sticky-tag { background: #ef4444; color: white; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
            .qm-sticky-right { display: flex; align-items: center; gap: 12px; }
            .qm-sticky-right a { color: #38bdf8; font-weight: 700; text-decoration: none; }
            .qm-sticky-right a.qm-sticky-wa {
                background: #25d366; color: #ffffff; padding: 4px 12px; border-radius: 6px; font-size: 0.8rem;
                display: inline-flex; align-items: center; gap: 5px;
            }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.id = 'qm-notice-overlay';
        overlay.innerHTML = `
            <div id="qm-notice-modal" role="dialog" aria-modal="true">
                <div class="qm-header-strip">
                    <div class="qm-header-badge">
                        <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10h2v4h-2zm0 6h2v2h-2z"/></svg>
                        <span>Demonstration Prototype</span>
                    </div>
                    <span style="font-size: 0.75rem; background: rgba(0,0,0,0.25); padding: 3px 8px; border-radius: 4px;">UNPAID WORK</span>
                </div>
                <div class="qm-content">
                    <div class="qm-alert-box">
                        <div class="qm-alert-title">Notice Regarding RAK Khan Mover</div>
                        <p class="qm-alert-text">
                            This website is an <strong>unpaid demonstration prototype</strong>. RAK Khan Mover has no commercial rights, license, or legal authorization to this portal.
                        </p>
                    </div>

                    <div class="qm-marketing-box">
                        <span class="qm-agency-pill">🚀 Ready-Made Website For Sale</span>
                        <div class="qm-marketing-heading">Want This Website For Your Business?</div>
                        <p class="qm-marketing-desc">
                            This high-converting, responsive website was engineered by <strong>Quartermasters F.Z.C</strong>. It is ready for purchase, rebranding, and immediate deployment for any mover, transporter, or business in the UAE.
                        </p>

                        <div class="qm-direct-phone-box">
                            <span class="qm-direct-phone-label">Direct Developer WhatsApp & Call</span>
                            <a href="${DEVELOPER_WA_LINK}" target="_blank" class="qm-direct-phone-val">${DEVELOPER_PHONE}</a>
                        </div>

                        <div class="qm-cta-buttons">
                            <a href="${DEVELOPER_WA_LINK}" target="_blank" class="qm-btn qm-btn-whatsapp">
                                💬 WhatsApp Developer (+971 52 7529598)
                            </a>
                            <a href="tel:${DEVELOPER_TEL}" class="qm-btn qm-btn-call">
                                📞 Call +971 52 7529598 Directly
                            </a>
                        </div>
                    </div>
                </div>

                <div class="qm-footer-actions">
                    <span class="qm-agency-tag">Quartermasters F.Z.C &bull; UAE</span>
                    <button class="qm-btn-dismiss" id="qm-close-btn">Explore Sample Designs &rarr;</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeBtn = document.getElementById('qm-close-btn');
        closeBtn.addEventListener('click', () => {
            overlay.remove();
            showStickyBar();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                showStickyBar();
            }
        });
    }

    function showStickyBar() {
        if (document.getElementById('qm-sticky-bar')) return;
        const bar = document.createElement('div');
        bar.id = 'qm-sticky-bar';
        bar.innerHTML = `
            <div class="qm-sticky-left">
                <span class="qm-sticky-tag">Demo Prototype</span>
                <span>Website For Sale &bull; Developed by Quartermasters F.Z.C</span>
            </div>
            <div class="qm-sticky-right">
                <span style="font-weight: 600;">Direct: <a href="tel:${DEVELOPER_TEL}">${DEVELOPER_PHONE}</a></span>
                <a href="${DEVELOPER_WA_LINK}" target="_blank" class="qm-sticky-wa">💬 WhatsApp Developer</a>
            </div>
        `;
        document.body.insertBefore(bar, document.body.firstChild);
        document.body.style.paddingTop = (parseInt(window.getComputedStyle(document.body).paddingTop || 0) + 48) + 'px';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initNotice, 800));
    } else {
        setTimeout(initNotice, 800);
    }
})();
