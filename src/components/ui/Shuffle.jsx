import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Shuffle.css';

const Shuffle = ({
  text,
  className = '',
  style = {},
  duration = 0.45,
  threshold = 0.15,
  rootMargin = '0px',
  tag = 'span',
  shuffleTimes = 3,
  stagger = 0.04,
  scrambleCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const timelineRef = useRef(null);
  const playedRef = useRef(false);

  const chars = Array.from(text || '');

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !text) return;

    const charEls = charsRef.current.filter(Boolean);
    const reduced = respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const randomChar = () => scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)];

    const play = () => {
      if (!charEls.length || timelineRef.current?.isActive()) return;
      timelineRef.current?.kill();

      if (reduced) {
        charEls.forEach((el, i) => { el.textContent = chars[i] || ''; });
        playedRef.current = true;
        return;
      }

      playedRef.current = true;
      const tl = gsap.timeline();
      charEls.forEach((el, index) => {
        const original = chars[index] || '';
        if (!original || original === ' ') return;

        const state = { progress: 0 };
        tl.to(state, {
          progress: shuffleTimes,
          duration: duration,
          ease: 'none',
          delay: index * stagger,
          onUpdate: () => {
            const step = Math.floor(state.progress);
            el.textContent = step >= shuffleTimes - 1 ? original : randomChar();
          },
          onComplete: () => { el.textContent = original; }
        }, index * stagger);
      });
      timelineRef.current = tl;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && (!triggerOnce || !playedRef.current)) play();
    }, { threshold, rootMargin });

    observer.observe(root);

    const onEnter = () => {
      if (!playedRef.current || !triggerOnce) play();
    };
    if (triggerOnHover) root.addEventListener('mouseenter', onEnter);

    return () => {
      observer.disconnect();
      root.removeEventListener('mouseenter', onEnter);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [text, duration, threshold, rootMargin, shuffleTimes, stagger, scrambleCharset, triggerOnce, respectReducedMotion, triggerOnHover]);

  const Tag = tag || 'span';
  return React.createElement(
    Tag,
    { ref: rootRef, className: `shuffle-parent ${className}`, style: { ...style } },
    chars.map((char, index) =>
      React.createElement('span', {
        key: `${char}-${index}`,
        ref: el => { charsRef.current[index] = el; },
        className: 'shuffle-char',
        'aria-hidden': true
      }, char === ' ' ? '\u00A0' : char)
    )
  );
};

export default Shuffle;
