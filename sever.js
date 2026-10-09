require('dotenv').config();
const express = require('express');
const path = require('node:path');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const taskList = path.join(__dirname, './data/tasks.json');

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await fetchTasks();
        res.status(200).json(tasks);

    } catch (error) {
        console.error('Error fetching tasks: ', error)
        res.status(500).json({ error: 'Failed to read tasks data' });
    }
})

async function fetchTasks() {
    try {
        const data = await fs.readFile(taskList, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

app.post('/api/tasks', async (req, res) => {
    try {
        const { task } = req.body;

        if (typeof task !== 'string' || task.trim() === '') {
            return res.status(400).json({ error: 'Please enter a task' });
        }

        const tasks = await fetchTasks();

        const id = crypto.randomUUID()
        const status = 'incomplete';

        const newTask = { id, task, status };
        await addTask(tasks, newTask);

        res.status(201).json({ message: `Task created successfully`, newTask });

    } catch (error) {
        console.error('Error creating task: ', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
})

async function addTask(tasks, newTask) {
    try {
        tasks.push(newTask);
        await fs.writeFile(taskList, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        throw error;
    }
}

app.delete('/api/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;

    const tasks = await fetchTasks();
    const taskToDelete = tasks.filter(task => task.id === taskId);

    if (taskToDelete.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(tasks.indexOf(taskToDelete[0]), 1);

    try {
        await fs.writeFile(taskList, JSON.stringify(tasks, null, 2), 'utf8');
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task: ', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost/${PORT}`);
})