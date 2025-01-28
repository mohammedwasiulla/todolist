function addtask() {
    const taskInput = document.getElementById('inputtask');
    const taskContent = taskInput.value.trim();

    if (!taskContent) {
        alert("Please enter a task!");
        return;
    }

    // Create a new task element
    const newtask = document.createElement('li');
    const tasklist = document.getElementById('tasklist');
    
    // Set initial task content
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskContent;
    newtask.appendChild(taskSpan);

    // Add buttons to the task
    createTaskButtons(newtask, taskSpan);

    // Append new task to the list
    tasklist.appendChild(newtask);

    // Clear input field after adding task
    taskInput.value = '';
}

function createTaskButtons(newtask, taskSpan) {
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
                    editbtn.onclick = function() {
                        // Same behavior for edit button
                    };
                };
            };
        };
    };

    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.classList.add('task-btn', 'delete');
    newtask.appendChild(deletebtn);

    deletebtn.onclick = function() {
        newtask.remove();
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
};
