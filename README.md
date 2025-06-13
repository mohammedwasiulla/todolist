# todolist# 📝 To-Do List App
live link :https://todolist-murex-pi.vercel.app/welcome.html
A simple, interactive to-do list web application built with vanilla HTML, CSS, and JavaScript. This app allows users to manage their daily tasks with full CRUD functionality and persistent storage.
with a ui on a click the funtionality starts depicting
## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks using the input field
- ✅ **Mark Complete** - Toggle task completion with strike-through styling
- ✅ **Edit Tasks** - Modify existing task content inline
- ✅ **Delete Tasks** - Remove tasks permanently
- ✅ **View Task Details** - Display task information with auto-hide

### Enhanced User Experience
- 🔄 **Persistent Storage** - Tasks saved to localStorage (survives page refresh)
- ⌨️ **Keyboard Support** - Press Enter to quickly add tasks
- 🎨 **Visual Feedback** - Completed tasks show strike-through and reduced opacity
- 📱 **Responsive Design** - Clean, user-friendly interface

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mohammedwasiulla/todo-list-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd todo-list-app
   ```

3. Open `index.html` in your web browser or use a local server

### File Structure
```
todo-list-app/
│
├── index.html          # Main HTML file
├── welcome.html        # Welcome page
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## 🎯 How to Use

1. **Adding Tasks**: 
   - Type your task in the input field
   - Click "Add Task" button or press Enter

2. **Managing Tasks**:
   - **Complete**: Click "Complete" to mark as done (adds strike-through)
   - **Edit**: Click "Edit" to modify task content
   - **Delete**: Click "Delete" to remove task
   - **View**: Click "View" to see task details (auto-hides after 3 seconds)

3. **Task Persistence**: 
   - Tasks are automatically saved to your browser's localStorage
   - Refresh the page - your tasks will still be there!

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure and semantics
- **CSS3** - Styling and visual effects
- **Vanilla JavaScript** - Interactive functionality

### Key JavaScript Features
- DOM manipulation for dynamic content
- Event listeners for user interactions
- localStorage API for data persistence
- Input validation and error handling

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Internet Explorer 11+

## 📋 Assignment Requirements Met

This project fulfills all specified requirements:

### HTML ✅
- Input field for new tasks
- "Add Task" button
- List container for displaying tasks

### CSS ✅
- Clean, user-friendly design
- Hover effects on task items
- Proper use of colors, spacing, and borders
- Styled buttons and interactive elements

### JavaScript ✅
- Add tasks via button click or Enter key
- Mark tasks as completed with strike-through
- Delete task functionality
- localStorage integration for data persistence

## 🔧 Code Structure

### Main Functions
- `addtask()` - Creates new tasks
- `createTaskElement()` - Builds task DOM elements
- `createTaskButtons()` - Adds interactive buttons to tasks
- `saveTasks()` - Persists data to localStorage
- `loadTasks()` - Retrieves saved tasks on page load
- `setupEnterKeySupport()` - Enables Enter key functionality


Project Link: https://todolist-murex-pi.vercel.app/welcome.html


⭐ **Star this repository if you found it helpful!** ⭐
