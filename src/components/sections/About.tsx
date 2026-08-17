import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { Database, Code2, Network, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlurText } from '../ui/TextAnimations';
// @ts-ignore
import profile2 from '../../assets/images/profile-2.jpg';
// @ts-ignore
import profile3 from '../../assets/images/profile-3.jpg';
// @ts-ignore
import profile5 from '../../assets/images/profile-5.jpg';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 72%' }
        }
      );

      // Parallax on stacked images
      gsap.to('.img-stack-1', {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: '.img-stack', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.img-stack-2', {
        y: 20,
        ease: 'none',
        scrollTrigger: { trigger: '.img-stack', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
      gsap.to('.img-stack-3', {
        y: -15,
        ease: 'none',
        scrollTrigger: { trigger: '.img-stack', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-16 about-reveal">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">01 // Identity</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground">
              Technical<br />Profiling
            </h2>
          </div>
          <p className="font-mono text-xs text-muted hidden md:block text-right max-w-[200px] leading-relaxed">
            DATA_STREAM: [ {portfolioData.personal.role.toUpperCase()} ]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* === STACKED IMAGE GALLERY === */}
          <div className="lg:col-span-5 flex flex-col about-reveal">
            <div className="img-stack relative h-[520px] md:h-[600px]">

              {/* Back image — B&W profile */}
              <div className="img-stack-3 absolute right-0 top-8 w-[55%] aspect-[3/4] overflow-hidden border border-white/10 shadow-2xl">
                <img src={profile3} alt="Abhijit" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/60" />
              </div>

              {/* Middle image — outdoor/sunglasses */}
              <div className="img-stack-2 absolute left-0 top-20 w-[58%] aspect-[3/4] overflow-hidden border border-white/10 shadow-2xl">
                <img src={profile5} alt="Abhijit outdoor" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/40" />
              </div>

              {/* Front image — main B&W focus */}
              <div className="img-stack-1 absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] aspect-square overflow-hidden border-2 border-accent/30 shadow-2xl shadow-accent/10">
                <img src={profile2} alt="Abhijit portrait" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                {/* Tech overlay on front image */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(0,112,243,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,112,243,0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Floating label */}
              <div className="absolute bottom-4 right-0 bg-[#111]/80 backdrop-blur border border-white/10 px-3 py-2 font-mono text-xs text-muted">
                CSE + AI/ML // INDIA
              </div>
            </div>
          </div>

          {/* === SKILL CARDS === */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* About blurb */}
            <div className="about-reveal bento-card">
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">About</p>
              <p className="text-lg text-foreground leading-relaxed font-sans">
                <BlurText
                  text="Dedicated to building intelligent systems and scalable architectures. I bridge the gap between complex machine learning models and high-performance software engineering."
                  delay={30}
                />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Software Engineering */}
              <div className="about-reveal tech-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="text-accent" size={18} />
                  <p className="font-mono text-xs uppercase tracking-widest text-white">Software</p>
                </div>
                <div className="flex flex-col gap-2">
                  {portfolioData.skills.programming.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-2 border-b border-white/5 group"
                    >
                      <span className="font-sans text-sm text-muted group-hover:text-white transition-colors">{skill}</span>
                      <Terminal size={12} className="text-[#333] group-hover:text-accent transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI / ML */}
              <div className="about-reveal tech-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Network className="text-accent" size={18} />
                  <p className="font-mono text-xs uppercase tracking-widest text-white">Machine Learning</p>
                </div>
                <div className="flex flex-col gap-2">
                  {portfolioData.skills.ai.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-2 border-b border-white/5 group"
                    >
                      <span className="font-sans text-sm text-muted group-hover:text-white transition-colors">{skill}</span>
                      <Database size={12} className="text-[#333] group-hover:text-accent transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
