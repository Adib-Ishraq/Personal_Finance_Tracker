/**
 * Global Theme Manager
 * This file handles theme functionality independently and is loaded before responsive.js
 * It ensures theme switching works on all routes regardless of other script loading
 */

// Immediately initialize theme based on saved preference or system preference
(function() {
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        console.log(`Theme initialized from localStorage: ${savedTheme}`);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-bs-theme', initialTheme);
        console.log(`Theme initialized from system preference: ${initialTheme}`);
    }
})();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
});

// Initialize theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('Theme toggle button not found in the DOM');
        return;
    }
    
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');
    const htmlElement = document.documentElement;
    
    // First ensure icon state matches current theme
    updateThemeIcons();
    
    // Add click event listener
    themeToggle.addEventListener('click', function(e) {
        // Prevent default navigation if it's an anchor
        e.preventDefault();
        
        // Toggle theme
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        setTheme(newTheme);
        
        console.log(`Theme manually toggled to: ${newTheme} (Route: ${window.location.pathname})`);
    });
    
    // Log successful initialization
    console.log(`Theme toggle initialized successfully (Route: ${window.location.pathname})`);
}

// Update theme icons based on current theme
function updateThemeIcons() {
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    
    if (lightIcon && darkIcon) {
        if (currentTheme === 'dark') {
            lightIcon.classList.add('d-none');
            darkIcon.classList.remove('d-none');
        } else {
            lightIcon.classList.remove('d-none');
            darkIcon.classList.add('d-none');
        }
    }
}

// Set theme and update UI
function setTheme(theme) {
    const htmlElement = document.documentElement;
    
    // Update data attribute
    htmlElement.setAttribute('data-bs-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update icons
    updateThemeIcons();
    
    // Update status indicator if it exists
    const themeStatus = document.getElementById('theme-status');
    const themeModeText = document.getElementById('theme-mode-text');
    
    if (themeStatus && themeModeText) {
        themeModeText.textContent = theme === 'dark' ? 'Dark Mode Enabled' : 'Light Mode Enabled';
        themeStatus.style.display = 'block';
        themeStatus.style.backgroundColor = theme === 'dark' ? '#333' : '#f8f9fa';
        themeStatus.style.color = theme === 'dark' ? '#fff' : '#333';
        
        setTimeout(function() {
            themeStatus.style.display = 'none';
        }, 1500);
    }
    
    // Update any charts if they exist
    updateChartsForTheme(theme);
}

// Update Chart.js charts when theme changes
function updateChartsForTheme(theme) {
    if (typeof Chart !== 'undefined' && Chart.instances) {
        if (theme === 'dark') {
            Chart.defaults.color = '#E8EAED';
            Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
            
            // Update all active charts
            Chart.instances.forEach(chart => {
                if (chart.options && chart.options.scales) {
                    if (chart.options.scales.x) {
                        chart.options.scales.x.grid.color = 'rgba(255, 255, 255, 0.15)';
                        if (chart.options.scales.x.ticks) {
                            chart.options.scales.x.ticks.color = '#E8EAED';
                        }
                    }
                    if (chart.options.scales.y) {
                        chart.options.scales.y.grid.color = 'rgba(255, 255, 255, 0.15)';
                        if (chart.options.scales.y.ticks) {
                            chart.options.scales.y.ticks.color = '#E8EAED';
                        }
                    }
                }
                chart.update();
            });
        } else {
            Chart.defaults.color = '#666';
            Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.1)';
            
            // Update all active charts
            Chart.instances.forEach(chart => {
                if (chart.options && chart.options.scales) {
                    if (chart.options.scales.x) {
                        chart.options.scales.x.grid.color = 'rgba(0, 0, 0, 0.1)';
                        if (chart.options.scales.x.ticks) {
                            chart.options.scales.x.ticks.color = '#666';
                        }
                    }
                    if (chart.options.scales.y) {
                        chart.options.scales.y.grid.color = 'rgba(0, 0, 0, 0.1)';
                        if (chart.options.scales.y.ticks) {
                            chart.options.scales.y.ticks.color = '#666';
                        }
                    }
                }
                chart.update();
            });
        }
    }
}
