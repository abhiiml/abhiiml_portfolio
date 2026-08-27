// Source: https://reactbits.dev/animations/animated-content
// AnimatedContent - wraps children and animates them in when scrolled into view
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedContent = ({
  children,
  distance = 60,
  direction = 'vertical',
  reverse = false,
  config = { tension: 80, friction: 20 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1.0,
  threshold = 0.1,
  delay = 0,
  className = '',
  style,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const getInitial = () => {
    const base = { opacity: animateOpacity ? initialOpacity : 1 };
    if (direction === 'vertical') {
      return { ...base, y: reverse ? -distance : distance, scale };
    }
    if (direction === 'horizontal') {
      return { ...base, x: reverse ? -distance : distance, scale };
    }
    return { ...base, scale };
  };

  const getAnimate = () => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  });

  // Convert spring config to framer-motion spring
  const transition = {
    type: 'spring',
    stiffness: config.tension ?? 80,
    damping: config.friction ?? 20,
    delay,
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
