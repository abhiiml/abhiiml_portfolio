// Source: https://reactbits.dev/text-animations/blur-text
import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });

  const defaultFrom = useMemo(() => {
    if (animationFrom) return animationFrom;
    return direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -20 }
      : { filter: 'blur(10px)', opacity: 0, y: 20 };
  }, [animationFrom, direction]);

  const defaultTo = useMemo(() => {
    if (animationTo) return animationTo;
    return [{ filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? -10 : 10 }, { filter: 'blur(0px)', opacity: 1, y: 0 }];
  }, [animationTo, direction]);

  const keyframes = useMemo(() => buildKeyframes(defaultFrom, defaultTo), [defaultFrom, defaultTo]);

  const times = useMemo(() => {
    const n = defaultTo.length + 1;
    return Array.from({ length: n }, (_, i) => easing(i / (n - 1)));
  }, [defaultTo.length, easing]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} style={{ overflow: 'visible' }}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={defaultFrom}
          animate={isInView ? keyframes : defaultFrom}
          transition={{
            duration: stepDuration * defaultTo.length,
            delay: i * (delay / 1000),
            times,
            ease: 'easeOut',
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', whiteSpace: el === '' ? 'pre' : 'normal' }}
        >
          {el === '' ? '\u00A0' : el}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
