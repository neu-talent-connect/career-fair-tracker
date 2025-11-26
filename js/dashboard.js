/**
 * Dashboard and Spreadsheet Module
 * Handles the master spreadsheet view and dashboard statistics
 */

/**
 * Update dashboard statistics
 */
function updateDashboard() {
    // Update counts
    document.getElementById('totalAppsCount').textContent = data.jobs.length;
    document.getElementById('submittedCount').textContent = data.jobs.filter(j => j.status === 'Submitted' || j.status === 'Under Review').length;
    document.getElementById('interviewsCount').textContent = data.jobs.filter(j => j.status === 'Interview').length;
    document.getElementById('offersCount').textContent = data.jobs.filter(j => j.status === 'Offer').length;
    
    // Update spreadsheet table
    updateSpreadsheetTable();
}

/**
 * Update the spreadsheet table
 */
function updateSpreadsheetTable() {
    const tbody = document.getElementById('spreadsheetTableBody');
    if (data.jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="16" style="text-align: center; padding: 40px; color: #6c757d;">No applications yet. Add your first job application in the Jobs tab or click Add Row below!</td></tr>';
        return;
    }
    
    const filteredJobs = getFilteredJobs();
    
    tbody.innerHTML = filteredJobs.map(job => `
        <tr data-job-id="${job.id}">
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'interest', 'select')">
                <span class="interest-badge interest-${job.interest}">${job.interest}</span>
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'company', 'text')">
                <strong>${job.company}</strong>
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'title', 'text')">
                ${job.title}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'status', 'select')">
                <span class="status-badge status-${job.status.toLowerCase().replace(' ', '')}">${job.status}</span>
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'datePosted', 'date')">
                ${job.datePosted || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'dateApplied', 'date')">
                ${job.dateApplied || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'deadline', 'date')">
                ${job.deadline || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'contactPerson', 'text')">
                ${job.contactPerson || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'contactEmail', 'email')">
                ${job.contactEmail ? `<a href="mailto:${job.contactEmail}">${job.contactEmail}</a>` : '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'contactPhone', 'tel')">
                ${job.contactPhone || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'location', 'text')">
                ${job.location || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'salary', 'text')">
                ${job.salary || '-'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'resume', 'select')">
                ${job.resume || 'None'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'coverLetter', 'select')">
                ${job.coverLetter || 'None'}
            </td>
            <td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, 'notes', 'textarea')">
                ${job.notes ? '📝' : '-'}
            </td>
            <td onclick="event.stopPropagation()">
                <div class="action-buttons">
                    ${job.url ? `<a href="${job.url}" target="_blank" class="icon-btn" title="View Posting">🔗</a>` : ''}
                    <button class="icon-btn" onclick="deleteItem('jobs', ${job.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Edit a spreadsheet cell
 */
function editSpreadsheetCell(cell, jobId, fieldName, inputType) {
    if (cell.classList.contains('editing')) return;
    
    const job = data.jobs.find(j => j.id === jobId);
    if (!job) return;
    
    cell.classList.add('editing');
    const currentValue = job[fieldName] || '';
    
    let inputElement;
    
    if (inputType === 'select') {
        inputElement = createSpreadsheetSelect(fieldName, currentValue);
    } else if (inputType === 'textarea') {
        inputElement = document.createElement('textarea');
        inputElement.value = currentValue;
        inputElement.rows = 3;
    } else {
        inputElement = document.createElement('input');
        inputElement.type = inputType;
        inputElement.value = currentValue;
    }
    
    const originalContent = cell.innerHTML;
    cell.innerHTML = '';
    cell.appendChild(inputElement);
    
    inputElement.focus();
    if (inputType === 'text' || inputType === 'email' || inputType === 'tel') {
        inputElement.select();
    }
    
    const saveValue = () => {
        const newValue = inputElement.value;
        job[fieldName] = newValue;
        saveData();
        cell.classList.remove('editing');
        updateSpreadsheetTable();
    };
    
    const cancelEdit = () => {
        cell.classList.remove('editing');
        cell.innerHTML = originalContent;
    };
    
    inputElement.addEventListener('blur', saveValue);
    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && inputType !== 'textarea') {
            e.preventDefault();
            saveValue();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
    });
}

/**
 * Create select input for spreadsheet cell
 */
function createSpreadsheetSelect(fieldName, currentValue) {
    const select = document.createElement('select');
    
    const options = {
        interest: [
            {value: '5', text: '5'},
            {value: '4', text: '4'},
            {value: '3', text: '3'},
            {value: '2', text: '2'},
            {value: '1', text: '1'}
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
        resume: [
            {value: 'None', text: 'None'},
            {value: 'Standard', text: 'Standard'},
            {value: 'Tailored', text: 'Tailored'},
            {value: 'Version 1', text: 'Version 1'},
            {value: 'Version 2', text: 'Version 2'}
        ],
        coverLetter: [
            {value: 'None', text: 'None'},
            {value: 'Required', text: 'Required'},
            {value: 'Optional', text: 'Optional'},
            {value: 'Submitted', text: 'Submitted'},
            {value: 'Not Needed', text: 'Not Needed'}
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
 * Get filtered jobs
 */
function getFilteredJobs() {
    const statusFilter = document.getElementById('filterStatus')?.value || '';
    const interestFilter = document.getElementById('filterInterest')?.value || '';
    const searchFilter = document.getElementById('filterSearch')?.value.toLowerCase() || '';
    
    let filtered = [...data.jobs];
    
    if (statusFilter) {
        filtered = filtered.filter(job => job.status === statusFilter);
    }
    
    if (interestFilter) {
        filtered = filtered.filter(job => job.interest === interestFilter);
    }
    
    if (searchFilter) {
        filtered = filtered.filter(job => 
            job.company.toLowerCase().includes(searchFilter) ||
            job.title.toLowerCase().includes(searchFilter)
        );
    }
    
    return filtered;
}

/**
 * Apply filters to spreadsheet
 */
function applySpreadsheetFilters() {
    updateSpreadsheetTable();
}

/**
 * Clear spreadsheet filters
 */
function clearSpreadsheetFilters() {
    if (document.getElementById('filterStatus')) document.getElementById('filterStatus').value = '';
    if (document.getElementById('filterInterest')) document.getElementById('filterInterest').value = '';
    if (document.getElementById('filterSearch')) document.getElementById('filterSearch').value = '';
    applySpreadsheetFilters();
}

/**
 * Sort spreadsheet by column
 */
let sortDirection = {};
function sortSpreadsheet(column) {
    if (!sortDirection[column]) sortDirection[column] = 'asc';
    else sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    
    data.jobs.sort((a, b) => {
        let valA = a[column] || '';
        let valB = b[column] || '';
        
        if (column.includes('date') || column === 'deadline') {
            valA = valA ? new Date(valA) : new Date(0);
            valB = valB ? new Date(valB) : new Date(0);
        }
        
        if (column === 'interest') {
            valA = parseInt(valA) || 0;
            valB = parseInt(valB) || 0;
        }
        
        if (valA < valB) return sortDirection[column] === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection[column] === 'asc' ? 1 : -1;
        return 0;
    });
    
    updateSpreadsheetTable();
}

/**
 * Add a new row to the spreadsheet
 */
function addSpreadsheetRow() {
    const newJob = {
        id: Date.now(),
        company: 'New Company',
        title: 'New Position',
        status: 'Not Started',
        interest: '3',
        datePosted: '',
        dateApplied: '',
        deadline: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        location: '',
        salary: '',
        resume: 'None',
        coverLetter: 'None',
        notes: '',
        url: '',
        dateAdded: new Date().toISOString()
    };
    
    data.jobs.push(newJob);
    saveData();
    updateSpreadsheetTable();
    updateJobsTable();
}

