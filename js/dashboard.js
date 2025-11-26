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
    const thead = document.querySelector('#spreadsheetTable thead tr');
    
    if (data.jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="17" style="text-align: center; padding: 40px; color: #6c757d;">No applications yet. Add your first job application in the Jobs tab or click Add Row below!</td></tr>';
        return;
    }
    
    // Update table headers based on visible columns
    const visibleColumns = getVisibleColumns();
    thead.innerHTML = `
        <th><input type="checkbox" id="selectAllCheckbox" onchange="toggleAllRows()" class="row-checkbox"></th>
        ${visibleColumns.map(col => {
            if (col.id === 'actions') return '<th>Actions</th>';
            return `<th onclick="sortSpreadsheet('${col.id}')">${col.name}</th>`;
        }).join('')}
    `;
    
    const filteredJobs = getFilteredJobs();
    
    tbody.innerHTML = filteredJobs.map(job => {
        const visibleCols = getVisibleColumns();
        const deadlineUrgency = getDeadlineUrgency(job.deadline);
        const linkedContact = getLinkedContact(job.id);
        const isWarm = !!linkedContact;
        const cycleProximity = getCycleProximity(job.coopCycle);
        
        const cellRenderers = {
            interest: () => `<span class="interest-badge interest-${job.interest}">${job.interest}</span>`,
            company: () => `<strong>${job.company}</strong>`,
            title: () => job.title,
            status: () => `<span class="status-badge status-${job.status.toLowerCase().replace(' ', '')}">${job.status}</span>`,
            datePosted: () => formatDate(job.datePosted),
            dateApplied: () => formatDate(job.dateApplied),
            deadline: () => `<span class="${deadlineUrgency}">${formatDate(job.deadline)}</span>`,
            coopCycle: () => job.coopCycle ? `${job.coopCycle} ${cycleProximity === 'imminent' ? '🔥' : cycleProximity === 'upcoming' ? '⏰' : ''}` : '-',
            networking: () => isWarm ? '🔥 Warm' : '❄️ Cold',
            contactPerson: () => job.contactPerson || (linkedContact ? linkedContact.name : '-'),
            contactEmail: () => job.contactEmail ? `<a href="mailto:${job.contactEmail}">${job.contactEmail}</a>` : (linkedContact ? `<a href="mailto:${linkedContact.email}">${linkedContact.email}</a>` : '-'),
            contactPhone: () => job.contactPhone || (linkedContact ? linkedContact.phone : '-'),
            location: () => job.location || '-',
            salary: () => job.salary || '-',
            resume: () => job.resume || 'None',
            coverLetter: () => job.coverLetter || 'None',
            notes: () => job.notes ? '📝' : '-',
            actions: () => `
                <div class="action-buttons">
                    ${job.url ? `<a href="${job.url}" target="_blank" class="icon-btn" title="View Posting">🔗</a>` : ''}
                    ${job.interviewChecklist ? `<span title="Has Interview Prep Checklist">📋</span>` : ''}
                    <button class="icon-btn" onclick="deleteItem('jobs', ${job.id})" title="Delete">🗑️</button>
                </div>
            `
        };
        
        const cells = visibleCols.map(col => {
            if (col.id === 'actions') {
                return `<td onclick="event.stopPropagation()">${cellRenderers[col.id]()}</td>`;
            }
            // Non-editable columns
            if (['networking'].includes(col.id)) {
                return `<td>${cellRenderers[col.id]()}</td>`;
            }
            
            const inputType = col.id === 'contactEmail' ? 'email' : 
                            col.id === 'contactPhone' ? 'tel' :
                            col.id.includes('date') || col.id === 'deadline' ? 'date' :
                            col.id === 'notes' ? 'textarea' :
                            ['interest', 'status', 'resume', 'coverLetter', 'coopCycle'].includes(col.id) ? 'select' : 'text';
            return `<td class="spreadsheet-cell" onclick="editSpreadsheetCell(this, ${job.id}, '${col.id}', '${inputType}')">${cellRenderers[col.id]()}</td>`;
        }).join('');
        
        return `
            <tr data-job-id="${job.id}">
                <td onclick="event.stopPropagation()">
                    <input type="checkbox" class="row-checkbox" data-job-id="${job.id}" onchange="toggleRowSelection(${job.id})">
                </td>
                ${cells}
            </tr>
        `;
    }).join('');
    
    updateCheckboxStates();
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
    let wrapper;
    
    if (inputType === 'select') {
        inputElement = createSpreadsheetSelect(fieldName, currentValue);
    } else if (inputType === 'textarea') {
        inputElement = document.createElement('textarea');
        inputElement.value = currentValue;
        inputElement.rows = 3;
    } else if (inputType === 'date' || inputType === 'datetime-local') {
        // Create wrapper for date input with Today button
        wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.gap = '4px';
        wrapper.style.alignItems = 'center';
        
        inputElement = document.createElement('input');
        inputElement.type = inputType;
        inputElement.value = currentValue;
        inputElement.style.flex = '1';
        
        const todayBtn = document.createElement('button');
        todayBtn.textContent = inputType === 'date' ? 'Today' : 'Now';
        todayBtn.className = 'quick-date-btn';
        todayBtn.style.padding = '6px 12px';
        todayBtn.style.fontSize = '12px';
        todayBtn.onclick = (e) => {
            e.stopPropagation();
            if (inputType === 'date') {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                inputElement.value = `${year}-${month}-${day}`;
            } else {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                inputElement.value = `${year}-${month}-${day}T${hours}:${minutes}`;
            }
            inputElement.focus();
        };
        
        wrapper.appendChild(inputElement);
        wrapper.appendChild(todayBtn);
    } else {
        inputElement = document.createElement('input');
        inputElement.type = inputType;
        inputElement.value = currentValue;
    }
    
    const originalContent = cell.innerHTML;
    cell.innerHTML = '';
    
    if (wrapper) {
        cell.appendChild(wrapper);
    } else {
        cell.appendChild(inputElement);
    }
    
    inputElement.focus();
    if (inputType === 'text' || inputType === 'email' || inputType === 'tel') {
        inputElement.select();
    }
    
    const saveValue = () => {
        const newValue = inputElement.value;
        const oldStatus = job.status;
        job[fieldName] = newValue;
        
        // If status changed to Interview, show prep checklist
        if (fieldName === 'status' && newValue === 'Interview' && oldStatus !== 'Interview') {
            initializeInterviewChecklist(jobId);
        }
        
        saveData();
        cell.classList.remove('editing');
        updateSpreadsheetTable();
    };
    
    const cancelEdit = () => {
        cell.classList.remove('editing');
        cell.innerHTML = originalContent;
    };
    
    inputElement.addEventListener('blur', (e) => {
        // Don't blur if clicking the Today button
        if (e.relatedTarget && e.relatedTarget.classList.contains('quick-date-btn')) {
            return;
        }
        saveValue();
    });
    
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
    
    let fieldOptions = [];
    
    if (fieldName === 'coopCycle') {
        const cycles = getCoopCycles();
        fieldOptions = [
            {value: '', text: 'Not applicable'},
            ...cycles.map(cycle => ({value: cycle, text: cycle}))
        ];
    } else {
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
        fieldOptions = options[fieldName] || [];
    }
    
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
        coopCycle: '',
        linkedContactId: null,
        notes: '',
        url: '',
        dateAdded: new Date().toISOString()
    };
    
    data.jobs.push(newJob);
    saveData();
    updateSpreadsheetTable();
    updateJobsTable();
}

