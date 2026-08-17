import { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-4 mb-4">
            <FolderGit2 className="text-accent" size={24} />
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Active Deployments</h2>
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-muted border-b border-[#222222] pb-6 max-w-2xl">
            REPOSITORY_LOGS // RECENT_BUILDS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="project-card bento-card group hover:-translate-y-1 p-6 border border-[#222222] bg-[#0A0A0A] rounded-xl flex flex-col transition-all">
              
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                  {project.technologies[0]}
                </span>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#222222] flex items-center justify-center text-muted hover:text-white hover:bg-[#333333] transition-colors" data-cursor="hover">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#222222] flex items-center justify-center text-muted hover:text-white hover:bg-[#333333] transition-colors" data-cursor="hover">
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-display font-semibold mb-3 text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-muted font-sans mb-8 leading-relaxed flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[#222222]/50">
                {project.technologies.slice(0, 3).map(tag => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-muted bg-[#1A1A1A] px-2 py-1 border border-[#333333] rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
