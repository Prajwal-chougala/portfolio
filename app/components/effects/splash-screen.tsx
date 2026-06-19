'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LoadingContext = createContext({ isLoaded: false });

export function useLoading() {
  return useContext(LoadingContext);
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [greeting, setGreeting] = useState('WELCOME');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
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

  return (
    <LoadingContext.Provider value={{ isLoaded: !show }}>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
            style={{ background: 'var(--color-deep)' }}
          >
            <div className="flex flex-col items-center gap-3.5 w-full max-w-[180px]">
              {/* Compact Theme-Compatible Greeting */}
              <div className="text-[9px] font-mono tracking-[0.25em] text-text-muted uppercase text-center">
                {greeting}
              </div>

              {/* Thin Elegant Progress Line */}
              <div className="w-full h-[1.5px] bg-border-subtle/15 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))',
                  }}
                />
              </div>

              {/* Minimalist Monospace Percentage */}
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-muted font-medium">
                {Math.round(progress)}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div style={{ visibility: show ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
