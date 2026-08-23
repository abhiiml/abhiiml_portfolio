import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
// @ts-ignore
import Lanyard from '../ui/Lanyard';
// @ts-ignore
import profile1 from '../../assets/images/profile-1.jpg';

const HERO_ROLES = ['AI Developer', 'ML Engineer', 'CSE Student', 'Builder'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-enter', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.15, ease: 'power4.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center pt-28 pb-16">
      <div className="page-shell w-full grid lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-4 items-center">
        <div className="hero-enter">
          <p className="section-label mb-7">AI / ML · Software · Creative Technology</p>
          <h1 className="display-title"><span className="block">"ABHIJIT" </span><span className="block text-[var(--iris)]">"PANDEY" </span></h1>
          <p className="body-copy max-w-xl mt-9">{portfolioData.personal.role} building AI systems, intelligent products and interfaces that feel as good as they function.</p>
          <div className="flex flex-wrap items-center gap-4 mt-9"><a href="#projects" className="primary-pill">Explore work <ArrowUpRight size={15} className="ml-2" /></a><a href="#contact" className="ghost-link">Let's talk →</a></div>
          <div className="flex flex-wrap gap-3 mt-14 max-w-xl">
            <div className="pill-badge"><span className="text-white">10+</span><span className="text-[var(--ash)]">Projects</span></div>
            <div className="pill-badge"><span className="text-white">AI/ML</span><span className="text-[var(--ash)]">Focus</span></div>
            <div className="pill-badge"><span className="w-1.5 h-1.5 rounded-full bg-[var(--iris)]" /><span className="text-white">Open for opportunities</span></div>
          </div>
        </div>
        <div className="hero-enter relative min-h-[520px] lg:min-h-[680px] flex items-center justify-center overflow-visible">
          <div className="absolute inset-x-0 bottom-0 h-[72%] border-l border-white/10 opacity-50" />
          <div className="section-label absolute top-8 right-0 !text-white/30">01 — Identity</div>
          <div className="w-full h-[600px] relative z-10"><Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={profile1} imageFit="cover" /></div>
          <motion.a href="#about" whileHover={{ scale: 1.04 }} className="absolute bottom-5 right-3 w-14 h-14 rounded-full bg-[var(--iris)] flex items-center justify-center z-20 transition-colors hover:bg-[var(--deep-iris)]" aria-label="Scroll to about"><ArrowDownRight size={20} /></motion.a>
=======
          <div className="flex flex-wrap items-center gap-5 mt-9"><a href="#projects" className="primary-pill">Explore work <ArrowUpRight size={15} className="ml-2" /></a><a href="#contact" className="ghost-link">Let's talk →</a></div>
          <div className="flex flex-wrap gap-10 mt-16 pt-6 border-t border-white/10 max-w-xl"><div><p className="text-2xl font-light">10+</p><p className="section-label !text-white/40 !text-[9px] mt-1">Projects</p></div><div><p className="text-2xl font-light">AI/ML</p><p className="section-label !text-white/40 !text-[9px] mt-1">Focus</p></div><div><p className="text-2xl font-light text-[var(--verdant)]">Open</p><p className="section-label !text-white/40 !text-[9px] mt-1">For opportunities</p></div></div>
        </div>
        <div className="hero-enter relative min-h-[520px] lg:min-h-[680px] flex items-center justify-center overflow-visible">
          <div className="absolute inset-x-0 bottom-0 h-[72%] border-l border-white/10 opacity-50" />
          <div className="absolute top-8 right-0 section-label !text-white/30">01 — IDENTITY</div>
          <div className="w-full h-[600px] relative z-10"><Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={profile1} imageFit="cover" /></div>
          <motion.a href="#about" whileHover={{ scale: 1.08 }} className="absolute bottom-5 right-3 w-14 h-14 rounded-full bg-[var(--iris)] flex items-center justify-center z-20" aria-label="Scroll to about"><ArrowDownRight size={20} /></motion.a>
        </div>
      </div>
      <div className="fixed bottom-6 left-6 hidden md:block section-label !text-white/30 z-30">{HERO_ROLES.join(' · ')}</div>
    </section>
  );
}
