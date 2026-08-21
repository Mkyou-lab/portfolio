const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  detailedDescription: {
    type: String,
    default: '',
  },
  thumbnail: {
    type: String,
    default: '',
  },
  technologies: [{
    type: String,
  }],
  liveUrl: {
    type: String,
    default: '',
  },
  githubUrl: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'design', 'other'],
    default: 'web',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);