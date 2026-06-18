'use client';

import { motion } from 'motion/react';
import { Github, Star, GitFork, BookOpen } from 'lucide-react';

const mockRepos = [
  {
    name: 'SecureFund-Blockchain',
    description: 'Solidity escrow smart contract & crowdfunding MERN platform.',
    stars: 8,
    forks: 2,
    language: 'Solidity',
    color: '#AA67F9',
  },
  {
    name: 'WAT-WISE-IoT',
    description: 'ESP32 firmware & FastAPI ML regression spike prediction dashboard.',
    stars: 7,
    forks: 1,
    language: 'Python',
    color: '#3572A5',
  },
  {
    name: 'HRMS-Portal',
    description: 'Human Resource workflow platform with RBAC security & MongoDB.',
    stars: 6,
    forks: 3,
    language: 'JavaScript',
    color: '#f1e05a',
  },
];

const mockLanguages = [
  { name: 'JavaScript', percentage: 40, color: '#f1e05a' },
  { name: 'TypeScript', percentage: 25, color: '#3178c6' },
  { name: 'Python', percentage: 20, color: '#3572A5' },
  { name: 'Solidity', percentage: 10, color: '#AA67F9' },
  { name: 'Java', percentage: 5, color: '#b07219' },
];

export default function GitHubStats() {
  return (
    <section id="github" className="py-24 relative overflow-hidden bg-deep/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle">
            Repository summary, language breakdown, and featured open-source codebases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Language and Stats */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="p-6 glass-card border border-border-subtle grid grid-cols-3 gap-4 text-center"
            >
              <div>
                <span className="text-2xl font-bold font-mono text-accent-purple">15</span>
                <span className="text-[10px] text-text-muted font-mono block mt-1 uppercase">Repositories</span>
              </div>
              <div className="border-x border-border-subtle/40">
                <span className="text-2xl font-bold font-mono text-accent-cyan">23</span>
                <span className="text-[10px] text-text-muted font-mono block mt-1 uppercase">Stars</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-mono text-accent-teal">450+</span>
                <span className="text-[10px] text-text-muted font-mono block mt-1 uppercase">Commits</span>
              </div>
            </motion.div>

            {/* Language Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-6 glass-card border border-border-subtle flex flex-col gap-4"
            >
              <span className="text-xs font-mono font-bold text-text-heading flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent-cyan" />
                LANGUAGE METRICS
              </span>

              {/* Stacked Percentage Bar */}
              <div className="h-2 w-full rounded-full bg-surface overflow-hidden flex">
                {mockLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    className="h-full"
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {mockLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-xs font-bold text-text-heading font-mono">{lang.name}</span>
                    <span className="text-[10px] text-text-muted font-mono">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Repo list */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
            {mockRepos.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href="https://github.com/Prajwal-chougala"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-5 glass-card border border-border-subtle hover:border-accent-cyan/10 flex flex-col gap-3 group transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-text-heading font-mono group-hover:text-accent-cyan transition-colors">
                    {repo.name}
                  </h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-muted">
                    Public
                  </span>
                </div>

                <p className="text-xs text-text-body/80 leading-relaxed">
                  {repo.description}
                </p>

                <div className="flex items-center gap-4 mt-1 text-[10px] font-mono text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* View Profile */}
        <div className="flex justify-center mt-12">
          <a
            href="https://github.com/Prajwal-chougala"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-border-subtle hover:border-accent-cyan text-text-body text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            Explore Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
