const project = require('../models/project');
const user = require('../models/user');

const AddProject = async (req, res) => {
  const { projectName, description, members } = req.body;

  try {
    const newProject = await project.create({
      projectName,
      description,
      members
    });

    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const GetProjects = async (req, res) => {
  try {
    const projects = await project.findAll({
      include: [{
        model: user,
        as: 'users'
      }]
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    
    try {
        const projectToDelete = await project.findByPk(id);
    
        if (!projectToDelete) {
        return res.status(404).json({ message: 'Project not found' });
        }
    
        await projectToDelete.destroy();
        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { projectName, description, members } = req.body;

    try {
        const projectToUpdate = await project.findByPk(id);

        if (!projectToUpdate) {
            return res.status(404).json({ message: 'Project not found' });
        }

        projectToUpdate.projectName = projectName;
        projectToUpdate.description = description;
        projectToUpdate.members = members;

        await projectToUpdate.save();
        return res.status(200).json(projectToUpdate);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
  AddProject,
  GetProjects,
  deleteProject,
  updateProject
};