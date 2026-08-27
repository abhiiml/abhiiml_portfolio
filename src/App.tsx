import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { portfolioData } from './data/portfolio';
import { useScrollMotion } from './hooks/useScrollMotion';
import './portfolio-polish.css';
// @ts-ignore local image asset
import profile1 from './assets/images/profile-1.png';
// @ts-ignore local image asset
import profile2 from './assets/images/profile-2.jpg';
// @ts-ignore local image asset
import profile3 from './assets/images/profile-3.jpg';

// ReactBits components
// @ts-ignore
import BlurText from './components/ui/reactbits/BlurText.jsx';
// @ts-ignore
import ShinyText from './components/ui/reactbits/ShinyText.jsx';
// @ts-ignore
import RotatingText from './components/ui/reactbits/RotatingText.jsx';
// @ts-ignore
import FadeContent from './components/ui/reactbits/FadeContent.jsx';
// @ts-ignore
import GlareHover from './components/ui/reactbits/GlareHover.jsx';
// @ts-ignore
import AnimatedContent from './components/ui/reactbits/AnimatedContent.jsx';
// @ts-ignore
import SpecularButton from './components/ui/reactbits/SpecularButton.jsx';

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={`arrow-icon ${diagonal ? 'diagonal' : ''}`}>↗</span>;
}

function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// MaskTitle: uses BlurText for word-by-word blur+fade animation on headings.
// We bypass the CSS mask-line slide (which uses .reveal.is-visible trigger) since
// BlurText has its own IntersectionObserver. The h2 font styles are preserved via CSS.
function MaskTitle({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2>
      <BlurText
        text={line1}
        animateBy="words"
        direction="bottom"
        delay={90}
        stepDuration={0.38}
        className="block"
      />
      <em style={{ fontStyle: 'normal', color: '#898c8d' }}>
        <BlurText
          text={line2}
          animateBy="words"
          direction="bottom"
          delay={110}
          stepDuration={0.38}
          className="block"
        />
      </em>
    </h2>
  );
}

const HERO_ROTATING_WORDS = ['Developer', 'AI/ML Engineer', 'CSE Student', 'Builder'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  useScrollMotion();

  useEffect(() => {
    const sections = ['home', 'about', 'work', 'credentials', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7] },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site">
      <div className="grain" />
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Go home">
          <span className="brand-mark">AP</span>
          <span>Abhijit Pandey</span>
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {['home', 'about', 'work', 'credentials', 'contact'].map((id) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => scrollTo(id)}>
              {id === 'work' ? 'Work' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <i>{menuOpen ? '×' : '↘'}</i>
        </button>
      </header>
      <main>
        {/* ── HERO ─────────────────────────────────── */}
        <section id="home" className="hero-section">
          <div className="hero-card">
            <div className="hero-card-top">
              <AnimatedContent
                distance={14}
                direction="vertical"
                delay={0.15}
                config={{ tension: 90, friction: 18 }}
                className="inline-block"
              >
                <ShinyText text="© 2026 / ABHIJIT PANDEY" className="micro" speed={6} />
              </AnimatedContent>
              <AnimatedContent
                distance={14}
                direction="vertical"
                delay={0.25}
                config={{ tension: 90, friction: 18 }}
                className="inline-block desktop-only"
              >
                <ShinyText text="B.TECH CSE · AI / ML" className="micro" speed={8} />
              </AnimatedContent>
              <AnimatedContent
                distance={14}
                direction="vertical"
                delay={0.2}
                config={{ tension: 90, friction: 18 }}
                className="inline-block"
              >
                <span className="micro">India</span>
              </AnimatedContent>
            </div>

            {/* Hero copy left – now with RotatingText */}
            <div className="hero-copy-left">
              <span className="micro">01 — INTRO</span>
              <p>
                <RotatingText
                  texts={HERO_ROTATING_WORDS}
                  rotationInterval={2400}
                  splitBy="characters"
                  staggerDuration={0.03}
                  staggerFrom="first"
                  transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                  mainClassName="inline-flex overflow-hidden"
                />
              </p>
            </div>

            {/* Hero copy right */}
            <div className="hero-copy-right">
              <span className="tiny-arrow">↘</span>
              <p>
                Building intelligent
                <br />
                digital experiences
              </p>
            </div>

            <div className="hero-image-wrap">
              <img src={profile1} alt="Abhijit Pandey" className="hero-image" />
            </div>

            <div className="location-pill">
              <span className="location-dot" />
              Located in
              <br />
              India <span className="globe">◎</span>
            </div>

            {/* Hero name animated in with BlurText */}
            <div className="hero-name" aria-label={portfolioData.personal.name}>
              <BlurText
                text="Abhijit"
                animateBy="characters"
                direction="bottom"
                delay={60}
                stepDuration={0.35}
                className="inline-flex"
              />
              {' '}
              <BlurText
                text="Pandey"
                animateBy="characters"
                direction="bottom"
                delay={60}
                stepDuration={0.35}
                className="inline-flex"
                animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 22 }}
              />
            </div>

            <div className="hero-bottom-note">
              <ShinyText text="Scroll to explore" speed={5} />
              <span className="scroll-line" />
            </div>
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────── */}
        <section id="about" className="editorial-section light-section">
          <Reveal className="section-intro">
            <div>
              <ShinyText text="02 — ABOUT" className="micro dark" speed={7} />
              <MaskTitle line1="Curious" line2="by default." />
            </div>
            <FadeContent delay={0.15} duration={0.9} blur={true} threshold={0.1} className="lead-copy-wrap">
              <p className="lead-copy">{portfolioData.personal.bio}</p>
            </FadeContent>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-photo large" delay={80}>
              <span className="photo-shift">
                <img src={profile2} alt="Abhijit" />
              </span>
            </Reveal>
            <Reveal className="about-photo small" delay={180}>
              <span className="photo-shift">
                <img src={profile3} alt="Abhijit" />
              </span>
            </Reveal>
            <Reveal className="about-facts" delay={120}>
              <ShinyText text="WHAT I DO" className="micro dark" speed={9} />
              <FadeContent delay={0.1} duration={0.8} threshold={0.1}>
                <p>
                  Turn ideas into useful software — from machine-learning experiments and data workflows to polished web
                  products.
                </p>
                <div className="fact-list">
                  {['01 / Artificial Intelligence', '02 / Machine Learning', '03 / Full-stack Development', '04 / Product & UI'].map((item, i) => (
                    <AnimatedContent
                      key={item}
                      distance={20}
                      direction="horizontal"
                      reverse={true}
                      delay={i * 0.08}
                      config={{ tension: 100, friction: 20 }}
                    >
                      <span>{item}</span>
                    </AnimatedContent>
                  ))}
                </div>
              </FadeContent>
            </Reveal>
          </div>
        </section>

        {/* ── WORK ─────────────────────────────────── */}
        <section id="work" className="work-section dark-section">
          <Reveal className="work-heading">
            <ShinyText text="03 — SELECTED WORK" className="micro" speed={6} />
            <MaskTitle line1="Things" line2="I build." />
            <FadeContent delay={0.2} duration={0.7} threshold={0.1}>
              <p>Selected experiments, products and technical work.</p>
            </FadeContent>
          </Reveal>
          <div className="project-list">
            {portfolioData.projects.map((project, index) => (
              <Reveal key={project.id} className="project-row" delay={index * 90}>
                <span className="project-number">0{index + 1}</span>
                <div className="project-main">
                  <AnimatedContent
                    distance={18}
                    direction="vertical"
                    delay={index * 0.07}
                    config={{ tension: 90, friction: 20 }}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tags">
                      {project.technologies.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </AnimatedContent>
                </div>
                <GlareHover
                  className="project-thumb"
                  glareColor="rgba(255,255,255,0.2)"
                  glareOpacity={0.15}
                  glareSize={220}
                  transitionDuration={600}
                >
                  <span className="photo-shift">
                    <img src={project.image} alt="" />
                  </span>
                </GlareHover>
                <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  <Arrow />
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CREDENTIALS ───────────────────────────── */}
        <section id="credentials" className="credential-section light-section">
          <Reveal className="credential-head">
            <div>
              <ShinyText text="04 — CREDENTIALS" className="micro dark" speed={7} />
              <MaskTitle line1="Proof of" line2="practice." />
            </div>
            <SpecularButton
              as="a"
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              size="sm"
              radius={999}
              tintOpacity={0.03}
              textColor="#555759"
              lineColor="#000000"
              baseColor="#d1d5db"
              intensity={0.8}
              className="custom-specular-btn !text-[#555759] !text-[10px]"
            >
              LinkedIn <Arrow />
            </SpecularButton>
          </Reveal>
          <div className="credential-list">
            {portfolioData.certifications.map((cert, index) => (
              <Reveal
                as="a"
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                key={`${cert.name}-${index}`}
                className="credential-row"
                delay={index * 70}
              >
                <span>0{index + 1}</span>
                <FadeContent delay={index * 0.05} duration={0.7} threshold={0.1} className="credential-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={cert.image} alt="" />
                </FadeContent>
                <AnimatedContent
                  distance={14}
                  direction="horizontal"
                  reverse={true}
                  delay={index * 0.06}
                  config={{ tension: 90, friction: 20 }}
                >
                  <h3>{cert.name}</h3>
                  <p>{cert.organization}</p>
                </AnimatedContent>
                <Arrow />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SKILLS / TOOLKIT ──────────────────────── */}
        <section className="skills-section dark-section">
          <Reveal>
            <ShinyText text="05 — TOOLKIT" className="micro" speed={6} />
            <MaskTitle line1="Made with" line2="these." />
          </Reveal>
          <div className="skills-grid">
            {Object.entries(portfolioData.skills).map(([group, skills], index) => (
              <Reveal key={group} className="skill-group" delay={index * 90}>
                <ShinyText text={group.toUpperCase()} className="micro" speed={8} />
                <FadeContent delay={index * 0.08} duration={0.75} threshold={0.1}>
                  <div>
                    {(skills as string[]).map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </FadeContent>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────── */}
        <section id="contact" className="contact-section">
          <Reveal className="contact-card">
            <div className="contact-top">
              <ShinyText text="06 — CONTACT" className="micro" speed={6} />
              <span className="status">
                <i /> <ShinyText text="Open to opportunities" speed={5} />
              </span>
            </div>
            <MaskTitle line1="Let's make" line2="something." />
            <FadeContent delay={0.15} duration={0.8} blur={false} threshold={0.1}>
              <p>Open to internships, collaborations and interesting technical problems.</p>
            </FadeContent>
            <div className="contact-actions">
              <AnimatedContent
                distance={20}
                direction="vertical"
                delay={0.1}
                config={{ tension: 80, friction: 18 }}
              >
                <SpecularButton
                  as="a"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}`}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  radius={999}
                  tintOpacity={0}
                  textColor="#fff"
                  lineColor="#ffffff"
                  baseColor="#333333"
                  intensity={1}
                  className="custom-specular-btn !text-[11px]"
                >
                  Email me <Arrow />
                </SpecularButton>
              </AnimatedContent>
              <AnimatedContent distance={20} direction="vertical" delay={0.18} config={{ tension: 80, friction: 18 }}>
                <SpecularButton
                  as="a"
                  href={`https://github.com/${portfolioData.personal.github}`}
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  radius={999}
                  tintOpacity={0}
                  textColor="rgba(255,255,255,.78)"
                  lineColor="#ffffff"
                  baseColor="#333333"
                  intensity={1}
                  className="custom-specular-btn !text-[11px]"
                >
                  GitHub <Arrow />
                </SpecularButton>
              </AnimatedContent>
              <AnimatedContent distance={20} direction="vertical" delay={0.26} config={{ tension: 80, friction: 18 }}>
                <SpecularButton
                  as="a"
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  radius={999}
                  tintOpacity={0}
                  textColor="rgba(255,255,255,.78)"
                  lineColor="#ffffff"
                  baseColor="#333333"
                  intensity={1}
                  className="custom-specular-btn !text-[11px]"
                >
                  LinkedIn <Arrow />
                </SpecularButton>
              </AnimatedContent>
            </div>
            <div className="contact-footer">
              <span>© 2026 Abhijit Pandey</span>
              <ShinyText text="Built with curiosity" speed={7} />
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}

export default App;
