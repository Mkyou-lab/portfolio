import { FiMail, FiMapPin } from 'react-icons/fi';

const Contact = ({ profile }) => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="section-title">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-gray-400 mb-8">
          I'm always open to discussing new projects, creative ideas,
          or opportunities to be part of your vision.
        </p>

        <div className="card">
          <div className="flex flex-col items-center gap-6">
            {profile?.contactEmail && (
              <a
                href={`mailto:${profile.contactEmail}`}
                className="flex items-center gap-3 text-lg text-gray-300
                           hover:text-primary transition-colors"
              >
                <FiMail className="text-primary text-xl" />
                {profile.contactEmail}
              </a>
            )}

            <a
              href={`mailto:${profile?.contactEmail || 'hello@example.com'}`}
              className="btn-primary mt-4"
            >
              Send Me an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;