'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';

export default function AiChatButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Detect initial theme from document
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setCurrentTheme(isDark ? 'dark' : 'light');
  }, []);

  // Listen for theme changes from navbar
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: 'dark' | 'light' }>;
      const newTheme = customEvent.detail.theme;
      setCurrentTheme(newTheme);

      // Send theme to iframe via postMessage
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'THEME_CHANGE', theme: newTheme },
          '*'
        );
      }
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  // When iframe loads, send it the current theme
  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'THEME_CHANGE', theme: currentTheme },
        '*'
      );
    }
  }, [currentTheme]);

  // Build iframe URL with theme parameter
  const chatbotUrl = `https://portfolio-chat-bot-ten.vercel.app/?theme=${currentTheme}`;

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

  // Close chat on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);

  // Prevent body scroll when chat is open on mobile or maximized
  useEffect(() => {
    const handleScrollLock = () => {
      const isMobile = window.innerWidth < 640; // sm breakpoint in tailwind
      if (isChatOpen && (isMobile || isMaximized)) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleScrollLock();
    window.addEventListener('resize', handleScrollLock);
    
    return () => {
      window.removeEventListener('resize', handleScrollLock);
      document.body.style.overflow = '';
    };
  }, [isChatOpen, isMaximized]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
    setShowTooltip(false);
    if (isChatOpen) {
      setIsMaximized(false); // Reset maximize state when closing
    }
  }, [isChatOpen]);

  return (
    <>
      {/* Chat Window */}
      {isChatOpen && (
        <>
          {/* Backdrop overlay for mobile */}
          <div
            className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={() => setIsChatOpen(false)}
          />

          {/* Chat container */}
          <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: isMaximized ? 0 : undefined,
              y: isMaximized ? 0 : undefined,
              width: isMaximized ? 'calc(100vw - 32px)' : '',
              height: isMaximized ? 'calc(100vh - 32px)' : '',
              left: isMaximized ? '16px' : '',
              top: isMaximized ? '16px' : '',
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`
              fixed z-[999]
              flex flex-col
              rounded-2xl overflow-hidden
              shadow-2xl
              ${!isMaximized ? 'inset-2 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[580px] md:w-[420px] md:h-[600px]' : 'w-auto h-auto'}
            `}
            style={{
              background: 'var(--theme-glass-bg, rgba(15, 15, 25, 0.95))',
              border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.1))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow:
                '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--theme-glass-border, rgba(255,255,255,0.08)), 0 0 40px rgba(139, 92, 246, 0.15)',
            }}
          >
            {/* Chat Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0 cursor-grab active:cursor-grabbing"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))',
                borderBottom: '1px solid var(--theme-glass-border, rgba(255,255,255,0.08))',
              }}
            >
              <div className="flex items-center gap-3">
                {/* AI icon */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-purple, #8b5cf6), var(--color-accent-cyan, #06b6d4))',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 5.82 2 10.5c0 2.55 1.33 4.85 3.5 6.42V22l4.09-2.25c.78.15 1.58.25 2.41.25 5.52 0 10-3.82 10-8.5S17.52 2 12 2z"
                      fill="white"
                      opacity="0.9"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold leading-tight"
                    style={{ color: 'var(--color-text-heading, #fff)' }}
                  >
                    AI Assistant
                  </h3>
                  <p className="text-xs opacity-60" style={{ color: 'var(--color-text-body, #ccc)' }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Maximize button */}
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--color-text-body, #ccc)',
                  }}
                  aria-label={isMaximized ? "Restore chat" : "Maximize chat"}
                >
                  {isMaximized ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    </svg>
                  )}
                </button>

                {/* Close button */}
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--color-text-body, #ccc)',
                  }}
                  aria-label="Close chat"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Loading indicator */}
            {!iframeLoaded && (
              <div className="absolute inset-0 top-[52px] flex items-center justify-center z-10"
                style={{ background: 'var(--theme-glass-bg, rgba(15, 15, 25, 0.95))' }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: 'var(--color-accent-purple, #8b5cf6)', borderTopColor: 'transparent' }}
                  />
                  <span className="text-sm opacity-60" style={{ color: 'var(--color-text-body, #ccc)' }}>
                    Loading assistant...
                  </span>
                </div>
              </div>
            )}

            {/* Iframe */}
            <iframe
              ref={iframeRef}
              src={chatbotUrl}
              title="AI Assistant Chat"
              className="flex-1 w-full border-0"
              style={{ background: 'transparent' }}
              onLoad={handleIframeLoad}
              allow="microphone"
            />
          </motion.div>
        </>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip / Label */}
        {!isChatOpen && (
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
        )}

        {/* Main Button */}
        <button
          onClick={toggleChat}
          aria-label={isChatOpen ? 'Close AI Assistant' : 'Chat with AI Assistant'}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative"
        >
          {/* Pulse rings */}
          {isPulsing && !isChatOpen && (
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
            {/* Toggle between chat icon and close icon */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`
                text-white drop-shadow-sm
                transition-all duration-300
                ${isHovered && !isChatOpen ? 'rotate-12 scale-110' : ''}
                ${isChatOpen ? 'rotate-90' : ''}
              `}
            >
              {isChatOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : (
                <>
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
                </>
              )}
            </svg>
          </span>
        </button>
      </div>

    </>
  );
}

