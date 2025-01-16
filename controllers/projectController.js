const Project = require('../models/Project');
const { sendSuccess, sendError } = require('../utils/response');

// Fetch all projects
exports.ap = async (req, res) => {
  try {
    const projects = await Project.find();
    sendSuccess(res, projects);
  } catch (err) {
    sendError(res, 'Failed to fetch projects', 500, err);
  }
};

// Create a new project
exports.cp = async (req, res) => {
  const { name, description, link } = req.body;
  if (!name || !description || !link) {
    return sendError(res, 'All fields are required', 400);
  }

  try {
    const project = new Project({ name, description, link });
    await project.save();
    sendSuccess(res, project, 201);
  } catch (err) {
    sendError(res, 'Failed to save project', 500, err);
  }
};

// Update a project
exports.up = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    const { name, description, link } = req.body;
    if (name) project.name = name;
    if (description) project.description = description;
    if (link) project.link = link;

    await project.save();
    sendSuccess(res, project);
  } catch (err) {
    sendError(res, 'Failed to update project', 500, err);
  }
};

// Delete a project
exports.dp = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    // Use deleteOne() instead of remove()
    await Project.deleteOne({ _id: req.params.id });

    sendSuccess(res, null, 200, 'Project deleted successfully');
  } catch (err) {
    sendError(res, 'Failed to delete project', 500, err);
  }
};

