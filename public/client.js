const input = document.getElementById('task');
const taskList = document.getElementById('task-list');

async function getTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    taskList.innerHTML = tasks.map(task => `
        <li class="d-flex align-items-center mb-2 border rounded p-2 bg-light">
            <span class="flex-grow-1 text-break mr-1">${task.task}</span> 
            <button class="btn btn-danger btn-sm" data-id="${task.id}">Delete</button>
        </li>`
    ).join('');
}

async function addTask() {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: input.value }),
    });

    if (!response.ok) {
        console.error('Failed to create task:', response.status);
        return;
    }

    input.value = '';
    await getTasks();
}

async function deleteTask(id) {
    try{
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete task with id ${response.status}`);
        }
        const data = await response.json();
        console.log(data.message);

        tasks = tasks.filter(task =>String (task.id) !== String(id));
        renderTasks();
    } catch(error) {
        console.error('Error deleting task: ', error);
    }

}

function renderTasks() {
    taskList.innerHTML = tasks.map(task => `
        <li class="d-flex align-items-center mb-2 border rounded p-2 bg-light">
            <span class="flex-grow-1 text-break mr-1">${task.task}</span>
            <button class="btn btn-danger btn-sm" data-id="${task.id}">Delete</button>
        </li>`
    ).join('');
}

taskList.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (btn) deleteTask(btn.dataset.id).then(r => getTasks());
});

document.getElementById('add-btn').addEventListener('click', addTask);

getTasks();