const Project = require('../models/Project');

// GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/projects/:id
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/projects (Protected)
exports.createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };

    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (req.file) {
      projectData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/projects/:id (Protected)
exports.updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (req.file) {
      updateData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/projects/:id (Protected)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};