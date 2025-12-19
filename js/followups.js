// Follow-up reminders

// Add new follow-up
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
    clearFollowUpForm();
}

// Clear the form
function clearFollowUpForm() {
    document.getElementById('followupCompany').value = '';
    document.getElementById('followupContact').value = '';
    document.getElementById('followupDate').value = '';
}

/**
 * Update the follow-ups table
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

