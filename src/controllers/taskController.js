const taskService = require('../services/taskService');

async function getTasks(req, res) {
    try {
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks: ', error);
        res.status(500).json({ error: 'Failed to read tasks data' });
    }
}

async function createTask(req, res) {
    try {
        const { task } = req.body;

        if (typeof task !== 'string' || task.trim() === '') {
            return res.status(400).json({ error: 'Please enter a task' });
        }

        const newTask = await taskService.createTask(task);
        res.status(201).json({ message: 'Task created successfully', newTask });
    } catch (error) {
        console.error('Error creating task: ', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
}

async function deleteTask(req, res) {
    try {
        const deleted = await taskService.deleteTask(req.params.taskId);

        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task: ', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
};
