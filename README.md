Job Application Tracker

A simple job application tracker built for students who need an easier way to organize their job search. Created from a workshop idea to help beginners who don't know where to start or just want an alternative to building a Google spreadsheet from scratch.

What it does:
Track everything in one place - job applications, companies from career fairs, networking contacts, and follow-up reminders.

Main Features:
- Spreadsheet dashboard where you can click any cell to edit
- Add applications with a simple form (basic fields shown by default, more fields available if needed)
- Career fair tracker for companies you meet before applying
- Contact manager for networking
- Follow-up reminders so you don't forget to reach out
- Email templates for thank you notes and outreach
- Export your data to CSV
- Load sample data to see how it works

Built for beginners:
- Shows only 7 essential columns by default (Company, Position, Status, Interest, Deadline, Applied Date, Notes)
- Advanced fields are hidden but available with one click
- "Today" buttons on all date fields for quick entry
- Works offline - everything saves in your browser
- No account or setup needed

Technical:
Pure vanilla JavaScript, no frameworks. Split into focused modules for clean code:
- data.js - handles data storage
- dashboard.js - spreadsheet view
- jobs.js, companies.js, contacts.js, followups.js, interviews.js - each feature
- customization.js - column settings and preferences
- features.js - application cycles and utilities
- helpers.js - utility functions like CSV export
- editing.js - inline cell editing
- batchActions.js - multi-select operations

How to use:
Open index.html in your browser. Click "Load Sample Data" to see examples, or go to Applications tab to add your first job.

Customization:
- Click "Customize View" to show/hide columns
- Drag columns to reorder them
- Choose between numeric, short, or relative date formats
- Use "Quick View" for minimal columns or "Full View" for everything

Mobile responsive and works on all modern browsers.
