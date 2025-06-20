const router = require('express').Router();
const project = require('../conroller/project.js');

router.post('/', project.createProject);
router.get('/', project.GetProjects);
router.delete('/:id', project.deleteProject);
router.put('/:id', project.updateProject);

module.exports = router;