const Task = require('../models/Task');
const { Op } = require('sequelize');

exports.createTask = async (req, res) => {
  try {
    // Vérifiez si le projectId est fourni dans le corps de la requête
    const { projectId, title, description, status, due_date } = req.body;
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    // Créez la tâche avec les détails fournis
    const task = await Task.create({ projectId, title, description, status, due_date });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    // Récupérer toutes les tâches sauf celles dont le projectId est null
    const tasks = await Task.findAll({
      where: {
        projectId: {
          [Op.ne]: null // Utilisation de l'opérateur Op pour ne pas être égal à null
        }
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, title, description, status, due_date } = req.body;

    // Find the task by ID
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Prepare updated data, keeping projectId unchanged if it's null in the task
    const updatedData = {
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      status: status !== undefined ? status : task.status,
      due_date: due_date !== undefined ? due_date : task.due_date
    };

    // Only update projectId if it is provided and the existing projectId is not null
    if (projectId !== undefined) {
      if (task.projectId !== null) {
        updatedData.projectId = projectId;
      } else {
        // If the existing projectId is null, do not update it
        updatedData.projectId = task.projectId;
      }
    }

    // Update the task with the prepared data
    const updatedTask = await task.update(updatedData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};