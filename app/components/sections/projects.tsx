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
    subtitle: 'Blockchain-Powered Crowdfunding Platform',
    description: 'A decentralized, transparent platform built to prevent crowdfunding scams by automating disbursements through Solidity smart contracts.',
    icon: Shield,
    overview: 'SecureFund eliminates trust issues in traditional crowdfunding platforms by placing all transaction logic on-chain. Backers retain full control over where their funds go, releasing them in stages upon verification of project milestones.',
    problem: 'Traditional crowdfunding platforms suffer from lack of accountability. Project creators can disappear with raised funds, leading to scams and complete loss of capital for backers.',
    solution: 'Designed smart contracts that escrow funds and release them to creators only after they submit progress proofs (milestones) which are voted on and approved by backers.',
    techStack: ['React', 'Solidity', 'Web3.js', 'Node.js', 'Express.js', 'MongoDB', 'Hardhat'],
    github: 'https://github.com/Prajwal-chougala',
    demo: 'https://github.com/Prajwal-chougala',
  },
  {
    id: 'wat-wise',
    title: 'WAT-WISE',
    subtitle: 'IoT + ML Energy Monitoring System',
    description: 'An intelligent power monitoring system combining hardware IoT energy tracking with predictive machine learning forecasting.',
    icon: Zap,
    overview: 'WAT-WISE measures real-time electricity consumption using hardware sensors, transmits it to a backend dashboard, and predicts future power consumption spikes using regression forecasting models.',
    problem: 'Industrial and residential consumers struggle to understand real-time electricity leaks and find it difficult to forecast costs, resulting in huge energy waste.',
    solution: 'Engineered an IoT ESP32 framework with current sensor nodes that streams real-time data to a dashboard, and trained a TensorFlow regression model to predict next-week energy spikes.',
    techStack: ['Python', 'TensorFlow', 'IoT / ESP32', 'React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Prajwal-chougala',
    demo: 'https://github.com/Prajwal-chougala',
  },
  {
    id: 'hrms',
    title: 'HRMS System',
    subtitle: 'Human Resource Management System',
    description: 'Enterprise workflow management platform streamlining employee tracking, automated leave requests, and role-based directory management.',
    icon: Users,
    overview: 'A robust administration system for medium-sized enterprises. It features multi-role permissions (Admin, HR, Manager, Employee) and fully automates complex workflows like leaves, onboarding, and appraisals.',
    problem: 'Manual spreadsheets and legacy HR systems lead to miscommunication, leave overlaps, and huge friction in internal company approvals.',
    solution: 'Developed a unified portal with granular Role-Based Access Control (RBAC) and automated notifications. Includes dynamic calendar view of company-wide leaves.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Tailwind CSS'],
    github: 'https://github.com/Prajwal-chougala',
    demo: 'https://github.com/Prajwal-chougala',
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
    <section id="projects" className="py-24 relative overflow-hidden bg-deep/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Case Studies</h2>
          <p className="section-subtitle">
            Systems I have designed and implemented, highlighting problem-solving, architectural choices, and technical depth.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {projectsData.map((project, index) => {
            const ProjectIcon = project.icon;
            const activeTab = activeTabs[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 md:p-8 glass-card border border-border-subtle hover:border-accent-cyan/20 transition-all duration-300"
              >
                <div className="flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-surface border border-border-subtle text-accent-cyan">
                        <ProjectIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-heading font-mono">
                          {project.title}
                        </h3>
                        <p className="text-xs text-text-muted font-mono uppercase tracking-wider">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border-subtle hover:border-accent-cyan text-text-body transition-colors"
                        title="View Codebase"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-accent-purple/20 hover:bg-accent-purple/30 border border-accent-purple/40 text-text-heading transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Short description */}
                  <p className="text-text-body/90 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-border-subtle/50">
                    {(['overview', 'tech'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(project.id, tab)}
                        className={`px-4 py-2 text-xs md:text-sm font-bold font-mono tracking-wider uppercase border-b-2 -mb-[2px] transition-colors cursor-pointer ${
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
                  <div className="min-h-[140px] flex flex-col gap-4">
                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-col gap-4"
                        >
                          <div>
                            <span className="text-xs font-mono font-bold text-accent-purple/80 uppercase">Problem:</span>
                            <p className="text-sm text-text-body/80 mt-1">{project.problem}</p>
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold text-accent-teal/80 uppercase">Solution:</span>
                            <p className="text-sm text-text-body/80 mt-1">{project.solution}</p>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'tech' && (
                        <motion.div
                          key="tech"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-wrap gap-2 pt-2"
                        >
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs font-mono text-text-body flex items-center gap-1.5"
                            >
                              <Code2 className="w-3.5 h-3.5 text-accent-cyan" />
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
