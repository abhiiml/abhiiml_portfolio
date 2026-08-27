// Source: https://reactbits.dev/text-animations/rotating-text
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const RotatingText = ({
  texts,
  transition = { type: 'spring', damping: 25, stiffness: 300 },
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  animatePresenceMode = 'wait',
  animatePresenceInitial = false,
  rotationInterval = 2200,
  staggerDuration = 0,
  staggerFrom = 'first',
  loop = true,
  auto = true,
  splitBy = 'characters',
  onNext,
  mainClassName = '',
  splitLevelClassName = '',
  elementLevelClassName = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex(prev => {
      const next = (prev + 1) % texts.length;
      onNext?.(next);
      return next;
    });
  };

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(next, rotationInterval);
    return () => clearInterval(t);
  }, [rotationInterval, auto, texts.length]);

  const currentText = texts[currentIndex];

  const elements = splitBy === 'characters'
    ? currentText.split('')
    : splitBy === 'words'
    ? currentText.split(' ')
    : [currentText];

  const getDelay = (index, total) => {
    if (staggerDuration === 0) return 0;
    if (staggerFrom === 'first') return index * staggerDuration;
    if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
    if (staggerFrom === 'center') {
      const center = (total - 1) / 2;
      return Math.abs(index - center) * staggerDuration;
    }
    return 0;
  };

  return (
    <span className={`inline-flex overflow-hidden ${mainClassName}`}>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentIndex}
          className={`inline-flex ${splitLevelClassName}`}
          style={{ overflow: 'hidden' }}
        >
          {elements.map((el, i) => (
            <motion.span
              key={i}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{ ...transition, delay: getDelay(i, elements.length) }}
              className={`inline-block ${elementLevelClassName}`}
              style={{ whiteSpace: el === ' ' ? 'pre' : 'normal' }}
            >
              {el === ' ' ? '\u00A0' : el}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
