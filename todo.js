function addtask() {
    const newtask = document.createElement('li');
    const tasklist = document.getElementById('tasklist');
    
    // Set initial task content
    const taskContent = document.createElement('span');
    taskContent.textContent = document.getElementById('inputtask').value;
    newtask.appendChild(taskContent);
    tasklist.appendChild(newtask);

    document.getElementById('inputtask').value = ""; // Clear input field

    deletetask(newtask);
    edittask(newtask, taskContent); // Pass the taskContent for editing
}

function deletetask(newtask) {
    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    newtask.appendChild(deletebtn);
    
    deletebtn.onclick = function() {
        newtask.remove();
    }
}

function edittask(newtask, taskContent) {
    const editbtn = document.createElement('button');
    editbtn.textContent = "Edit";
    newtask.appendChild(editbtn);
    
    editbtn.onclick = function() {
        const newTaskText = prompt("Edit your task:", taskContent.textContent);
        if (newTaskText !== null) { // Check if user canceled prompt
            taskContent.textContent = newTaskText; // Update task content
        }
    }
}
