import { FiExternalLink, FiGithub } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="card hover:border-primary/40 transition-all
                         duration-300 group overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-gray-800">
                {project.thumbnail ? (
                  <img
                    src={`${API_URL}${project.thumbnail}`}
                    alt={project.title}
                    className="w-full h-full object-cover
                               group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center
                                  text-4xl text-gray-600">
                    🖼️
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-gray-300 text-xs
                               px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-primary/80
                               flex items-center gap-1 text-sm"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white
                               flex items-center gap-1 text-sm"
                  >
                    <FiGithub /> Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500">
            No projects yet. Add some from the admin panel!
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;