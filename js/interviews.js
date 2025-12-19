// Interview tracking

// Add new interview
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
    clearInterviewForm();
}

// Clear the form
function clearInterviewForm() {
    document.getElementById('interviewCompany').value = '';
    document.getElementById('interviewPosition').value = '';
    document.getElementById('interviewDate').value = '';
    document.getElementById('interviewers').value = '';
    document.getElementById('interviewDuration').value = '';
    document.getElementById('interviewPrep').value = '';
}

/**
 * Update the interviews table
 */
function updateInterviewsTable() {
    const tbody = document.getElementById('interviewsTableBody');
    if (data.interviews.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px; color: #6c757d;">No interviews scheduled yet. Keep applying!</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.interviews.map(interview => `
        <tr>
            <td style="cursor: pointer;" onclick="toggleInterviewDetails(${interview.id})">
                <span class="expand-icon" id="expand-interview-${interview.id}">▶</span>
            </td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="date" data-original-value="${interview.date || ''}">${new Date(interview.date).toLocaleString()}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="company" data-original-value="${interview.company || ''}"><strong>${interview.company}</strong></span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="position" data-original-value="${interview.position || ''}">${interview.position || '-'}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="type" data-original-value="${interview.type || ''}">${interview.type}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="interviewers" data-original-value="${interview.interviewers || ''}">${interview.interviewers || '-'}</span></td>
            <td><span class="editable-field" data-type="interviews" data-item-id="${interview.id}" data-field="duration" data-original-value="${interview.duration || ''}">${interview.duration || '-'}</span></td>
            <td>${interview.prep ? '📝' : '-'}</td>
            <td onclick="event.stopPropagation()">
                <div class="action-buttons">
                    <button class="icon-btn" onclick="deleteItem('interviews', ${interview.id})">🗑️</button>
                </div>
            </td>
        </tr>
        <tr class="expanded-details" id="details-interview-${interview.id}">
            <td colspan="9" class="details-cell">
                <div class="details-content">
                    <div class="details-item">
                        <strong>Preparation Notes</strong>
                        <p style="white-space: pre-wrap;">${interview.prep || 'No preparation notes added'}</p>
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
 * Toggle interview details row
 */
function toggleInterviewDetails(interviewId) {
    const detailsRow = document.getElementById(`details-interview-${interviewId}`);
    const expandIcon = document.getElementById(`expand-interview-${interviewId}`);
    
    if (detailsRow.classList.contains('show')) {
        detailsRow.classList.remove('show');
        expandIcon.classList.remove('expanded');
    } else {
        detailsRow.classList.add('show');
        expandIcon.classList.add('expanded');
    }
}

