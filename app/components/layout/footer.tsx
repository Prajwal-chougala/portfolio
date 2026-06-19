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
    <footer className="relative bg-deep/80 border-t border-border-subtle/30 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-sm font-extrabold tracking-widest gradient-text-purple">
            PRAJWAL CHOUGALA
          </span>
          <p className="text-xs text-text-muted text-center md:text-left font-mono uppercase tracking-wider">
            AI Engineer &times; Full-Stack Developer
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-surface/50 border border-border-subtle/50 text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-all duration-300 flex items-center justify-center"
                  title={link.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
          <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest">
            &copy; {currentYear} Prajwal Chougala. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
