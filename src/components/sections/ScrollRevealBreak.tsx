import ScrollExpand from '../ui/ScrollExpand';
// @ts-ignore
import profile4 from '../../assets/images/profile-4.jpg';

export function ScrollRevealBreak() {
  return (
    <div
      style={{ height: '100vh' }}
      className="relative w-full"
    >
      <ScrollExpand
        src={profile4}
        alt="Abhijit Pandey"
        title="Code. Learn. Build."
        scrollHint="↓ Scroll"
        useWindowScroll
        startWidth={44}
        startHeight={60}
        startRadius={20}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.1}
        holdDistance={0.3}
        smoothing={0.09}
        overlayScrim={0.5}
        style={{ height: '100vh' }}
      >
        {/* Overlay content shown once fully expanded */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent/80">
            AI / ML · Software Engineering · Open Source
          </p>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Ideas Become<br />
            <span className="text-accent">Real Products</span>
          </h2>
          <p className="font-sans text-white/60 max-w-md text-sm leading-relaxed">
            From ML models to full-stack interfaces — here's what I've shipped,
            learned from, and continued to build.
          </p>
          <a
            href="#projects"
            className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white border border-white/20 hover:border-accent hover:text-accent px-5 py-2.5 rounded-full transition-all duration-300"
          >
            View Projects ↓
          </a>
        </div>
      </ScrollExpand>
    </div>
  );
}
