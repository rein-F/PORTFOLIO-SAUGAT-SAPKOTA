document.addEventListener('DOMContentLoaded', () => {
    const smoothScrollTo = (selector) => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const link1 = document.getElementById('link1');
    const link2 = document.getElementById('link2');
    const link3 = document.getElementById('link3');

    if (link1) link1.addEventListener('click', (e) => { e.preventDefault(); smoothScrollTo('#projects'); });
    if (link2) link2.addEventListener('click', (e) => { e.preventDefault(); smoothScrollTo('#resume'); });
    if (link3) link3.addEventListener('click', (e) => { e.preventDefault(); smoothScrollTo('#about'); });

    const sourceCodeButtons = document.querySelectorAll('.project-btn-secondary');
    const sourceCodePopup = document.getElementById('sourceCodePopup');
    const closePopupButton = document.getElementById('closePopup');

    if (sourceCodePopup) {
        const openPopup = () => {
            sourceCodePopup.classList.add('show');
            sourceCodePopup.setAttribute('aria-hidden', 'false');
        };

        const closePopup = () => {
            sourceCodePopup.classList.remove('show');
            sourceCodePopup.setAttribute('aria-hidden', 'true');
        };

        sourceCodeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openPopup();
            });
        });

        if (closePopupButton) {
            closePopupButton.addEventListener('click', closePopup);
        }

        sourceCodePopup.addEventListener('click', (e) => {
            if (e.target === sourceCodePopup) closePopup();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sourceCodePopup.classList.contains('show')) {
                closePopup();
            }
        });
    }

    const experienceItems = document.querySelectorAll('.experience-item');
    const experienceTitle = document.querySelector('.experience-detail h3');
    const experienceRole = document.querySelector('.experience-role');
    const experienceSummary = document.querySelector('.experience-summary');

    if (experienceItems.length && experienceTitle && experienceRole && experienceSummary) {
        const setActiveExperience = (item) => {
            experienceItems.forEach((entry) => entry.classList.remove('active'));
            item.classList.add('active');

            experienceTitle.textContent = item.dataset.title || '';
            experienceRole.textContent = item.dataset.role || '';
            experienceSummary.textContent = item.dataset.summary || '';
        };

        experienceItems.forEach((item) => {
            item.addEventListener('click', () => setActiveExperience(item));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveExperience(item);
                }
            });
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach((el) => io.observe(el));
});
