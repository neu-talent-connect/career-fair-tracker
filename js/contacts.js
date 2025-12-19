// Contact management

// Add new contact
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
    clearContactForm();
}

// Clear the form
function clearContactForm() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactCompany').value = '';
    document.getElementById('contactPosition').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactLinkedIn').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactNotes').value = '';
}

/**
 * Update the contacts table
 */
function updateContactsTable() {
    const tbody = document.getElementById('contactsTableBody');
    if (data.contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 40px; color: #6c757d;">No contacts added yet. Start networking!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.contacts.map(contact => `
        <tr>
            <td style="cursor: pointer;" onclick="toggleContactDetails(${contact.id})">
                <span class="expand-icon" id="expand-contact-${contact.id}">▶</span>
            </td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="name" data-original-value="${contact.name || ''}"><strong>${contact.name}</strong></span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="company" data-original-value="${contact.company || ''}">${contact.company || '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="position" data-original-value="${contact.position || ''}">${contact.position || '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="type" data-original-value="${contact.type || ''}">${contact.type}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="email" data-original-value="${contact.email || ''}">${contact.email ? `<a href="mailto:${contact.email}">${contact.email}</a>` : '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="linkedin" data-original-value="${contact.linkedin || ''}">${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank">Profile</a>` : '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="phone" data-original-value="${contact.phone || ''}">${contact.phone || '-'}</span></td>
            <td><span class="editable-field" data-type="contacts" data-item-id="${contact.id}" data-field="strength" data-original-value="${contact.strength || ''}">${contact.strength}</span></td>
            <td>${contact.notes ? '📝' : '-'}</td>
            <td onclick="event.stopPropagation()">
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('contacts', ${contact.id})">🗑️</button>
                </div>
            </td>
        </tr>
        <tr class="expanded-details" id="details-contact-${contact.id}">
            <td colspan="11" class="details-cell">
                <div class="details-content">
                    <div class="details-item">
                        <strong>Notes</strong>
                        <p>${contact.notes || 'No notes added'}</p>
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
 * Toggle contact details row
 */
function toggleContactDetails(contactId) {
    const detailsRow = document.getElementById(`details-contact-${contactId}`);
    const expandIcon = document.getElementById(`expand-contact-${contactId}`);
    
    if (detailsRow.classList.contains('show')) {
        detailsRow.classList.remove('show');
        expandIcon.classList.remove('expanded');
    } else {
        detailsRow.classList.add('show');
        expandIcon.classList.add('expanded');
    }
}

