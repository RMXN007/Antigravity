import { useState, useEffect } from 'react';
import { ArrowRight, Github, Twitter, Mail, Linkedin, Instagram } from 'lucide-react';
import axios from 'axios';
import './index.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get('http://localhost:5000/api/profile');
        const projectsRes = await axios.get('http://localhost:5000/api/projects');

        setProfile(profileRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="animate-fade-in">
        <div className="logo">{profile?.name || 'Portfolio'}</div>
        <nav>
          <ul>
            <li><a href="#projects">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1>{profile?.role || 'Developer'}</h1>
          <p>{profile?.bio || 'Building great things.'}</p>
        </section>

        <section id="projects" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>Selected Work</h2>
          <div className="grid">
            {projects.map(project => (
              <a href={project.link} target="_blank" rel="noreferrer" className="card" key={project.id}>
                <div className="card-img-wrapper">
                  <img src={project.image} alt={project.title} className="card-img" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>
                  <span className="card-link">
                    View Project <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="hero animate-fade-in" style={{ animationDelay: '0.3s', marginBottom: '8rem', marginTop: '8rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 600 }}>Let's work together.</h2>
          <p style={{ marginBottom: '2rem' }}>Always open for new opportunities and interesting projects.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {profile?.socials?.email && (
              <a href={profile.socials.email} className="card-link" style={{ fontSize: '1.1rem' }}>
                <Mail size={20} /> Email Me
              </a>
            )}
            {profile?.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="card-link" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                <Github size={20} />
              </a>
            )}
            {profile?.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="card-link" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                <Linkedin size={20} />
              </a>
            )}
            {profile?.socials?.instagram && (
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="card-link" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                <Instagram size={20} />
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p>&copy; {new Date().getFullYear()} {profile?.name}. Built with MERN.</p>
      </footer>
    </div>
  );
}

export default App;
