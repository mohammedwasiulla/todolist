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

// Create task element
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

    // Add buttons to the task
    createTaskButtons(newtask, taskSpan);

    tasklist.appendChild(newtask);
}

// Add task from input
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

// Support Enter key
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

// Create buttons for each task
function createTaskButtons(newtask, taskSpan) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.style.display = 'none'; // Hide initially

    const completebtn = document.createElement('button');
    completebtn.textContent = taskSpan.style.textDecoration === 'line-through' ? "Uncomplete" : "Complete";
    completebtn.classList.add('task-btn', 'complete');
    completebtn.onclick = function () {
        const isCompleted = taskSpan.style.textDecoration === 'line-through';
        taskSpan.style.textDecoration = isCompleted ? 'none' : 'line-through';
        taskSpan.style.opacity = isCompleted ? '1' : '0.6';
        completebtn.textContent = isCompleted ? 'Complete' : 'Uncomplete';
        saveTasks();
    };
    buttonContainer.appendChild(completebtn);

    const editbtn = document.createElement('button');
    editbtn.textContent = "Edit";
    editbtn.classList.add('task-btn', 'edit');
    buttonContainer.appendChild(editbtn);

    function setupEdit() {
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
                setupEdit(); // Rebind
            };
        };
    }
    setupEdit();

    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    deletebtn.onclick = function () {
        newtask.remove();
        saveTasks();
    };
    buttonContainer.appendChild(deletebtn);

    // const viewbtn = document.createElement('button');
    // viewbtn.textContent = "View";
    // viewbtn.classList.add('task-btn', 'view');
    // viewbtn.onclick = function () {
    //     const taskDetails = document.createElement('div');
    //     taskDetails.classList.add('task-details');
    //     taskDetails.textContent = `Task: ${taskSpan.textContent}`;
    //     newtask.appendChild(taskDetails);
    //     setTimeout(() => {
    //         taskDetails.remove();
    //     }, 3000);
    // };
    // buttonContainer.appendChild(viewbtn);

      newtask.appendChild(buttonContainer);

    // Show/hide buttons on span click
    taskSpan.addEventListener('click', () => {
        const isHidden = buttonContainer.style.display === 'none';
        document.querySelectorAll('.button-container').forEach(container => {
            container.style.display = 'none'; // Hide all others
        });
        buttonContainer.style.display = isHidden ? 'flex' : 'none';
    });
}

window.onload = () => {
    if (!sessionStorage.getItem('visited')) {
        window.location.href = 'welcome.html';
    }

    loadTasks();
    setupEnterKeySupport();
};
