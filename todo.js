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
    if (isCompleted) {
        taskSpan.style.textDecoration = 'line-through';
        taskSpan.style.opacity = '0.6';
    }
    newtask.appendChild(taskSpan);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.style.display = 'none';

    // Add buttons to the container
    const completebtn = document.createElement('button');
    completebtn.textContent = taskSpan.style.textDecoration === 'line-through' ? "Uncomplete" : "Complete";
    completebtn.classList.add('task-btn', 'complete');
    completebtn.onclick = function () {
        if (taskSpan.style.textDecoration === 'line-through') {
            taskSpan.style.textDecoration = 'none';
            taskSpan.style.opacity = '1';
            completebtn.textContent = 'Complete';
        } else {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.opacity = '0.6';
            completebtn.textContent = 'Uncomplete';
        }
        saveTasks();
    };
    buttonContainer.appendChild(completebtn);

    // const editbtn = document.createElement('button');
    // editbtn.textContent = "Edit";
    // editbtn.classList.add('task-btn', 'edit');
    // editbtn.onclick = function () {
    //     const taskEditInput = document.createElement('input');
    //     taskEditInput.type = 'text';
    //     taskEditInput.value = taskSpan.textContent;
    //     newtask.insertBefore(taskEditInput, taskSpan);
    //     taskSpan.style.display = 'none';
    //     editbtn.textContent = 'Save';
    //     editbtn.onclick = function () {
    //         taskSpan.textContent = taskEditInput.value.trim();
    //         taskSpan.style.display = 'inline';
    //         taskEditInput.remove();
    //         editbtn.textContent = 'Edit';
    //         saveTasks();
    //     };
    // };
    // buttonContainer.appendChild(editbtn);

    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    deletebtn.onclick = function () {
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
    
    // Create task text span
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskContent;
    if (isCompleted) {
        taskSpan.style.textDecoration = 'line-through';
        taskSpan.style.opacity = '0.6';
    }
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.style.display = 'none'; // Initially hidden
    
    // Create Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'task-btn';
    completeBtn.onclick = function(event) {
        if (taskSpan.style.textDecoration === 'line-through') {
            taskSpan.style.textDecoration = 'none';
            taskSpan.style.opacity = '1';
        } else {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.opacity = '0.6';
        }
        saveTasks();
        event.stopPropagation();
    };
    
    // Create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'task-btn';
    deleteBtn.onclick = function(event) {
        if (confirm('Are you sure you want to delete this task?')) {
            newtask.remove();
            saveTasks();
        }
        event.stopPropagation();
    };
    
    // Create View button (optional - you can customize this)
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.className = 'task-btn';
    viewBtn.onclick = function(event) {
        alert('Task: ' + taskContent);
        event.stopPropagation();
    };
    
    // Append buttons to container
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(viewBtn);
    
    // Append elements to task item
    newtask.appendChild(taskSpan);
    newtask.appendChild(buttonContainer);
    
    // Add click event to show buttons when task is clicked
    taskSpan.addEventListener('click', function(event) {
        // Hide all other button containers first
        document.querySelectorAll('.button-container').forEach(container => {
            container.style.display = 'none';
        });
        // Show this task's buttons
        buttonContainer.style.display = 'flex';
        event.stopPropagation();
    });
    
    tasklist.appendChild(newtask);
}

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

function setupEnterKeySupport() {
    const taskInput = document.getElementById('inputtask');
    if (taskInput) {
        taskInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addtask();
            }
        });
    }
}

// Display helper message under the Quick Paste heading
function showTaskHint() {
    const hintMsg = document.createElement('div');
    hintMsg.textContent = 'ℹ️ Click on task content to mark or Delete.';
    hintMsg.style.fontSize = '14px';
    hintMsg.style.marginTop = '10px';
    hintMsg.style.color = '#555';
    const heading = document.querySelector('.header');
    if (heading) {
        heading.insertAdjacentElement('afterend', hintMsg);
    }
}

// Hide buttons when clicking outside
document.addEventListener('click', function () {
    document.querySelectorAll('.button-container').forEach(container => {
        container.style.display = 'none';
    });
});

window.onload = () => {
    if (!sessionStorage.getItem('visited')) {
        window.location.href = 'welcome.html';
    }
    loadTasks();
    setupEnterKeySupport();
    showTaskHint();
};
