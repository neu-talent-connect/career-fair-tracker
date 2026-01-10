// Inline editing for spreadsheet cells

// Make a cell editable
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

// Start editing when user clicks cell
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
 */
function cancelEdit(element) {
    const originalValue = element.getAttribute('data-original-value');
    const type = element.getAttribute('data-type');
    const itemId = parseInt(element.getAttribute('data-item-id'));
    const fieldName = element.getAttribute('data-field');
    
    element.classList.remove('editing');
    displayFieldValue(element, type, itemId, fieldName, originalValue);
}

/**
 * Display a field value with proper formatting
 */
function displayFieldValue(element, type, itemId, fieldName, value) {
    element.classList.remove('editing');
    element.setAttribute('data-original-value', value);
    
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

