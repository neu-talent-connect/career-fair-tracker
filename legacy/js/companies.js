// Company tracking

// Add new company
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
    clearCompanyForm();
}

// Clear the form
function clearCompanyForm() {
    document.getElementById('companyName').value = '';
    document.getElementById('companyIndustry').value = '';
    document.getElementById('companyBooth').value = '';
    document.getElementById('companyRecruiter').value = '';
    document.getElementById('companyPosition').value = '';
    document.getElementById('companyOPT').value = '';
    document.getElementById('companyDeadline').value = '';
    document.getElementById('companyNotes').value = '';
}

/**
 * Update the companies table
 */
function updateCompaniesTable() {
    const tbody = document.getElementById('companiesTableBody');
    if (data.companies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 40px; color: #6c757d;">No companies added yet. Add your first company above!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.companies.map(company => `
        <tr>
            <td style="cursor: pointer;" onclick="toggleCompanyDetails(${company.id})">
                <span class="expand-icon" id="expand-${company.id}">▶</span>
            </td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="interest" data-original-value="${company.interest || ''}"><span class="interest-badge interest-${company.interest}">${company.interest}</span></span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="name" data-original-value="${company.name || ''}"><strong>${company.name}</strong></span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="industry" data-original-value="${company.industry || ''}">${company.industry || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="position" data-original-value="${company.position || ''}">${company.position || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="booth" data-original-value="${company.booth || ''}">${company.booth || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="recruiter" data-original-value="${company.recruiter || ''}">${company.recruiter || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="opt" data-original-value="${company.opt || ''}">${company.opt || '-'}</span></td>
            <td><span class="editable-field" data-type="companies" data-item-id="${company.id}" data-field="deadline" data-original-value="${company.deadline || ''}">${company.deadline || '-'}</span></td>
            <td>${company.notes ? '📝' : '-'}</td>
            <td onclick="event.stopPropagation()">
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('companies', ${company.id})">🗑️</button>
                </div>
            </td>
        </tr>
        <tr class="expanded-details" id="details-company-${company.id}">
            <td colspan="11" class="details-cell">
                <div class="details-content">
                    <div class="details-item">
                        <strong>Key Takeaways / Notes</strong>
                        <p>${company.notes || 'No notes added'}</p>
                    </div>
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
 * Toggle company details row
 */
function toggleCompanyDetails(companyId) {
    const detailsRow = document.getElementById(`details-company-${companyId}`);
    const expandIcon = document.getElementById(`expand-${companyId}`);
    
    if (detailsRow.classList.contains('show')) {
        detailsRow.classList.remove('show');
        expandIcon.classList.remove('expanded');
    } else {
        detailsRow.classList.add('show');
        expandIcon.classList.add('expanded');
    }
}

