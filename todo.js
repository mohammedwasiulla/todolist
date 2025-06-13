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
    
    // Set initial task content
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskContent;
    if (isCompleted) {
        taskSpan.style.textDecoration = 'line-through';
        taskSpan.style.opacity = '0.6';
    }
    newtask.appendChild(taskSpan);
    
    // Add buttons to the task
    createTaskButtons(newtask, taskSpan);
    
    // Append new task to the list
    tasklist.appendChild(newtask);
}

function addtask() {
    const taskInput = document.getElementById('inputtask');
    const taskContent = taskInput.value.trim();
    if (!taskContent) {
        alert("Please enter a task!");
        return;
    }
    
    // Create new task element
    createTaskElement(taskContent);
    
    // Clear input field after adding task
    taskInput.value = '';
    
    // Save to localStorage
    saveTasks();
}

// Add Enter key support for input field
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

function createTaskButtons(newtask, taskSpan) {
    // Complete/Uncomplete button
    const completebtn = document.createElement('button');
    completebtn.textContent = taskSpan.style.textDecoration === 'line-through' ? "Uncomplete" : "Complete";
    completebtn.classList.add('task-btn', 'complete');
    newtask.appendChild(completebtn);
    
    completebtn.onclick = function() {
        if (taskSpan.style.textDecoration === 'line-through') {
            // Uncomplete the task
            taskSpan.style.textDecoration = 'none';
            taskSpan.style.opacity = '1';
            completebtn.textContent = 'Complete';
        } else {
            // Complete the task
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.opacity = '0.6';
            completebtn.textContent = 'Uncomplete';
        }
        // Save to localStorage after completing/uncompleting
        saveTasks();
    };

    const editbtn = document.createElement('button');
    editbtn.textContent = "Edit";
    editbtn.classList.add('task-btn', 'edit');
    newtask.appendChild(editbtn);
    
    editbtn.onclick = function() {
        // Make the task content editable
        const taskEditInput = document.createElement('input');
        taskEditInput.type = 'text';
        taskEditInput.value = taskSpan.textContent;
        newtask.insertBefore(taskEditInput, taskSpan); // Insert input before task span
        taskSpan.style.display = 'none'; // Hide the task span while editing
        
        // Change Edit button to Save button
        editbtn.textContent = 'Save';
        editbtn.onclick = function() {
            // Save the new task content
            taskSpan.textContent = taskEditInput.value.trim();
            taskSpan.style.display = 'inline'; // Show the task span again
            taskEditInput.remove(); // Remove the input field
            editbtn.textContent = 'Edit'; // Reset the button text back to Edit
            
            // Update the Edit button action
            editbtn.onclick = function() {
                // Make the task content editable again if clicked on Edit
                const taskEditInput = document.createElement('input');
                taskEditInput.type = 'text';
                taskEditInput.value = taskSpan.textContent;
                newtask.insertBefore(taskEditInput, taskSpan); // Insert input before task span
                taskSpan.style.display = 'none'; // Hide the task span while editing
                editbtn.textContent = 'Save';
                editbtn.onclick = function() {
                    taskSpan.textContent = taskEditInput.value.trim();
                    taskSpan.style.display = 'inline';
                    taskEditInput.remove();
                    editbtn.textContent = 'Edit';
                    // Save to localStorage after editing
                    saveTasks();
                    // Reset edit functionality
                    editbtn.onclick = function() {
                        // Same behavior for edit button
                        const taskEditInput = document.createElement('input');
                        taskEditInput.type = 'text';
                        taskEditInput.value = taskSpan.textContent;
                        newtask.insertBefore(taskEditInput, taskSpan);
                        taskSpan.style.display = 'none';
                        editbtn.textContent = 'Save';
                        editbtn.onclick = function() {
                            taskSpan.textContent = taskEditInput.value.trim();
                            taskSpan.style.display = 'inline';
                            taskEditInput.remove();
                            editbtn.textContent = 'Edit';
                            saveTasks();
                        };
                    };
                };
            };
            // Save to localStorage after editing
            saveTasks();
        };
    };
    
    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    newtask.appendChild(deletebtn);
    
    deletebtn.onclick = function() {
        newtask.remove();
        // Save to localStorage after deleting
        saveTasks();
    };
    
    const viewbtn = document.createElement('button');
    viewbtn.textContent = "View";
    viewbtn.classList.add('task-btn', 'view');
    newtask.appendChild(viewbtn);
    
    viewbtn.onclick = function() {
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.textContent = `Task: ${taskSpan.textContent}`;
        newtask.appendChild(taskDetails);
        
        // Automatically hide task details after 3 seconds
        setTimeout(() => {
            taskDetails.remove();
        }, 3000);
    };
}

window.onload = () => {
    if (!sessionStorage.getItem('visited')) {
        window.location.href = 'welcome.html';  // Redirect to the Welcome page if not visited
    }
    
    // Load saved tasks from localStorage
    loadTasks();
    
    // Setup Enter key support for adding tasks
    setupEnterKeySupport();
};
