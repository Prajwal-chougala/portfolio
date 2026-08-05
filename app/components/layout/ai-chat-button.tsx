'use client';

import { useState, useEffect } from 'react';

export default function AiChatButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after 3 seconds on first visit, then hide after 5 seconds
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem('ai-chat-tooltip-seen');
    if (!hasSeenTooltip) {
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
        sessionStorage.setItem('ai-chat-tooltip-seen', 'true');
      }, 3000);

      return () => clearTimeout(showTimer);
    }
  }, []);

  useEffect(() => {
    if (showTooltip) {
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [showTooltip]);

  // Stop the attention pulse after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip / Label */}
      <div
        className={`
          pointer-events-none select-none
          rounded-xl px-4 py-2.5
          text-sm font-medium whitespace-nowrap
          shadow-lg
          transition-all duration-500 ease-out
          ${showTooltip || isHovered
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-2 opacity-0 scale-95'
          }
        `}
        style={{
          background: 'var(--theme-glass-bg)',
          border: '1px solid var(--theme-glass-border)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: 'var(--color-text-heading)',
          boxShadow: '0 8px 32px var(--theme-glass-shadow), 0 0 0 1px var(--theme-glass-border)',
        }}
      >
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Ask my AI anything about me!
        </span>
      </div>

      {/* Main Button */}
      <a
        href="https://portfolio-chat-bot-ten.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AI Assistant"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative"
      >
        {/* Pulse rings */}
        {isPulsing && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'var(--color-accent-purple)' }}
            />
            <span
              className="absolute -inset-1 rounded-full animate-pulse opacity-15"
              style={{
                background: `linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-cyan))`,
              }}
            />
          </>
        )}

        {/* Glow effect on hover */}
        <span
          className={`
            absolute -inset-2 rounded-full blur-xl
            transition-opacity duration-500
            ${isHovered ? 'opacity-40' : 'opacity-0'}
          `}
          style={{
            background: `linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-cyan))`,
          }}
        />

        {/* Button body */}
        <span
          className={`
            relative flex items-center justify-center
            w-14 h-14 rounded-full
            shadow-2xl cursor-pointer
            transition-all duration-300 ease-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          style={{
            background: `linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-cyan))`,
            boxShadow: isHovered
              ? '0 12px 40px rgba(139, 92, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)'
              : '0 6px 24px rgba(139, 92, 246, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* AI Sparkle Icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`
              text-white drop-shadow-sm
              transition-transform duration-300
              ${isHovered ? 'rotate-12 scale-110' : ''}
            `}
          >
            {/* Chat bubble */}
            <path
              d="M12 2C6.48 2 2 5.82 2 10.5c0 2.55 1.33 4.85 3.5 6.42V22l4.09-2.25c.78.15 1.58.25 2.41.25 5.52 0 10-3.82 10-8.5S17.52 2 12 2z"
              fill="currentColor"
              opacity="0.9"
            />
            {/* AI sparkle dots */}
            <circle cx="8" cy="10.5" r="1.2" fill="white" opacity="0.95">
              <animate
                attributeName="opacity"
                values="0.95;0.4;0.95"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="12" cy="10.5" r="1.2" fill="white" opacity="0.95">
              <animate
                attributeName="opacity"
                values="0.95;0.4;0.95"
                dur="1.5s"
                begin="0.3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="16" cy="10.5" r="1.2" fill="white" opacity="0.95">
              <animate
                attributeName="opacity"
                values="0.95;0.4;0.95"
                dur="1.5s"
                begin="0.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </span>
      </a>
    </div>
  );
}
