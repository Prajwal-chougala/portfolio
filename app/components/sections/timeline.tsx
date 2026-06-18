'use client';

import { motion } from 'motion/react';
import { GraduationCap, Code2, Briefcase, Trophy, Brain, Rocket, LucideIcon } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;   // Tailwind text-* class
  dotColor: string;      // raw hex for SVG
  glowColor: string;     // raw rgba for glow
}

const timelineData: TimelineItem[] = [
  {
    year: '2023',
    title: 'Started CSE',
    subtitle: 'KLE College of Engineering & Technology',
    description: 'Began Computer Science Engineering degree. Built a foundation in algorithmic thinking, data structures, and computer organization.',
    icon: GraduationCap,
    accentColor: 'text-accent-cyan',
    dotColor: '#0ea5e9',
    glowColor: 'rgba(14,165,233,0.35)',
  },
  {
    year: '2024',
    title: 'MERN Development',
    subtitle: 'Full-Stack Deep Dive',
    description: 'Mastered web architecture with MongoDB, Express, React, and Node.js. Built interactive portals and developed key projects.',
    icon: Code2,
    accentColor: 'text-accent-purple',
    dotColor: '#0284c7',
    glowColor: 'rgba(2,132,199,0.35)',
  },
  {
    year: '2025',
    title: 'Industry Internship',
    subtitle: 'MERN Developer Intern at X7 IT Technologies',
    description: 'First professional role. Collaborated in a team of developers to write secure REST APIs, optimize databases, and build scalable components.',
    icon: Briefcase,
    accentColor: 'text-accent-teal',
    dotColor: '#0d9488',
    glowColor: 'rgba(13,148,136,0.35)',
  },
  {
    year: '2025',
    title: 'Hackathons & Events',
    subtitle: 'Top 10 DVG Hackathon & INVENTRA Organizer',
    description: 'Finalist out of hundreds of entries. Co-organized the INVENTRA-2K25 national hackathon. Discovered the thrill of rapid building.',
    icon: Trophy,
    accentColor: 'text-accent-magenta',
    dotColor: '#2563eb',
    glowColor: 'rgba(37,99,235,0.35)',
  },
  {
    year: '2026',
    title: 'Agentic AI Systems',
    subtitle: 'Building Autonomous AI Agents',
    description: 'Pivoted to generative models, function calling, vector stores, and custom LLM reasoning chains. Building systems that do tasks independently.',
    icon: Brain,
    accentColor: 'text-accent-cyan',
    dotColor: '#0ea5e9',
    glowColor: 'rgba(14,165,233,0.35)',
  },
  {
    year: 'Future',
    title: 'AI Startup Founder',
    subtitle: 'Intelligent Software & Automation',
    description: 'Committed to solving real-world challenges by establishing high-agency, automated platforms that make advanced AI accessible.',
    icon: Rocket,
    accentColor: 'text-accent-purple',
    dotColor: '#0284c7',
    glowColor: 'rgba(2,132,199,0.35)',
  },
];

/* ── Curved SVG branch connector ─────────────────────── */
function BranchSVG({ side, color }: { side: 'left' | 'right'; color: string }) {
  // The branch curves from the trunk outward to the card
  // Left card: branch goes trunk → left   (mirror horizontally)
  // Right card: branch goes trunk → right
  const path =
    side === 'right'
      ? 'M 0,40 C 30,40 30,20 60,20' // curve right
      : 'M 60,40 C 30,40 30,20 0,20'; // curve left

  return (
    <svg
      className="absolute top-6 hidden md:block pointer-events-none"
      style={side === 'right' ? { left: 'calc(50% + 18px)' } : { right: 'calc(50% + 18px)' }}
      width="60"
      height="50"
      viewBox="0 0 60 50"
      fill="none"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ── Glowing tree node on the trunk ──────────────────── */
function TreeNode({ dotColor, glowColor }: { dotColor: string; glowColor: string }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-7 z-20 hidden md:flex items-center justify-center"
    >
      {/* Outer glow ring */}
      <div
        className="absolute w-9 h-9 rounded-full animate-pulse"
        style={{ backgroundColor: glowColor }}
      />
      {/* Outer ring */}
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: dotColor, backgroundColor: 'var(--color-deep)' }}
      >
        {/* Inner dot */}
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      </div>
    </div>
  );
}

/* ── Mobile-only node (left-aligned) ──────────────────── */
function MobileNode({ dotColor, glowColor }: { dotColor: string; glowColor: string }) {
  return (
    <div className="absolute left-[22px] top-7 z-20 flex md:hidden items-center justify-center">
      <div
        className="absolute w-8 h-8 rounded-full animate-pulse"
        style={{ backgroundColor: glowColor }}
      />
      <div
        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: dotColor, backgroundColor: 'var(--color-deep)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
      </div>
    </div>
  );
}

/* ── Timeline Card ────────────────────────────────────── */
function TimelineCard({ item, side }: { item: TimelineItem; side: 'left' | 'right' }) {
  const ItemIcon = item.icon;
  const isRight = side === 'right';

  return (
    <div
      className={`w-full md:w-[calc(50%-60px)] ${
        isRight ? 'md:ml-auto' : 'md:mr-auto'
      }`}
    >
      <div className="p-5 md:p-6 glass-card border border-border-subtle hover:border-accent-cyan/30 transition-all duration-300 group relative overflow-hidden">
        {/* Subtle top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${item.dotColor} 50%, transparent 100%)`,
          }}
        />

        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col">
            <span
              className={`text-xs font-bold font-mono tracking-[0.2em] uppercase ${item.accentColor}`}
            >
              {item.year}
            </span>
            <h3 className="text-lg font-bold text-text-heading font-mono mt-1 leading-tight">
              {item.title}
            </h3>
          </div>
          <div
            className="p-2.5 rounded-xl border transition-colors duration-300 shrink-0"
            style={{
              borderColor: `${item.dotColor}30`,
              backgroundColor: `${item.dotColor}08`,
            }}
          >
            <ItemIcon className="w-5 h-5" style={{ color: item.dotColor }} />
          </div>
        </div>

        <p className={`text-xs font-mono uppercase tracking-wider mb-2.5 ${item.accentColor} opacity-80`}>
          {item.subtitle}
        </p>

        <p className="text-sm text-text-body/80 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN TIMELINE COMPONENT
   ════════════════════════════════════════════════════════ */
export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-deep/50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Timeline</h2>
          <p className="section-subtitle">
            A chronological tree of my journey — from academics to industry to the frontiers of AI.
          </p>
        </motion.div>

        {/* ── Tree Body ────────────────────────────── */}
        <div className="relative mt-16">
          {/* ── Central trunk (desktop) ── */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block">
            {/* Gradient trunk line */}
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-accent-cyan) 0%, var(--color-accent-purple) 50%, var(--color-accent-magenta) 100%)',
                opacity: 0.25,
              }}
            />
          </div>

          {/* ── Mobile trunk (left-aligned) ── */}
          <div className="absolute left-[22px] top-0 bottom-0 w-[2px] md:hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-accent-cyan) 0%, var(--color-accent-purple) 50%, var(--color-accent-magenta) 100%)',
                opacity: 0.25,
              }}
            />
          </div>

          {/* ── Root base (bottom of trunk, desktop) ── */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 hidden md:flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-accent-purple/30 border border-accent-purple/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple/20" />
          </div>

          {/* ── Top crown (top of trunk, desktop) ── */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 hidden md:flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan/20" />
            <div className="w-3 h-3 rounded-full bg-accent-cyan/30 border border-accent-cyan/50" />
          </div>

          {/* ── Timeline Entries ── */}
          <div className="flex flex-col gap-12 md:gap-16">
            {timelineData.map((item, index) => {
              const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: side === 'left' ? -40 : 40,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  className="relative pl-12 md:pl-0"
                >
                  {/* Desktop tree node */}
                  <TreeNode dotColor={item.dotColor} glowColor={item.glowColor} />

                  {/* Mobile tree node */}
                  <MobileNode dotColor={item.dotColor} glowColor={item.glowColor} />

                  {/* SVG branch connector (desktop only) */}
                  <BranchSVG side={side} color={item.dotColor} />

                  {/* Card */}
                  <TimelineCard item={item} side={side} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
