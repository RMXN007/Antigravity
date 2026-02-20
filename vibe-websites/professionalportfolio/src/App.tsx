import Navbar from './components/layout/Navbar';
import Starfield from './components/ui/Starfield';
import CustomCursor from './components/ui/CustomCursor';
import Home from './pages/Home';
import Projects from './components/features/Projects';
import MusicPlayer from './components/features/MusicPlayer';
import Stats from './components/features/Stats';
import Journey from './components/features/Journey';
import GamingSetup from './components/features/GamingSetup';
import Goals from './components/features/Goals';

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Home />
          <Stats />
          <Projects />
          <Journey />
          <GamingSetup />
          <Goals />
          {/* Contact Section Placeholder */}
          <section id="contact" className="h-screen flex items-center justify-center">
            <h2 className="text-4xl font-serif">Let's Create Together</h2>
          </section>
        </main>
        <MusicPlayer />
      </div>
    </>
  );
}

export default App;
