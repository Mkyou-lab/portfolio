import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ profile }) => {
  const [open, setOpen] = useState(false);

  const links = ['About', 'Projects', 'Testimonials', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md
                    border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-primary">
          {profile?.fullName || 'Portfolio'}
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-primary transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-dark border-t border-gray-800 px-4 pb-4">
          {links.map((link) => (
            <li key={link} className="py-3">
              <a
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;