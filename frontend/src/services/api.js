import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Auth ----
export const loginAdmin = (credentials) =>
  api.post('/auth/login', credentials);

export const registerAdmin = (data) =>
  api.post('/auth/register', data);

export const getMe = () =>
  api.get('/auth/me');

// ---- Profile ----
export const getProfile = () =>
  api.get('/profile');

export const updateProfile = (formData) =>
  api.put('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// ---- Projects ----
export const getProjects = () =>
  api.get('/projects');

export const getProject = (id) =>
  api.get(`/projects/${id}`);

export const createProject = (formData) =>
  api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProject = (id, formData) =>
  api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProject = (id) =>
  api.delete(`/projects/${id}`);

// ---- Testimonials ----
export const getTestimonials = (all = false) =>
  api.get(`/testimonials${all ? '?all=true' : ''}`);

export const createTestimonial = (data) =>
  api.post('/testimonials', data);

export const updateTestimonial = (id, data) =>
  api.put(`/testimonials/${id}`, data);

export const deleteTestimonial = (id) =>
  api.delete(`/testimonials/${id}`);

export default api;