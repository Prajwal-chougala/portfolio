'use client';

import { motion } from 'motion/react';
import { Trophy, Flame, Target, ExternalLink } from 'lucide-react';

export default function LeetCodeStats() {
  const solved = 83;
  const categories = [
    { name: 'Easy', count: 45, max: 800, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    { name: 'Medium', count: 30, max: 1600, color: 'bg-amber-500', textColor: 'text-amber-400' },
    { name: 'Hard', count: 8, max: 800, color: 'bg-rose-500', textColor: 'text-rose-400' },
  ];

  return (
    <section id="leetcode" className="py-24 relative overflow-hidden bg-deep/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">LeetCode Progress</h2>
          <p className="section-subtitle">
            Algorithmic problem-solving statistics and competitive coding metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Left Column: Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-6 p-6 md:p-8 glass-card border border-border-subtle flex flex-col justify-between gap-6"
          >
            <div className="flex justify-between items-center pb-4 border-b border-border-subtle/40">
              <span className="text-xs font-mono font-bold text-text-heading flex items-center gap-2">
                <Target className="w-4 h-4 text-accent-cyan" />
                SOLVED BREAKDOWN
              </span>
              <span className="text-xs text-text-muted font-mono">Prajwal_chougala</span>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="flex flex-col">
                <span className="text-5xl font-extrabold font-mono text-accent-cyan tracking-tight">
                  {solved}
                </span>
                <span className="text-[10px] text-text-muted font-mono mt-1 uppercase">PROBLEMS SOLVED</span>
              </div>
              <div className="h-10 w-px bg-border-subtle/50" />
              <div className="flex flex-col justify-center">
                <span className="text-xs text-text-body font-mono font-bold">Rank: Top 15%</span>
                <span className="text-[10px] text-text-muted font-mono">Global solver rating</span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="flex flex-col gap-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-body font-bold">{cat.name}</span>
                    <span className={cat.textColor}>
                      {cat.count} <span className="text-text-muted">/ {cat.max}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full`}
                      style={{ width: `${(cat.count / cat.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Mini Cards */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-4 justify-between">
            {/* Contest Rating */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="p-5 glass-card border border-border-subtle flex items-center gap-4 flex-1"
            >
              <div className="p-3 rounded-lg bg-surface border border-border-subtle text-accent-purple">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-mono block">CONTEST RATING</span>
                <span className="text-lg font-mono font-bold text-text-heading">1520</span>
              </div>
            </motion.div>

            {/* Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.05 }}
              className="p-5 glass-card border border-border-subtle flex items-center gap-4 flex-1"
            >
              <div className="p-3 rounded-lg bg-surface border border-border-subtle text-accent-magenta">
                <Flame className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-mono block">ACTIVE STREAK</span>
                <span className="text-lg font-mono font-bold text-text-heading">15 Days</span>
              </div>
            </motion.div>

            {/* Global Rank */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 }}
              className="p-5 glass-card border border-border-subtle flex items-center gap-4 flex-1"
            >
              <div className="p-3 rounded-lg bg-surface border border-border-subtle text-accent-cyan">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-mono block">GLOBAL RANK</span>
                <span className="text-lg font-mono font-bold text-text-heading">Top 8%</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* LeetCode link */}
        <div className="flex justify-center mt-12">
          <a
            href="https://leetcode.com/u/Prajwal_chougala/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-border-subtle hover:border-accent-cyan text-text-body text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            View LeetCode Profile
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
