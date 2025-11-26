/**
 * Advanced Features Module
 * Application templates, interview checklists, co-op cycles, networking
 */

// ============================================
// APPLICATION TEMPLATES
// ============================================

const JOB_TEMPLATES = {
    swe: {
        name: 'Software Engineering Co-op',
        defaults: {
            resume: 'Tailored',
            coverLetter: 'Required',
            salary: '$25-35/hour',
            notes: 'Technical interview prep: Data structures, algorithms, system design'
        }
    },
    data: {
        name: 'Data Science Co-op',
        defaults: {
            resume: 'Tailored',
            coverLetter: 'Required',
            salary: '$25-33/hour',
            notes: 'Prepare: Python, SQL, statistics, ML concepts'
        }
    },
    startup: {
        name: 'Startup Position',
        defaults: {
            resume: 'Standard',
            coverLetter: 'Optional',
            salary: '$20-30/hour + equity',
            notes: 'Emphasize: Flexibility, fast learning, scrappy attitude'
        }
    },
    research: {
        name: 'Research Position',
        defaults: {
            resume: 'Tailored',
            coverLetter: 'Required',
            salary: '$18-25/hour',
            notes: 'Highlight: Research experience, publications, academic projects'
        }
    },
    consulting: {
        name: 'Consulting Co-op',
        defaults: {
            resume: 'Tailored',
            coverLetter: 'Required',
            salary: '$30-40/hour',
            notes: 'Prepare: Case interviews, business analysis, presentation skills'
        }
    },
    design: {
        name: 'UX/Design Co-op',
        defaults: {
            resume: 'Standard',
            coverLetter: 'Optional',
            salary: '$23-32/hour',
            notes: 'Portfolio required. Prepare: Design thinking process, tools (Figma, Adobe)'
        }
    }
};

/**
 * Apply job template
 */
function applyJobTemplate(templateKey) {
    const template = JOB_TEMPLATES[templateKey];
    if (!template) return;
    
    // Apply defaults to form
    if (document.getElementById('jobResume')) {
        document.getElementById('jobResume').value = template.defaults.resume;
    }
    if (document.getElementById('jobCoverLetter')) {
        document.getElementById('jobCoverLetter').value = template.defaults.coverLetter;
    }
    if (document.getElementById('jobSalary')) {
        document.getElementById('jobSalary').value = template.defaults.salary;
    }
    if (document.getElementById('jobNotes')) {
        const notesField = document.getElementById('jobNotes');
        notesField.value = template.defaults.notes;
        // Visual feedback
        notesField.style.background = '#fff5f5';
        setTimeout(() => {
            notesField.style.background = '';
        }, 1000);
    }
}

// ============================================
// INTERVIEW PREP CHECKLIST
// ============================================

const DEFAULT_INTERVIEW_CHECKLIST = [
    { id: 1, task: 'Research company (30 min)', completed: false },
    { id: 2, task: 'Review job description thoroughly', completed: false },
    { id: 3, task: 'Prepare 3-5 STAR stories', completed: false },
    { id: 4, task: 'Prepare questions to ask (5+)', completed: false },
    { id: 5, task: 'Test Zoom/tech setup', completed: false },
    { id: 6, task: 'Plan professional outfit', completed: false },
    { id: 7, task: 'Print extra copies of resume', completed: false },
    { id: 8, task: 'Send thank you email (after interview)', completed: false }
];

/**
 * Initialize interview checklist for a job
 */
function initializeInterviewChecklist(jobId) {
    const job = data.jobs.find(j => j.id === jobId);
    if (!job) return;
    
    if (!job.interviewChecklist) {
        job.interviewChecklist = JSON.parse(JSON.stringify(DEFAULT_INTERVIEW_CHECKLIST));
        saveData();
    }
    
    // Show notification
    showNotification('Interview Prep Checklist Created! 📋', 'Check the Jobs tab for your prep checklist');
}

/**
 * Toggle checklist item
 */
function toggleChecklistItem(jobId, itemId) {
    const job = data.jobs.find(j => j.id === jobId);
    if (!job || !job.interviewChecklist) return;
    
    const item = job.interviewChecklist.find(i => i.id === itemId);
    if (item) {
        item.completed = !item.completed;
        saveData();
        updateJobsTable();
    }
}

/**
 * Show notification
 */
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 24px;
        background: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 350px;
        border-left: 4px solid var(--northeastern-red);
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 600; color: var(--northeastern-black); margin-bottom: 4px;">${title}</div>
        <div style="font-size: 14px; color: #666;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// CO-OP CYCLE TRACKER
// ============================================

/**
 * Get available co-op cycles
 */
function getCoopCycles() {
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

/**
 * Get cycle proximity (how far away)
 */
function getCycleProximity(cycle) {
    if (!cycle) return null;
    
    const [season, year] = cycle.split(' ');
    const cycleYear = parseInt(year);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Approximate start months
    const seasonMonths = {
        'Spring': 0,  // January
        'Summer': 4,  // May
        'Fall': 8     // September
    };
    
    const cycleStartMonth = seasonMonths[season];
    const cycleDate = new Date(cycleYear, cycleStartMonth, 1);
    
    const diffMonths = (cycleDate.getFullYear() - currentYear) * 12 + (cycleDate.getMonth() - currentMonth);
    
    if (diffMonths < 0) return 'past';
    if (diffMonths <= 3) return 'imminent';
    if (diffMonths <= 6) return 'upcoming';
    return 'future';
}

// ============================================
// NETWORKING LINKS
// ============================================

/**
 * Get contacts for dropdown
 */
function getContactsDropdownHTML() {
    if (data.contacts.length === 0) {
        return '<option value="">No contacts yet</option>';
    }
    
    return '<option value="">No contact</option>' +
        data.contacts.map(contact => 
            `<option value="${contact.id}">${contact.name} (${contact.company || 'No company'})</option>`
        ).join('');
}

/**
 * Link job to contact
 */
function linkJobToContact(jobId, contactId) {
    const job = data.jobs.find(j => j.id === jobId);
    if (!job) return;
    
    job.linkedContactId = contactId ? parseInt(contactId) : null;
    saveData();
    updateJobsTable();
    updateSpreadsheetTable();
}

/**
 * Get linked contact info
 */
function getLinkedContact(jobId) {
    const job = data.jobs.find(j => j.id === jobId);
    if (!job || !job.linkedContactId) return null;
    
    return data.contacts.find(c => c.id === job.linkedContactId);
}

/**
 * Check if application is warm (has contact)
 */
function isWarmApplication(jobId) {
    return !!getLinkedContact(jobId);
}

