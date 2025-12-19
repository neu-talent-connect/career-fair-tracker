// Utility functions

// Set date input to today
function setToday(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        input.value = `${year}-${month}-${day}`;
    }
}

// Set datetime to now
function setTodayTime(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        input.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}

// Copy email template to clipboard
function copyTemplate(button) {
    const template = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(template).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(error => {
        console.error('Failed to copy:', error);
        alert('Failed to copy template. Please select and copy manually.');
    });
}

// Hide the getting started banner
function dismissGettingStarted() {
    const banner = document.getElementById('gettingStartedBanner');
    if (banner) {
        banner.style.display = 'none';
        localStorage.setItem('gettingStartedDismissed', 'true');
    }
}

// Show banner if user hasn't dismissed it and has no jobs yet
function checkGettingStartedBanner() {
    const dismissed = localStorage.getItem('gettingStartedDismissed');
    const banner = document.getElementById('gettingStartedBanner');
    
    // Only show if not dismissed AND there are no jobs yet
    if (!dismissed && data.jobs.length === 0 && banner) {
        banner.style.display = 'flex';
    }
}

// Export applications to CSV
function exportToCSV() {
    if (data.jobs.length === 0) {
        alert('No applications to export yet!');
        return;
    }
    
    // CSV headers
    const headers = ['Company', 'Position', 'Status', 'Interest', 'Date Applied', 'Deadline', 
                     'Application Cycle', 'Location', 'Salary', 'Contact Person', 'Contact Email', 
                     'Contact Phone', 'Resume', 'Cover Letter', 'Job URL', 'Notes'];
    
    // Build CSV content
    let csvContent = headers.join(',') + '\n';
    
    data.jobs.forEach(job => {
        const row = [
            `"${job.company || ''}"`,
            `"${job.title || ''}"`,
            `"${job.status || ''}"`,
            job.interest || '',
            job.dateApplied || '',
            job.deadline || '',
            `"${job.applicationCycle || ''}"`,
            `"${job.location || ''}"`,
            `"${job.salary || ''}"`,
            `"${job.contactPerson || ''}"`,
            `"${job.contactEmail || ''}"`,
            `"${job.contactPhone || ''}"`,
            `"${job.resume || ''}"`,
            `"${job.coverLetter || ''}"`,
            `"${job.url || ''}"`,
            `"${(job.notes || '').replace(/"/g, '""')}"` // Escape quotes in notes
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`✓ Exported ${data.jobs.length} applications to CSV`);
}

