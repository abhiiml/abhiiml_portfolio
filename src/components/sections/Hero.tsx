import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { ArrowDownRight, Terminal as TerminalIcon, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText, RotatingText, BlurText } from '../ui/TextAnimations';
// @ts-ignore
import profile1 from '../../assets/images/profile-1.jpg';
// @ts-ignore
import profile2 from '../../assets/images/profile-2.jpg';
// @ts-ignore
import profile3 from '../../assets/images/profile-3.jpg';
// @ts-ignore
import profile4 from '../../assets/images/profile-4.jpg';
// @ts-ignore
import profile5 from '../../assets/images/profile-5.jpg';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { src: profile1, label: 'Professional', tag: 'PRECISION' },
  { src: profile2, label: 'Artistic', tag: 'VISION' },
  { src: profile3, label: 'Candid', tag: 'AUTHENTIC' },
  { src: profile4, label: 'Casual', tag: 'HUMAN' },
  { src: profile5, label: 'Outdoor', tag: 'CURIOUS' },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const currentSlide = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.hero-meta', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo('.hero-image-panel', { opacity: 0, scale: 0.9, clipPath: 'inset(100% 0% 0% 0%)' },
          { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, '-=0.8');
    }, containerRef);

    // Auto-cycle slideshow
    const imgs = slideRef.current?.querySelectorAll('.slide-img');
    const labels = slideRef.current?.querySelectorAll('.slide-label');
    
    const goTo = (next: number) => {
      if (!imgs || isAnimating.current) return;
      isAnimating.current = true;
      const prev = currentSlide.current;

      gsap.to(imgs[prev], { opacity: 0, scale: 1.05, duration: 0.8, ease: 'power2.in' });
      gsap.to(imgs[next], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 });
      if (labels) {
        gsap.to(labels[prev], { opacity: 0, y: -10, duration: 0.4 });
        gsap.fromTo(labels[next], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 });
      }

      currentSlide.current = next;
      setTimeout(() => { isAnimating.current = false; }, 1000);
    };

    const interval = setInterval(() => {
      const next = (currentSlide.current + 1) % SLIDES.length;
      goTo(next);
    }, 3200);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col">

        {/* Status Bar */}
        <div className="hero-meta flex justify-between items-center mb-10 md:mb-14 opacity-0">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent glow-dot"></span>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">SYSTEM: ONLINE</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted hidden sm:flex items-center gap-2">
            <TerminalIcon size={14} /> PORTFOLIO_V2.0
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 pb-8">

          {/* Left Column — Text */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">

            {/* Title */}
            <div className="hero-title opacity-0">
              <p className="font-mono text-accent text-xs mb-5 uppercase tracking-widest flex items-center gap-2">
                <Zap size={11} /> &gt; INITIALIZING...
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-display font-bold leading-[0.88] tracking-tight text-foreground">
                <SplitText text="ABHIJIT" charDelay={50} />
                <br />
                <SplitText text="PANDEY" charDelay={50} className="text-accent" />
              </h1>
            </div>

            {/* Description + Stats */}
            <div className="hero-desc opacity-0 flex flex-col gap-6">
              <p className="text-lg text-muted max-w-lg leading-relaxed">
                <BlurText
                  text={`A ${portfolioData.personal.role} building AI systems and exceptional interfaces.`}
                  delay={50}
                />
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 border-t border-white/5 pt-6">
                {[
                  { label: 'Projects', val: '10+' },
                  { label: 'Specialization', val: 'AI/ML' },
                  { label: 'Status', val: 'OPEN' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-display font-bold text-white">{s.val}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Role cycle */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted uppercase">Currently:</span>
                <span className="font-mono text-sm text-accent uppercase font-semibold">
                  <RotatingText
                    words={['AI Developer', 'ML Engineer', 'CSE Student', 'Builder']}
                    interval={2400}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Slideshow */}
          <div className="lg:col-span-5 hero-image-panel opacity-0 relative" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
            <div ref={slideRef} className="relative w-full h-[420px] md:h-[520px] overflow-hidden border border-white/10 bg-[#111]">

              {/* All Slides */}
              {SLIDES.map((slide, i) => (
                <div key={i} className="slide-img absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-full object-cover scale-100"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>
              ))}

              {/* Slide labels */}
              {SLIDES.map((slide, i) => (
                <div key={`label-${i}`} className="slide-label absolute bottom-5 left-5 right-5 flex justify-between items-end z-20"
                  style={{ opacity: i === 0 ? 1 : 0 }}>
                  <div>
                    <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-1">[ {slide.tag} ]</p>
                    <p className="font-mono text-xs text-white/60 uppercase">{slide.label}</p>
                  </div>
                  <p className="font-mono text-[10px] text-muted">0{i + 1} / 0{SLIDES.length}</p>
                </div>
              ))}

              {/* Slide indicator dots */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
                {SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full transition-all duration-300"
                    style={{ background: i === 0 ? '#0070F3' : 'rgba(255,255,255,0.2)' }}
                    id={`dot-${i}`}
                  />
                ))}
              </div>

              {/* Corner bracket decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-accent/50 z-20" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-accent/50 z-20" />
            </div>

            {/* Arrow hint */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-12 h-12 bg-accent flex items-center justify-center cursor-pointer z-20"
              whileHover={{ scale: 1.1 }}
              data-cursor="hover"
            >
              <ArrowDownRight size={20} className="text-white" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
