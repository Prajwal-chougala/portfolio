'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Users, Github, ExternalLink, Code2, LucideIcon } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  github: string;
  demo?: string;
}

const projectsData: Project[] = [
  {
    id: 'securefund',
    title: 'SecureFund',
    subtitle: 'Blockchain Crowdfunding Platform',
    description: 'A decentralized, transparent platform built to prevent crowdfunding scams by automating disbursements through Solidity smart contracts.',
    icon: Shield,
    overview: 'SecureFund eliminates trust issues in traditional crowdfunding platforms by placing all transaction logic on-chain. Backers retain full control over where their funds go, releasing them in stages upon verification of project milestones.',
    problem: 'Traditional crowdfunding platforms suffer from lack of accountability. Project creators can disappear with raised funds, leading to scams and complete loss of capital for backers.',
    solution: 'Designed smart escrow contracts that release funds to creators only after backers vote on and approve progress proofs (milestones) submitted on-chain.',
    techStack: ['React', 'Solidity', 'Web3.js', 'Node.js', 'Express.js', 'MongoDB', 'Hardhat'],
    github: 'https://github.com/Prajwal-chougala',
    demo: 'https://github.com/Prajwal-chougala',
  },
  {
    id: 'wat-wise',
    title: 'WAT-WISE',
    subtitle: 'IoT + ML Energy Tracking System',
    description: 'An intelligent power monitoring system combining hardware IoT energy tracking with predictive machine learning forecasting.',
    icon: Zap,
    overview: 'WAT-WISE measures real-time electricity consumption using hardware sensors, transmits it to a backend dashboard, and predicts future power consumption spikes using regression forecasting models.',
    problem: 'Industrial and residential consumers struggle to understand real-time electricity leaks and find it difficult to forecast costs, resulting in huge energy waste.',
    solution: 'Engineered an IoT ESP32 framework with current sensor nodes streaming real-time metrics, paired with a TensorFlow model predicting next-week demand spikes.',
    techStack: ['Python', 'TensorFlow', 'IoT / ESP32', 'React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Prajwal-chougala',
    demo: 'https://github.com/Prajwal-chougala',
  },
  {
    id: 'hrms',
    title: 'KLECET HRMS',
    subtitle: 'College Human Resource Management System',
    description: 'A comprehensive HRMS featuring a multi-tier leave approval workflow, modernized with a fully responsive UI and enterprise-grade security.',
    icon: Users,
    overview: 'Designed and developed a centralized HR management system for KLE College of Engineering and Technology. It digitizes staff records and implements a strict multi-tier approval hierarchy (Employee → HOD → Office → Principal).',
    problem: 'The previous system lacked mobile responsiveness and suffered from severe vulnerabilities, including SQL injections, hardcoded database credentials, and insecure Caesar-cipher password storage.',
    solution: 'Performed a security audit across 20+ files to patch SQL injections and upgrade auth to SHA-256 + salt. Refactored the UI for cross-device support and scripted Linux deployments with automated DB health checks.',
    techStack: ['Java (JSP/Servlet)', 'MySQL', 'Apache Tomcat', 'Shell Scripting'],
    github: 'https://github.com/Prajwal-chougala',
    demo: 'https://klecethrms.in',
  },
];

export default function Projects() {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'overview' | 'tech'>>({
    securefund: 'overview',
    'wat-wise': 'overview',
    hrms: 'overview',
  });

  const handleTabChange = (projectId: string, tab: 'overview' | 'tech') => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Case Studies</h2>
          <p className="section-subtitle">
            Systems I have designed and implemented, highlighting problem-solving, architectural choices, and technical depth.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {projectsData.map((project, index) => {
            const ProjectIcon = project.icon;
            const activeTab = activeTabs[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-85px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-6 md:p-8 glass-card border border-border-subtle/50 hover:border-accent-cyan/15 transition-all duration-300 bg-surface/5"
              >
                <div className="flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-surface border border-border-subtle text-accent-cyan">
                        <ProjectIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text-heading font-mono leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-[10px] text-text-muted font-mono uppercase tracking-wider mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 select-none">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-border-subtle hover:border-accent-cyan text-text-body hover:text-accent-cyan transition-colors"
                        title="View Codebase"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/20 hover:border-accent-purple/45 text-accent-purple transition-all"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Short description */}
                  <p className="text-text-body/90 text-sm md:text-base font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-border-subtle/40 select-none">
                    {(['overview', 'tech'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(project.id, tab)}
                        className={`px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase border-b-2 -mb-[2px] transition-colors cursor-pointer ${
                          activeTab === tab
                            ? 'border-accent-cyan text-accent-cyan'
                            : 'border-transparent text-text-muted hover:text-text-body'
                        }`}
                      >
                        {tab === 'tech' ? 'Tech Stack' : tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="min-h-[120px] flex flex-col gap-3 font-mono text-xs md:text-sm">
                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-col gap-3"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-accent-purple uppercase tracking-wider">Problem:</span>
                            <p className="text-sm text-text-body/80 mt-1 font-sans font-light leading-relaxed">{project.problem}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-accent-teal uppercase tracking-wider">Solution:</span>
                            <p className="text-sm text-text-body/80 mt-1 font-sans font-light leading-relaxed">{project.solution}</p>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'tech' && (
                        <motion.div
                          key="tech"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-wrap gap-1.5 pt-1.5"
                        >
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full bg-surface border border-border-subtle/80 text-[11px] font-mono text-text-body flex items-center gap-1.5 hover:border-accent-cyan/35 transition-colors"
                            >
                              <Code2 className="w-3 h-3 text-accent-cyan" />
                              {tech}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
