import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const getContainingBlock = element => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none' || /transform|perspective|filter/.test(style.willChange) || /paint|layout|strict|content/.test(style.contain)) return node;
    node = node.parentElement;
  }
  return null;
};

const getOffset = block => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({
  targetSelector = '.cursor-target, [data-cursor="hover"], a, button, [role="button"]',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = '#ffffff',
  cursorColorOnTarget
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const dotRef = useRef(null);
  const spinRef = useRef(null);
  const tickerRef = useRef(null);
  const blockRef = useRef(null);
  const targetRef = useRef(null);
  const positionsRef = useRef(null);
  const strengthRef = useRef({ current: 0 });
  const leaveRef = useRef(null);
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return ('ontouchstart' in window && window.innerWidth <= 768) || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  }, []);

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    const o = getOffset(blockRef.current);
    gsap.to(cursorRef.current, { x: x - o.x, y: y - o.y, duration: 0.08, ease: 'power3.out', overwrite: true });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;
    const cursor = cursorRef.current;
    const corners = Array.from(cursor.querySelectorAll('.target-cursor-corner'));
    cornersRef.current = corners;
    blockRef.current = getContainingBlock(cursor);
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    const resetCorners = () => {
      const s = 12;
      const rest = [
        { x: -s * 1.5, y: -s * 1.5 },
        { x: s * 0.5, y: -s * 1.5 },
        { x: s * 0.5, y: s * 0.5 },
        { x: -s * 1.5, y: s * 0.5 }
      ];
      corners.forEach((c, i) => gsap.to(c, { ...rest[i], duration: 0.25, ease: 'power3.out', overwrite: true }));
    };

    const startSpin = () => {
      spinRef.current?.kill();
      spinRef.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };

    const stopTarget = () => {
      if (!targetRef.current) return;
      gsap.ticker.remove(tickerRef.current);
      targetRef.current.removeEventListener('mouseleave', leaveRef.current);
      targetRef.current = null;
      leaveRef.current = null;
      positionsRef.current = null;
      gsap.killTweensOf(strengthRef.current);
      strengthRef.current.current = 0;
      corners.forEach(c => gsap.killTweensOf(c, 'x,y'));
      resetCorners();
      if (cursorColorOnTarget) {
        gsap.to(corners, { borderColor: cursorColor, duration: 0.15, overwrite: true });
        gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15, overwrite: true });
      }
      startSpin();
    };

    const ticker = () => {
      const positions = positionsRef.current;
      if (!positions || !targetRef.current) return;
      const x = Number(gsap.getProperty(cursor, 'x')) || 0;
      const y = Number(gsap.getProperty(cursor, 'y')) || 0;
      const strength = strengthRef.current.current;
      corners.forEach((corner, i) => {
        const tx = positions[i].x - x;
        const ty = positions[i].y - y;
        const cx = Number(gsap.getProperty(corner, 'x')) || 0;
        const cy = Number(gsap.getProperty(corner, 'y')) || 0;
        const nextX = cx + (tx - cx) * strength;
        const nextY = cy + (ty - cy) * strength;
        gsap.set(corner, { x: nextX, y: nextY });
      });
    };
    tickerRef.current = ticker;

    const startTarget = target => {
      if (!target || target === targetRef.current) return;
      if (targetRef.current) stopTarget();
      targetRef.current = target;
      const rect = target.getBoundingClientRect();
      const o = getOffset(blockRef.current);
      const border = 3;
      const size = 12;
      const x = Number(gsap.getProperty(cursor, 'x')) || 0;
      const y = Number(gsap.getProperty(cursor, 'y')) || 0;
      positionsRef.current = [
        { x: rect.left - border - o.x, y: rect.top - border - o.y },
        { x: rect.right + border - size - o.x, y: rect.top - border - o.y },
        { x: rect.right + border - size - o.x, y: rect.bottom + border - size - o.y },
        { x: rect.left - border - o.x, y: rect.bottom + border - size - o.y }
      ];
      spinRef.current?.pause();
      gsap.killTweensOf(cursor, 'rotation');
      gsap.set(cursor, { rotation: 0 });
      if (cursorColorOnTarget) {
        gsap.to(corners, { borderColor: cursorColorOnTarget, duration: 0.15, overwrite: true });
        gsap.to(dotRef.current, { backgroundColor: cursorColorOnTarget, duration: 0.15, overwrite: true });
      }
      gsap.killTweensOf(strengthRef.current);
      gsap.to(strengthRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out', overwrite: true });
      gsap.ticker.add(tickerRef.current);
      const leave = () => stopTarget();
      leaveRef.current = leave;
      target.addEventListener('mouseleave', leave);
    };

    const findTarget = node => {
      if (!(node instanceof Element)) return null;
      try { return node.closest(targetSelector); } catch { return null; }
    };

    const moveHandler = e => moveCursor(e.clientX, e.clientY);
    const overHandler = e => {
      const target = findTarget(e.target);
      if (target) startTarget(target);
      else if (targetRef.current) stopTarget();
    };
    const scrollHandler = () => {
      const target = targetRef.current;
      if (!target) return;
      const x = Number(gsap.getProperty(cursor, 'x')) + getOffset(blockRef.current).x;
      const y = Number(gsap.getProperty(cursor, 'y')) + getOffset(blockRef.current).y;
      const under = document.elementFromPoint(x, y);
      if (!under || !target.contains(under)) stopTarget();
    };
    const down = () => { gsap.to(dotRef.current, { scale: 0.7, duration: 0.2, overwrite: true }); gsap.to(cursor, { scale: 0.9, duration: 0.2, overwrite: true }); };
    const up = () => { gsap.to(dotRef.current, { scale: 1, duration: 0.2, overwrite: true }); gsap.to(cursor, { scale: 1, duration: 0.2, overwrite: true }); };
    const resize = () => { blockRef.current = getContainingBlock(cursor); if (targetRef.current) startTarget(targetRef.current); };

    const initial = getOffset(blockRef.current);
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2 - initial.x, y: window.innerHeight / 2 - initial.y, rotation: 0 });
    resetCorners();
    startSpin();

    window.addEventListener('mousemove', moveHandler, { passive: true });
    window.addEventListener('mouseover', overHandler, { passive: true });
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('resize', resize);

    return () => {
      gsap.ticker.remove(tickerRef.current);
      if (targetRef.current && leaveRef.current) targetRef.current.removeEventListener('mouseleave', leaveRef.current);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', overHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('resize', resize);
      spinRef.current?.kill();
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(corners);
      document.body.style.cursor = originalCursor;
    };
  }, [isMobile, targetSelector, spinDuration, hideDefaultCursor, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget, moveCursor]);

  if (isMobile) return null;
  return <div ref={cursorRef} className="target-cursor-wrapper"><div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} /><div className="target-cursor-corner corner-tl" style={{ borderColor: cursorColor }} /><div className="target-cursor-corner corner-tr" style={{ borderColor: cursorColor }} /><div className="target-cursor-corner corner-br" style={{ borderColor: cursorColor }} /><div className="target-cursor-corner corner-bl" style={{ borderColor: cursorColor }} /></div>;
};

export default TargetCursor;
