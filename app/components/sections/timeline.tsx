'use client';

import { motion } from 'motion/react';
import { GraduationCap, Code2, Briefcase, Trophy, Brain, Rocket, LucideIcon } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  dotColor: string;
  glowColor: string;
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
    glowColor: 'rgba(14,165,233,0.2)',
  },
  {
    year: '2024',
    title: 'MERN Development',
    subtitle: 'Full-Stack Deep Dive',
    description: 'Mastered web architecture with MongoDB, Express, React, and Node.js. Built interactive portals and developed key projects.',
    icon: Code2,
    accentColor: 'text-accent-purple',
    dotColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.2)',
  },
  {
    year: '2025',
    title: 'Industry Internship',
    subtitle: 'MERN Developer Intern at X7 IT Technologies',
    description: 'First professional role. Collaborated in a team of developers to write secure REST APIs, optimize databases, and build scalable components.',
    icon: Briefcase,
    accentColor: 'text-accent-teal',
    dotColor: '#14b8a6',
    glowColor: 'rgba(20,184,166,0.2)',
  },
  {
    year: '2025',
    title: 'Hackathons & Events',
    subtitle: 'Top 10 DVG Hackathon & INVENTRA Organizer',
    description: 'Finalist out of hundreds of entries. Co-organized the INVENTRA-2K25 national hackathon. Discovered the thrill of rapid building.',
    icon: Trophy,
    accentColor: 'text-accent-magenta',
    dotColor: '#f43f5e',
    glowColor: 'rgba(244,63,94,0.2)',
  },
  {
    year: '2026',
    title: 'Agentic AI Systems',
    subtitle: 'Building Autonomous AI Agents',
    description: 'Pivoted to generative models, function calling, vector stores, and custom LLM reasoning chains. Building systems that do tasks independently.',
    icon: Brain,
    accentColor: 'text-accent-cyan',
    dotColor: '#0ea5e9',
    glowColor: 'rgba(14,165,233,0.2)',
  },
  {
    year: 'Future',
    title: 'AI Startup Founder',
    subtitle: 'Intelligent Software & Automation',
    description: 'Committed to solving real-world challenges by establishing high-agency, automated platforms that make advanced AI accessible.',
    icon: Rocket,
    accentColor: 'text-accent-purple',
    dotColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.2)',
  },
];

function BranchSVG({ side, color }: { side: 'left' | 'right'; color: string }) {
  const path =
    side === 'right'
      ? 'M 0,40 C 20,40 20,20 45,20'
      : 'M 45,40 C 20,40 20,20 0,20';

  return (
    <svg
      className="absolute top-6 hidden md:block pointer-events-none"
      style={side === 'right' ? { left: 'calc(50% + 14px)' } : { right: 'calc(50% + 14px)' }}
      width="45"
      height="50"
      viewBox="0 0 45 50"
      fill="none"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

function TreeNode({ dotColor, glowColor }: { dotColor: string; glowColor: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-7 z-20 hidden md:flex items-center justify-center select-none pointer-events-none">
      <div
        className="absolute w-7 h-7 rounded-full animate-pulse"
        style={{ backgroundColor: glowColor }}
      />
      <div
        className="w-3.5 h-3.5 rounded-full border flex items-center justify-center"
        style={{ borderColor: dotColor, backgroundColor: 'var(--color-deep)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
      </div>
    </div>
  );
}

function MobileNode({ dotColor, glowColor }: { dotColor: string; glowColor: string }) {
  return (
    <div className="absolute left-[20px] top-7 z-20 flex md:hidden items-center justify-center select-none pointer-events-none">
      <div
        className="absolute w-6 h-6 rounded-full animate-pulse"
        style={{ backgroundColor: glowColor }}
      />
      <div
        className="w-3 h-3 rounded-full border flex items-center justify-center"
        style={{ borderColor: dotColor, backgroundColor: 'var(--color-deep)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
      </div>
    </div>
  );
}

function TimelineCard({ item, side }: { item: TimelineItem; side: 'left' | 'right' }) {
  const ItemIcon = item.icon;
  const isRight = side === 'right';

  return (
    <div className={`w-full md:w-[calc(50%-45px)] ${isRight ? 'md:ml-auto' : 'md:mr-auto'}`}>
      <div className="p-5 md:p-6 glass-card border border-border-subtle/50 hover:border-accent-cyan/20 transition-all duration-300 group relative overflow-hidden bg-surface/5">
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] opacity-40"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${item.dotColor} 50%, transparent 100%)`,
          }}
        />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold font-mono tracking-widest uppercase ${item.accentColor}`}>
              {item.year}
            </span>
            <h3 className="text-base font-bold text-text-heading font-mono mt-1 leading-tight">
              {item.title}
            </h3>
          </div>
          <div
            className="p-2 rounded-xl border transition-colors duration-300 shrink-0"
            style={{
              borderColor: `${item.dotColor}20`,
              backgroundColor: `${item.dotColor}05`,
            }}
          >
            <ItemIcon className="w-4.5 h-4.5" style={{ color: item.dotColor }} />
          </div>
        </div>

        <p className={`text-[10px] font-mono uppercase tracking-wider mb-2.5 ${item.accentColor} opacity-75`}>
          {item.subtitle}
        </p>

        <p className="text-xs md:text-sm text-text-body/80 font-sans font-light leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Timeline</h2>
          <p className="section-subtitle">
            A chronological tree of my journey — from academics to industry to the frontiers of AI.
          </p>
        </motion.div>

        {/* Tree Body */}
        <div className="relative mt-16">
          {/* Central trunk (desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] hidden md:block">
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-accent-cyan) 0%, var(--color-accent-purple) 50%, var(--color-accent-magenta) 100%)',
                opacity: 0.15,
              }}
            />
          </div>

          {/* Mobile trunk (left-aligned) */}
          <div className="absolute left-[20px] top-0 bottom-0 w-[1px] md:hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-accent-cyan) 0%, var(--color-accent-purple) 50%, var(--color-accent-magenta) 100%)',
                opacity: 0.15,
              }}
            />
          </div>

          {/* Timeline Entries */}
          <div className="flex flex-col gap-8 md:gap-12">
            {timelineData.map((item, index) => {
              const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: side === 'left' ? -25 : 25,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                  className="relative pl-10 md:pl-0"
                >
                  <TreeNode dotColor={item.dotColor} glowColor={item.glowColor} />
                  <MobileNode dotColor={item.dotColor} glowColor={item.glowColor} />
                  <BranchSVG side={side} color={item.dotColor} />
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
