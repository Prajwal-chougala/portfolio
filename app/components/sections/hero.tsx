'use client';

import { motion } from 'motion/react';
import { Download, Github, Mail, ArrowDown } from 'lucide-react';

export default function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-transparent">
      {/* Content wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        {/* Simple Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-subtle bg-surface/50 text-xs font-semibold text-accent-cyan tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          AI Engineer &times; Full Stack Developer
        </motion.div>

        {/* Clean Static Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl text-text-heading font-sans"
        >
          Building <span className="text-accent-purple">AI Agents</span>, Full-Stack Applications, and Intelligent Systems
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-body/80 mb-12 max-w-2xl font-light"
        >
          I design and engineer intelligent software solutions that solve complex, real-world problems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 justify-center items-center"
        >
          {/* Resume Download CTA */}
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-white font-medium bg-accent-purple hover:bg-accent-purple/90 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Resume
          </a>

          {/* GitHub CTA */}
          <a
            href="https://github.com/Prajwal-chougala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-border-subtle hover:border-accent-cyan bg-surface/30 hover:bg-surface/50 text-text-body font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Github className="w-5 h-5 text-text-body" />
            GitHub
          </a>

          {/* Contact CTA */}
          <button
            onClick={handleScrollToContact}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-border-subtle hover:border-accent-purple bg-surface/30 hover:bg-surface/50 text-text-body font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-5 h-5 text-text-body" />
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-20"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-text-muted animate-bounce" />
      </motion.div>
    </section>
  );
}
