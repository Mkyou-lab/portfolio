import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../services/api';
import toast from 'react-hot-toast';

const ManageProfile = () => {
  const [form, setForm] = useState({
    fullName: '',
    headline: '',
    tagline: '',
    bio: '',
    skills: '',
    contactEmail: '',
    resumeUrl: '',
    github: '',
    linkedin: '',
    twitter: '',
    dribbble: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const p = res.data.data;
      setForm({
        fullName: p.fullName || '',
        headline: p.headline || '',
        tagline: p.tagline || '',
        bio: p.bio || '',
        skills: p.skills?.join(', ') || '',
        contactEmail: p.contactEmail || '',
        resumeUrl: p.resumeUrl || '',
        github: p.socialLinks?.github || '',
        linkedin: p.socialLinks?.linkedin || '',
        twitter: p.socialLinks?.twitter || '',
        dribbble: p.socialLinks?.dribbble || '',
      });
    } catch (err) {
      toast.error('Failed to load profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('headline', form.headline);
    formData.append('tagline', form.tagline);
    formData.append('bio', form.bio);
    formData.append('skills', form.skills);
    formData.append('contactEmail', form.contactEmail);
    formData.append('resumeUrl', form.resumeUrl);
    formData.append(
      'socialLinks',
      JSON.stringify({
        github: form.github,
        linkedin: form.linkedin,
        twitter: form.twitter,
        dribbble: form.dribbble,
      })
    );

    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Profile</h1>

      <form onSubmit={handleSubmit} className="card max-w-2xl space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Headline</label>
          <input
            name="headline"
            value={form.headline}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g. Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tagline</label>
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            className="input-field"
            placeholder="Short description for hero section"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="input-field h-32"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Skills (comma separated)
          </label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="input-field"
            placeholder="React, Node.js, Python, Figma"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Contact Email
          </label>
          <input
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Resume URL</label>
          <input
            name="resumeUrl"
            value={form.resumeUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="Link to your resume PDF"
          />
        </div>

        <hr className="border-gray-700" />
        <h3 className="text-lg font-semibold">Social Links</h3>

        {['github', 'linkedin', 'twitter', 'dribbble'].map((social) => (
          <div key={social}>
            <label className="block text-sm text-gray-400 mb-2 capitalize">
              {social}
            </label>
            <input
              name={social}
              value={form[social]}
              onChange={handleChange}
              className="input-field"
              placeholder={`https://${social}.com/yourprofile`}
            />
          </div>
        ))}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default ManageProfile;