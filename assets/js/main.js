/**
 * Main Helpers & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn?.querySelector('i');

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        // Update Icon
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
        }
    }

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Toggle Event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.remove('shadow-sm');
            }
        });
    }

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Premium Dropdown Interactivity (Hover + Animation)
    // We inject a local style to handle the animation and visibility without touching style.css
    const dropdownStyle = document.createElement('style');
    dropdownStyle.innerHTML = `
        @media (min-width: 992px) {
            /* Force visibility for the header and containers on desktop */
            .navbar, 
            .navbar .container-header-footer, 
            .navbar .offcanvas, 
            .navbar .offcanvas-body {
                overflow: visible !important;
            }

            .navbar .dropdown-menu {
                display: block;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 9999 !important; /* Extremely high z-index */
            }
            .navbar .nav-item.dropdown:hover > .dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
            }
            
            /* Ensure the navbar itself stays on top */
            .navbar.fixed-top {
                z-index: 1050 !important;
            }
        }
    `;
    document.head.appendChild(dropdownStyle);

    // Bootstrap fallback/enhancement for hover
    const customDropdowns = document.querySelectorAll('.navbar .nav-item.dropdown');
    customDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        // Prevent click navigation if just hovering, but allow click on mobile
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth >= 992) {
                // If it's a real link, we might want to follow it, 
                // but usually dropdown-toggles are # or click-triggers.
                // Keeping default for now.
            }
        });
    });
});
