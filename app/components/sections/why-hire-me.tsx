'use client';

import { motion } from 'motion/react';
import { Code2, Lightbulb, Users, Trophy, Briefcase, Brain } from 'lucide-react';

const cards = [
  {
    title: 'Full Stack Development',
    description: 'Expertise in designing and deploying end-to-end web architectures, combining clean user interfaces with secure RESTful application logic.',
    icon: Code2,
    color: 'text-accent-cyan',
    glow: 'rgba(0, 245, 255, 0.15)',
  },
  {
    title: 'AI & Agentic Systems',
    description: 'Specializing in generative models, prompt engineering, structured JSON outputs, function calling, vector databases, and custom autonomous LLM agents.',
    icon: Brain,
    color: 'text-accent-purple',
    glow: 'rgba(131, 111, 255, 0.15)',
  },
  {
    title: 'Analytical Problem Solving',
    description: 'Strong foundations in data structures, algorithms, and logical design. Active competitive programmer with a passion for optimizing complexity.',
    icon: Lightbulb,
    color: 'text-accent-teal',
    glow: 'rgba(21, 245, 186, 0.15)',
  },
  {
    title: 'Leadership & Collaboration',
    description: 'Vice President of the KLE CSE Coding Club. Proven ability to guide peers, organize large tech events, co-ordinate projects, and present code.',
    icon: Users,
    color: 'text-accent-magenta',
    glow: 'rgba(255, 43, 214, 0.15)',
  },
  {
    title: 'Hackathon & Build Culture',
    description: 'Finalist in top regional hackathons (DVG Top 10) and primary coordinator of INVENTRA-2K25. Thrives in high-pressure, rapid building environments.',
    icon: Trophy,
    color: 'text-accent-cyan',
    glow: 'rgba(0, 245, 255, 0.15)',
  },
  {
    title: 'Real Industry Internship',
    description: 'Hands-on experience as a MERN Developer Intern at X7 IT Technologies, contributing to live codebases, workflows, and database schemas.',
    icon: Briefcase,
    color: 'text-accent-purple',
    glow: 'rgba(131, 111, 255, 0.15)',
  },
];

export default function WhyHireMe() {
  return (
    <section id="hire" className="py-24 relative overflow-hidden bg-deep/50">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Why Hire Me?</h2>
          <p className="section-subtitle">
            A snapshot of the core competencies, practical experiences, and leadership traits I bring to high-agency engineering teams.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group p-6 glass-card glass-card-hover border-t-2 border-t-accent-purple/20 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Ambient Glow */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl transition-opacity opacity-20 group-hover:opacity-40"
                  style={{ backgroundColor: card.glow }}
                />

                {/* Icon wrapper */}
                <div className="p-3 rounded-xl bg-surface/70 border border-border-subtle/50 text-text-body w-fit group-hover:border-accent-cyan/30 transition-all">
                  <CardIcon className={`w-6 h-6 ${card.color}`} />
                </div>

                {/* Text info */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-text-heading font-mono group-hover:text-accent-cyan transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-body/85 leading-relaxed">
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
