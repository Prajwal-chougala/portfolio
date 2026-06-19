'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Code, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Prajwal-chougala', icon: Github, color: 'hover:text-accent-cyan hover:border-accent-cyan/35' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwal-chougala-b6590727a/', icon: Linkedin, color: 'hover:text-accent-purple hover:border-accent-purple/35' },
    { name: 'LeetCode', href: 'https://leetcode.com/u/Prajwal_chougala/', icon: Code, color: 'hover:text-accent-teal hover:border-accent-teal/35' },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-deep/20 border-t border-border-subtle/25">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind, want to discuss AI agent workflows, or interested in recruiting? Drop a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8 max-w-5xl mx-auto">
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-5 flex flex-col justify-between p-6 md:p-8 glass-card border border-border-subtle/50 bg-surface/5"
          >
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-bold font-mono text-text-heading leading-tight uppercase tracking-wider">
                Let&apos;s build something{' '}
                <span className="text-accent-purple font-semibold">amazing</span> together.
              </h3>
              <p className="text-text-body/80 text-sm font-sans font-light leading-relaxed">
                I am always open to full-time roles, freelance opportunities, startup ideas, and technical collaborations.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-4 my-8">
              {/* Email */}
              <div className="flex items-center gap-3.5 select-none">
                <div className="p-2.5 rounded-xl bg-surface border border-border-subtle text-accent-cyan flex items-center justify-center">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted font-mono uppercase tracking-wider">EMAIL ME</span>
                  <a
                    href="mailto:chougalaprajwal@gmail.com"
                    className="text-xs font-bold text-text-body hover:text-accent-cyan font-mono transition-colors mt-0.5"
                  >
                    chougalaprajwal@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 select-none">
                <div className="p-2.5 rounded-xl bg-surface border border-border-subtle text-accent-purple flex items-center justify-center">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted font-mono uppercase tracking-wider">LOCATION</span>
                  <span className="text-xs font-bold text-text-body font-mono mt-0.5">
                    Hebbal, Belagavi, Karnataka, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[9px] text-text-muted font-mono tracking-widest uppercase select-none">
                Connect elsewhere
              </span>
              <div className="flex gap-3 select-none">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-full bg-surface border border-border-subtle text-text-muted transition-all duration-200 ${social.color}`}
                      title={social.name}
                    >
                      <SocialIcon className="w-4.5 h-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-7 p-6 md:p-8 glass-card border border-border-subtle/50 bg-surface/5"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[9px] font-mono text-text-muted tracking-wider uppercase select-none">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="px-4 py-2.5 rounded-xl bg-surface/60 border border-border-subtle text-text-body placeholder-text-muted/60 focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/20 text-xs transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[9px] font-mono text-text-muted tracking-wider uppercase select-none">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="px-4 py-2.5 rounded-xl bg-surface/60 border border-border-subtle text-text-body placeholder-text-muted/60 focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/20 text-xs transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[9px] font-mono text-text-muted tracking-wider uppercase select-none">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="px-4 py-2.5 rounded-xl bg-surface/60 border border-border-subtle text-text-body placeholder-text-muted/60 focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/20 text-xs transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[9px] font-mono text-text-muted tracking-wider uppercase select-none">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Type your message here..."
                  className="px-4 py-2.5 rounded-xl bg-surface/60 border border-border-subtle text-text-body placeholder-text-muted/60 focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/20 text-xs transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-white font-mono text-xs font-bold uppercase tracking-wider bg-accent-purple hover:bg-accent-purple/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none self-end"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Status alerts */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 text-emerald-400 text-xs font-mono flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-accent-teal" />
                  Your message has been sent successfully!
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/25 text-red-400 text-xs font-mono flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Oops! Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
