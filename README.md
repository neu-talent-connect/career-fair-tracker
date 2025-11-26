# Job / Co-op Tracker

A simple web app for Northeastern students to track job and co-op applications, companies, contacts, follow-ups, and interviews. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Master Spreadsheet**: Excel-style view of all applications with click-to-edit cells, sorting, and filtering
- **Companies**: Track companies met at career fairs with interest levels, recruiter info, and notes
- **Contacts**: Store recruiter and professional contacts with relationship tracking
- **Jobs**: Detailed job application forms with contact info, resume versions, cover letter status
- **Follow-ups**: Schedule and track follow-up tasks
- **Interviews**: Schedule interviews and store preparation notes
- **Email Templates**: Pre-written templates for thank you emails, follow-ups, etc.
- **Smart Filtering**: Filter by status, interest level, or search by company/position
- **Northeastern Colors**: Styled in official Northeastern red and black

All data is stored locally in your browser using localStorage. No account or server needed.

## Usage

Click on any field in the tables to edit it directly. Click "Save" to confirm or "Cancel" to discard changes.

## Architecture

This project uses a **modular JavaScript architecture** for maintainability:

- **10 separate modules** instead of one monolithic file
- Each module has a single responsibility
- Clean separation of concerns
- Easy to test and extend

See `/js/README.md` for full architecture documentation.

