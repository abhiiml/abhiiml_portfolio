// Source: https://reactbits.dev/animations/fade-content
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeContent = ({
  children,
  blur = false,
  duration = 0.8,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.15,
  initialOpacity = 0,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startPct = (1 - threshold) * 100;

    gsap.fromTo(
      el,
      {
        opacity: initialOpacity,
        ...(blur ? { filter: 'blur(10px)' } : {}),
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: `top ${startPct}%`,
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [blur, duration, ease, delay, threshold, initialOpacity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: initialOpacity, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeContent;
