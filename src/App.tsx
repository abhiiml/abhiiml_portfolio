import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Terminal } from './components/Terminal';
import { CustomCursor } from './components/ui/CustomCursor';
import { AuroraBackground } from './components/ui/AuroraBackground';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();
  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <CustomCursor />
      <AuroraBackground />
      {/* Abstract noise background overlay */}
      <div className="noise-bg"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
      </main>

      <Footer />
      
      <Terminal />
    </div>
  );
}

export default App;
