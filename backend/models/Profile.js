const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    default: 'Your Name',
  },
  headline: {
    type: String,
    required: true,
    default: 'Full Stack Developer',
  },
  tagline: {
    type: String,
    default: 'Building modern web applications',
  },
  bio: {
    type: String,
    default: 'Tell your story here...',
  },
  profileImage: {
    type: String,
    default: '',
  },
  skills: [{
    type: String,
  }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    dribbble: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  contactEmail: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);