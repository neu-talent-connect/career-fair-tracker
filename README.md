# Job / Co-op Tracker

A professional web application for Northeastern University students to track job and co-op applications, companies, contacts, follow-ups, and interviews. Built with modern vanilla HTML, CSS, and JavaScript.

## ✨ Features

### 🎯 Smart Application Tracking
- **Application Templates**: Auto-fill forms for SWE, Data Science, Consulting, Design, Research, and Startup positions
- **Interview Prep Checklists**: Automatically generated 8-step prep checklist when status = "Interview"
- **Warm/Cold Tracking**: Link applications to network contacts - see which are "warm" (🔥) vs "cold" (❄️)
- **Co-op Cycle Tracker**: Northeastern-specific cycle planning with urgency indicators (🔥 imminent, ⏰ upcoming)

### 📊 Notion-Style Spreadsheet
- **Drag-and-Drop Column Reordering**: Customize your view by dragging columns into your preferred order
- **Show/Hide Columns**: Focus on what matters to you
- **Inline Editing**: Click any cell to edit directly (with Today buttons for dates!)
- **Date Format Options**: Choose numeric (11/25), short (Nov 25), or relative (in 5 days)
- **Deadline Urgency Colors**: Visual priority system (🔴 red = urgent, 🟢 green = safe)
- **Custom Filters**: By status, interest, cycle, with text search
- **Batch Actions**: Update multiple applications at once

### 📋 Core Functionality
- **Companies**: Track companies from career fairs with interest levels and recruiter info
- **Contacts**: Professional network database with relationship tracking
- **Jobs**: Detailed applications with 15+ customizable fields
- **Follow-ups**: Never miss a deadline or networking opportunity
- **Interviews**: Schedule and track with integrated prep checklists
- **Email Templates**: Professional templates for thank you notes and follow-ups

### ⚡ Quick Actions
- **Today Buttons**: One-click date entry everywhere (forms AND spreadsheet cells)
- **Template Quick-Fill**: Save 2-3 minutes per application
- **Batch Operations**: Update 10+ applications in seconds
- **Smart Sorting**: By any column, ascending or descending

All data is stored locally in your browser using localStorage. No account or server needed - your data never leaves your device.

## 🎓 Built for Northeastern Students

This tracker is specifically designed for the Northeastern co-op experience:

- **Co-op Cycles**: Track Spring, Summer, Fall cycles
- **Networking Focus**: Differentiate warm vs cold applications (networking is key!)
- **Template Library**: Pre-configured for common NEU co-op positions
- **Career Fair Ready**: Batch entry for when you meet 20+ companies
- **Interview Prep**: Built-in checklist for busy students juggling classes + recruiting

## 💻 Usage

Simply open `index.html` in your browser or visit the GitHub Pages deployment.

**Tips:**
- Use **Application Templates** to quick-fill common job types
- Click any spreadsheet cell to edit (including dates with Today buttons!)
- Drag columns in **Customize View** to reorder them
- Link contacts to jobs to track warm vs cold applications
- Interview status auto-creates a prep checklist

## 🏗️ Architecture

This project uses a **professional modular architecture** for maintainability:

- **13 focused modules** instead of one monolithic file
- Clear separation of concerns (data, UI, editing, features)
- Each module has a single responsibility
- Clean, documented, and testable code
- Easy to extend with new features

### Module Overview
- `data.js` - State management
- `features.js` - Templates, checklists, cycles, networking
- `customization.js` - Column customization & drag-drop
- `dashboard.js` - Spreadsheet view
- `jobs.js`, `companies.js`, `contacts.js`, etc. - Tab-specific logic

See `/js/README.md` for full architecture documentation.

## 📚 Documentation

- **NEW_FEATURES_GUIDE.md** - Comprehensive guide with workflows and pro tips
- **js/README.md** - Technical architecture documentation

## 🎨 Design

- **Modern & Clean**: Apple-inspired aesthetics with refined typography
- **Professional**: Suitable for showing to employers or advisors
- **Northeastern Branding**: Official red (#C8102E), black, and warm gray colors
- **Accessible**: High contrast, clear labels, keyboard navigation
- **Mobile-Responsive**: Works on all screen sizes

