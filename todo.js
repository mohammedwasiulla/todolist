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

    // Container to hold buttons (hidden initially)
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.style.display = 'none';
    newtask.appendChild(buttonContainer);

    // Create and append task buttons inside container
    createTaskButtons(buttonContainer, newtask, taskSpan);

    // Add click event to span to show buttons
    taskSpan.addEventListener('click', (event) => {
        event.stopPropagation();
        document.querySelectorAll('.button-container').forEach(container => {
            container.style.display = 'none';
        });
        buttonContainer.style.display = 'block';
    });

    // Click anywhere else on document hides all buttons
    document.addEventListener('click', () => {
        buttonContainer.style.display = 'none';
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
        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addtask();
            }
        });
    }
}

function createTaskButtons(container, newtask, taskSpan) {
    const completebtn = document.createElement('button');
    completebtn.textContent = taskSpan.style.textDecoration === 'line-through' ? "Uncomplete" : "Complete";
    completebtn.classList.add('task-btn', 'complete');
    container.appendChild(completebtn);

    completebtn.onclick = function(event) {
        event.stopPropagation();
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

    const editbtn = document.createElement('button');
    editbtn.textContent = "Edit";
    editbtn.classList.add('task-btn', 'edit');
    container.appendChild(editbtn);

    editbtn.onclick = function(event) {
        event.stopPropagation();
        const taskEditInput = document.createElement('input');
        taskEditInput.type = 'text';
        taskEditInput.value = taskSpan.textContent;
        newtask.insertBefore(taskEditInput, taskSpan);
        taskSpan.style.display = 'none';

        editbtn.textContent = 'Save';
        editbtn.onclick = function(event) {
            event.stopPropagation();
            taskSpan.textContent = taskEditInput.value.trim();
            taskSpan.style.display = 'inline';
            taskEditInput.remove();
            editbtn.textContent = 'Edit';
            saveTasks();
            // Reset behavior
            editbtn.onclick = arguments.callee;
        };
    };

    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    container.appendChild(deletebtn);

    deletebtn.onclick = function(event) {
        event.stopPropagation();
        newtask.remove();
        saveTasks();
    };

    const viewbtn = document.createElement('button');
    viewbtn.textContent = "View";
    viewbtn.classList.add('task-btn', 'view');
    container.appendChild(viewbtn);

    viewbtn.onclick = function(event) {
        event.stopPropagation();
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.textContent = `Task: ${taskSpan.textContent}`;
        newtask.appendChild(taskDetails);

        setTimeout(() => {
            taskDetails.remove();
        }, 3000);
    };
}

window.onload = () => {
    if (!sessionStorage.getItem('visited')) {
        window.location.href = 'welcome.html';
    }

    const infoMessage = document.createElement('p');
    infoMessage.textContent = 'ℹ️ Click on task content to mark or alter the task.';
    infoMessage.style.fontStyle = 'italic';
    infoMessage.style.fontSize = '14px';
    infoMessage.style.marginBottom = '10px';
    const container = document.getElementById('tasklist-container') || document.body;
    container.insertBefore(infoMessage, container.firstChild);

    loadTasks();
    setupEnterKeySupport();
};
