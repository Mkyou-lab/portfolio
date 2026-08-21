import { useEffect, useState } from 'react';
import { getProjects, getTestimonials, getProfile } from '../../services/api';
import { FiBriefcase, FiMessageSquare, FiUser } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    profileComplete: false,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, testRes, profRes] = await Promise.all([
          getProjects(),
          getTestimonials(true),
          getProfile(),
        ]);
        setStats({
          projects: projRes.data.data.length,
          testimonials: testRes.data.data.length,
          profileComplete: !!profRes.data.data.fullName &&
                           profRes.data.data.fullName !== 'Your Name',
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Projects',
      value: stats.projects,
      icon: <FiBriefcase />,
      color: 'text-blue-400',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      icon: <FiMessageSquare />,
      color: 'text-green-400',
    },
    {
      label: 'Profile',
      value: stats.profileComplete ? 'Complete' : 'Incomplete',
      icon: <FiUser />,
      color: stats.profileComplete ? 'text-green-400' : 'text-yellow-400',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="card flex items-center gap-4">
            <div className={`text-3xl ${card.color}`}>{card.icon}</div>
            <div>
              <p className="text-gray-400 text-sm">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;