import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';

import { Certifications } from './components/sections/Certifications';
import { Terminal } from './components/Terminal';
import { CustomCursor } from './components/ui/CustomCursor';
import { AuroraBackground } from './components/ui/AuroraBackground';
import { useScrollReveal } from './hooks/useScrollReveal';
import ClickSpark from './components/ui/ClickSpark';

function App() {
  useScrollReveal();
  return (
    <ClickSpark
      sparkColor="#0070F3"
      sparkSize={12}
      sparkRadius={22}
      sparkCount={8}
      duration={500}
      easing="ease-out"
      extraScale={1.1}
    >
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
        <Certifications />
      </main>

      <Footer />
      
      <Terminal />
      </div>
    </ClickSpark>
  );
}

export default App;
