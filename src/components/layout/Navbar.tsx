import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Terminal', href: '#terminal' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222222]' : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="text-xl font-display tracking-tight text-foreground z-50 relative group">
          Abhijit Pandey
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all group-hover:w-full"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="hover-text-effect font-mono text-sm tracking-widest uppercase"
              data-text={link.name}
              data-cursor="hover"
            >
              <span>{link.name}</span>
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display text-foreground"
              >
                {link.name}
              </a>
            ))}
             <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display text-foreground underline"
              >
                Let's Talk
              </a>
          </motion.div>
        )}
      </div>
    </header>
  );
}
