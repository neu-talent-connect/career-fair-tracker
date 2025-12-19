// Batch actions - select multiple rows and perform bulk operations

// Track which rows are selected
let selectedRows = new Set();

// Toggle single row selection
function toggleRowSelection(jobId) {
    if (selectedRows.has(jobId)) {
        selectedRows.delete(jobId);
    } else {
        selectedRows.add(jobId);
    }
    
    updateBatchActionsBar();
    updateCheckboxStates();
}

// Select/deselect all visible rows
function toggleAllRows() {
    const allCheckbox = document.getElementById('selectAllCheckbox');
    
    if (allCheckbox && allCheckbox.checked) {
        // Select all visible jobs
        const visibleJobs = getFilteredJobs();
        visibleJobs.forEach(job => selectedRows.add(job.id));
    } else {
        // Deselect all
        selectedRows.clear();
    }
    
    updateBatchActionsBar();
    updateCheckboxStates();
}

// Update checkboxes to match current selection
function updateCheckboxStates() {
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
        const jobId = parseInt(checkbox.dataset.jobId);
        checkbox.checked = selectedRows.has(jobId);
    });
    
    const allCheckbox = document.getElementById('selectAllCheckbox');
    if (allCheckbox) {
        const visibleJobs = getFilteredJobs();
        allCheckbox.checked = visibleJobs.length > 0 && 
            visibleJobs.every(job => selectedRows.has(job.id));
    }
}

/**
 * Update batch actions bar visibility and count
 */
function updateBatchActionsBar() {
    const bar = document.getElementById('batchActionsBar');
    const info = document.getElementById('batchInfo');
    
    if (bar && info) {
        if (selectedRows.size > 0) {
            bar.classList.add('show');
            info.textContent = `${selectedRows.size} selected`;
        } else {
            bar.classList.remove('show');
        }
    }
}

/**
 * Batch update status
 */
function batchUpdateStatus(newStatus) {
    if (selectedRows.size === 0) return;
    
    if (confirm(`Update ${selectedRows.size} application(s) to "${newStatus}"?`)) {
        selectedRows.forEach(jobId => {
            const job = data.jobs.find(j => j.id === jobId);
            if (job) {
                job.status = newStatus;
            }
        });
        
        saveData();
        selectedRows.clear();
        updateBatchActionsBar();
        updateSpreadsheetTable();
        updateJobsTable();
    }
}

/**
 * Batch delete applications
 */
function batchDelete() {
    if (selectedRows.size === 0) return;
    
    if (confirm(`Delete ${selectedRows.size} application(s)? This cannot be undone.`)) {
        data.jobs = data.jobs.filter(job => !selectedRows.has(job.id));
        
        saveData();
        selectedRows.clear();
        updateBatchActionsBar();
        updateSpreadsheetTable();
        updateJobsTable();
    }
}

/**
 * Batch archive (set to rejected)
 */
function batchArchive() {
    batchUpdateStatus('Rejected');
}

/**
 * Batch export to CSV
 */
function batchExport() {
    if (selectedRows.size === 0) return;
    
    const selectedJobs = data.jobs.filter(job => selectedRows.has(job.id));
    
    // Create CSV content
    const headers = ['Company', 'Position', 'Status', 'Date Posted', 'Date Applied', 'Deadline', 'Contact', 'Email', 'Phone', 'Location', 'Salary', 'Resume', 'Cover Letter', 'Notes'];
    const csvContent = [
        headers.join(','),
        ...selectedJobs.map(job => [
            job.company,
            job.title,
            job.status,
            job.datePosted || '',
            job.dateApplied || '',
            job.deadline || '',
            job.contactPerson || '',
            job.contactEmail || '',
            job.contactPhone || '',
            job.location || '',
            job.salary || '',
            job.resume || '',
            job.coverLetter || '',
            (job.notes || '').replace(/,/g, ';')
        ].map(field => `"${field}"`).join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

/**
 * Clear selection
 */
function clearSelection() {
    selectedRows.clear();
    updateBatchActionsBar();
    updateCheckboxStates();
}

