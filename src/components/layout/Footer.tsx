import { Code, User, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export function Footer() {
  return (
    <footer id="contact" className="py-12 md:py-24 border-t border-[#222222] bg-[#0A0A0A] relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 text-foreground">INITIALIZE_CONNECTION</h2>
            <p className="text-muted text-sm font-mono uppercase tracking-widest">Currently available for technical internships.</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href={`https://github.com/${portfolioData.personal.github}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
            >
              <Code size={20} />
            </a>
            <a 
              href={portfolioData.personal.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
            >
              <User size={20} />
            </a>
            {portfolioData.personal.email && !portfolioData.personal.email.includes('example.com') && (
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Abhijit Pandey</p>
          <p>Designed with intention.</p>
        </div>
      </div>
    </footer>
  );
}
