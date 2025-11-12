/**
 * Career Fair Tracking System - Main Application Logic
 * 
 * Features:
 * - Company tracking with interest levels
 * - Contact management
 * - Job application tracking
 * - Follow-up reminders
 * - Interview scheduling
 * - Email templates
 * - Inline editing for all fields
 */

// ============================================
// DATA STORAGE
// ============================================
let data = {
    companies: [],
    contacts: [],
    jobs: [],
    followups: [],
    interviews: []
};

// ============================================
// DATA PERSISTENCE (localStorage)
// ============================================

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

// ============================================
// UI NAVIGATION
// ============================================

/**
 * Switch between tabs
 * @param {string} tabName - The ID of the tab to show
 */
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ============================================
// COMPANY MANAGEMENT
// ============================================

/**
 * Add a new company to the tracker
 */
function addCompany() {
    const company = {
        id: Date.now(),
        name: document.getElementById('companyName').value.trim(),
        industry: document.getElementById('companyIndustry').value,
        interest: document.getElementById('companyInterest').value,
        booth: document.getElementById('companyBooth').value.trim(),
        recruiter: document.getElementById('companyRecruiter').value.trim(),
        position: document.getElementById('companyPosition').value.trim(),
        opt: document.getElementById('companyOPT').value,
        deadline: document.getElementById('companyDeadline').value,
        notes: document.getElementById('companyNotes').value.trim(),
        dateAdded: new Date().toISOString()
    };
    
    if (!company.name) {
        alert('Please enter a company name');
        return;
    }
    
    data.companies.push(company);
    saveData();
    updateCompaniesTable();
    
    // Clear form
    document.getElementById('companyName').value = '';
    document.getElementById('companyIndustry').value = '';
    document.getElementById('companyBooth').value = '';
    document.getElementById('companyRecruiter').value = '';
    document.getElementById('companyPosition').value = '';
    document.getElementById('companyOPT').value = '';
    document.getElementById('companyDeadline').value = '';
    document.getElementById('companyNotes').value = '';
}

// ============================================
// CONTACT MANAGEMENT
// ============================================

/**
 * Add a new contact
 */
function addContact() {
    const contact = {
        id: Date.now(),
        name: document.getElementById('contactName').value.trim(),
        company: document.getElementById('contactCompany').value.trim(),
        position: document.getElementById('contactPosition').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        linkedin: document.getElementById('contactLinkedIn').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        type: document.getElementById('contactType').value,
        strength: document.getElementById('contactStrength').value,
        notes: document.getElementById('contactNotes').value.trim(),
        dateAdded: new Date().toISOString()
    };
    
    if (!contact.name) {
        alert('Please enter a contact name');
        return;
    }
    
    data.contacts.push(contact);
    saveData();
    updateContactsTable();
    
    // Clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactCompany').value = '';
    document.getElementById('contactPosition').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactLinkedIn').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactNotes').value = '';
}

// ============================================
// JOB APPLICATION MANAGEMENT
// ============================================

/**
 * Add a new job application
 */
function addJob() {
    const job = {
        id: Date.now(),
        company: document.getElementById('jobCompany').value.trim(),
        title: document.getElementById('jobTitle').value.trim(),
        jobId: document.getElementById('jobId').value.trim(),
        location: document.getElementById('jobLocation').value.trim(),
        status: document.getElementById('jobStatus').value,
        dateApplied: document.getElementById('jobDateApplied').value,
        deadline: document.getElementById('jobDeadline').value,
        salary: document.getElementById('jobSalary').value.trim(),
        interest: document.getElementById('jobInterest').value,
        url: document.getElementById('jobUrl').value.trim(),
        dateAdded: new Date().toISOString()
    };
    
    if (!job.company || !job.title) {
        alert('Please enter company and position title');
        return;
    }
    
    data.jobs.push(job);
    saveData();
    updateJobsTable();
    
    // Clear form
    document.getElementById('jobCompany').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('jobId').value = '';
    document.getElementById('jobLocation').value = '';
    document.getElementById('jobDateApplied').value = '';
    document.getElementById('jobDeadline').value = '';
    document.getElementById('jobSalary').value = '';
    document.getElementById('jobUrl').value = '';
}

// ============================================
// FOLLOW-UP MANAGEMENT
// ============================================

/**
 * Add a new follow-up task
 */
function addFollowUp() {
    const followup = {
        id: Date.now(),
        company: document.getElementById('followupCompany').value.trim(),
        contact: document.getElementById('followupContact').value.trim(),
        type: document.getElementById('followupType').value,
        dueDate: document.getElementById('followupDate').value,
        priority: document.getElementById('followupPriority').value,
        status: document.getElementById('followupStatus').value,
        dateAdded: new Date().toISOString()
    };
    
    if (!followup.company || !followup.dueDate) {
        alert('Please enter company and due date');
        return;
    }
    
    data.followups.push(followup);
    saveData();
    updateFollowUpsTable();
    
    // Clear form
    document.getElementById('followupCompany').value = '';
    document.getElementById('followupContact').value = '';
    document.getElementById('followupDate').value = '';
}

// ============================================
// INTERVIEW MANAGEMENT
// ============================================

/**
 * Add a new interview
 */
function addInterview() {
    const interview = {
        id: Date.now(),
        company: document.getElementById('interviewCompany').value.trim(),
        position: document.getElementById('interviewPosition').value.trim(),
        date: document.getElementById('interviewDate').value,
        type: document.getElementById('interviewType').value,
        interviewers: document.getElementById('interviewers').value.trim(),
        duration: document.getElementById('interviewDuration').value.trim(),
        prep: document.getElementById('interviewPrep').value.trim(),
        dateAdded: new Date().toISOString()
    };
    
    if (!interview.company || !interview.date) {
        alert('Please enter company and interview date');
        return;
    }
    
    data.interviews.push(interview);
    saveData();
    updateInterviewsTable();
    
    // Clear form
    document.getElementById('interviewCompany').value = '';
    document.getElementById('interviewPosition').value = '';
    document.getElementById('interviewDate').value = '';
    document.getElementById('interviewers').value = '';
    document.getElementById('interviewDuration').value = '';
    document.getElementById('interviewPrep').value = '';
}

// ============================================
// TABLE UPDATES
// ============================================

/**
 * Update the companies table with current data
 */
function updateCompaniesTable() {
    const tbody = document.getElementById('companiesTableBody');
    if (data.companies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px; color: #6c757d;">No companies added yet. Add your first company above!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.companies.map(company => `
        <tr>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="interest" data-original-value="${company.interest || ''}"><span class="interest-badge interest-${company.interest}">${company.interest}</span></span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="name" data-original-value="${company.name || ''}"><strong>${company.name}</strong></span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="industry" data-original-value="${company.industry || ''}">${company.industry || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="position" data-original-value="${company.position || ''}">${company.position || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="booth" data-original-value="${company.booth || ''}">${company.booth || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="recruiter" data-original-value="${company.recruiter || ''}">${company.recruiter || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="opt" data-original-value="${company.opt || ''}">${company.opt || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="deadline" data-original-value="${company.deadline || ''}">${company.deadline || '-'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('companies', ${company.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Make fields editable
    tbody.querySelectorAll('.editable-field').forEach(field => {
        makeEditable(field, field.getAttribute('data-type'), field.getAttribute('data-item-id'), field.getAttribute('data-field'), field.getAttribute('data-original-value'));
    });
}

/**
 * Update the contacts table with current data
 */
function updateContactsTable() {
    const tbody = document.getElementById('contactsTableBody');
    if (data.contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #6c757d;">No contacts added yet. Start networking!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.contacts.map(contact => `
        <tr>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="name" data-original-value="${contact.name || ''}"><strong>${contact.name}</strong></span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="company" data-original-value="${contact.company || ''}">${contact.company || '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="position" data-original-value="${contact.position || ''}">${contact.position || '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="type" data-original-value="${contact.type || ''}">${contact.type}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="email" data-original-value="${contact.email || ''}">${contact.email ? `<a href="mailto:${contact.email}">${contact.email}</a>` : '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="linkedin" data-original-value="${contact.linkedin || ''}">${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank">Profile</a>` : '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="strength" data-original-value="${contact.strength || ''}">${contact.strength}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('contacts', ${contact.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Make fields editable
    tbody.querySelectorAll('.editable-field').forEach(field => {
        makeEditable(field, field.getAttribute('data-type'), field.getAttribute('data-item-id'), field.getAttribute('data-field'), field.getAttribute('data-original-value'));
    });
}

/**
 * Update the jobs table with current data
 */
function updateJobsTable() {
    const tbody = document.getElementById('jobsTableBody');
    if (data.jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px; color: #6c757d;">No job applications yet. Start applying!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.jobs.map(job => `
        <tr>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="interest" data-original-value="${job.interest || ''}"><span class="interest-badge interest-${job.interest}">${job.interest}</span></span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="company" data-original-value="${job.company || ''}"><strong>${job.company}</strong></span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="title" data-original-value="${job.title || ''}">${job.title}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="location" data-original-value="${job.location || ''}">${job.location || '-'}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="status" data-original-value="${job.status || ''}"><span class="status-badge status-${job.status.toLowerCase().replace(' ', '')}">${job.status}</span></span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="dateApplied" data-original-value="${job.dateApplied || ''}">${job.dateApplied || '-'}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="deadline" data-original-value="${job.deadline || ''}">${job.deadline || '-'}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="salary" data-original-value="${job.salary || ''}">${job.salary || '-'}</span></td>
            <td>
                <div class="action-buttons">
                    ${job.url ? `<a href="${job.url}" target="_blank" class="icon-btn">🔗</a>` : ''}
                    <button class="icon-btn" onclick="deleteItem('jobs', ${job.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Make fields editable
    tbody.querySelectorAll('.editable-field').forEach(field => {
        makeEditable(field, field.getAttribute('data-type'), field.getAttribute('data-item-id'), field.getAttribute('data-field'), field.getAttribute('data-original-value'));
    });
}

/**
 * Update the follow-ups table with current data
 */
function updateFollowUpsTable() {
    const tbody = document.getElementById('followupTableBody');
    if (data.followups.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: #6c757d;">No follow-ups scheduled. Remember to follow up within 48 hours!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.followups.map(followup => {
        const dueDate = new Date(followup.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today && followup.status === 'Pending';
        
        return `
        <tr style="${isOverdue ? 'background-color: #fff3cd;' : ''}">
            <td><span class="editable-field" data-type="followups" data-item-id="${followup.id}" data-field="dueDate" data-original-value="${followup.dueDate || ''}">${followup.dueDate} ${isOverdue ? '⚠️' : ''}</span></td>
            <td><span class="editable-field" data-type="followups" data-item-id="${followup.id}" data-field="company" data-original-value="${followup.company || ''}"><strong>${followup.company}</strong></span></td>
            <td><span class="editable-field" data-type="followups" data-item-id="${followup.id}" data-field="contact" data-original-value="${followup.contact || ''}">${followup.contact || '-'}</span></td>
            <td><span class="editable-field" data-type="followups" data-item-id="${followup.id}" data-field="type" data-original-value="${followup.type || ''}">${followup.type}</span></td>
            <td><span class="editable-field" data-type="followups" data-item-id="${followup.id}" data-field="priority" data-original-value="${followup.priority || ''}">${followup.priority}</span></td>
            <td><span class="editable-field" data-type="followups" data-item-id="${followup.id}" data-field="status" data-original-value="${followup.status || ''}">${followup.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('followups', ${followup.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `}).join('');
    
    // Make fields editable
    tbody.querySelectorAll('.editable-field').forEach(field => {
        makeEditable(field, field.getAttribute('data-type'), field.getAttribute('data-item-id'), field.getAttribute('data-field'), field.getAttribute('data-original-value'));
    });
}

/**
 * Update the interviews table with current data
 */
function updateInterviewsTable() {
    const tbody = document.getElementById('interviewsTableBody');
    if (data.interviews.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: #6c757d;">No interviews scheduled yet. Keep applying!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.interviews.map(interview => `
        <tr>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="date" data-original-value="${interview.date || ''}">${new Date(interview.date).toLocaleString()}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="company" data-original-value="${interview.company || ''}"><strong>${interview.company}</strong></span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="position" data-original-value="${interview.position || ''}">${interview.position || '-'}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="type" data-original-value="${interview.type || ''}">${interview.type}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="interviewers" data-original-value="${interview.interviewers || ''}">${interview.interviewers || '-'}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="duration" data-original-value="${interview.duration || ''}">${interview.duration || '-'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('interviews', ${interview.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Make fields editable
    tbody.querySelectorAll('.editable-field').forEach(field => {
        makeEditable(field, field.getAttribute('data-type'), field.getAttribute('data-item-id'), field.getAttribute('data-field'), field.getAttribute('data-original-value'));
    });
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

// ============================================
// DELETE FUNCTIONALITY
// ============================================

/**
 * Delete an item from the specified collection
 * @param {string} type - The type of item (companies, contacts, jobs, etc.)
 * @param {number} id - The ID of the item to delete
 */
function deleteItem(type, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        data[type] = data[type].filter(item => item.id !== id);
        saveData();
        updateAllTables();
    }
}

// ============================================
// DASHBOARD UPDATES
// ============================================

/**
 * Update the dashboard with current statistics
 */
function updateDashboard() {
    // Update counts
    document.getElementById('companiesCount').textContent = data.companies.length;
    document.getElementById('applicationsCount').textContent = data.jobs.filter(j => j.status === 'Submitted').length;
    document.getElementById('followupsCount').textContent = data.followups.filter(f => f.status === 'Pending').length;
    document.getElementById('interviewsCount').textContent = data.interviews.filter(i => new Date(i.date) > new Date()).length;
    
    // Update priority companies
    const priorityList = document.getElementById('priorityList');
    const topCompanies = [...data.companies]
        .sort((a, b) => b.interest - a.interest)
        .slice(0, 5);
    
    if (topCompanies.length === 0) {
        priorityList.innerHTML = '<div class="empty-state"><p>No companies added yet. Start by adding companies in the Companies tab!</p></div>';
    } else {
        priorityList.innerHTML = topCompanies.map(company => `
            <div class="priority-item">
                <div>
                    <strong>${company.name}</strong>
                    <br><small>${company.position || 'No position specified'}</small>
                </div>
                <span class="interest-badge interest-${company.interest}">Interest: ${company.interest}</span>
            </div>
        `).join('');
    }
    
    // Update deadlines
    const deadlinesList = document.getElementById('deadlinesList');
    const upcomingDeadlines = data.jobs
        .filter(j => j.deadline && new Date(j.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);
    
    if (upcomingDeadlines.length === 0) {
        deadlinesList.innerHTML = '<div class="empty-state"><p>No upcoming deadlines. Add jobs with application deadlines to see them here.</p></div>';
    } else {
        deadlinesList.innerHTML = upcomingDeadlines.map(job => `
            <div class="timeline-item">
                <div>
                    <strong>${job.company}</strong> - ${job.title}
                    <br><small>Deadline: ${new Date(job.deadline).toLocaleDateString()}</small>
                </div>
                <span class="status-badge status-${job.status.toLowerCase().replace(' ', '')}">${job.status}</span>
            </div>
        `).join('');
    }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

/**
 * Copy email template to clipboard
 * @param {HTMLElement} button - The button that was clicked
 */
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

// ============================================
// INLINE EDITING FUNCTIONALITY
// ============================================

/**
 * Make a field editable with click-to-edit functionality
 * @param {HTMLElement} element - The element to make editable
 * @param {string} type - The data type (companies, contacts, etc.)
 * @param {number} itemId - The ID of the item
 * @param {string} fieldName - The name of the field
 * @param {string} currentValue - The current value
 */
function makeEditable(element, type, itemId, fieldName, currentValue) {
    element.classList.add('editable-field');
    element.setAttribute('data-type', type);
    element.setAttribute('data-item-id', itemId);
    element.setAttribute('data-field', fieldName);
    element.setAttribute('data-original-value', currentValue);
    
    element.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        startEdit(this);
    });
}

/**
 * Start editing a field
 * @param {HTMLElement} element - The element being edited
 */
function startEdit(element) {
    if (element.classList.contains('editing')) return;
    
    const type = element.getAttribute('data-type');
    const itemId = parseInt(element.getAttribute('data-item-id'));
    const fieldName = element.getAttribute('data-field');
    const currentValue = element.getAttribute('data-original-value');
    
    element.classList.add('editing');
    
    let inputElement;
    const fieldType = getFieldType(type, fieldName);
    
    if (fieldType === 'select') {
        inputElement = createSelectInput(fieldName, currentValue);
    } else if (fieldType === 'date') {
        inputElement = document.createElement('input');
        inputElement.type = 'date';
        inputElement.value = currentValue;
    } else if (fieldType === 'textarea') {
        inputElement = document.createElement('textarea');
        inputElement.value = currentValue;
        inputElement.rows = 3;
    } else {
        inputElement = document.createElement('input');
        inputElement.type = fieldType;
        inputElement.value = currentValue;
    }
    
    element.innerHTML = '';
    element.appendChild(inputElement);
    
    // Add save/cancel buttons
    const controls = document.createElement('div');
    controls.className = 'edit-controls';
    controls.innerHTML = `
        <button class="edit-btn" onclick="saveEdit(this.parentElement.parentElement)">Save</button>
        <button class="edit-btn cancel-btn" onclick="cancelEdit(this.parentElement.parentElement)">Cancel</button>
    `;
    element.appendChild(controls);
    
    inputElement.focus();
    inputElement.select();
}

/**
 * Get the input type for a field
 * @param {string} type - The data type
 * @param {string} fieldName - The field name
 * @returns {string} The input type
 */
function getFieldType(type, fieldName) {
    const fieldTypes = {
        companies: {
            interest: 'select',
            industry: 'select',
            opt: 'select',
            deadline: 'date',
            notes: 'textarea',
            name: 'text',
            position: 'text',
            booth: 'text',
            recruiter: 'text'
        },
        contacts: {
            type: 'select',
            strength: 'select',
            email: 'email',
            linkedin: 'url',
            phone: 'tel',
            notes: 'textarea',
            name: 'text',
            company: 'text',
            position: 'text'
        },
        jobs: {
            interest: 'select',
            status: 'select',
            dateApplied: 'date',
            deadline: 'date',
            url: 'url',
            salary: 'text',
            company: 'text',
            title: 'text',
            location: 'text'
        },
        followups: {
            type: 'select',
            priority: 'select',
            status: 'select',
            dueDate: 'date',
            company: 'text',
            contact: 'text'
        },
        interviews: {
            type: 'select',
            date: 'datetime-local',
            duration: 'text',
            prep: 'textarea',
            company: 'text',
            position: 'text',
            interviewers: 'text'
        }
    };
    
    return fieldTypes[type]?.[fieldName] || 'text';
}

/**
 * Create a select dropdown for editing
 * @param {string} fieldName - The field name
 * @param {string} currentValue - The current value
 * @returns {HTMLSelectElement} The select element
 */
function createSelectInput(fieldName, currentValue) {
    const select = document.createElement('select');
    
    const options = {
        interest: [
            {value: '5', text: '5 - Extremely Interested'},
            {value: '4', text: '4 - Very Interested'},
            {value: '3', text: '3 - Interested'},
            {value: '2', text: '2 - Somewhat Interested'},
            {value: '1', text: '1 - Low Interest'}
        ],
        industry: [
            {value: '', text: 'Select Industry'},
            {value: 'Technology', text: 'Technology'},
            {value: 'Finance', text: 'Finance'},
            {value: 'Healthcare', text: 'Healthcare'},
            {value: 'Consulting', text: 'Consulting'},
            {value: 'Retail', text: 'Retail'},
            {value: 'Manufacturing', text: 'Manufacturing'},
            {value: 'Education', text: 'Education'},
            {value: 'Non-profit', text: 'Non-profit'},
            {value: 'Other', text: 'Other'}
        ],
        opt: [
            {value: '', text: 'Unknown'},
            {value: 'Yes', text: 'Yes'},
            {value: 'No', text: 'No'},
            {value: 'Case-by-case', text: 'Case by Case'}
        ],
        type: [
            {value: 'Career Fair', text: 'Career Fair'},
            {value: 'Alumni', text: 'Alumni'},
            {value: 'Faculty', text: 'Faculty'},
            {value: 'Referral', text: 'Referral'},
            {value: 'Cold Outreach', text: 'Cold Outreach'},
            {value: 'Event', text: 'Event'}
        ],
        strength: [
            {value: 'Cold', text: 'Cold'},
            {value: 'Warm', text: 'Warm'},
            {value: 'Hot', text: 'Hot'}
        ],
        status: [
            {value: 'Not Started', text: 'Not Started'},
            {value: 'In Progress', text: 'In Progress'},
            {value: 'Submitted', text: 'Submitted'},
            {value: 'Under Review', text: 'Under Review'},
            {value: 'Interview', text: 'Interview'},
            {value: 'Rejected', text: 'Rejected'},
            {value: 'Offer', text: 'Offer'}
        ],
        priority: [
            {value: 'High', text: 'High'},
            {value: 'Medium', text: 'Medium'},
            {value: 'Low', text: 'Low'}
        ],
        followupType: [
            {value: 'Thank You', text: 'Thank You Email'},
            {value: 'Check-in', text: 'Check-in'},
            {value: 'Application Status', text: 'Application Status'},
            {value: 'Information Request', text: 'Information Request'},
            {value: 'LinkedIn Connection', text: 'LinkedIn Connection'}
        ],
        interviewType: [
            {value: 'Phone Screen', text: 'Phone Screen'},
            {value: 'Video', text: 'Video Interview'},
            {value: 'Technical', text: 'Technical Interview'},
            {value: 'Behavioral', text: 'Behavioral Interview'},
            {value: 'Panel', text: 'Panel Interview'},
            {value: 'On-site', text: 'On-site Interview'},
            {value: 'Final Round', text: 'Final Round'}
        ]
    };
    
    const fieldOptions = options[fieldName] || [];
    fieldOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        if (option.value === currentValue) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });
    
    return select;
}

/**
 * Save an edited field
 * @param {HTMLElement} element - The element being edited
 */
function saveEdit(element) {
    const type = element.getAttribute('data-type');
    const itemId = parseInt(element.getAttribute('data-item-id'));
    const fieldName = element.getAttribute('data-field');
    
    const input = element.querySelector('input, select, textarea');
    const newValue = input.value;
    
    // Update the data
    const item = data[type].find(item => item.id === itemId);
    if (item) {
        item[fieldName] = newValue;
        saveData();
        updateAllTables();
    }
}

/**
 * Cancel editing and restore original value
 * @param {HTMLElement} element - The element being edited
 */
function cancelEdit(element) {
    const originalValue = element.getAttribute('data-original-value');
    const type = element.getAttribute('data-type');
    const itemId = parseInt(element.getAttribute('data-item-id'));
    const fieldName = element.getAttribute('data-field');
    
    // Restore original display
    element.classList.remove('editing');
    displayFieldValue(element, type, itemId, fieldName, originalValue);
}

/**
 * Display a field value with proper formatting
 * @param {HTMLElement} element - The element to update
 * @param {string} type - The data type
 * @param {number} itemId - The item ID
 * @param {string} fieldName - The field name
 * @param {string} value - The value to display
 */
function displayFieldValue(element, type, itemId, fieldName, value) {
    element.classList.remove('editing');
    element.setAttribute('data-original-value', value);
    
    // Format the display value based on field type
    let displayValue = value || '-';
    
    if (fieldName === 'email' && value) {
        displayValue = `<a href="mailto:${value}">${value}</a>`;
    } else if (fieldName === 'linkedin' && value) {
        displayValue = `<a href="${value}" target="_blank">Profile</a>`;
    } else if (fieldName === 'url' && value) {
        displayValue = `<a href="${value}" target="_blank">Link</a>`;
    } else if (fieldName === 'interest') {
        displayValue = `<span class="interest-badge interest-${value}">${value}</span>`;
    } else if (fieldName === 'status') {
        displayValue = `<span class="status-badge status-${value.toLowerCase().replace(' ', '')}">${value}</span>`;
    } else if (fieldName === 'date' && value) {
        displayValue = new Date(value).toLocaleDateString();
    } else if (fieldName === 'dueDate' && value) {
        displayValue = value;
    } else if (fieldName === 'date' && value && type === 'interviews') {
        displayValue = new Date(value).toLocaleString();
    } else if (fieldName === 'name' && value) {
        displayValue = `<strong>${value}</strong>`;
    } else if (fieldName === 'company' && value) {
        displayValue = `<strong>${value}</strong>`;
    }
    
    element.innerHTML = displayValue;
    
    // Re-add click listener
    element.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        startEdit(this);
    });
}

// ============================================
// INITIALIZATION
// ============================================

// Load data when page loads
loadData();

