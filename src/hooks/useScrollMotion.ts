import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const enter = gsap.timeline({ defaults: { ease: 'power3.out' } });
      enter
        .from('.hero-card-top', { opacity: 0, y: -14, duration: 0.7 }, 0.05)
        .from('.hero-copy-left', { opacity: 0, x: -28, duration: 0.85 }, 0.12)
        .from('.hero-copy-right', { opacity: 0, x: 28, duration: 0.85 }, 0.18)
        .from('.location-pill', { opacity: 0, x: -48, duration: 0.8 }, 0.24)
        .from('.hero-image', { scale: 1.12, duration: 1.5, ease: 'power2.out' }, 0)
        .from('.hero-name span', { yPercent: 35, opacity: 0, duration: 1.05, stagger: 0.08, ease: 'power4.out' }, 0.18)
        .from('.hero-bottom-note', { opacity: 0, y: 12, duration: 0.65 }, 0.5);

      gsap.to('.hero-image-wrap', {
        y: 110,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.65 },
      });

      gsap.to('.hero-name', {
        y: -70,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.45 },
      });

      gsap.to('.hero-copy-left, .hero-copy-right, .location-pill, .hero-bottom-note, .hero-card-top', {
        y: -24,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: '15% top', end: '80% top', scrub: true },
      });

      gsap.utils.toArray<HTMLElement>('.photo-shift').forEach((shift) => {
        gsap.fromTo(
          shift,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: shift.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true });
    });

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);
}
