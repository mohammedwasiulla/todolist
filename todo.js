/ Load tasks from localStorage when page loads
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
 newtask.appendChild(taskSpan);
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
