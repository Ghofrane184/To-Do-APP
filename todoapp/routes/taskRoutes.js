const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');


router.post('/tasks', taskController.createTask);
router.get('/tasks',taskController.getAllTasks);
router.delete('/tasks/:id',taskController.deleteTask);
router.put('/tasks/:id',taskController.updateTask);

module.exports = router;