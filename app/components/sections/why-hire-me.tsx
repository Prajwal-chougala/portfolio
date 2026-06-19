'use client';

import { motion } from 'motion/react';
import { Code2, Lightbulb, Users, Trophy, Briefcase, Brain } from 'lucide-react';

const cards = [
  {
    title: 'Full Stack Development',
    description: 'Expertise in designing and deploying end-to-end web architectures, combining clean user interfaces with secure RESTful application logic.',
    icon: Code2,
    color: 'text-accent-cyan',
    glow: 'rgba(34, 211, 238, 0.1)',
  },
  {
    title: 'AI & Agentic Systems',
    description: 'Specializing in generative models, prompt engineering, structured JSON outputs, function calling, vector databases, and custom autonomous LLM agents.',
    icon: Brain,
    color: 'text-accent-purple',
    glow: 'rgba(192, 132, 252, 0.1)',
  },
  {
    title: 'Analytical Problem Solving',
    description: 'Strong foundations in data structures, algorithms, and logical design. Active competitive programmer with a passion for optimizing complexity.',
    icon: Lightbulb,
    color: 'text-accent-teal',
    glow: 'rgba(45, 212, 191, 0.1)',
  },
  {
    title: 'Leadership & Collaboration',
    description: 'Vice President of the KLE CSE Coding Club. Proven ability to guide peers, organize large tech events, co-ordinate projects, and present code.',
    icon: Users,
    color: 'text-accent-magenta',
    glow: 'rgba(244, 63, 94, 0.1)',
  },
  {
    title: 'Hackathon & Build Culture',
    description: 'Finalist in top regional hackathons (DVG Top 10) and primary coordinator of INVENTRA-2K25. Thrives in high-pressure, rapid building environments.',
    icon: Trophy,
    color: 'text-accent-cyan',
    glow: 'rgba(34, 211, 238, 0.1)',
  },
  {
    title: 'Real Industry Internship',
    description: 'Hands-on experience as a MERN Developer Intern at X7 IT Technologies, contributing to live codebases, workflows, and database schemas.',
    icon: Briefcase,
    color: 'text-accent-purple',
    glow: 'rgba(192, 132, 252, 0.1)',
  },
];

export default function WhyHireMe() {
  return (
    <section id="hire" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Why Hire Me?</h2>
          <p className="section-subtitle">
            A snapshot of the core competencies, practical experiences, and leadership traits I bring to high-agency engineering teams.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-85px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-6 glass-card border border-border-subtle/50 hover:border-accent-cyan/20 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden bg-surface/5"
              >
                {/* Ambient Glow */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{ backgroundColor: card.glow }}
                />

                {/* Icon wrapper */}
                <div className="p-3 rounded-xl bg-surface border border-border-subtle/55 text-text-body w-fit group-hover:border-accent-cyan/35 transition-all select-none">
                  <CardIcon className={`w-5 h-5 ${card.color}`} />
                </div>

                {/* Text info */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-heading font-mono group-hover:text-accent-cyan transition-colors uppercase tracking-wider leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-body/80 font-sans font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
