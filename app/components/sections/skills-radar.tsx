'use client';

import { motion } from 'motion/react';
import { Cpu, Code, Database, Brain } from 'lucide-react';

const skillCategories = [
  {
    name: 'AI & Machine Learning',
    icon: Brain,
    color: 'text-accent-purple',
    skills: ['AI Agents', 'Generative AI', 'Agentic AI', 'Neural Networks', 'Python', 'ML/DL basics'],
  },
  {
    name: 'Full Stack Web Dev',
    icon: Code,
    color: 'text-accent-cyan',
    skills: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Redux Toolkit', 'HTML5/CSS3'],
  },
  {
    name: 'Backend & Database',
    icon: Database,
    color: 'text-accent-teal',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'SQL basics', 'Supabase Integrations'],
  },
  {
    name: 'Languages & Tools',
    icon: Cpu,
    color: 'text-accent-magenta',
    skills: ['Java', 'C++', 'Git & GitHub', 'Vercel', 'Postman', 'Docker basics'],
  },
];

export default function SkillsRadar() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive list of core competencies, programming languages, and framework proficiencies.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-85px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="p-6 md:p-8 glass-card border border-border-subtle/50 hover:border-accent-cyan/20 transition-all duration-300 flex flex-col gap-6 bg-surface/5"
              >
                <div className="flex items-center gap-3.5 select-none">
                  <div className="p-2.5 rounded-xl bg-surface border border-border-subtle flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="font-bold text-text-heading font-mono text-base uppercase tracking-wider">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle/60 text-text-body font-mono hover:border-accent-cyan/40 hover:text-accent-cyan transition-all duration-200 cursor-default select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
