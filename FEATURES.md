# New Features Documentation

## 1. Notion-Style Column Customization ⚙️

### Access
Click the **"⚙️ Customize View"** button in the Dashboard filters section.

### Features

#### Columns Tab
- **Show/Hide Columns**: Check/uncheck to control which columns appear in the spreadsheet
- **Default Columns**: Interest, Company, Position, Status, Date Applied, Deadline, Contact, Location, Salary, Resume, Cover Letter, Notes
- **Hidden by Default**: Date Posted, Contact Email, Contact Phone
- **Reset to Default**: Restore the original column configuration

#### Formatting Tab
- **Date Format Options**:
  - **Numeric**: `11/25/2024` - Traditional date format
  - **Short**: `Nov 25` - Abbreviated format
  - **Relative**: `in 5 days` / `2 weeks ago` - Time-based format
- All dates in the spreadsheet update based on your preference
- Great for deadline tracking!

### Data Storage
Your preferences are saved to localStorage and persist across sessions.

---

## 2. Batch Actions 📦

### How to Use
1. **Select Rows**: Check the checkbox on the left of any application row
2. **Select All**: Check the box in the header to select all visible applications
3. **Batch Actions Bar**: Appears at the bottom when items are selected

### Available Actions
- **Mark Submitted**: Update multiple applications to "Submitted" status
- **Mark Interview**: Update multiple applications to "Interview" status
- **Archive**: Bulk mark as "Rejected" (useful for old applications)
- **Export CSV**: Download selected applications as a spreadsheet file
- **Delete**: Permanently remove selected applications (with confirmation)
- **Clear**: Deselect all items

### Use Cases
- End of application season: Archive all old applications
- Export your top picks to share with advisors
- Quickly update status after a career fair
- Clean up rejected applications

---

## 3. Deadline Urgency Colors 🚦

### Automatic Color Coding
Deadlines are color-coded based on time remaining:

- 🟢 **Green** (Safe): More than 2 weeks away
- 🟡 **Yellow** (Soon): 1-2 weeks away
- 🟠 **Orange** (Warning): 3-7 days away
- 🔴 **Red** (Urgent): Less than 3 days away
- ⚫ **Strikethrough** (Overdue): Past deadline

### Benefits
- Instantly see which applications need immediate attention
- No more missed deadlines
- Visual prioritization of your work
- Works with relative date format ("in 3 days")

---

## 4. Enhanced Date Entry 📅

### Today Buttons
Every date input now has a **red "Today" button** that:
- Instantly fills in today's date
- Saves time vs. calendar navigation
- More visible and prominent design

### Where They Appear
- Jobs: Date Posted, Date Applied, Deadline
- Companies: Application Deadline
- Follow-ups: Due Date
- Interviews: Interview Date (shows "Now" for datetime)

---

## 5. CSV Export

### Individual Export
Click the batch export button after selecting applications.

### File Format
```csv
Company,Position,Status,Date Posted,Date Applied,Deadline,Contact,Email,Phone,Location,Salary,Resume,Cover Letter,Notes
"Google","SWE","Submitted","11/20/2024","11/25/2024","12/01/2024","Jane Smith","jane@google.com","555-1234","Boston, MA","$120k","Tailored","Submitted","Great opportunity"
```

### Use Cases
- Share with career advisors
- Import into other tracking tools
- Backup your data
- Create reports

---

## Keyboard Shortcuts (Future)
Coming soon:
- `Cmd/Ctrl + A`: Select all
- `Cmd/Ctrl + Shift + E`: Export
- `Delete`: Delete selected
- `T`: Set date to today

---

## Best Practices

### For Northeastern Students

1. **Use Relative Dates** for deadline tracking
   - Easier to see "in 5 days" vs "12/01/2024"

2. **Hide Columns You Don't Use**
   - Simplifies the view
   - Focus on what matters to you

3. **Batch Actions After Career Fairs**
   - Add all companies quickly
   - Then batch update statuses as you apply

4. **Export Before Each Co-op Cycle**
   - Keep records of your applications
   - Track improvement over cycles

5. **Color-Code Priorities**
   - Use urgency colors to prioritize daily work
   - Green = can wait, Red = do today

---

## Technical Details

### New Modules Added
- `customization.js` - Column and formatting preferences
- `batchActions.js` - Multi-select and bulk operations

### Data Structure
```javascript
userPreferences: {
    columns: [
        { id: 'company', name: 'Company', visible: true, order: 0 }
    ],
    dateFormat: 'relative' // 'numeric', 'short', 'relative'
}
```

### Performance
- Filters and customization work on client-side only
- No server requests
- Instant updates
- Works offline

---

## Future Enhancements

Based on user feedback, we plan to add:
1. Custom columns (add your own fields)
2. Column reordering (drag-and-drop)
3. Application templates by job type
4. Co-op cycle tracker (NEU-specific)
5. Skills gap analysis
6. Offer comparison tool

See main documentation for full roadmap.

