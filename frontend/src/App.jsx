import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ManageProfile from './components/admin/ManageProfile';
import ManageProjects from './components/admin/ManageProjects';
import ManageTestimonials from './components/admin/ManageTestimonials';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Panel */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ManageProfile />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;