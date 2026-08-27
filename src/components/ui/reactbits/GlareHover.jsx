// Source: https://reactbits.dev/animations/glare-hover
import { useRef } from 'react';
import './GlareHover.css';

const GlareHover = ({
  children,
  glareColor = 'rgba(255,255,255,0.25)',
  glareOpacity = 0.18,
  glareAngle = -30,
  glareSize = 350,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style,
}) => {
  const containerRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    el.style.transition = 'transform 0.1s ease';
    if (glareRef.current) {
      glareRef.current.style.left = `${x}px`;
      glareRef.current.style.top = `${y}px`;
      glareRef.current.style.opacity = String(glareOpacity);
    }
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.transition = `transform ${transitionDuration}ms ease`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`glare-hover-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style }}
    >
      {children}
      <div
        ref={glareRef}
        className="glare-hover-glare"
        style={{
          width: glareSize,
          height: glareSize,
          background: `radial-gradient(circle, ${glareColor} 0%, transparent 70%)`,
          opacity: 0,
        }}
      />
    </div>
  );
};

export default GlareHover;
