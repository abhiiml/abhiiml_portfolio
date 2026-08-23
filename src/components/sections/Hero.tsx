import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

// Transparent portrait PNG embedded as base64 so no external image path is required.
const HERO_PORTRAIT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjIAAAJYCAMAAABPffxXAAABIF{BASE64}';

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
    <section ref={ref} id="home" className="min-h-screen flex items-center pt-20 pb-8 md:pt-24 md:pb-10">
      <div className="page-shell w-full">
        <div className="hero-enter relative min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-8rem)] overflow-hidden rounded-[24px] border border-white/15 bg-[#aeb2b3]">
          {/* Minimal header inside the hero card */}
          <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 py-4 md:px-7 md:py-5 text-[10px] md:text-[11px] text-black/65">
            <div>
              <p className="font-medium">Abhijit Pandey</p>
              <p className="mt-1 uppercase tracking-[0.12em] text-[8px] md:text-[9px]">© {new Date().getFullYear()} / ABHIJIT PANDEY</p>
            </div>
            <p className="hidden md:block uppercase tracking-[0.12em] font-medium">B.Tech CSE · AI / ML</p>
          </div>

          {/* Editorial side information */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 max-w-[150px] text-black/65">
            <p className="uppercase tracking-[0.14em] text-[9px] font-semibold">01 — Intro</p>
            <p className="mt-4 text-sm leading-tight">Developer &<br />AI/ML student</p>
          </div>

          <div className="absolute right-6 md:right-12 top-[42%] z-20 max-w-[170px] text-black/65">
            <span className="block text-xl mb-3">↘</span>
            <p className="text-sm leading-tight">Building intelligent<br />digital experiences</p>
          </div>

          {/* Transparent PNG — no Lanyard wrapper/background, so the portrait sits directly in the hero. */}
          <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
            <img
              src={HERO_PORTRAIT}
              alt="Abhijit Pandey"
              className="block h-[74%] md:h-[82%] lg:h-[88%] w-auto max-w-[88%] object-contain object-bottom select-none"
              draggable={false}
            />
          </div>

          {/* Location pill */}
          <div className="absolute left-0 top-[50%] z-30 -translate-y-1/2 hidden sm:flex items-center bg-[#111] text-white rounded-r-full pl-8 pr-3 py-2.5 gap-5 shadow-lg">
            <div className="text-[9px] leading-tight"><span className="text-white/45">Located in</span><br />India</div>
            <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-sm">◎</div>
          </div>

          {/* Giant editorial name overlaps the portrait like the reference. */}
          <div className="absolute left-1/2 bottom-[-1.5vw] z-20 -translate-x-1/2 w-[105%] whitespace-nowrap text-center text-[clamp(64px,11.5vw,190px)] leading-[0.78] font-light tracking-[-0.065em] text-white pointer-events-none select-none">
            Abhijit Pandey
          </div>

          <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 flex items-center gap-3 text-[8px] uppercase tracking-[0.16em] text-black/55 whitespace-nowrap">
            Scroll to explore <span className="w-8 h-px bg-black/30" />
          </div>

          <motion.a
            href="#about"
            whileHover={{ scale: 1.08 }}
            className="absolute bottom-5 right-5 md:right-7 z-30 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
            aria-label="Scroll to about"
          >
            <ArrowDownRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
