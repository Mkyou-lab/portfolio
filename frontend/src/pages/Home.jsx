import { useEffect, useState } from 'react';
import { getProfile, getProjects, getTestimonials } from '../services/api';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import About from '../components/public/About';
import Projects from '../components/public/Projects';
import Testimonials from '../components/public/Testimonials';
import Contact from '../components/public/Contact';
import Footer from '../components/public/Footer';
import Loader from '../components/common/Loader';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, projRes, testRes] = await Promise.all([
          getProfile(),
          getProjects(),
          getTestimonials(),
        ]);
        setProfile(profRes.data.data);
        setProjects(projRes.data.data);
        setTestimonials(testRes.data.data);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Testimonials testimonials={testimonials} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </>
  );
};

export default Home;