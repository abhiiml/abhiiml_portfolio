import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const getContainingBlock = element => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none' || style.willChange.includes('transform') || style.willChange.includes('perspective') || style.willChange.includes('filter') || /paint|layout|strict|content/.test(style.contain)) return node;
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = block => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({ targetSelector = '.cursor-target', spinDuration = 2, hideDefaultCursor = true, hoverDuration = 0.2, parallaxOn = true, cursorColor = '#ffffff', cursorColorOnTarget }) => {
  const cursorRef = useRef(null), cornersRef = useRef(null), spinTl = useRef(null), dotRef = useRef(null), containingBlockRef = useRef(null), targetCornerPositionsRef = useRef(null), tickerFnRef = useRef(null), activeStrengthRef = useRef(0);
  const isMobile = useMemo(() => typeof window !== 'undefined' && (('ontouchstart' in window && window.innerWidth <= 768) || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())), []);
  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);
  const moveCursor = useCallback((x, y) => { if (!cursorRef.current) return; const o = getContainingBlockOffset(containingBlockRef.current); gsap.to(cursorRef.current, { x: x - o.x, y: y - o.y, duration: .1, ease: 'power3.out' }); }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = 'none';
    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');
    containingBlockRef.current = getContainingBlock(cursor);
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current);
    let activeTarget = null, currentLeaveHandler = null, resumeTimeout = null;
    const cleanupTarget = target => { if (currentLeaveHandler) target.removeEventListener('mouseleave', currentLeaveHandler); currentLeaveHandler = null; };
    const offset = getOffset();
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2 - offset.x, y: window.innerHeight / 2 - offset.y });
    const createSpin = () => { spinTl.current?.kill(); spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' }); };
    createSpin();

    const ticker = () => {
      if (!targetCornerPositionsRef.current || !cornersRef.current) return;
      const strength = activeStrengthRef.current;
      if (!strength) return;
      const x = gsap.getProperty(cursor, 'x'), y = gsap.getProperty(cursor, 'y');
      Array.from(cornersRef.current).forEach((corner, i) => {
        const cx = gsap.getProperty(corner, 'x'), cy = gsap.getProperty(corner, 'y');
        const tx = targetCornerPositionsRef.current[i].x - x, ty = targetCornerPositionsRef.current[i].y - y;
        gsap.to(corner, { x: cx + (tx - cx) * strength, y: cy + (ty - cy) * strength, duration: strength >= .99 && parallaxOn ? .2 : .05, ease: 'power1.out', overwrite: 'auto' });
      });
    };
    tickerFnRef.current = ticker;
    const moveHandler = e => moveCursor(e.clientX, e.clientY);
    const leaveTarget = target => {
      gsap.ticker.remove(ticker); targetCornerPositionsRef.current = null; activeStrengthRef.current = 0; activeTarget = null;
      const corners = Array.from(cornersRef.current || []); gsap.killTweensOf(corners, 'x,y');
      const s = constants.cornerSize;
      const positions = [{x:-s*1.5,y:-s*1.5},{x:s*.5,y:-s*1.5},{x:s*.5,y:s*.5},{x:-s*1.5,y:s*.5}];
      corners.forEach((c,i) => gsap.to(c,{x:positions[i].x,y:positions[i].y,duration:.3,ease:'power3.out'}));
      if (cursorColorOnTarget) { gsap.to(corners,{borderColor:cursorColor,duration:.15}); if(dotRef.current) gsap.to(dotRef.current,{backgroundColor:cursorColor,duration:.15}); }
      cleanupTarget(target);
      resumeTimeout = setTimeout(() => { if (!activeTarget) createSpin(); resumeTimeout = null; }, 50);
    };
    const enterHandler = e => {
      let target = e.target;
      while (target && target !== document.body && !(target instanceof Element && target.matches(targetSelector))) target = target.parentElement;
      if (!target || !cursorRef.current) return;
      if (activeTarget === target) return;
      if (activeTarget) leaveTarget(activeTarget);
      if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }
      activeTarget = target;
      const corners = Array.from(cornersRef.current || []); corners.forEach(c => gsap.killTweensOf(c, 'x,y'));
      spinTl.current?.pause(); gsap.killTweensOf(cursor, 'rotation'); gsap.set(cursor,{rotation:0});
      if (cursorColorOnTarget) { gsap.to(corners,{borderColor:cursorColorOnTarget,duration:.15}); if(dotRef.current) gsap.to(dotRef.current,{backgroundColor:cursorColorOnTarget,duration:.15}); }
      const rect = target.getBoundingClientRect(), {borderWidth,cornerSize} = constants, o = getOffset(), x = gsap.getProperty(cursor,'x'), y = gsap.getProperty(cursor,'y');
      targetCornerPositionsRef.current = [{x:rect.left-borderWidth-o.x,y:rect.top-borderWidth-o.y},{x:rect.right+borderWidth-cornerSize-o.x,y:rect.top-borderWidth-o.y},{x:rect.right+borderWidth-cornerSize-o.x,y:rect.bottom+borderWidth-cornerSize-o.y},{x:rect.left-borderWidth-o.x,y:rect.bottom+borderWidth-cornerSize-o.y}];
      gsap.ticker.add(ticker); gsap.to(activeStrengthRef,{current:1,duration:hoverDuration,ease:'power2.out'});
      corners.forEach((c,i)=>gsap.to(c,{x:targetCornerPositionsRef.current[i].x-x,y:targetCornerPositionsRef.current[i].y-y,duration:.2,ease:'power2.out'}));
      currentLeaveHandler = () => leaveTarget(target); target.addEventListener('mouseleave', currentLeaveHandler);
    };
    const scrollHandler = () => { if (!activeTarget) return; const o=getOffset(), x=gsap.getProperty(cursor,'x')+o.x, y=gsap.getProperty(cursor,'y')+o.y, el=document.elementFromPoint(x,y); if (!el || !(el===activeTarget || el.closest?.(targetSelector)===activeTarget)) leaveTarget(activeTarget); };
    const down = () => { if(dotRef.current) gsap.to(dotRef.current,{scale:.7,duration:.3}); gsap.to(cursor,{scale:.9,duration:.2}); };
    const up = () => { if(dotRef.current) gsap.to(dotRef.current,{scale:1,duration:.3}); gsap.to(cursor,{scale:1,duration:.2}); };
    const resize = () => { containingBlockRef.current=getContainingBlock(cursor); };
    window.addEventListener('mousemove',moveHandler); window.addEventListener('mouseover',enterHandler); window.addEventListener('scroll',scrollHandler,{passive:true}); window.addEventListener('mousedown',down); window.addEventListener('mouseup',up); window.addEventListener('resize',resize);
    return () => { gsap.ticker.remove(ticker); window.removeEventListener('mousemove',moveHandler); window.removeEventListener('mouseover',enterHandler); window.removeEventListener('scroll',scrollHandler); window.removeEventListener('mousedown',down); window.removeEventListener('mouseup',up); window.removeEventListener('resize',resize); if(activeTarget) cleanupTarget(activeTarget); if(resumeTimeout) clearTimeout(resumeTimeout); spinTl.current?.kill(); document.body.style.cursor=originalCursor; };
  }, [isMobile,targetSelector,spinDuration,moveCursor,constants,hideDefaultCursor,hoverDuration,parallaxOn,cursorColor,cursorColorOnTarget]);

  if (isMobile) return null;
  return <div ref={cursorRef} className="target-cursor-wrapper"><div ref={dotRef} className="target-cursor-dot" style={{backgroundColor:cursorColor}}/><div className="target-cursor-corner corner-tl" style={{borderColor:cursorColor}}/><div className="target-cursor-corner corner-tr" style={{borderColor:cursorColor}}/><div className="target-cursor-corner corner-br" style={{borderColor:cursorColor}}/><div className="target-cursor-corner corner-bl" style={{borderColor:cursorColor}}/></div>;
};
export default TargetCursor;
