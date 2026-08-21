const About = ({ profile }) => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="card">
          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            {profile?.bio || 'Your bio goes here...'}
          </p>

          {profile?.skills?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-primary/10 text-primary border border-primary/20
                               px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;