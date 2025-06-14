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

// Create task element with buttons shown only on click
function createTaskElement(taskContent, isCompleted = false) {
    const newtask = document.createElement('li');
    const tasklist = document.getElementById('tasklist');

    // Task content
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskContent;
    if (isCompleted) {
        taskSpan.style.textDecoration = 'line-through';
        taskSpan.style.opacity = '0.6';
    }
    newtask.appendChild(taskSpan);

    // Button container (hidden by default)
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'none';
    newtask.appendChild(buttonContainer);

    // COMPLETE button
    const completebtn = document.createElement('button');
    completebtn.textContent = isCompleted ? "Uncomplete" : "Complete";
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

    // EDIT button
    const editbtn = document.createElement('button');
    editbtn.textContent = "Edit";
    editbtn.classList.add('task-btn', 'edit');
    buttonContainer.appendChild(editbtn);

    editbtn.onclick = function () {
        const taskEditInput = document.createElement('input');
        taskEditInput.type = 'text';
        taskEditInput.value = taskSpan.textContent;
        newtask.insertBefore(taskEditInput, taskSpan);
        taskSpan.style.display = 'none';

        editbtn.textContent = 'Save';
        editbtn.onclick = function () {
            taskSpan.textContent = taskEditInput.value.trim();
            taskSpan.style.display = 'inline';
            taskEditInput.remove();
            editbtn.textContent = 'Edit';
            saveTasks();

            // Reset edit logic
            editbtn.onclick = function () {
                const taskEditInput = document.createElement('input');
                taskEditInput.type = 'text';
                taskEditInput.value = taskSpan.textContent;
                newtask.insertBefore(taskEditInput, taskSpan);
                taskSpan.style.display = 'none';
                editbtn.textContent = 'Save';
                editbtn.onclick = function () {
                    taskSpan.textContent = taskEditInput.value.trim();
                    taskSpan.style.display = 'inline';
                    taskEditInput.remove();
                    editbtn.textContent = 'Edit';
                    saveTasks();
                };
            };
        };
    };

    // DELETE button
    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    deletebtn.onclick = function () {
        newtask.remove();
        saveTasks();
    };
    buttonContainer.appendChild(deletebtn);

    // VIEW button
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

    // Show buttons when user clicks the task
    newtask.addEventListener('click', function () {
        buttonContainer.style.display = 'block';
    });

    // Append task to the list
    tasklist.appendChild(newtask);
}

// Add a new task
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

// Enable Enter key for adding task
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

// Page load setup
window.onload = () => {
    if (!sessionStorage.getItem('visited')) {
        window.location.href = 'welcome.html';
    }

    loadTasks();
    setupEnterKeySupport();
};
