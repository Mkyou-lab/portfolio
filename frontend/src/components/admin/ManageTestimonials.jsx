import { useEffect, useState } from 'react';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../services/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5,
    visible: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await getTestimonials(true);
      setTestimonials(res.data.data);
    } catch {
      toast.error('Failed to load testimonials');
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      role: '',
      company: '',
      message: '',
      rating: 5,
      visible: true,
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (t) => {
    setForm({
      name: t.name,
      role: t.role,
      company: t.company || '',
      message: t.message,
      rating: t.rating,
      visible: t.visible,
    });
    setEditing(t._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Deleted');
      fetchTestimonials();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateTestimonial(editing, form);
        toast.success('Updated');
      } else {
        await createTestimonial(form);
        toast.success('Created');
      }
      resetForm();
      fetchTestimonials();
    } catch {
      toast.error('Failed to save');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? 'Cancel' : 'Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
          <input
            placeholder="Person's Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Role / Title"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="input-field"
              required
            />
            <input
              placeholder="Company (optional)"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="input-field"
            />
          </div>
          <textarea
            placeholder="Testimonial message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field h-24"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: parseInt(e.target.value) })
              }
              className="input-field"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) =>
                  setForm({ ...form, visible: e.target.checked })
                }
                className="w-5 h-5"
              />
              Visible on site
            </label>
          </div>
          <button type="submit" className="btn-primary">
            {editing ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t._id} className="card flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {t.name}{' '}
                {!t.visible && (
                  <span className="text-xs text-yellow-400">(Hidden)</span>
                )}
              </h3>
              <p className="text-gray-400 text-sm">
                {t.role} {t.company && `@ ${t.company}`}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(t)}
                className="text-blue-400 hover:text-blue-300 p-2"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => handleDelete(t._id)}
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

export default ManageTestimonials;