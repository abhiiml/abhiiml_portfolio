import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import DriftWall from '../ui/DriftWall';

// Transform certifications into DriftWall items
const certItems = portfolioData.certifications.map(cert => ({
  image: cert.image,
  title: cert.name,
  issuer: cert.organization,
  href: cert.url,
}));

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              03 // Credentials
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground">
              Licenses &amp;<br />Certifications
            </h2>
          </div>
          <a
            href="https://www.linkedin.com/in/abhijitpandey456/details/certifications/"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors group border border-[#222] hover:border-accent/40 px-4 py-2 rounded-lg"
          >
            <Award size={13} />
            View on LinkedIn
            <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="font-mono text-xs text-muted mb-16 max-w-lg"
        >
          Hover the wall to explore · tiles link to credentials
        </motion.p>

      </div>

      {/* DriftWall — full viewport width, clipped by section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ height: 560 }}
        className="w-full"
      >
        <DriftWall
          items={certItems}
          columns={5}
          tileWidth={210}
          tileHeight={140}
          gap={16}
          radius={12}
          tilt={14}
          turn={-12}
          perspective={1100}
          depth={100}
          speed={36}
          direction="up"
          variance={0.4}
          parallax={0.55}
          lift={72}
          fade={0.65}
          dim={0.45}
          grayscale={true}
          overlayColor="#060010"
        />
      </motion.div>

      {/* Mobile fallback — scrollable card list */}
      <div className="md:hidden container mx-auto px-6 mt-8 grid grid-cols-2 gap-4">
        {portfolioData.certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.url}
            target="_blank"
            rel="noreferrer noopener"
            className="tech-card p-4 flex flex-col gap-3 group"
          >
            <img
              src={cert.image}
              alt={cert.name}
              className="w-12 h-12 object-contain rounded"
            />
            <div>
              <p className="font-mono text-xs text-white leading-snug">{cert.name}</p>
              <p className="font-mono text-[10px] text-accent mt-1">{cert.organization}</p>
            </div>
            <ExternalLink size={11} className="text-muted group-hover:text-accent transition-colors mt-auto self-end" />
          </a>
        ))}
      </div>

    </section>
  );
}
