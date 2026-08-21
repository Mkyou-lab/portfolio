import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiUser, FiBriefcase,
  FiMessageSquare, FiLogOut, FiArrowLeft,
} from 'react-icons/fi';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6
                        flex flex-col fixed h-full">
        <h2 className="text-xl font-bold text-primary mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-2 flex-1">
          <NavLink to="/admin" end className={linkClasses}>
            <FiHome /> Dashboard
          </NavLink>
          <NavLink to="/admin/profile" className={linkClasses}>
            <FiUser /> Profile
          </NavLink>
          <NavLink to="/admin/projects" className={linkClasses}>
            <FiBriefcase /> Projects
          </NavLink>
          <NavLink to="/admin/testimonials" className={linkClasses}>
            <FiMessageSquare /> Testimonials
          </NavLink>
        </nav>

        <div className="border-t border-gray-800 pt-4 space-y-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3
                       text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3
                       text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;