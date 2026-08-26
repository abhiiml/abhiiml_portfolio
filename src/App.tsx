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

function MaskTitle({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2>
      <span className="mask-line"><span>{line1}</span></span>
      <span className="mask-line"><span><em>{line2}</em></span></span>
    </h2>
  );
}

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
        <section id="home" className="hero-section">
          <div className="hero-card">
            <div className="hero-card-top">
              <span className="micro">© 2026 / ABHIJIT PANDEY</span>
              <span className="micro desktop-only">B.TECH CSE · AI / ML</span>
              <span className="micro">India</span>
            </div>
            <div className="hero-copy-left">
              <span className="micro">01 — INTRO</span>
              <p>
                Developer &amp;
                <br />
                AI/ML student
              </p>
            </div>
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
            <div className="hero-name" aria-label={portfolioData.personal.name}>
              <span>Abhijit</span> <span>Pandey</span>
            </div>
            <div className="hero-bottom-note">
              <span>Scroll to explore</span>
              <span className="scroll-line" />
            </div>
          </div>
        </section>

        <section id="about" className="editorial-section light-section">
          <Reveal className="section-intro">
            <div>
              <span className="micro dark">02 — ABOUT</span>
              <MaskTitle line1="Curious" line2="by default." />
            </div>
            <p className="lead-copy">{portfolioData.personal.bio}</p>
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
              <span className="micro dark">WHAT I DO</span>
              <p>
                Turn ideas into useful software — from machine-learning experiments and data workflows to polished web
                products.
              </p>
              <div className="fact-list">
                <span>01 / Artificial Intelligence</span>
                <span>02 / Machine Learning</span>
                <span>03 / Full-stack Development</span>
                <span>04 / Product &amp; UI</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="work-section dark-section">
          <Reveal className="work-heading">
            <span className="micro">03 — SELECTED WORK</span>
            <MaskTitle line1="Things" line2="I build." />
            <p>Selected experiments, products and technical work.</p>
          </Reveal>
          <div className="project-list">
            {portfolioData.projects.map((project, index) => (
              <Reveal key={project.id} className="project-row" delay={index * 90}>
                <span className="project-number">0{index + 1}</span>
                <div className="project-main">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.technologies.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="project-thumb">
                  <span className="photo-shift">
                    <img src={project.image} alt="" />
                  </span>
                </div>
                <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  <Arrow />
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="credentials" className="credential-section light-section">
          <Reveal className="credential-head">
            <div>
              <span className="micro dark">04 — CREDENTIALS</span>
              <MaskTitle line1="Proof of" line2="practice." />
            </div>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="circle-link">
              LinkedIn <Arrow />
            </a>
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
                <div className="credential-logo">
                  <img src={cert.image} alt="" />
                </div>
                <div>
                  <h3>{cert.name}</h3>
                  <p>{cert.organization}</p>
                </div>
                <Arrow />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="skills-section dark-section">
          <Reveal>
            <span className="micro">05 — TOOLKIT</span>
            <MaskTitle line1="Made with" line2="these." />
          </Reveal>
          <div className="skills-grid">
            {Object.entries(portfolioData.skills).map(([group, skills], index) => (
              <Reveal key={group} className="skill-group" delay={index * 90}>
                <span className="micro">{group.toUpperCase()}</span>
                <div>
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <Reveal className="contact-card">
            <div className="contact-top">
              <span className="micro">06 — CONTACT</span>
              <span className="status">
                <i /> Open to opportunities
              </span>
            </div>
            <MaskTitle line1="Let's make" line2="something." />
            <p>Open to internships, collaborations and interesting technical problems.</p>
            <div className="contact-actions">
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}`} target="_blank" rel="noreferrer" className="big-button">
                Email me <Arrow />
              </a>
              <a href={`https://github.com/${portfolioData.personal.github}`} className="text-link" target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <a href={portfolioData.personal.linkedin} className="text-link" target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
            </div>
            <div className="contact-footer">
              <span>© 2026 Abhijit Pandey</span>
              <span>Built with curiosity</span>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}

export default App;
