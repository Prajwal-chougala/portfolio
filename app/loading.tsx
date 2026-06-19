'use client';

import { motion } from 'motion/react';

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: 'var(--color-deep)' }}
    >
      <div className="flex flex-col items-center gap-3.5 w-full max-w-[180px]">
        {/* Compact Theme-Compatible Label */}
        <div className="text-[9px] font-mono tracking-[0.25em] text-text-muted uppercase text-center">
          RESOLVING
        </div>

        {/* Thin Indeterminate Progress Line */}
        <div className="w-full h-[1.5px] bg-border-subtle/15 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute inset-y-0 w-16 rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))',
            }}
            animate={{
              left: ['-30%', '110%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        {/* Minimalist Monospace Label */}
        <div className="text-[10px] font-mono tracking-[0.2em] text-text-muted font-medium animate-pulse">
          LOADING
        </div>
      </div>
    </div>
  );
}
