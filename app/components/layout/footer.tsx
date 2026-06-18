import { Github, Linkedin, Mail, Code } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Prajwal-chougala', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwal-chougala-b6590727a/', icon: Linkedin },
    { name: 'LeetCode', href: 'https://leetcode.com/u/Prajwal_chougala/', icon: Code },
    { name: 'Email', href: 'mailto:chougalaprajwal@gmail.com', icon: Mail },
  ];

  return (
    <footer className="relative bg-deep/80 border-t border-border-subtle/40 py-12 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold font-mono gradient-text-purple">PC</span>
          <p className="text-sm text-text-muted text-center md:text-left">
            Building intelligent software & AI agents.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-surface/50 border border-border-subtle/50 text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-all duration-300 glass-card-hover"
                  title={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <p className="text-xs text-text-muted">
            &copy; {currentYear} Prajwal Chougala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
