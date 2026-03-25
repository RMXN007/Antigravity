import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Starfield from './components/ui/Starfield';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import JourneyPage from './pages/JourneyPage';

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/journey" element={<JourneyPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;