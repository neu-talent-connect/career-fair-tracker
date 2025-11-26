/**
 * Column Customization Module
 * Handles Notion-style column management, date formatting, and view preferences
 */

// Default column configuration
const DEFAULT_COLUMNS = [
    { id: 'interest', name: 'Interest', visible: true, order: 0 },
    { id: 'company', name: 'Company', visible: true, order: 1 },
    { id: 'title', name: 'Position', visible: true, order: 2 },
    { id: 'status', name: 'Status', visible: true, order: 3 },
    { id: 'datePosted', name: 'Date Posted', visible: false, order: 4 },
    { id: 'dateApplied', name: 'Date Applied', visible: true, order: 5 },
    { id: 'deadline', name: 'Deadline', visible: true, order: 6 },
    { id: 'coopCycle', name: 'Co-op Cycle', visible: true, order: 7 },
    { id: 'networking', name: 'Type', visible: true, order: 8 },
    { id: 'contactPerson', name: 'Contact', visible: true, order: 9 },
    { id: 'contactEmail', name: 'Email', visible: false, order: 10 },
    { id: 'contactPhone', name: 'Phone', visible: false, order: 11 },
    { id: 'location', name: 'Location', visible: true, order: 12 },
    { id: 'salary', name: 'Salary', visible: true, order: 13 },
    { id: 'resume', name: 'Resume', visible: true, order: 14 },
    { id: 'coverLetter', name: 'Cover Letter', visible: true, order: 15 },
    { id: 'notes', name: 'Notes', visible: true, order: 16 },
    { id: 'actions', name: 'Actions', visible: true, order: 17 }
];

// User preferences
let userPreferences = {
    columns: JSON.parse(JSON.stringify(DEFAULT_COLUMNS)),
    dateFormat: 'numeric', // 'numeric', 'short', 'relative'
};

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
        try {
            userPreferences = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    }
}

/**
 * Save user preferences to localStorage
 */
function saveUserPreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    updateSpreadsheetTable();
}

/**
 * Toggle customization sidebar
 */
function toggleCustomizationSidebar() {
    const sidebar = document.getElementById('customizationSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

/**
 * Close customization sidebar
 */
function closeCustomizationSidebar() {
    const sidebar = document.getElementById('customizationSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
}

/**
 * Switch sidebar tabs
 */
function switchSidebarTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update content
    document.querySelectorAll('.sidebar-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tabName + 'Tab').style.display = 'block';
}

/**
 * Toggle column visibility
 */
function toggleColumn(columnId) {
    const column = userPreferences.columns.find(c => c.id === columnId);
    if (column) {
        column.visible = !column.visible;
        saveUserPreferences();
    }
}

/**
 * Reset to default columns
 */
function resetToDefault() {
    if (confirm('Reset all customizations to default? This will restore all columns and settings.')) {
        userPreferences.columns = JSON.parse(JSON.stringify(DEFAULT_COLUMNS));
        userPreferences.dateFormat = 'numeric';
        saveUserPreferences();
        renderColumnsTab();
        renderFormattingTab();
    }
}

/**
 * Change date format preference
 */
function changeDateFormat(format) {
    userPreferences.dateFormat = format;
    saveUserPreferences();
}

/**
 * Format date based on user preference
 */
function formatDate(dateString) {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    const now = new Date();
    
    switch (userPreferences.dateFormat) {
        case 'numeric':
            return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        
        case 'short':
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        case 'relative':
            const diffTime = date - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) {
                const absDays = Math.abs(diffDays);
                if (absDays === 1) return '1 day ago';
                if (absDays < 7) return `${absDays} days ago`;
                if (absDays < 30) return `${Math.floor(absDays / 7)} weeks ago`;
                return `${Math.floor(absDays / 30)} months ago`;
            } else if (diffDays === 0) {
                return 'Today';
            } else if (diffDays === 1) {
                return 'Tomorrow';
            } else if (diffDays < 7) {
                return `in ${diffDays} days`;
            } else if (diffDays < 30) {
                return `in ${Math.floor(diffDays / 7)} weeks`;
            } else {
                return `in ${Math.floor(diffDays / 30)} months`;
            }
        
        default:
            return dateString;
    }
}

/**
 * Get urgency class for deadline
 */
function getDeadlineUrgency(deadline) {
    if (!deadline) return '';
    
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'deadline-overdue';
    if (diffDays <= 3) return 'deadline-urgent';
    if (diffDays <= 7) return 'deadline-warning';
    if (diffDays <= 14) return 'deadline-soon';
    return 'deadline-safe';
}

/**
 * Get visible columns in order
 */
function getVisibleColumns() {
    return userPreferences.columns
        .filter(c => c.visible)
        .sort((a, b) => a.order - b.order);
}

/**
 * Render columns tab
 */
function renderColumnsTab() {
    const container = document.getElementById('columnsTab');
    if (!container) return;
    
    // Sort columns by order
    const sortedColumns = [...userPreferences.columns].sort((a, b) => a.order - b.order);
    
    container.innerHTML = `
        <h3 style="font-size: 14px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Visible Columns</h3>
        <p style="font-size: 12px; color: #999; margin-bottom: 16px;">Drag to reorder</p>
        ${sortedColumns.map((column, index) => `
            <div class="column-item" 
                draggable="true" 
                data-column-id="${column.id}"
                data-index="${index}"
                ondragstart="handleDragStart(event)"
                ondragover="handleDragOver(event)"
                ondrop="handleDrop(event)"
                ondragend="handleDragEnd(event)"
                ondragleave="handleDragLeave(event)">
                <span class="drag-handle">⋮⋮</span>
                <input type="checkbox" 
                    id="col-${column.id}" 
                    ${column.visible ? 'checked' : ''}
                    onclick="event.stopPropagation()"
                    onchange="toggleColumn('${column.id}')">
                <label for="col-${column.id}">${column.name}</label>
            </div>
        `).join('')}
        <button class="reset-btn" onclick="resetToDefault()">↺ Reset to Default</button>
    `;
}

// Drag and drop functionality
let draggedElement = null;
let draggedColumnId = null;

function handleDragStart(e) {
    draggedElement = e.currentTarget;
    draggedColumnId = e.currentTarget.dataset.columnId;
    e.currentTarget.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const target = e.currentTarget;
    if (target !== draggedElement && target.classList.contains('column-item')) {
        target.style.borderTop = '3px solid var(--northeastern-red)';
    }
    return false;
}

function handleDragLeave(e) {
    e.currentTarget.style.borderTop = 'none';
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    e.preventDefault();
    
    const target = e.currentTarget;
    const targetColumnId = target.dataset.columnId;
    
    if (draggedColumnId && targetColumnId && draggedColumnId !== targetColumnId) {
        // Get the columns
        const draggedCol = userPreferences.columns.find(c => c.id === draggedColumnId);
        const targetCol = userPreferences.columns.find(c => c.id === targetColumnId);
        
        if (draggedCol && targetCol) {
            // Swap order values
            const tempOrder = draggedCol.order;
            draggedCol.order = targetCol.order;
            targetCol.order = tempOrder;
            
            saveUserPreferences();
            renderColumnsTab();
        }
    }
    
    target.style.borderTop = 'none';
    return false;
}

function handleDragEnd(e) {
    e.currentTarget.style.opacity = '1';
    document.querySelectorAll('.column-item').forEach(item => {
        item.style.borderTop = 'none';
    });
    draggedElement = null;
    draggedColumnId = null;
}

/**
 * Render formatting tab
 */
function renderFormattingTab() {
    const container = document.getElementById('formattingTab');
    if (!container) return;
    
    const exampleDate = new Date();
    exampleDate.setDate(exampleDate.getDate() + 5);
    
    container.innerHTML = `
        <h3 style="font-size: 14px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">Date Format</h3>
        
        <div class="date-format-option ${userPreferences.dateFormat === 'numeric' ? 'selected' : ''}" onclick="changeDateFormat('numeric')">
            <label>
                <input type="radio" name="dateFormat" value="numeric" ${userPreferences.dateFormat === 'numeric' ? 'checked' : ''}>
                Numeric
            </label>
            <span class="format-example">Example: ${exampleDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
        </div>
        
        <div class="date-format-option ${userPreferences.dateFormat === 'short' ? 'selected' : ''}" onclick="changeDateFormat('short')">
            <label>
                <input type="radio" name="dateFormat" value="short" ${userPreferences.dateFormat === 'short' ? 'checked' : ''}>
                Short
            </label>
            <span class="format-example">Example: ${exampleDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        
        <div class="date-format-option ${userPreferences.dateFormat === 'relative' ? 'selected' : ''}" onclick="changeDateFormat('relative')">
            <label>
                <input type="radio" name="dateFormat" value="relative" ${userPreferences.dateFormat === 'relative' ? 'checked' : ''}>
                Relative
            </label>
            <span class="format-example">Example: in 5 days / 2 weeks ago</span>
        </div>
    `;
}

/**
 * Initialize customization sidebar
 */
function initializeCustomizationSidebar() {
    loadUserPreferences();
    renderColumnsTab();
    renderFormattingTab();
}

