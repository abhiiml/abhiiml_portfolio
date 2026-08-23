import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import gsap from 'gsap';
// @ts-ignore
import profile1 from '../../assets/images/profile-1.jpg';

const HERO_ROLES = ['AI Developer', 'ML Engineer', 'CSE Student', 'Builder'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-enter', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.1, ease: 'power4.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden flex items-end pt-0 pb-0">
      <div className="absolute inset-0 z-0">
        <img src={profile1} alt="Abhijit Pandey" className="w-full h-full object-cover object-center grayscale" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-6 md:pb-8">
        <div className="hero-enter absolute left-6 md:left-10 lg:left-16 top-[28%] max-w-[180px]">
          <p className="section-label mb-5">01 — INTRO</p>
          <p className="text-sm md:text-base leading-snug text-white/85">Developer &<br />AI/ML student</p>
        </div>
        <div className="hero-enter absolute right-6 md:right-10 lg:right-16 top-[36%] max-w-[190px] text-right">
          <span className="text-xl text-white/80">↘</span>
          <p className="text-sm md:text-base leading-snug text-white/85 mt-4">Building intelligent<br />digital experiences</p>
        </div>
        <div className="hero-enter mb-1 md:mb-0">
          <p className="section-label mb-2">AI / ML · Software · Creative Technology</p>
          <h1 className="font-sans font-light tracking-[-0.07em] leading-[0.78] text-[clamp(72px,15vw,230px)] text-white whitespace-nowrap">Abhijit Pandey</h1>
        </div>
      </div>

      <div className="absolute top-6 left-6 md:left-10 lg:left-16 z-20 hero-enter">
        <p className="text-sm md:text-base text-white font-medium">Abhijit Pandey</p>
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-white/60 mt-1">© 2026 / ABHIJIT PANDEY</p>
      </div>
      <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20 hidden md:block section-label !text-white/60">B.TECH CSE · AI / ML</div>
      <motion.a href="#about" whileHover={{ scale: 1.05 }} className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-white/70" aria-label="Scroll to about">Scroll to explore <span className="w-12 h-px bg-white/50" /></motion.a>
      <div className="fixed bottom-6 left-6 hidden md:block section-label !text-white/30 z-30">{HERO_ROLES.join(' · ')}</div>
    </section>
  );
}
