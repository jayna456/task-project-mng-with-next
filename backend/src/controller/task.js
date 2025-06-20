const task = require('../model/task');
const user = require('../model/user');

const AddTask = async (req, res) => {
  const { taskName, userId } = req.body;

  try {
    const newTask = await task.create({
      taskName,
      userId
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const GetTasks = async (req, res) => {
  try {
    const tasks = await task.findAll({
      include: [{
        model: user,
        as: 'user'
      }]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const taskToDelete = await task.findByPk(id);

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await taskToDelete.destroy();
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { taskName, userId } = req.body;

  try {
    const taskToUpdate = await task.findByPk(id);

    if (!taskToUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }

    taskToUpdate.taskName = taskName;
    taskToUpdate.userId = userId;
    await taskToUpdate.save();

    return res.status(200).json(taskToUpdate);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports = {
  AddTask,
  GetTasks,
  deleteTask,
  updateTask
};