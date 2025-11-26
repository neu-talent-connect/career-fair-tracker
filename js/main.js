/**
 * Main Application Initialization
 * Entry point for the application
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeCustomizationSidebar();
    populateJobFormDropdowns();
    console.log('Job / Co-op Tracker initialized successfully');
});

// Repopulate dropdowns when switching to jobs tab (in case contacts were added)
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Refresh dropdowns when opening jobs tab
    if (tabName === 'jobs') {
        populateJobFormDropdowns();
    }
}

