/**
 * Theme Consistency Checker
 * This script checks if the theme is consistently applied across pages
 * and verifies that theme toggles work correctly after login
 */

// Auto-run diagnostics when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Log diagnostic information in the console
    console.log('=== THEME DIAGNOSTICS ===');
    console.log('Current route: ' + window.location.pathname);
    console.log('Current theme: ' + document.documentElement.getAttribute('data-bs-theme'));
    console.log('Theme in localStorage: ' + localStorage.getItem('theme'));
    
    // Check if theme toggle exists and is properly initialized
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('Theme toggle button found on page');
        // Check if the button has event listeners
        const events = getEventListeners(themeToggle);
        console.log('Theme toggle has these event listeners:', events);
    } else {
        console.error('Theme toggle button not found on this page!');
    }
    console.log('=== END DIAGNOSTICS ===');
});

// Helper function to get event listeners (works in Chrome DevTools)
function getEventListeners(element) {
    try {
        // This will only work in Chrome DevTools
        return window.getEventListeners ? window.getEventListeners(element) : 'Cannot inspect event listeners';
    } catch (e) {
        return 'Error inspecting event listeners';
    }
}

// Run this test in the browser console to verify theme functionality
function testThemeConsistency() {
    console.log("=== THEME CONSISTENCY CHECKER ===");
    
    // Get current theme
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    console.log(`Current theme: ${currentTheme}`);
    
    // Check localStorage
    const savedTheme = localStorage.getItem('theme');
    console.log(`Theme in localStorage: ${savedTheme}`);
    
    // Check if they match
    if (currentTheme === savedTheme) {
        console.log("✅ Theme consistency check PASSED: Document theme matches localStorage");
    } else {
        console.error("❌ Theme consistency check FAILED: Document theme doesn't match localStorage");
    }
    
    // Check if theme toggle exists
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log("✅ Theme toggle button exists");
        
        // Check if the icons match the current theme
        const lightIcon = document.getElementById('lightIcon');
        const darkIcon = document.getElementById('darkIcon');
        
        if (lightIcon && darkIcon) {
            const lightVisible = !lightIcon.classList.contains('d-none');
            const darkVisible = !darkIcon.classList.contains('d-none');
            
            if (currentTheme === 'dark' && darkVisible && !lightVisible) {
                console.log("✅ Icon state correct for dark theme");
            } else if (currentTheme === 'light' && lightVisible && !darkVisible) {
                console.log("✅ Icon state correct for light theme");
            } else {
                console.error("❌ Icon state doesn't match current theme");
            }
        }
        
        // Test toggle functionality
        console.log("Testing theme toggle...");
        console.log("(This will toggle your theme, please wait)");
        
        // Save initial state
        const initialTheme = currentTheme;
        
        // Click the toggle
        themeToggle.click();
        
        // Wait and check if theme changed
        setTimeout(() => {
            const newTheme = htmlElement.getAttribute('data-bs-theme');
            const newSavedTheme = localStorage.getItem('theme');
            
            console.log(`New theme after toggle: ${newTheme}`);
            console.log(`New theme in localStorage: ${newSavedTheme}`);
            
            if (newTheme !== initialTheme) {
                console.log("✅ Theme toggle changed the theme successfully");
            } else {
                console.error("❌ Theme toggle failed to change the theme");
            }
            
            if (newTheme === newSavedTheme) {
                console.log("✅ New theme was saved to localStorage correctly");
            } else {
                console.error("❌ New theme was not saved to localStorage correctly");
            }
            
            // Toggle back to original theme
            setTimeout(() => {
                themeToggle.click();
                console.log("Theme reset to original state");
                console.log("=== TEST COMPLETE ===");
            }, 1000);
        }, 500);
    } else {
        console.error("❌ Theme toggle button not found");
    }
}

// Function to add test button to the page
function addThemeTestButton() {
    const button = document.createElement('button');
    button.textContent = 'Test Theme Toggle';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.left = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '5px 10px';
    button.style.fontSize = '12px';
    button.style.backgroundColor = '#8A7CF8';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', testThemeConsistency);
    
    document.body.appendChild(button);
}

// Call this function in the browser console to add the test button:
// addThemeTestButton();
