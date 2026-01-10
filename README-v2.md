# Career Fair Tracker - Professional Edition

A modern, full-stack job application tracker built with Next.js, TypeScript, and Tailwind CSS. Track your career fair connections, job applications, networking contacts, and follow-ups in one beautiful, professional platform.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

### 📊 Dashboard
- **Interactive Statistics**: Real-time overview of your job search progress
- **Beautiful Charts**: Visualize your application status, interest levels, and monthly activity with Recharts
- **Editable Spreadsheet**: Click any cell to edit inline - fast and intuitive
- **Smart Filters**: Filter by status, interest level, application cycle, or search
- **CSV Export**: Export your data anytime

### 🎪 Career Fair Tracker
- Track companies you meet before applying
- Record recruiter names, booth numbers, and conversation notes
- OPT/CPT sponsorship tracking
- Priority scoring system (1-5 interest levels)

### 💼 Job Applications
- Comprehensive application form with basic and advanced fields
- Track status from "Not Started" to "Offer"
- Store job URLs, contact information, resume versions
- Application cycle management
- Recent applications list with quick actions

### 👥 Networking Hub
- **Contacts Management**: Store recruiter and professional contacts
- **Follow-up Reminders**: Never miss a follow-up again
- **Overdue Alerts**: Visual warnings for overdue tasks
- **Relationship Tracking**: Cold, Warm, or Hot connections
- **Quick Actions**: Email, call, or LinkedIn with one click

### 📝 Resources
- 5+ professional email templates
- Career fair thank-you notes
- Alumni outreach messages
- Follow-up templates
- LinkedIn connection requests
- Copy-to-clipboard functionality

### 🎨 User Experience
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Polished transitions and interactions
- **Type-Safe**: Full TypeScript coverage for reliability
- **Accessible**: Built with accessibility best practices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-fair-tracker.git
   cd career-fair-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS
- **Recharts** - Beautiful, composable charts
- **Lucide React** - Modern icon library
- **Framer Motion** - Smooth animations
- **date-fns** - Modern date utilities

### Data Management
- **localStorage** - Client-side persistence (Phase 1)
- Custom React hooks for data management
- Type-safe data operations

### Code Quality
- ESLint configuration
- TypeScript strict mode
- Consistent code formatting

## 📁 Project Structure

```
career-fair-tracker/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Dashboard page
│   ├── career-fairs/        # Career fair tracker
│   ├── applications/        # Job application form
│   ├── networking/          # Contacts & follow-ups
│   ├── resources/           # Email templates
│   ├── layout.tsx           # Root layout with navigation
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── dashboard/           # Dashboard components
│   │   ├── StatsCards.tsx
│   │   ├── Charts.tsx
│   │   └── SpreadsheetTable.tsx
│   ├── Navigation.tsx       # Main navigation
│   └── ThemeProvider.tsx    # Dark mode provider
├── hooks/
│   ├── useLocalStorage.ts   # localStorage hook
│   └── useAppData.ts        # Data management hook
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
└── legacy/                  # Original vanilla JS version
```

## 🎯 Key Features Explained

### Inline Editing
Click any cell in the dashboard spreadsheet to edit inline. Changes are saved automatically to localStorage.

### Smart Filtering
Combine multiple filters to find exactly what you're looking for:
- Status filter (Not Started, In Progress, Submitted, etc.)
- Interest level (1-5)
- Application cycle
- Free text search across company and position

### Charts & Analytics
- **Pie Chart**: Visual breakdown of application statuses
- **Bar Chart**: Distribution of interest levels
- **Timeline Chart**: Monthly application activity
- Real-time updates as you add data

### Dark Mode
System-aware dark mode that remembers your preference. Toggle with the button in the navigation bar.

## 🔮 Coming in Phase 2

- **PostgreSQL Database**: Move from localStorage to a real database
- **User Authentication**: Multi-user support with NextAuth.js
- **API Routes**: RESTful API for all operations
- **Real-time Sync**: Automatic synchronization across devices
- **Email Integration**: Send emails directly from the app
- **File Uploads**: Attach resumes and cover letters
- **Advanced Analytics**: More charts and insights

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

See LICENSE file for details.

## 🙋‍♂️ About

Built as a showcase of modern web development skills using:
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for beautiful UI
- Recharts for data visualization
- Best practices for React and Next.js

Perfect for demonstrating to companies like Wayfair, Amazon, Google, and other tech companies.

---

**Original Version**: The vanilla JavaScript version is preserved in the `/legacy` folder.

**Version**: 2.0.0 (Phase 1 Complete)
