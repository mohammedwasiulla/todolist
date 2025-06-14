// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            createTaskElement(task.content, task.completed);
        });
    }
}

// Save tasks to localStorage
function saveTasks() {
    const tasklist = document.getElementById('tasklist');
    const tasks = [];
    tasklist.querySelectorAll('li').forEach(taskItem => {
        const taskSpan = taskItem.querySelector('span');
        const isCompleted = taskSpan.style.textDecoration === 'line-through';
        tasks.push({
            content: taskSpan.textContent,
            completed: isCompleted
        });
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Create task element (separated for reuse)
function createTaskElement(taskContent, isCompleted = false) {
    const newtask = document.createElement('li');
    const tasklist = document.getElementById('tasklist');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskContent;
    taskSpan.style.cursor = 'pointer';

    if (isCompleted) {
        taskSpan.style.textDecoration = 'line-through';
        taskSpan.style.opacity = '0.6';
    }

    newtask.appendChild(taskSpan);

    // Container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('task-buttons');
    newtask.appendChild(buttonContainer);

    // Complete Button
    const completebtn = document.createElement('button');
    completebtn.textContent = isCompleted ? "Uncomplete" : "Complete";
    completebtn.classList.add('task-btn', 'complete');
    completebtn.onclick = function () {
        const completed = taskSpan.style.textDecoration === 'line-through';
        taskSpan.style.textDecoration = completed ? 'none' : 'line-through';
        taskSpan.style.opacity = completed ? '1' : '0.6';
        completebtn.textContent = completed ? 'Complete' : 'Uncomplete';
        saveTasks();
    };
    buttonContainer.appendChild(completebtn);

    // Edit Button
    const editbtn = document.createElement('button');
    editbtn.textContent = "Edit";
    editbtn.classList.add('task-btn', 'edit');
    editbtn.onclick = function () {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskSpan.textContent;
        newtask.insertBefore(input, taskSpan);
        taskSpan.style.display = 'none';
        editbtn.textContent = 'Save';

        editbtn.onclick = function () {
            taskSpan.textContent = input.value.trim();
            taskSpan.style.display = 'inline';
            input.remove();
            editbtn.textContent = 'Edit';
            saveTasks();
        };
    };
    buttonContainer.appendChild(editbtn);

    // Delete Button
    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    deletebtn.onclick = function () {
        newtask.remove();
        saveTasks();
    };
    buttonContainer.appendChild(deletebtn);

    // View Button
    const viewbtn = document.createElement('button');
    viewbtn.textContent = "View";
    viewbtn.classList.add('task-btn', 'view');
    viewbtn.onclick = function () {
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.textContent = `Task: ${taskSpan.textContent}`;
        newtask.appendChild(taskDetails);
        setTimeout(() => {
            taskDetails.remove();
        }, 3000);
    };
    buttonContainer.appendChild(viewbtn);

    // Toggle button visibility on click
    taskSpan.onclick = function (e) {
        document.querySelectorAll('.task-buttons').forEach(btns => {
            if (btns !== buttonContainer) btns.classList.remove('show');
        });
        buttonContainer.classList.toggle('show');
        e.stopPropagation();
    };

    tasklist.appendChild(newtask);

    // Add guidance message once
    if (!document.getElementById('task-instruction')) {
        const infoMsg = document.createElement('p');
        infoMsg.id = 'task-instruction';
        infoMsg.textContent = 'ℹ️ Click on a task to view options like Edit, Complete, or Delete.';
        infoMsg.style.fontStyle = 'italic';
        infoMsg.style.color = '#555';
        tasklist.parentElement.insertBefore(infoMsg, tasklist);
    }
}

// Add task function
function addtask() {
    const taskInput = document.getElementById('inputtask');
    const taskContent = taskInput.value.trim();
    if (!taskContent) {
        alert("Please enter a task!");
        return;
    }
    createTaskElement(taskContent);
    taskInput.value = '';
    saveTasks();
}

// Setup Enter key support
function setupEnterKeySupport() {
    const taskInput = document.getElementById('inputtask');
    if (taskInput) {
        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addtask();
            }
        });
    }
}

// Hide buttons when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.task-buttons').forEach(btns => {
        btns.classList.remove('show');
    });
});

// Page load setup
window.onload = () => {
    if (!sessionStorage.getItem('visited')) {
        window.location.href = 'welcome.html';
    }
    loadTasks();
    setupEnterKeySupport();
};
