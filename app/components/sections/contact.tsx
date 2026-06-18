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
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Prajwal-chougala', icon: Github, color: 'hover:text-accent-cyan' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwal-chougala-b6590727a/', icon: Linkedin, color: 'hover:text-accent-purple' },
    { name: 'LeetCode', href: 'https://leetcode.com/u/Prajwal_chougala/', icon: Code, color: 'hover:text-accent-teal' },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-deep/50">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind, want to discuss AI agent workflows, or interested in recruiting? Drop a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-1 lg:col-span-5 flex flex-col justify-between p-6 md:p-8 glass-card border-t-2 border-t-accent-purple/20 bg-surface/20"
          >
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold font-mono text-text-heading leading-tight">
                Let&apos;s build something{' '}
                <span className="gradient-text glow-text font-semibold">amazing</span> together.
              </h3>
              <p className="text-text-body/80 text-sm leading-relaxed">
                I am always open to full-time roles, freelance opportunities, startup ideas, and technical collaborations.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-5 my-8">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-surface border border-border-subtle text-accent-cyan">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-muted font-mono">EMAIL ME</span>
                  <a
                    href="mailto:chougalaprajwal@gmail.com"
                    className="text-sm font-bold text-text-body hover:text-accent-cyan font-mono transition-colors"
                  >
                    chougalaprajwal@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-surface border border-border-subtle text-accent-purple">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-muted font-mono">LOCATION</span>
                  <span className="text-sm font-bold text-text-body font-mono">
                    Hebbal, Belagavi, Karnataka, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">
                Connect elsewhere
              </span>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-surface border border-border-subtle text-text-muted hover:border-accent-cyan/30 transition-all duration-300 ${social.color}`}
                      title={social.name}
                    >
                      <SocialIcon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-1 lg:col-span-7 p-6 md:p-8 glass-card border-t-2 border-t-accent-purple/20 bg-surface/20"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
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
                    className="px-4 py-3 rounded-lg bg-surface/80 border border-border-subtle/70 text-text-body placeholder-text-muted focus:outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
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
                    className="px-4 py-3 rounded-lg bg-surface/80 border border-border-subtle/70 text-text-body placeholder-text-muted focus:outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="px-4 py-3 rounded-lg bg-surface/80 border border-border-subtle/70 text-text-body placeholder-text-muted focus:outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 text-sm transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Type your message here..."
                  className="px-4 py-3 rounded-lg bg-surface/80 border border-border-subtle/70 text-text-body placeholder-text-muted focus:outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/30 text-sm transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="glow-button w-full sm:w-auto self-start px-8 py-3.5 rounded-lg text-white font-bold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>

            {/* Status alerts */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-sm font-mono flex items-center gap-2"
                >
                  <Sparkles className="w-4.5 h-4.5 text-accent-teal" />
                  Your message has been sent successfully! I will get back to you shortly.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-sm font-mono flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Oops! Something went wrong while sending your message. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
