'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [greeting] = useState(getGreeting);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease-in-out progression
        const increment = prev < 30 ? 2 : prev < 70 ? 3.5 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    const timer = setTimeout(() => setShow(false), 2800);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Generate grid dots positions (memoized to avoid hydration mismatch)
  const gridDots = useMemo(() => {
    const dots: { x: number; y: number }[] = [];
    for (let x = 0; x <= 100; x += 5) {
      for (let y = 0; y <= 100; y += 5) {
        dots.push({ x, y });
      }
    }
    return dots;
  }, []);

  const nameChars = "PRAJWAL CHOUGALA".split("");

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{ background: 'var(--color-deep)' }}
          >
            {/* ===== BACKGROUND LAYERS ===== */}

            {/* Dot grid pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="currentColor" className="text-text-heading" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGrid)" />
              </svg>
            </div>

            {/* Animated gradient orbs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1.2 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
              style={{
                background: 'radial-gradient(circle at 40% 40%, var(--color-accent-purple) 0%, transparent 60%)',
                filter: 'blur(100px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ duration: 2.2, delay: 0.2, ease: 'easeOut' }}
              className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] translate-x-32 translate-y-16"
              style={{
                background: 'radial-gradient(circle at 60% 60%, var(--color-accent-cyan) 0%, transparent 60%)',
                filter: 'blur(100px)',
              }}
            />

            {/* Rotating geometric ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
              animate={{ opacity: 0.06, scale: 1, rotate: 315 }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 1.5, ease: 'easeOut' },
                rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
              }}
              className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border-[1.5px] border-dashed border-accent-purple/30"
            />

            {/* ===== CORNER BRACKETS (viewfinder frame) ===== */}

            {/* Top-left */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: -10 }}
              animate={{ opacity: 0.3, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-8 left-8 md:top-12 md:left-12"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-t-[1.5px] border-l-[1.5px] border-accent-purple/40" />
            </motion.div>

            {/* Top-right */}
            <motion.div
              initial={{ opacity: 0, x: 10, y: -10 }}
              animate={{ opacity: 0.3, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute top-8 right-8 md:top-12 md:right-12"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-t-[1.5px] border-r-[1.5px] border-accent-purple/40" />
            </motion.div>

            {/* Bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10 }}
              animate={{ opacity: 0.3, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-b-[1.5px] border-l-[1.5px] border-accent-cyan/40" />
            </motion.div>

            {/* Bottom-right */}
            <motion.div
              initial={{ opacity: 0, x: 10, y: 10 }}
              animate={{ opacity: 0.3, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-b-[1.5px] border-r-[1.5px] border-accent-cyan/40" />
            </motion.div>

            {/* ===== TOP BAR — status info ===== */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-text-muted uppercase select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
              <span>LOADING PORTFOLIO</span>
            </motion.div>

            {/* ===== CENTER CONTENT ===== */}
            <div className="relative z-10 flex flex-col items-center gap-6 px-4">

              {/* Greeting with horizontal lines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[1px] bg-gradient-to-r from-transparent to-accent-purple/40"
                />
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-text-muted uppercase select-none whitespace-nowrap"
                >
                  {greeting}
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[1px] bg-gradient-to-l from-transparent to-accent-cyan/40"
                />
              </motion.div>

              {/* Main Name — letter-by-letter reveal */}
              <div className="overflow-hidden">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] select-none flex flex-wrap justify-center">
                  {nameChars.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: '120%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + i * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={char === ' ' ? 'w-3 md:w-4' : ''}
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, var(--color-text-heading) 0%, var(--color-accent-purple) 50%, var(--color-accent-cyan) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: char === ' ' ? 'transparent' : 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h1>
              </div>

              {/* Subtitle role */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-text-muted uppercase select-none"
              >
                AI Engineer &times; Full-Stack Developer
              </motion.p>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 1.5 }}
                className="mt-4 flex flex-col items-center gap-2"
              >
                <div className="w-48 md:w-64 h-[2px] bg-border-subtle/20 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))',
                      boxShadow: '0 0 12px var(--color-accent-purple), 0 0 4px var(--color-accent-cyan)',
                    }}
                  />
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  transition={{ duration: 0.3, delay: 1.6 }}
                  className="text-[9px] font-mono tracking-[0.2em] text-text-muted"
                >
                  {Math.round(progress)}%
                </motion.span>
              </motion.div>
            </div>

            {/* ===== BOTTOM BAR — meta info ===== */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase select-none"
            >
              <span>INDIA</span>
              <span className="w-[1px] h-3 bg-border-subtle/30" />
              <span>&copy; 2025</span>
              <span className="w-[1px] h-3 bg-border-subtle/30" />
              <span>PORTFOLIO v2.0</span>
            </motion.div>

            {/* Horizontal scan line animation */}
            <motion.div
              initial={{ top: '0%', opacity: 0 }}
              animate={{ top: '100%', opacity: [0, 0.08, 0.08, 0] }}
              transition={{ duration: 2.5, delay: 0.2, ease: 'linear' }}
              className="absolute left-0 right-0 h-[1px] bg-accent-cyan pointer-events-none"
              style={{ boxShadow: '0 0 20px 4px var(--color-accent-cyan)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — hidden during splash, revealed after */}
      <div style={{ visibility: show ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
}
