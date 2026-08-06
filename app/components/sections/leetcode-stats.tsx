'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, Target, ExternalLink, Calendar, Zap, Loader2 } from 'lucide-react';
import type { LeetCodeResponse } from '@/app/api/leetcode/route';

interface LeetCodeData {
  solved: { total: number; easy: number; medium: number; hard: number };
  totalQuestions: { easy: number; medium: number; hard: number };
  streak: number;
  totalActiveDays: number;
  ranking: number;
  contest: { rating: number; attended: number; globalRanking: number } | null;
}

// Animated counter hook for smooth number transitions
function useAnimatedCount(target: number, duration = 1200): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;

    let start = 0;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

// Skeleton shimmer component
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-surface-hover/60 ${className}`}
    />
  );
}

// Loading state matching the real layout
function LoadingSkeleton() {
  return (
    <section id="leetcode" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-9 w-64 mb-3" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Left skeleton */}
          <div className="col-span-1 lg:col-span-6 p-6 md:p-8 glass-card border border-border-subtle/50 flex flex-col gap-6 bg-surface/5">
            <div className="flex justify-between items-center pb-4 border-b border-border-subtle/30">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-6 py-2">
              <Skeleton className="h-14 w-20" />
              <div className="h-10 w-px bg-border-subtle/30" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Right skeleton */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-4 justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-5 glass-card border border-border-subtle/50 flex items-center gap-4 flex-1 bg-surface/5">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-16 mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mt-12">
          <div className="px-6 py-3 rounded-full border border-border-subtle text-text-muted text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Fetching LeetCode Data...
          </div>
        </div>
      </div>
    </section>
  );
}

// Stat card component for the right column
function StatCard({
  icon: Icon,
  iconColor,
  label,
  value,
  delay = 0,
}: {
  icon: typeof Trophy;
  iconColor: string;
  label: string;
  value: string | number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ delay }}
      className="p-5 glass-card border border-border-subtle/50 flex items-center gap-4 flex-1 bg-surface/5"
    >
      <div className={`p-2.5 rounded-xl bg-surface border border-border-subtle ${iconColor} flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col select-none">
        <span className="text-[9px] text-text-muted font-mono uppercase tracking-wider block">{label}</span>
        <span className="text-base font-mono font-bold text-text-heading mt-0.5">{value}</span>
      </div>
    </motion.div>
  );
}

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch('/api/leetcode');
        if (!res.ok) throw new Error('API request failed');

        const json: LeetCodeResponse = await res.json();
        if (json.error) throw new Error('API returned error');

        if (!cancelled) {
          setData({
            solved: json.solved,
            totalQuestions: json.totalQuestions,
            streak: json.streak,
            totalActiveDays: json.totalActiveDays,
            ranking: json.ranking,
            contest: json.contest,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  // Animated counts
  const animatedTotal = useAnimatedCount(data?.solved.total ?? 0);
  const animatedStreak = useAnimatedCount(data?.streak ?? 0);
  const animatedActiveDays = useAnimatedCount(data?.totalActiveDays ?? 0);

  // Show skeleton while loading
  if (!data && !error) return <LoadingSkeleton />;

  // Build categories from real or fallback data
  const solved = data?.solved ?? { total: 0, easy: 0, medium: 0, hard: 0 };
  const totalQ = data?.totalQuestions ?? { easy: 850, medium: 1800, hard: 800 };

  const categories = [
    { name: 'Easy', count: solved.easy, max: totalQ.easy, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    { name: 'Medium', count: solved.medium, max: totalQ.medium, color: 'bg-amber-500', textColor: 'text-amber-400' },
    { name: 'Hard', count: solved.hard, max: totalQ.hard, color: 'bg-rose-500', textColor: 'text-rose-400' },
  ];

  // Format ranking
  const formatRanking = (rank: number) => {
    if (!rank || rank === 0) return '—';
    return rank.toLocaleString();
  };

  return (
    <section id="leetcode" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">LeetCode Progress</h2>
          <p className="section-subtitle">
            Real-time algorithmic problem-solving statistics and competitive coding metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Left Column: Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-6 p-6 md:p-8 glass-card border border-border-subtle/50 flex flex-col justify-between gap-6 bg-surface/5"
          >
            <div className="flex justify-between items-center pb-4 border-b border-border-subtle/30 select-none">
              <span className="text-[10px] font-mono font-bold text-text-heading flex items-center gap-2 uppercase tracking-wider">
                <Target className="w-4 h-4 text-accent-cyan" />
                Solved Breakdown
              </span>
              <span className="text-[10px] text-text-muted font-mono tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            <div className="flex items-center gap-6 py-2 select-none">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-extrabold font-mono text-accent-cyan tracking-tight">
                  {error ? '—' : animatedTotal}
                </span>
                <span className="text-[9px] text-text-muted font-mono mt-1 uppercase tracking-wider">PROBLEMS SOLVED</span>
              </div>
              <div className="h-10 w-px bg-border-subtle/30" />
              <div className="flex flex-col justify-center">
                <span className="text-xs text-text-body font-mono font-bold">
                  Rank: {formatRanking(data?.ranking ?? 0)}
                </span>
                <span className="text-[10px] text-text-muted font-mono">Global solver rating</span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="flex flex-col gap-4 select-none">
              {categories.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-body font-bold">{cat.name}</span>
                    <span className={cat.textColor}>
                      {error ? '—' : cat.count} <span className="text-text-muted">/ {cat.max}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface/50 overflow-hidden">
                    <motion.div
                      className={`h-full ${cat.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.max > 0 ? (cat.count / cat.max) * 100 : 0}%` }}
                      viewport={{ once: false, margin: '-80px' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Mini Cards */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-4 justify-between">
            {/* Contest Rating or Active Days */}
            {data?.contest ? (
              <StatCard
                icon={Trophy}
                iconColor="text-accent-purple"
                label="CONTEST RATING"
                value={data.contest.rating}
              />
            ) : (
              <StatCard
                icon={Calendar}
                iconColor="text-accent-purple"
                label="ACTIVE DAYS"
                value={error ? '—' : animatedActiveDays}
              />
            )}

            {/* Streak */}
            <StatCard
              icon={Flame}
              iconColor="text-accent-magenta"
              label="ACTIVE STREAK"
              value={error ? '—' : `${animatedStreak} Days`}
              delay={0.05}
            />

            {/* Acceptance Rate or Total Submissions */}
            {data?.contest ? (
              <StatCard
                icon={Zap}
                iconColor="text-accent-cyan"
                label="CONTESTS ATTENDED"
                value={data.contest.attended}
                delay={0.1}
              />
            ) : (
              <StatCard
                icon={Zap}
                iconColor="text-accent-cyan"
                label="TOTAL SUBMISSIONS"
                value={error ? '—' : (data ? (data.solved.easy + data.solved.medium + data.solved.hard) : '—')}
                delay={0.1}
              />
            )}
          </div>
        </div>

        {/* LeetCode link */}
        <div className="flex justify-center mt-12 select-none">
          <a
            href="https://leetcode.com/u/Prajwal_chougala/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-border-subtle hover:border-accent-cyan text-text-body text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            LeetCode Profile
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
