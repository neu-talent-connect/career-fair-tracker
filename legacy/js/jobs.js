// Job application tracking

// Add new job application
function addJob() {
    const job = {
        id: Date.now(),
        company: document.getElementById('jobCompany').value.trim(),
        title: document.getElementById('jobTitle').value.trim(),
        jobId: document.getElementById('jobId').value.trim(),
        location: document.getElementById('jobLocation').value.trim(),
        status: document.getElementById('jobStatus').value,
        datePosted: document.getElementById('jobDatePosted')?.value || '',
        dateApplied: document.getElementById('jobDateApplied').value,
        deadline: document.getElementById('jobDeadline').value,
        salary: document.getElementById('jobSalary').value.trim(),
        interest: document.getElementById('jobInterest').value,
        url: document.getElementById('jobUrl').value.trim(),
        contactPerson: document.getElementById('jobContact')?.value.trim() || '',
        contactEmail: document.getElementById('jobContactEmail')?.value.trim() || '',
        contactPhone: document.getElementById('jobContactPhone')?.value.trim() || '',
        resume: document.getElementById('jobResume')?.value || '',
        coverLetter: document.getElementById('jobCoverLetter')?.value || '',
        notes: document.getElementById('jobNotes')?.value.trim() || '',
        applicationCycle: document.getElementById('jobApplicationCycle')?.value || '',
        dateAdded: new Date().toISOString()
    };
    
    if (!job.company || !job.title) {
        alert('Please enter company and position title');
        return;
    }
    
    data.jobs.push(job);
    saveData();
    updateJobsTable();
    updateSpreadsheetTable();
    clearJobForm();
}

/**
 * Populate dynamic dropdowns in job form
 */
function populateJobFormDropdowns() {
    // Populate co-op cycles
    const applicationCycleSelect = document.getElementById('jobApplicationCycle');
    if (applicationCycleSelect) {
        const cycles = getApplicationCycles();
        applicationCycleSelect.innerHTML = '<option value="">Not applicable</option>' +
            cycles.map(cycle => `<option value="${cycle}">${cycle}</option>`).join('');
    }
    
}

/**
 * Clear job form
 */
function clearJobForm() {
    document.getElementById('jobCompany').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('jobId').value = '';
    document.getElementById('jobLocation').value = '';
    document.getElementById('jobDateApplied').value = '';
    document.getElementById('jobDeadline').value = '';
    document.getElementById('jobSalary').value = '';
    document.getElementById('jobUrl').value = '';
    if (document.getElementById('jobContact')) document.getElementById('jobContact').value = '';
    if (document.getElementById('jobContactEmail')) document.getElementById('jobContactEmail').value = '';
    if (document.getElementById('jobContactPhone')) document.getElementById('jobContactPhone').value = '';
    if (document.getElementById('jobResume')) document.getElementById('jobResume').value = 'None';
    if (document.getElementById('jobCoverLetter')) document.getElementById('jobCoverLetter').value = 'None';
    if (document.getElementById('jobNotes')) document.getElementById('jobNotes').value = '';
    if (document.getElementById('jobDatePosted')) document.getElementById('jobDatePosted').value = '';
    if (document.getElementById('jobApplicationCycle')) document.getElementById('jobApplicationCycle').value = '';
}

/**
 * Update the jobs table
 */
function updateJobsTable() {
    const tbody = document.getElementById('jobsTableBody');
    if (data.jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 40px; color: #6c757d;">No job applications yet. Start applying!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.jobs.map(job => {
        return `
        <tr>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="interest" data-original-value="${job.interest || ''}"><span class="interest-badge interest-${job.interest}">${job.interest}</span></span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="company" data-original-value="${job.company || ''}"><strong>${job.company}</strong></span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="title" data-original-value="${job.title || ''}">${job.title}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="location" data-original-value="${job.location || ''}">${job.location || '-'}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="status" data-original-value="${job.status || ''}"><span class="status-badge status-${job.status.toLowerCase().replace(' ', '')}">${job.status}</span></span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="dateApplied" data-original-value="${job.dateApplied || ''}">${job.dateApplied || '-'}</span></td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="deadline" data-original-value="${job.deadline || ''}">${job.deadline || '-'}</span></td>
            <td>${job.applicationCycle || '-'}</td>
            <td><span class="editable-field" data-type="jobs" data-item-id="${job.id}" data-field="salary" data-original-value="${job.salary || ''}">${job.salary || '-'}</span></td>
            <td>
                <div class="action-buttons">
                    ${job.url ? `<a href="${job.url}" target="_blank" class="icon-btn">🔗</a>` : ''}
                    <button class="icon-btn" onclick="deleteItem('jobs', ${job.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `}).join('');
    
    // Make fields editable
    tbody.querySelectorAll('.editable-field').forEach(field => {
        makeEditable(field, field.getAttribute('data-type'), field.getAttribute('data-item-id'), field.getAttribute('data-field'), field.getAttribute('data-original-value'));
    });
}


