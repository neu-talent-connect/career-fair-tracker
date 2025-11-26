/**
 * Data Storage and Persistence Module
 * Handles localStorage operations and data structure
 */

// Global data structure
let data = {
    companies: [],
    contacts: [],
    jobs: [],
    followups: [],
    interviews: []
};

/**
 * Load data from localStorage
 */
function loadData() {
    const saved = localStorage.getItem('careerFairData');
    if (saved) {
        try {
            data = JSON.parse(saved);
            updateAllTables();
            updateDashboard();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}

/**
 * Save data to localStorage
 */
function saveData() {
    try {
        localStorage.setItem('careerFairData', JSON.stringify(data));
        updateDashboard();
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data. Please check your browser storage settings.');
    }
}

/**
 * Delete an item from any collection
 */
function deleteItem(type, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        data[type] = data[type].filter(item => item.id !== id);
        saveData();
        updateAllTables();
    }
}

/**
 * Update all tables at once
 */
function updateAllTables() {
    updateCompaniesTable();
    updateContactsTable();
    updateJobsTable();
    updateFollowUpsTable();
    updateInterviewsTable();
}

