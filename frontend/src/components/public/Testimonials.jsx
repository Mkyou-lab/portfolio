import { FiStar } from 'react-icons/fi';

const Testimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          What People <span className="text-primary">Say</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t._id} className="card">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-300 italic mb-6">"{t.message}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20
                                flex items-center justify-center text-primary font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">
                    {t.role}
                    {t.company && ` @ ${t.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;