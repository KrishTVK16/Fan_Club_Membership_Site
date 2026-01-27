/**
 * Dashboard & Admin Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    // Toggle Sidebar
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
        });
    }

    // Setup Analytics Charts Placeholder
    // This assumes Chart.js is loaded
    const ctx = document.getElementById('analyticsChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 3000, 5000, 2000, 30000],
                    borderWidth: 2,
                    borderColor: '#0B2447',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
