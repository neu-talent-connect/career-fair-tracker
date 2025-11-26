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

### Initialization

#### `main.js`
- Application entry point
- Initializes app on DOM ready
- Loads data from localStorage

## Load Order

Scripts must be loaded in this specific order (already configured in `index.html`):

1. `data.js` - Sets up data structure
2. `helpers.js` - Provides utilities
3. `editing.js` - Editing functionality
4. `companies.js` - Company features
5. `contacts.js` - Contact features
6. `jobs.js` - Job features
7. `followups.js` - Follow-up features
8. `interviews.js` - Interview features
9. `dashboard.js` - Dashboard & spreadsheet
10. `main.js` - Initialization

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

- `data.js`: ~50 lines
- `helpers.js`: ~50 lines
- `editing.js`: ~250 lines
- `companies.js`: ~100 lines
- `contacts.js`: ~100 lines
- `jobs.js`: ~100 lines
- `followups.js`: ~80 lines
- `interviews.js`: ~100 lines
- `dashboard.js`: ~250 lines
- `main.js`: ~10 lines

**Total**: ~1,100 lines (split across 10 files)
**Before**: 1,273 lines in one file ❌

Much more maintainable! ✅

