import { FiExternalLink, FiGithub } from 'react-icons/fi';

// 👇 CHANGE THIS LINE:
const API_URL = import.meta.env.VITE_API_URL || '';

const Projects = ({ projects }) => {
  // ... rest of the code  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <p className="text-primary font-medium mb-2">Hello, I'm</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {profile?.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-400 mb-6">
            {profile?.headline || 'Full Stack Developer'}
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            {profile?.tagline || 'Building modern web applications'}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-primary text-primary hover:bg-primary
                           hover:text-white py-3 px-6 rounded-lg
                           transition-all flex items-center gap-2"
              >
                <FiDownload /> Resume
              </a>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {profile?.socialLinks?.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="text-2xl text-gray-400 hover:text-primary transition-colors"
              >
                <FiGithub />
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-2xl text-gray-400 hover:text-primary transition-colors"
              >
                <FiLinkedin />
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-2xl text-gray-400 hover:text-primary transition-colors"
              >
                <FiTwitter />
              </a>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden
                          border-4 border-primary/30 shadow-xl shadow-primary/10">
            {profile?.profileImage ? (
              <img
                src={`${API_URL}${profile.profileImage}`}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center
                              justify-center text-6xl text-gray-600">
                👤
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;