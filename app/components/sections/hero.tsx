'use client';

import { motion } from 'motion/react';
import { Download, Github, Mail, ArrowDown, Globe, Sparkles } from 'lucide-react';
import { useLoading } from '../effects/splash-screen';

export default function Hero() {
  const { isLoaded } = useLoading();
  const firstName = "PRAJWAL".split("");
  const lastName = "CHOUGALA".split("");

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 md:pt-36 md:pb-12 overflow-hidden bg-transparent">
      {/* Spacer to push content down slightly */}
      <div className="hidden md:block h-6" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Status Meta Row (Figma/Agency Grid Style) */}
        <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 md:grid md:grid-cols-3 md:gap-4 border-y border-border-subtle/30 py-3.5 mb-6 md:py-6 md:mb-12 text-left font-mono select-none">
          <div className="flex items-center gap-2.5 text-[10px] md:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
            </span>
            <span className="text-text-muted uppercase tracking-wider">Status:</span>
            <span className="text-text-heading font-bold">Open to Opportunities</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] md:text-xs md:border-x border-border-subtle/20 md:px-6">
            <Globe className="w-3.5 h-3.5 text-accent-purple" />
            <span className="text-text-muted uppercase tracking-wider">Location:</span>
            <span className="text-text-heading font-bold">India (GMT+5:30)</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] md:text-xs md:pl-6">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-text-muted uppercase tracking-wider">Specialty:</span>
            <span className="text-text-heading font-bold">Agentic AI & Full Stack</span>
          </div>
        </div>

        {/* Display Typography */}
        <div className="text-center md:text-left select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-mono font-bold text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            Engineering Intelligent Workflows
          </motion.div>

          <h1 className="text-[9.8vw] xs:text-[9.5vw] sm:text-[9vw] md:text-[6.5vw] font-black tracking-tighter leading-[0.85] font-display mb-8 text-text-heading select-none flex flex-col items-center md:items-start w-full overflow-hidden">
            {/* First Name */}
            <span className="flex flex-nowrap justify-center md:justify-start">
              {firstName.map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  initial={{ y: -80, opacity: 0 }}
                  animate={isLoaded ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    delay: i * 0.04,
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  className={`inline-block transition-all duration-200 cursor-default ${
                    i % 2 === 0
                      ? 'hover:text-accent-purple dark:hover:[text-shadow:0_0_15px_var(--color-accent-purple)]'
                      : 'hover:text-accent-cyan dark:hover:[text-shadow:0_0_15px_var(--color-accent-cyan)]'
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {/* Last Name */}
            <span className="flex flex-nowrap justify-center md:justify-start mt-2">
              {lastName.map((char, i) => (
                <motion.span
                  key={`last-${i}`}
                  initial={{ y: -80, opacity: 0 }}
                  animate={isLoaded ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    delay: (firstName.length + i) * 0.04,
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  className={`inline-block transition-all duration-200 cursor-default ${
                    i % 2 === 0
                      ? 'hover:text-accent-purple dark:hover:[text-shadow:0_0_15px_var(--color-accent-purple)]'
                      : 'hover:text-accent-cyan dark:hover:[text-shadow:0_0_15px_var(--color-accent-cyan)]'
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-4">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="col-span-1 md:col-span-6 text-base md:text-lg text-text-body/80 leading-relaxed font-light text-center md:text-left"
            >
              I build autonomous AI agents, structured inference pipelines, and scalable full-stack applications that turn traditional logic into agentic workflows.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="col-span-1 md:col-span-6 flex flex-wrap gap-3.5 justify-center md:justify-end w-full"
            >
              <a
                href="#"
                className="px-6 py-3 rounded-full text-white font-mono text-xs font-bold uppercase tracking-wider bg-accent-purple hover:bg-accent-purple/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-accent-purple/35"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>

              <a
                href="https://github.com/Prajwal-chougala"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-border-subtle hover:border-accent-cyan bg-surface/30 hover:bg-surface/50 text-text-body font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4 text-text-body" />
                GitHub
              </a>

              <button
                onClick={handleScrollToContact}
                className="px-6 py-3 rounded-full border border-border-subtle hover:border-accent-purple bg-surface/30 hover:bg-surface/50 text-text-body font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-text-body" />
                Contact
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-center gap-1.5 cursor-pointer z-20 self-center mt-8 select-none"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] font-mono text-text-muted tracking-[0.25em] uppercase">
          Scroll Down
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-text-muted animate-bounce" />
      </motion.div>
    </section>
  );
}
