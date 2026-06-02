# 📝 Task Master - Advanced Task Management Application

A modern, feature-rich task management application built with vanilla JavaScript, featuring task categorization, priority levels, subtasks, dark mode, and comprehensive statistics.

## ✨ Features

### 📋 Task Management
- **Add & Manage Tasks**: Create tasks with name, description, category, priority, and deadline
- **Task Filtering**: Filter by status (All, Active, Completed, Pinned)
- **Categories**: Organize tasks into 6 categories - Study, Work, Personal, Health, Shopping
- **Priority Levels**: Set task priority as High, Medium, or Low with color-coded badges
- **Subtasks**: Add multiple subtasks to break down complex tasks
- **Pin Tasks**: Pin important tasks to the top of the list
- **Search**: Real-time search across task names and descriptions
- **Deadline Tracking**: Set deadlines and get visual status indicators (Overdue, Today, Upcoming)
- **Recurring Tasks**: Set tasks to repeat daily, weekly, or monthly
- **Reminders**: Configure reminders (5 min, 15 min, 1 hour, 1 day before)

### 🌙 Dark Mode
- **Toggle Dark Mode**: Easy one-click dark mode switching
- **Local Storage**: Dark mode preference persists across sessions
- **Full Coverage**: All UI elements fully styled for dark mode

### 📊 Statistics & Analytics
- **Progress Dashboard**: Visual progress bar showing completion percentage
- **Task Statistics**: Track total, completed, and remaining tasks
- **Completion Rate**: View overall completion percentage
- **Category Breakdown**: See task count by category
- **Priority Distribution**: View task distribution by priority
- **Daily Goals**: Set and track daily task completion goals

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Responsive Layout**: Fully responsive for desktop, tablet, and mobile
- **Sidebar Navigation**: Easy access to filters, categories, and priorities
- **Modal Dialogs**: Edit tasks and view statistics in elegant modals
- **Progress Indicators**: Visual progress bar for completion tracking
- **Notifications**: Toast notifications for user actions

### 💾 Data Persistence
- **Local Storage**: All tasks and preferences saved to browser storage
- **Auto-Save**: Changes automatically saved without manual action
- **Data Sync**: Preferences (dark mode, goals) persist across sessions

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **State Management**: Class-based JavaScript with localStorage
- **Styling**: Custom CSS with CSS variables and responsive design
- **Animations**: CSS3 animations and transitions

## 📁 Project Structure

```
poonam trial web app/
├── index.html          # Main HTML structure
├── main.js             # Application logic (TaskManager class)
├── style.css           # All styling and responsive design
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies
└── README.md          # This file
```

## 🚀 Quick Start

### Installation

1. **Extract the project**
```bash
cd "poonam trial web app"
```

2. **Install dependencies** (optional, for development)
```bash
npm install
```

3. **Open in browser**
Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node (live-server)
npx live-server
```

Then navigate to `http://localhost:8000` (or the port shown)

### For Development with Vite
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📖 Usage Guide

### Creating Tasks

1. **Quick Add**: Use the input field in the main content area
   - Enter task name
   - Select category, priority, deadline, and repeat settings
   - Click "Add Task" button

2. **Detailed Add**: Click the "➕ New Task" button in the sidebar
   - Opens modal for comprehensive task details
   - Add name, description, category, priority, deadline
   - Add subtasks and set reminders
   - Click "Save Task"

### Managing Tasks

- **Complete Task**: Click the checkbox next to the task
- **Pin Task**: Click the pin icon (☐/📌) to pin/unpin
- **Edit Task**: Click the pencil icon (✏️) to edit details
- **Delete Task**: Click the trash icon (🗑️) to remove
- **Add Subtasks**: Open task modal and add subtasks

### Filtering & Organizing

- **Status Filter**: All Tasks, Active, Completed, Pinned
- **Category Filter**: Study, Work, Personal, Health, Shopping
- **Priority Filter**: All Priorities, High, Medium, Low
- **Search**: Use the search box to find tasks by name or description

### Tracking Progress

- **Progress Bar**: Shows percentage of tasks completed
- **Statistics Modal**: Click 📊 button to view:
  - Total tasks and completion stats
  - Tasks by category and priority
  - Daily goal tracking

### Dark Mode

- Click the 🌙 button in the header to toggle dark mode
- Your preference is automatically saved
- All UI elements adapt to dark theme

### Setting Daily Goals

1. Click the 📊 Statistics button
2. Scroll to "🎯 Daily Goal" section
3. Enter number of tasks to complete
4. Click "Set Goal"
5. View your progress in the goal status section

## 🎨 UI Components

### Task Item
- Checkbox for completion status
- Task name (strikethrough when completed)
- Priority badge (High/Medium/Low with colors)
- Category badge
- Deadline info with status (Overdue/Today/Upcoming)
- Recurring indicator
- Action buttons (Edit/Delete)
- Subtasks list (if any)

### Sidebar
- Quick Actions (New Task, Set Goal)
- Status Filters (All/Active/Completed/Pinned)
- Category Buttons (6 categories)
- Priority Filters (All/High/Medium/Low)

### Modals
- **Task Details Modal**: Create/edit tasks with full details
- **Statistics Modal**: View analytics and set goals

## 💾 Data Storage

All data is stored in the browser's LocalStorage:
- **tasks**: Array of all tasks with details
- **dailyGoal**: Daily task completion goal
- **darkMode**: Dark mode preference

Data persists until:
- User clears browser cache/storage
- User manually deletes data

## 🎯 Keyboard Shortcuts

- **Tab**: Navigate between elements
- **Enter**: Submit forms, add tasks
- **Escape**: Close modals
- **Click outside**: Close modals

## 🐛 Troubleshooting

### Dark Mode Not Working?
- Ensure JavaScript is enabled
- Check browser console for errors (F12)
- Try refreshing the page

### Tasks Not Saving?
- Check if localStorage is enabled in browser
- Verify browser privacy settings
- Check available storage space

### Buttons Not Responding?
- Ensure main.js is loaded (check Network tab in F12)
- Clear browser cache and reload
- Try a different browser

## 📊 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Limited support

## 🔒 Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Your tasks are completely private

## 📝 License

This project is free to use and modify for personal use.

## 👨‍💻 Development Notes

### File Sizes
- `main.js`: ~25KB (unminified)
- `style.css`: ~20KB
- `index.html`: ~10KB

### Performance
- Loads in <1 second on modern browsers
- Minimal memory footprint
- Smooth 60fps animations

### Key Classes & Methods

**TaskManager Class**
- `addTask()`: Create new task
- `deleteTask()`: Remove task
- `updateTask()`: Modify task
- `toggleTaskComplete()`: Mark complete/incomplete
- `getFilteredTasks()`: Apply filters
- `getStatistics()`: Calculate stats
- `toggleDarkMode()`: Enable/disable dark mode

## 🚀 Future Enhancements

Potential features for future versions:
- Cloud sync with account login
- Collaborative tasks
- Task templates
- Recurring task auto-generation
- Custom categories
- Drag-and-drop reordering
- Task time tracking
- Export to calendar
- Mobile app (React Native)
- API integration

## 📞 Support

For issues or suggestions:
1. Check the troubleshooting section
2. Clear cache and try again
3. Test in a different browser
4. Check browser console for errors (F12 → Console)

---

**Made with ❤️ by Poonam Yadav**

Last Updated: June 2, 2026

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| H | Jump to Home |
| A | Jump to About |
| S | Jump to Skills |
| P | Jump to Projects |
| C | Jump to Contact |

## 🎨 Customization

### Update Personal Information

**Edit index.html:**
- Change name "Poonama Yadav" to your name
- Update email, phone, and location
- Modify project descriptions and links
- Update social media links

### Change Colors

**Edit style.css - CSS Variables section:**
```css
:root {
    --primary: #667eea;      /* Primary gradient color */
    --secondary: #764ba2;    /* Secondary gradient color */
    --tertiary: #f093fb;     /* Tertiary accent color */
    --accent: #f5576c;       /* Accent color */
    /* ... more colors ... */
}
```

### Modify Animations

All animations are in **style.css** under the @keyframes rules:
- `gradientShift` - Gradient text animation
- `bounce` - Scroll indicator bounce
- `fillWidth` - Progress bar fill animation
- `fadeIn` - Fade in animation

### Customize 3D Scene

Edit **main.js** in the `initThreeJS()` function:
- Change particle count and colors
- Modify cube geometry and materials
- Adjust lighting
- Change animation speeds

## 📦 Dependencies

### Runtime Dependencies
- **three** (v128+) - 3D graphics library
- **aos** (v2.3.4+) - Animate on scroll library

### Dev Dependencies
- **vite** (v4.3.9+) - Build tool and dev server

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Canvas not showing?
- Ensure JavaScript is enabled
- Check browser console for errors
- Clear browser cache and reload

### Scroll animations not working?
- Verify AOS library is loaded
- Check that data-aos attributes are present
- Ensure CSS is properly linked

### 3D scene performance issues?
- Reduce particle count in `initThreeJS()`
- Disable parallax effect on mobile
- Use lower quality textures

## 📝 License

This portfolio template is open source and free to use for personal projects.

## 💡 Tips for Best Results

1. **Update all contact information** with your actual details
2. **Add your real projects** with descriptions and links
3. **Customize the color scheme** to match your brand
4. **Add your real images** to project cards
5. **Test on multiple devices** to ensure responsiveness
6. **Update skills** to match your actual expertise
7. **Deploy to a web server** for sharing

## 🚀 Deployment Options

### Netlify
1. Push to GitHub
2. Connect to Netlify
3. Deploy automatically on push

### Vercel
1. Create account on Vercel
2. Import project from GitHub
3. Deploy with one click

### GitHub Pages
1. Create gh-pages branch
2. Push dist folder to gh-pages
3. Enable GitHub Pages in settings

## 📞 Need Help?

Refer to:
- [Three.js Documentation](https://threejs.org/docs/index.html)
- [AOS Documentation](https://michalsnik.github.io/aos/)
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

## ⭐ Credit

Built with ❤️ using modern web technologies.

---

**Happy coding! Make this portfolio your own and showcase your amazing work! 🎉**
