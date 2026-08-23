import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { ArrowDownRight, Terminal as TerminalIcon, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText, RotatingText, BlurText } from '../ui/TextAnimations';
import { CanvasErrorBoundary } from '../ui/CanvasErrorBoundary';
import Shuffle from '../ui/Shuffle';
// @ts-ignore
import Lanyard from '../ui/Lanyard';
// @ts-ignore
import profile1 from '../../assets/images/profile-1.jpg';

const HERO_ROLES = ['AI Developer', 'ML Engineer', 'CSE Student', 'Builder'];

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.hero-meta', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo('.hero-image-panel', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.inOut' }, '-=0.8');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-visible">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col">
        <div className="hero-meta flex justify-between items-center mb-10 md:mb-14 opacity-0">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent glow-dot"></span>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">SYSTEM: ONLINE</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted hidden sm:flex items-center gap-2"><TerminalIcon size={14} /> PORTFOLIO_V2.0</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 pb-8">
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="hero-title opacity-0">
              <p className="font-mono text-accent text-xs mb-5 uppercase tracking-widest flex items-center gap-2"><Zap size={11} /> &gt; INITIALIZING...</p>
              <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-display font-bold leading-[0.88] tracking-tight text-foreground">
                <Shuffle text="ABHIJIT" tag="span" className="block" shuffleDirection="right" duration={0.35} shuffleTimes={2} stagger={0.035} triggerOnce={true} triggerOnHover={true} />
                <Shuffle text="PANDEY" tag="span" className="block text-accent" shuffleDirection="right" duration={0.35} shuffleTimes={2} stagger={0.035} triggerOnce={true} triggerOnHover={true} />
              </h1>
            </div>

            <div className="hero-desc opacity-0 flex flex-col gap-6">
              <p className="text-lg text-muted max-w-lg leading-relaxed"><BlurText text={`A ${portfolioData.personal.role} building AI systems and exceptional interfaces.`} delay={50} /></p>
              <div className="flex flex-wrap gap-6 border-t border-white/5 pt-6">
                {[{ label: 'Projects', val: '10+' }, { label: 'Specialization', val: 'AI/ML' }, { label: 'Status', val: 'OPEN' }].map(s => (
                  <div key={s.label}><p className="text-2xl font-display font-bold text-white">{s.val}</p><p className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</p></div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted uppercase">Currently:</span>
                <span className="font-mono text-sm text-accent uppercase font-semibold"><RotatingText words={HERO_ROLES} interval={2400} /></span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hero-image-panel opacity-0 relative overflow-visible">
            <div className="relative w-full h-[420px] md:h-[520px] overflow-visible">
              <div className="absolute bottom-0 -top-[200px] sm:-top-[260px] lg:-top-[320px] left-1/2 -translate-x-1/2 w-screen">
                <CanvasErrorBoundary fallback={<img src={profile1} alt="Abhijit Pandey" className="w-full h-full object-cover object-center opacity-90" />}>
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={profile1} imageFit="cover" />
                </CanvasErrorBoundary>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-20 pointer-events-none">
                <div><p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-1">[ DRAG ME ]</p><p className="font-mono text-xs text-white/60 uppercase">Abhijit Pandey</p></div>
                <p className="font-mono text-[10px] text-muted">ID CARD</p>
              </div>
            </div>
            <motion.a href="#about" className="absolute -bottom-6 -right-6 w-12 h-12 bg-accent flex items-center justify-center cursor-pointer z-20" whileHover={{ scale: 1.1 }} data-cursor="hover" aria-label="Scroll to about"><ArrowDownRight size={20} className="text-white" /></motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
