// Data storage - handles saving/loading from localStorage

// Global data structure
let data = {
    companies: [],
    contacts: [],
    jobs: [],
    followups: [],
    interviews: []
};

// Load saved data from browser storage
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

// Save data to browser storage
function saveData() {
    try {
        localStorage.setItem('careerFairData', JSON.stringify(data));
        updateDashboard();
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data. Please check your browser storage settings.');
    }
}

// Delete item with confirmation
function deleteItem(type, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        data[type] = data[type].filter(item => item.id !== id);
        saveData();
        updateAllTables();
    }
}

// Refresh all tables
function updateAllTables() {
    updateCompaniesTable();
    updateContactsTable();
    updateJobsTable();
    updateFollowUpsTable();
}

