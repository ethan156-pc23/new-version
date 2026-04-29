window.addEventListener('load', function () {

    // ── EmailJS ────────────────────────────────────────────
    if (typeof emailjs !== 'undefined') {
        emailjs.init('OBXOzQS9D9kaZjRsp');
    }

    const btnSend  = document.getElementById('btn-send');
    const statusEl = document.getElementById('form-status');

    if (btnSend && statusEl) {
        btnSend.addEventListener('click', function () {
            const name    = document.getElementById('from_name').value.trim();
            const email   = document.getElementById('from_email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showStatus('Please fill in all fields.', 'error'); return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showStatus('Please enter a valid email address.', 'error'); return;
            }

            btnSend.disabled = true;
            btnSend.textContent = 'Sending...';

            emailjs.send('service_mtk2vmr', 'template_kol7rxp', {
                from_name: name, from_email: email, message: message
            })
            .then(function () {
                showStatus('✓ Message sent! I\'ll get back to you soon.', 'success');
                document.getElementById('from_name').value  = '';
                document.getElementById('from_email').value = '';
                document.getElementById('message').value    = '';
                btnSend.textContent = 'Send Message →';
                btnSend.disabled = false;
            })
            .catch(function (err) {
                console.error('EmailJS error:', err);
                showStatus('Something went wrong. Please try again.', 'error');
                btnSend.textContent = 'Send Message →';
                btnSend.disabled = false;
            });
        });
    }

    function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = 'form-status ' + type;
        setTimeout(function () {
            statusEl.textContent = '';
            statusEl.className = 'form-status';
        }, 5000);
    }

    // ── Custom Cursor ──────────────────────────────────────
    var cursor = document.getElementById('cursor');
    var ring   = document.getElementById('cursorRing');
    var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cursor.style.width  = '20px'; cursor.style.height = '20px';
            ring.style.width    = '50px'; ring.style.height   = '50px';
            ring.style.borderColor = 'var(--accent3)';
        });
        el.addEventListener('mouseleave', function () {
            cursor.style.width  = '10px'; cursor.style.height = '10px';
            ring.style.width    = '36px'; ring.style.height   = '36px';
            ring.style.borderColor = 'var(--accent)';
        });
    });

    // ── Skill Bars (trigger on scroll) ────────────────────
    var skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var bar = entry.target.querySelector('.skill-bar-fill');
                if (bar) setTimeout(function () {
                    bar.style.width = bar.dataset.width + '%';
                }, 300);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(function (c) {
        skillObserver.observe(c);
    });

    // ── Parallax Orbs ──────────────────────────────────────
    var orb1 = document.querySelector('.orb-1');
    var orb2 = document.querySelector('.orb-2');
    if (orb1 && orb2) {
        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth  - 0.5) * 30;
            var y = (e.clientY / window.innerHeight - 0.5) * 30;
            orb1.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            orb2.style.transform = 'translate(' + (-x * 0.7) + 'px, ' + (-y * 0.7) + 'px)';
        });
    }

});