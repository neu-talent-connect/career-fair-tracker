# 🎯 Career Fair Tracking System

A comprehensive web application designed to help students manage their career fair experience, track companies, contacts, job applications, follow-ups, and interviews. Built with vanilla HTML, CSS, and JavaScript.

![Career Fair Tracker](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: Track companies contacted, applications sent, pending follow-ups, and scheduled interviews
- **Priority Companies**: Automatically displays top 5 companies by interest level
- **Upcoming Deadlines**: Shows the next 5 application deadlines

### 🏢 Company Management
- Track companies met at career fairs
- Rate interest level (1-5 scale)
- Store industry, booth number, recruiter information
- Track OPT/CPT friendly status
- Store application deadlines and key takeaways
- **Inline Editing**: Click any field to edit directly in the table

### 👥 Contact Management
- Store recruiter and professional contacts
- Track relationship strength (Cold/Warm/Hot)
- Store contact information (email, LinkedIn, phone)
- Categorize by connection type (Career Fair, Alumni, Faculty, etc.)
- **Inline Editing**: Update contact information with a single click

### 💼 Job Application Tracker
- Track job applications with status updates
- Monitor application deadlines
- Store salary information and job URLs
- Rate interest level for each position
- **Inline Editing**: Update application status and details instantly

### 📅 Follow-Up Reminder System
- Schedule follow-up tasks with due dates
- Set priority levels (High/Medium/Low)
- Track follow-up status (Pending/Completed/No Response)
- Visual warnings for overdue follow-ups
- **Inline Editing**: Modify follow-up details on the fly

### 🎤 Interview Preparation
- Schedule interviews with date/time
- Track interview type (Phone, Video, Technical, etc.)
- Store interviewer information
- Add preparation notes and questions
- **Inline Editing**: Update interview details anytime

### 📝 Email Templates
- Pre-written templates for common scenarios:
  - Post-career fair thank you emails
  - Alumni outreach messages
  - Follow-up emails (no response)
  - LinkedIn connection requests
  - Informational interview requests
- One-click copy to clipboard

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-fair-tracker.git
   cd career-fair-tracker
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python3 -m http.server 8000
     ```
     Then visit `http://localhost:8000`

### Usage

1. **Add Companies**: Navigate to the Companies tab and fill out the form with company information
2. **Track Contacts**: Add recruiter contacts in the Contacts tab
3. **Manage Applications**: Use the Jobs tab to track your job applications
4. **Set Follow-ups**: Schedule follow-up reminders in the Follow-Up tab
5. **Prepare for Interviews**: Add interview details in the Interviews tab
6. **Use Templates**: Copy email templates from the Templates tab

### Inline Editing

**Click any field** in the tables to edit it directly:
- Text fields become editable inputs
- Dropdown fields show select menus
- Date fields show date pickers
- Click "Save" to confirm or "Cancel" to discard changes

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **localStorage**: Client-side data persistence

## 📁 Project Structure

```
career-fair-tracker/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All stylesheets
├── js/
│   └── app.js          # Application logic
├── assets/
│   └── images/         # Image assets
├── README.md           # This file
├── LICENSE             # MIT License
└── CHANGELOG.md        # Version history
```

## 🎨 Features in Detail

### Data Persistence
All data is stored locally in your browser using `localStorage`. Your information never leaves your device.

### Responsive Design
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Designed for Northeastern University students
- Built with modern web standards
- Inspired by the need for better career fair organization

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for students navigating their career journey**

