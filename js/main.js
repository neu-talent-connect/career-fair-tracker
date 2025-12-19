// Main app initialization - runs when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeCustomizationSidebar();
    populateJobFormDropdowns();
    populateDashboardFilters();
    checkGettingStartedBanner();
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
    
    // Refresh filters when opening dashboard
    if (tabName === 'dashboard') {
        populateDashboardFilters();
    }
}

// Populate filter dropdowns with application cycles
function populateDashboardFilters() {
    // Populate application cycle filter
    const applicationCycleFilter = document.getElementById('filterApplicationCycle');
    if (applicationCycleFilter) {
        const cycles = getApplicationCycles();
        applicationCycleFilter.innerHTML = '<option value="">All Application Cycles</option>' +
            cycles.map(cycle => `<option value="${cycle}">${cycle}</option>`).join('');
    }
}

