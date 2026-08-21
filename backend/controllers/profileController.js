const Profile = require('../models/Profile');

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({});

    if (!profile) {
      profile = await Profile.create({});
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/profile (Protected)
exports.updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Parse skills if sent as a string
    if (typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Parse socialLinks if sent as a string
    if (typeof updateData.socialLinks === 'string') {
      updateData.socialLinks = JSON.parse(updateData.socialLinks);
    }

    // Handle profile image upload
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    let profile = await Profile.findOne({});

    if (!profile) {
      profile = await Profile.create(updateData);
    } else {
      profile = await Profile.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true,
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};