import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import './Shuffle.css';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const Shuffle = ({ text, className = '', style = {}, shuffleDirection = 'right', duration = 0.35, ease = 'power3.out', threshold = 0.1, rootMargin = '-100px', tag = 'span', shuffleTimes = 1, stagger = 0.03, scrambleCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', triggerOnce = true, respectReducedMotion = true, triggerOnHover = true }) => {
  const ref = useRef(null), splitRef = useRef(null), wrappersRef = useRef([]), tlRef = useRef(null), playingRef = useRef(false), hoverRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false), [ready, setReady] = useState(false);
  const scrollStart = useMemo(() => `top ${(1 - threshold) * 100}%${rootMargin ? (rootMargin.startsWith('-') ? `-=${rootMargin.slice(1)}` : `+=${rootMargin}`) : ''}`, [threshold, rootMargin]);

  useEffect(() => { document.fonts?.ready?.then(() => setFontsLoaded(true)) ?? setFontsLoaded(true); }, []);

  useGSAP(() => {
    if (!ref.current || !text || !fontsLoaded) return;
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setReady(true); return; }
    const el = ref.current;
    const teardown = () => { tlRef.current?.kill(); tlRef.current = null; wrappersRef.current.forEach(w => { const inner = w.firstElementChild; const orig = inner?.querySelector('[data-orig="1"]'); if (orig && w.parentNode) w.parentNode.replaceChild(orig, w); }); wrappersRef.current = []; splitRef.current?.revert(); splitRef.current = null; playingRef.current = false; };
    const build = () => {
      teardown();
      splitRef.current = new GSAPSplitText(el, { type: 'chars', charsClass: 'shuffle-char' });
      splitRef.current.chars.forEach(ch => {
        const parent = ch.parentElement, w = ch.getBoundingClientRect().width;
        if (!parent || !w) return;
        const wrap = document.createElement('span'), inner = document.createElement('span');
        Object.assign(wrap.style, { display:'inline-block', overflow:'hidden', width:w+'px', verticalAlign:'bottom' });
        Object.assign(inner.style, { display:'inline-block', whiteSpace:'nowrap', willChange:'transform' });
        parent.insertBefore(wrap, ch); wrap.appendChild(inner);
        const orig = ch.cloneNode(true); orig.setAttribute('data-orig','1'); Object.assign(orig.style,{display:'inline-block',width:w+'px',textAlign:'center'}); inner.appendChild(orig);
        for(let i=0;i<shuffleTimes;i++){ const c=ch.cloneNode(true); c.textContent=scrambleCharset[Math.floor(Math.random()*scrambleCharset.length)]; Object.assign(c.style,{display:'inline-block',width:w+'px',textAlign:'center'}); inner.appendChild(c); }
        inner.appendChild(ch);
        const steps=shuffleTimes+1; const start=shuffleDirection==='left'?0:-steps*w; const end=shuffleDirection==='left'?-steps*w:0;
        gsap.set(inner,{x:start,force3D:true}); inner.dataset.final=end; wrappersRef.current.push(wrap);
      });
    };
    const play = () => { const strips=wrappersRef.current.map(w=>w.firstElementChild).filter(Boolean); if(!strips.length)return; playingRef.current=true; const tl=gsap.timeline({onComplete:()=>{playingRef.current=false; wrappersRef.current.forEach(w=>{const s=w.firstElementChild,o=s?.querySelector('[data-orig="1"]');if(s&&o){s.replaceChildren(o);s.style.transform='none';}});armHover();}}); tl.to(strips,{duration,ease,x:(i,t)=>Number(t.dataset.final||0),stagger}); tlRef.current=tl; };
    const armHover=()=>{ if(!triggerOnHover)return; hoverRef.current=()=>{if(playingRef.current)return;build();play();}; el.addEventListener('mouseenter',hoverRef.current); };
    const create=()=>{build();play();setReady(true);};
    const st=ScrollTrigger.create({trigger:el,start:scrollStart,once:triggerOnce,onEnter:create});
    return()=>{st.kill();if(hoverRef.current)el.removeEventListener('mouseenter',hoverRef.current);teardown();setReady(false);};
  }, {dependencies:[text,duration,ease,scrollStart,fontsLoaded,shuffleDirection,shuffleTimes,stagger,triggerOnce,respectReducedMotion,triggerOnHover],scope:ref});

  const Tag=tag||'span';
  return React.createElement(Tag,{ref,className:`shuffle-parent ${ready?'is-ready':''} ${className}`,style:{...style}},text);
};
export default Shuffle;
