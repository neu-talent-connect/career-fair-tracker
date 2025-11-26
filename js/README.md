# JavaScript Module Architecture

This project uses a modular JavaScript architecture for better maintainability and code organization.

## Module Structure

### Core Modules

#### `data.js`
- **Purpose**: Data storage and persistence
- **Responsibilities**:
  - Manages global data structure
  - Handles localStorage operations
  - Provides save/load functions
  - Handles item deletion

#### `helpers.js`
- **Purpose**: Common utility functions
- **Responsibilities**:
  - Date helper functions (setToday, setTodayTime)
  - Tab switching
  - Template copying
  - Other shared utilities

#### `editing.js`
- **Purpose**: Inline editing functionality
- **Responsibilities**:
  - Click-to-edit table cells
  - Field type detection
  - Save/cancel editing operations
  - Field value formatting

### Feature Modules

#### `companies.js`
- Handles company tracking
- Add/update/delete companies
- Company table rendering
- Expandable details

#### `contacts.js`
- Handles contact management
- Add/update/delete contacts
- Contact table rendering
- Expandable details

#### `jobs.js`
- Handles job application tracking
- Add/update/delete jobs
- Job table rendering
- Syncs with dashboard spreadsheet

#### `followups.js`
- Handles follow-up task management
- Add/update/delete follow-ups
- Follow-up table rendering
- Overdue tracking

#### `interviews.js`
- Handles interview scheduling
- Add/update/delete interviews
- Interview table rendering
- Prep notes management

#### `dashboard.js`
- Handles dashboard statistics
- Master spreadsheet view
- Filtering and sorting
- Spreadsheet cell editing
- Quick add functionality
- Integrates with customization system

#### `customization.js`
- Column show/hide management
- **Drag-and-drop column reordering**
- Date format preferences
- User preference persistence
- Notion-style customization UI
- Default configuration management

#### `features.js` ⭐ NEW
- **Application Templates**: Auto-fill for SWE, Data, Consulting, Design, Research, Startup
- **Interview Prep Checklists**: 8-step auto-generated checklist when status = "Interview"
- **Co-op Cycle Tracker**: Northeastern-specific cycle tracking with proximity indicators
- **Networking Links**: Warm (🔥) vs Cold (❄️) application tracking
- Notification system for user feedback
- Helper functions for cycles and contacts

#### `batchActions.js`
- Multi-select functionality
- Bulk status updates
- Batch delete operations
- CSV export
- Selection state management

### Initialization

#### `main.js`
- Application entry point
- Initializes app on DOM ready
- Loads data from localStorage
- Initializes customization sidebar

## Load Order

Scripts must be loaded in this specific order (already configured in `index.html`):

1. `data.js` - Sets up data structure
2. `helpers.js` - Provides utilities
3. `editing.js` - Editing functionality
4. `customization.js` - Column & format preferences (with drag-drop)
5. `features.js` ⭐ **NEW** - Templates, checklists, cycles, networking
6. `batchActions.js` - Multi-select operations
7. `companies.js` - Company features
8. `contacts.js` - Contact features
9. `jobs.js` - Job features
10. `followups.js` - Follow-up features
11. `interviews.js` - Interview features
12. `dashboard.js` - Dashboard & spreadsheet
13. `main.js` - Initialization

## Best Practices

- ✅ Each module has a single, clear responsibility
- ✅ Dependencies are explicit (load order)
- ✅ Functions are well-documented
- ✅ Code is DRY (Don't Repeat Yourself)
- ✅ Easy to test individual modules
- ✅ Easy to add new features

## Adding New Features

1. Create a new module file (e.g., `analytics.js`)
2. Add it to `index.html` in the appropriate load order
3. Follow the existing module structure
4. Update this README

## File Sizes

- `data.js`: ~66 lines
- `helpers.js`: ~89 lines
- `editing.js`: ~157 lines
- `customization.js`: ~188 lines (with drag-drop!)
- `features.js`: ~250 lines ⭐ **NEW**
- `batchActions.js`: ~7 lines
- `companies.js`: ~113 lines
- `contacts.js`: ~68 lines
- `jobs.js`: ~150 lines (with checklists!)
- `followups.js`: ~78 lines
- `interviews.js`: ~78 lines
- `dashboard.js`: ~387 lines (with Today buttons!)
- `main.js`: ~18 lines

**Total**: ~1,650 lines (split across **13 focused modules**)
**Before**: 1,273 lines in one file ❌

**Much more maintainable, professional, and feature-rich!** ✅

## Key Enhancements

### Today Buttons in Spreadsheet (dashboard.js)
- Date cells now show "Today" button when editing
- Instant date filling
- Better UX than native date picker alone

### Drag-and-Drop Columns (customization.js)
- Full HTML5 drag-and-drop implementation
- Visual feedback with red border
- Order persists to localStorage

### Smart Features Module (features.js)
- **6 job templates** with pre-filled defaults
- **8-item interview checklist** with completion tracking
- **Co-op cycle tracking** with proximity calculation
- **Warm/cold networking** indicator
- **Notification system** for feedback

### Enhanced Jobs Module (jobs.js)
- Interview checklist display in table
- Co-op cycle and networking columns
- Populates dropdowns dynamically
- Cycle proximity indicators (🔥/⏰)

