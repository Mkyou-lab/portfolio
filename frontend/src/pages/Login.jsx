import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginAdmin, registerAdmin } from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isRegister) {
        res = await registerAdmin(form);
        toast.success('Admin account created!');
      } else {
        res = await loginAdmin({
          email: form.email,
          password: form.password,
        });
        toast.success('Welcome back!');
      }

      const { token, ...userData } = res.data.data;
      login(userData, token);
      navigate('/admin');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Authentication failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          {isRegister ? 'Create Admin Account' : 'Admin Login'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input-field"
            required
            minLength={6}
          />

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isRegister
              ? 'Create Account'
              : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          {isRegister
            ? 'Already have an account?'
            : 'First time setup?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;