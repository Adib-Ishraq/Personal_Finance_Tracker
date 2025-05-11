// Finance Tracker - Theme and Responsiveness Manager
// Note: Theme initialization is now handled by global-theme.js

// Mobile detection and responsive helpers
const FinanceApp = {
    // Check if device is mobile
    isMobile: function() {
        return window.innerWidth < 768;
    },
    
    // Apply mobile-specific adjustments
    applyMobileStyles: function() {
        if (this.isMobile()) {
            // Add mobile-specific classes to elements
            document.querySelectorAll('.desktop-optimized').forEach(el => {
                el.classList.add('mobile-optimized');
            });
            
            // Adjust chart options for better mobile display
            if (typeof Chart !== 'undefined') {
                Chart.defaults.font.size = 10;
                Chart.defaults.plugins.legend.position = 'bottom';
            }
        } else {
            // Reset to desktop styles
            document.querySelectorAll('.mobile-optimized').forEach(el => {
                el.classList.remove('mobile-optimized');
            });
            
            // Reset chart options for desktop
            if (typeof Chart !== 'undefined') {
                Chart.defaults.font.size = 12;
                Chart.defaults.plugins.legend.position = 'right';
            }
        }
    },
    
    // Initialize responsive behaviors
    initResponsive: function() {
        // Apply initial styles
        this.applyMobileStyles();
        
        // Listen for window resize
        window.addEventListener('resize', () => {
            this.applyMobileStyles();
        });
        
        // Make tables responsive
        this.makeTablesResponsive();
    },
    
    // Theme management functions - now mostly delegated to global-theme.js
    themeManager: {
        // Initialize theme functionality
        init: function() {
            console.log("FinanceApp.themeManager initialized - using global-theme.js for most functionality");
            
            // This is kept for backward compatibility
            if (typeof updateChartsForTheme === 'function') {
                // Use the global function if available
                this.updateChartColors = function(theme) {
                    updateChartsForTheme(theme);
                };
            }
        },
        
        // Set theme and update UI - now mostly handled by global-theme.js
        setTheme: function(theme) {
            console.log("FinanceApp.themeManager.setTheme called with theme:", theme);
            // Use the global function if available
            if (typeof setTheme === 'function') {
                setTheme(theme);
            } else {
                // Fallback implementation
                const htmlElement = document.documentElement;
                htmlElement.setAttribute('data-bs-theme', theme);
                localStorage.setItem('theme', theme);
                
                // Update chart colors
                this.updateChartColors(theme);
            }
        },
        
        // Adjust chart colors based on theme - kept for backward compatibility
        updateChartColors: function(theme) {
            if (typeof Chart === 'undefined') return;
            
            if (theme === 'dark') {
                Chart.defaults.color = '#E8EAED';
                Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.15)';
                
                // Update all active charts
                if (Chart.instances) {
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
                }
            } else {
                Chart.defaults.color = '#666';
                Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.1)';
                
                // Update all active charts
                if (Chart.instances) {
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
    },
    
    // Make tables responsive
    makeTablesResponsive: function() {
        const tables = document.querySelectorAll('.table-responsive-custom');
        tables.forEach(table => {
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
            
            // Add data attributes to cells for responsive display
            table.querySelectorAll('tbody tr').forEach(row => {
                Array.from(row.querySelectorAll('td')).forEach((cell, i) => {
                    if (headers[i]) {
                        cell.setAttribute('data-label', headers[i]);
                    }
                });
            });
        });
    }
};

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Finance Tracker: Initializing application...');
    
    // Initialize responsive features
    FinanceApp.initResponsive();
    
    // Initialize theme management
    FinanceApp.themeManager.init();
    
    // Check goal reminders if function exists
    if (typeof checkGoalReminders === 'function') {
        setTimeout(() => {
            checkGoalReminders();
        }, 1000);
    }
});
