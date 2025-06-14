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
        newtask.remove();
        saveTasks();
    };
    buttonContainer.appendChild(deletebtn);

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

    newtask.appendChild(buttonContainer);

    taskSpan.addEventListener('click', function (event) {
        // Hide other buttons
        document.querySelectorAll('.button-container').forEach(container => {
            if (container !== buttonContainer) container.style.display = 'none';
        });
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
