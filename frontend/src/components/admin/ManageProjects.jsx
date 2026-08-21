import { useEffect, useState } from 'react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../services/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    category: 'web',
    featured: false,
    order: 0,
  });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data);
    } catch (err) {
      toast.error('Failed to load projects');
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      detailedDescription: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      category: 'web',
      featured: false,
      order: 0,
    });
    setThumbnail(null);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      detailedDescription: project.detailedDescription || '',
      technologies: project.technologies?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      category: project.category || 'web',
      featured: project.featured || false,
      order: project.order || 0,
    });
    setEditing(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      if (editing) {
        await updateProject(editing, formData);
        toast.success('Project updated');
      } else {
        await createProject(formData);
        toast.success('Project created');
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error('Failed to save project');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
          <h2 className="text-xl font-semibold">
            {editing ? 'Edit Project' : 'New Project'}
          </h2>

          <input
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input-field"
            required
          />
          <textarea
            placeholder="Short Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input-field h-24"
            required
          />
          <textarea
            placeholder="Detailed Description (optional)"
            value={form.detailedDescription}
            onChange={(e) =>
              setForm({ ...form, detailedDescription: e.target.value })
            }
            className="input-field h-32"
          />
          <input
            placeholder="Technologies (comma separated)"
            value={form.technologies}
            onChange={(e) =>
              setForm({ ...form, technologies: e.target.value })
            }
            className="input-field"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Live URL"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              className="input-field"
            />
            <input
              placeholder="GitHub URL"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-field"
            >
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="design">Design</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Order"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: parseInt(e.target.value) || 0 })
              }
              className="input-field"
            />
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="w-5 h-5"
              />
              Featured
            </label>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="input-field"
          />

          <button type="submit" className="btn-primary">
            {editing ? 'Update Project' : 'Create Project'}
          </button>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="card flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-gray-400 text-sm">
                {project.category} •{' '}
                {project.technologies?.join(', ')}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(project)}
                className="text-blue-400 hover:text-blue-300 p-2"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;