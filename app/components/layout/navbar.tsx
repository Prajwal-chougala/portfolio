'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'GitHub', href: '#github' },
  { name: 'LeetCode', href: '#leetcode' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    // Read saved theme after hydration to avoid SSR mismatch
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none py-4 px-4 md:px-8 flex justify-center">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.15}
          whileDrag={{ scale: 0.92, cursor: 'grabbing' }}
          whileHover={{ scale: 1.01 }}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out px-4 py-2 rounded-full border shadow-2xl backdrop-blur-xl ${
            isExpanded 
              ? (scrolled ? 'max-w-4xl w-full' : 'max-w-6xl w-full') 
              : 'max-w-fit'
          } ${
            scrolled
              ? 'bg-deep/80 border-border-subtle/50 shadow-accent-purple/5'
              : 'bg-deep/30 border-border-subtle/20'
          }`}
        >
          {/* Logo / Header Area */}
          <div className="flex items-center gap-2 select-none">
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, '#')}
              className="flex items-center gap-2 group mr-1"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent-purple/30 group-hover:border-accent-cyan/50 transition-colors relative pointer-events-none">
                <Image src="/profile-v3.png" alt="Prajwal" fill className="object-cover object-top" sizes="32px" />
              </div>
              <span className="font-mono text-sm font-extrabold tracking-widest gradient-text-purple pointer-events-none whitespace-nowrap">
                PRAJWAL CHOUGALA
              </span>
            </a>

            {/* Expansion Trigger Button (Desktop Only) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden md:flex p-1.5 rounded-full hover:bg-surface/80 border border-border-subtle/30 hover:border-accent-cyan/40 text-text-body/70 hover:text-accent-cyan transition-all cursor-pointer"
              aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
            >
              {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center select-none overflow-hidden">
            <motion.nav 
              animate={{ width: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              initial={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex items-center gap-1 whitespace-nowrap pl-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs font-semibold font-mono text-text-body/75 hover:text-accent-cyan px-4 py-2 rounded-full hover:bg-surface/50 border border-transparent hover:border-border-subtle/30 transition-all"
                >
                  {link.name}
                </a>
              ))}

              <div className="h-4 w-[1px] bg-border-subtle/40 mx-2" />

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-surface/50 hover:bg-surface border border-border-subtle/50 text-text-body/80 hover:text-accent-purple hover:border-accent-purple/40 transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </motion.nav>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3 select-none ml-4">
            {/* Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface/50 border border-border-subtle/50 text-text-body/80 hover:text-accent-purple hover:border-accent-purple/40 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-surface/50 border border-border-subtle/50 text-text-body hover:text-accent-cyan transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-4 top-20 z-30 bg-deep/95 backdrop-blur-xl border border-border-subtle rounded-3xl md:hidden shadow-2xl overflow-y-auto max-h-[calc(100vh-100px)] p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-md font-medium font-mono text-text-body/90 hover:text-accent-cyan py-3 px-4 rounded-xl hover:bg-surface/50 border border-transparent hover:border-border-subtle/30 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
