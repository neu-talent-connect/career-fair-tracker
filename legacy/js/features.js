// Application cycle tracking and utilities

// Application cycles - generic seasons that work for any school

// Get available application cycles
function getApplicationCycles() {
    const cycles = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const seasons = ['Spring', 'Summer', 'Fall'];
    
    // Generate next 6 cycles (2 years)
    for (let yearOffset = 0; yearOffset < 2; yearOffset++) {
        seasons.forEach(season => {
            cycles.push(`${season} ${currentYear + yearOffset}`);
        });
    }
    
    return cycles;
}

// Load sample applications for demonstration
function loadSampleData() {
    if (data.jobs.length > 0) {
        const confirmed = confirm('This will add 3 sample applications. Continue?');
        if (!confirmed) return;
    }
    
    const samples = [
        {
            id: Date.now(),
            company: 'Google',
            title: 'Software Engineer Intern',
            status: 'Submitted',
            deadline: '2025-02-01',
            dateApplied: '2025-01-15',
            interest: '5',
            notes: 'Really excited about this one!',
            dateAdded: new Date().toISOString()
        },
        {
            id: Date.now() + 1,
            company: 'Microsoft',
            title: 'Data Analyst Intern',
            status: 'In Progress',
            deadline: '2025-02-15',
            dateApplied: '',
            interest: '4',
            notes: 'Need to finish cover letter',
            dateAdded: new Date().toISOString()
        },
        {
            id: Date.now() + 2,
            company: 'Local Startup',
            title: 'Product Manager Intern',
            status: 'Interview',
            deadline: '2025-01-30',
            dateApplied: '2025-01-10',
            interest: '3',
            notes: 'Interview scheduled for next week',
            dateAdded: new Date().toISOString()
        }
    ];
    
    data.jobs.push(...samples);
    saveData();
    updateAllTables();
    alert('✓ Sample data loaded! Check the Dashboard to see example applications.');
}

