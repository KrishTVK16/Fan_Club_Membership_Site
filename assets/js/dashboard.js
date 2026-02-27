/**
 * Dashboard & Admin Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Elements
    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    
    /**
     * Toggles the sidebar state and manages backdrop on mobile
     */
    function toggleSidebar(e) {
        if (e) e.preventDefault();
        
        document.body.classList.toggle('sb-sidenav-toggled');
        
        // Manage backdrop for mobile (< 768px)
        if (window.innerWidth < 768) {
            let backdrop = document.querySelector('.sidebar-backdrop');
            
            if (document.body.classList.contains('sb-sidenav-toggled')) {
                // Open: Create backdrop if not exists
                if (!backdrop) {
                    backdrop = document.createElement('div');
                    backdrop.className = 'sidebar-backdrop';
                    document.body.appendChild(backdrop);
                    
                    // Allow CSS transition to kick in
                    requestAnimationFrame(() => {
                        backdrop.style.opacity = '1';
                        backdrop.style.visibility = 'visible';
                    });

                    // Close sidebar on clicking backdrop
                    backdrop.addEventListener('click', toggleSidebar);
                }
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            } else {
                // Close: Fade out and remove backdrop
                if (backdrop) {
                    backdrop.style.opacity = '0';
                    backdrop.style.visibility = 'hidden';
                    setTimeout(() => {
                        if (backdrop.parentNode) {
                            backdrop.parentNode.removeChild(backdrop);
                        }
                    }, 300);
                }
                // Restore body scroll
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Bind Toggle Events
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', toggleSidebar);
    }

    // Auto-close sidebar on window resize if switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            if (document.body.classList.contains('sb-sidenav-toggled') && !document.querySelector('.sidebar-backdrop')) {
                // On desktop, toggled mean HIDDEN. We might want to keep that.
            } else {
                // Remove mobile artifacts
                const backdrop = document.querySelector('.sidebar-backdrop');
                if (backdrop) backdrop.remove();
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Setup Analytics Charts Placeholder
    const ctx = document.getElementById('analyticsChart');
    if (ctx && typeof Chart !== 'undefined') {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        const color = isDark ? '#94A3B8' : '#7A634E';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Engagement Rate',
                    data: [65, 59, 80, 81, 56, 85, 95],
                    fill: true,
                    backgroundColor: 'rgba(198, 123, 63, 0.1)',
                    borderColor: '#C67B3F',
                    pointBackgroundColor: '#C67B3F',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#C67B3F',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { color: color }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: color }
                    }
                }
            }
        });
    }
});

