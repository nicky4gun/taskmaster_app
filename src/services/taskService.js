const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const taskList = path.join(__dirname, '../../data/tasks.json');

async function getTasks() {
    const data = await fs.readFile(taskList, 'utf8');
    return JSON.parse(data);
}

async function createTask(task) {
    const tasks = await getTasks();
    const newTask = {
        id: crypto.randomUUID(),
        task,
        status: 'incomplete',
    };

    tasks.push(newTask);
    await fs.writeFile(taskList, JSON.stringify(tasks, null, 2), 'utf8');

    return newTask;
}

async function deleteTask(taskId) {
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return false;
    }

    tasks.splice(taskIndex, 1);
    await fs.writeFile(taskList, JSON.stringify(tasks, null, 2), 'utf8');

    return true;
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
};
