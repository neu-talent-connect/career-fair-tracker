Job Tracker for Co-op Apps

I built this during my co-op search because honestly NUWorks is kind of a mess and I wanted something simpler that actually worked the way I think about applications. It's basically a spreadsheet that saves to your browser so you don't need to set up any database or account.

What it does:
- Track job applications with all the info you actually need (company, position, status, deadlines, etc)
- Dashboard view that looks like a spreadsheet where you can click to edit any cell
- Company and contact tracking for networking (super important at NEU)
- Interview scheduler with prep notes
- Follow-up reminders so you don't forget to reach out
- Some email templates for the standard stuff

Features I added because they were useful:
- Application templates that auto-fill common fields for SWE/data science/consulting roles
- Color-coded deadlines so you can see what's urgent
- Batch actions to update multiple apps at once (helpful after career fairs)
- Co-op cycle tracking with NEU's spring/summer/fall cycles
- You can link contacts to applications to see which ones are "warm" vs cold applications
- Customizable columns - hide what you don't use
- Different date formats (I like the relative one that shows "in 5 days")

Technical stuff:
- Pure vanilla JavaScript, no frameworks
- Everything is modular - split into separate files instead of one giant app.js
- Uses localStorage for data persistence (nothing hits a server, all local)
- Northeastern colors because why not

How to use:
Just open index.html in your browser. That's it.

The code is split into modules:
- data.js - handles data storage
- dashboard.js - spreadsheet view
- jobs.js, companies.js, contacts.js, interviews.js, followups.js - each tab's functionality  
- customization.js - column settings and preferences
- features.js - templates, checklists, co-op cycle stuff
- helpers.js - utility functions
- editing.js - inline cell editing
- batchActions.js - multi-select operations
- analytics.js - pipeline visualization

Mobile responsive and works offline since it's all client-side.

