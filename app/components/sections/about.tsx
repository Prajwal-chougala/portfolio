'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Briefcase, Award, Users, Code2, Brain } from 'lucide-react';

export default function About() {
  const stats = [
    {
      label: 'Key Projects',
      value: '3+',
      icon: Code2,
      description: 'End-to-end applications',
      color: 'text-accent-cyan',
      borderColor: 'group-hover:border-accent-cyan/40',
    },
    {
      label: 'Industry Internship',
      value: '1',
      icon: Briefcase,
      description: 'MERN stack development',
      color: 'text-accent-purple',
      borderColor: 'group-hover:border-accent-purple/40',
    },
    {
      label: 'Leadership Roles',
      value: 'Vice President',
      icon: Users,
      description: 'Vice President of Coding Club',
      color: 'text-accent-teal',
      borderColor: 'group-hover:border-accent-teal/40',
    },
    {
      label: 'Hackathons',
      value: 'Top 10',
      icon: Award,
      description: 'DVG Hackathon finalist',
      color: 'text-accent-magenta',
      borderColor: 'group-hover:border-accent-magenta/40',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-deep/50">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            An engineering student exploring the intersection of web technologies, artificial intelligence, and software craftsmanship.
          </p>
        </motion.div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-16">
          {/* Avatar Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-4 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {/* Spinning gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-purple via-accent-cyan to-accent-teal animate-[spin_10s_linear_infinite]" />
              {/* Inner photo container — inset to reveal ring */}
              <div className="absolute inset-[4px] md:inset-[5px] rounded-full overflow-hidden bg-deep">
                <Image
                  src="/profile-v3.png"
                  alt="Prajwal Chougala"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 192px, 256px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text Bio - Styled as a Code Terminal Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-8"
          >
            <div className="glass-card border border-border-subtle/60 rounded-2xl relative overflow-hidden shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between bg-deep/40 border-b border-border-subtle/50 px-5 py-3 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs font-mono text-text-body/55">prajwal_chougala.tsx</span>
                <div className="w-12" /> {/* Spacer to align title */}
              </div>

              {/* Terminal Body */}
              <div className="p-6 md:p-8 flex flex-col gap-6 font-mono text-sm leading-relaxed">
                {/* Syntax Highlighted JSON-like structure */}
                <div className="space-y-1 bg-deep/20 p-4 rounded-xl border border-border-subtle/30">
                  <div>
                    <span className="text-accent-purple font-semibold">const</span>{' '}
                    <span className="text-accent-cyan">developer</span> = <span className="text-text-heading">{'{'}</span>
                  </div>
                  <div className="pl-6 border-l border-border-subtle/20">
                    <div>
                      <span className="text-text-muted">name:</span>{' '}
                      <span className="text-accent-teal">"Prajwal Chougala"</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">education:</span>{' '}
                      <span className="text-accent-teal">"B.E. Computer Science (2023-2027)"</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">institution:</span>{' '}
                      <span className="text-accent-teal">"KLE College of Engineering & Technology"</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">role:</span>{' '}
                      <span className="text-accent-teal">"Vice President @ CSE Coding Club"</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">focus:</span>{' '}
                      <span className="text-accent-magenta">"Agentic AI, Full-Stack, & Startups"</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-text-heading">{'};'}</span>
                  </div>
                </div>

                {/* Narrative Bio using clean readable font */}
                <div className="font-sans text-text-body/90 space-y-4">
                  <p>
                    I am an engineering student dedicated to building applications at the intersection of web technologies, artificial intelligence, and software craftsmanship.
                  </p>
                  <p>
                    During my tenure as a <span className="text-accent-teal font-medium">MERN Developer Intern at X7 IT Technologies</span>, I gained industry experience developing live enterprise products. Additionally, leading our Coding Club and organizing hackathons like <span className="text-accent-cyan font-semibold">INVENTRA-2K25</span> has allowed me to mentor peers and drive collaborative builder cultures.
                  </p>
                  <p>
                    Currently, I am shifting focus towards <span className="text-accent-magenta font-semibold">Agentic AI and LLM-powered systems</span>, exploring ways to transition traditional applications into autonomous workflows.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col p-6 glass-card glass-card-hover relative overflow-hidden transition-all duration-300"
              >
                {/* Visual Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-purple/5 rounded-full blur-xl group-hover:bg-accent-purple/10 transition-colors" />

                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg bg-surface/50 border border-border-subtle group-hover:border-accent-cyan/35 transition-all`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold font-mono text-text-heading">
                    {stat.value}
                  </span>
                </div>
                <h4 className="text-md font-bold font-mono text-text-heading mb-1">
                  {stat.label}
                </h4>
                <p className="text-sm text-text-muted">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
