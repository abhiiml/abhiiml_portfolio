import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>24); window.addEventListener('scroll',onScroll,{passive:true}); return()=>window.removeEventListener('scroll',onScroll); },[]);
  const navLinks=[{name:'Home',href:'#home'},{name:'About',href:'#about'},{name:'Projects',href:'#projects'},{name:'Certifications',href:'#certifications'}];
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500',scrolled?'py-4 bg-[var(--void)]/75 backdrop-blur-xl':'py-7 bg-transparent')}>
    <div className="page-shell flex items-center justify-between">
      <a href="#home" className="text-[12px] tracking-[.05em] text-white">© Code by Abhijit<span className="text-[var(--iris)]">.</span></a>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(link=><a key={link.name} href={link.href} className="hover-text-effect text-[12px] tracking-[.05em]" data-text={link.name}><span>{link.name}</span></a>)}
        <a href="#contact" className="ghost-link !min-h-0 !py-2.5 !px-4 text-[12px]">Let's talk</a>
      </nav>
      <button className="md:hidden text-white" onClick={()=>setMobileMenuOpen(v=>!v)} aria-label="Toggle menu">{mobileMenuOpen?<X size={22}/>:<Menu size={22}/>}</button>
      {mobileMenuOpen&&<motion.div initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} className="fixed inset-0 bg-[var(--void)] z-40 flex flex-col items-center justify-center gap-8">
        {navLinks.map(link=><a key={link.name} href={link.href} onClick={()=>setMobileMenuOpen(false)} className="text-4xl tracking-[.03em]">{link.name}</a>)}
        <a href="#contact" onClick={()=>setMobileMenuOpen(false)} className="primary-pill">Let's talk</a>
      </motion.div>}
    </div>
  </header>;
}
