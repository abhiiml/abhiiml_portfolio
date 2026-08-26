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
        .fromTo('.hero-card-top', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.05)
        .fromTo('.hero-copy-left', { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.85 }, 0.12)
        .fromTo('.hero-copy-right', { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.85 }, 0.18)
        .fromTo('.location-pill', { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.8 }, 0.24)
        .fromTo('.hero-image', { scale: 1.12 }, { scale: 1, duration: 1.5, ease: 'power2.out' }, 0)
        .fromTo('.hero-name span', { yPercent: 35, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.08, ease: 'power4.out' }, 0.18)
        .fromTo('.hero-bottom-note', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.65 }, 0.5);

      gsap.fromTo(
        '.hero-image-wrap',
        { y: 0 },
        {
          y: 110,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        '.hero-name',
        { y: 0, opacity: 1 },
        {
          y: -70,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        '.hero-copy-left, .hero-copy-right, .location-pill, .hero-bottom-note, .hero-card-top',
        { y: 0, opacity: 1 },
        {
          y: -24,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: '65% top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

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
              invalidateOnRefresh: true,
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
