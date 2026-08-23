import { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef=useRef<HTMLElement>(null);
  useEffect(()=>{const ctx=gsap.context(()=>{gsap.utils.toArray('.project-card').forEach((card:any)=>gsap.fromTo(card,{opacity:0,y:35},{opacity:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 86%'}}));},containerRef);return()=>ctx.revert();},[]);
  return <section ref={containerRef} id="projects" className="py-28 md:py-40 relative">
    <div className="page-shell">
      <div className="flex items-end justify-between gap-8 mb-16">
        <div><p className="section-label mb-4">02 // Selected work</p><h2 className="section-title">Things I<br/>build.</h2></div>
        <p className="hidden md:block max-w-xs body-copy text-right">AI systems, products and experiments built from idea to deployment.</p>
      </div>
      <div className="border-t border-white/15">
        {portfolioData.projects.map((project,index)=><article key={index} className="project-card group grid md:grid-cols-[80px_1fr_auto] gap-5 md:gap-10 items-start py-9 border-b border-white/10">
          <span className="font-mono text-xs text-white/35 pt-1">0{index+1}</span>
          <div><h3 className="text-2xl md:text-4xl font-light tracking-tight group-hover:text-[var(--iris)] transition-colors">{project.title}</h3><p className="mt-3 max-w-2xl text-sm md:text-base font-light leading-relaxed text-white/55">{project.description}</p><div className="flex flex-wrap gap-3 mt-5">{project.technologies.slice(0,5).map(tag=><span key={tag} className="text-[11px] uppercase tracking-wider text-white/40">{tag}</span>)}</div></div>
          <div className="flex gap-2 md:pt-1">{project.githubUrl&&<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`} className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--ash)] hover:text-white hover:bg-[var(--color-graphite)] transition-colors" style={{boxShadow:'var(--shadow-subtle)'}}><FolderGit2 size={14}/></a>}{project.liveUrl&&project.liveUrl!=='#'&&<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--ash)] hover:text-white hover:bg-[var(--color-graphite)] transition-colors" style={{boxShadow:'var(--shadow-subtle)'}}><ArrowUpRight size={15}/></a>}</div>
        </article>)}
      </div>
    </div>
  </section>;
}
