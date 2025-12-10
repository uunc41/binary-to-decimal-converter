import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => (
  <footer className={`relative z-10 border-t transition-all duration-700 ${
    isDark
      ? 'bg-slate-900/70 backdrop-blur-xl border-slate-800'
      : 'bg-white/70 backdrop-blur-xl border-gray-200'
  }`}>
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Binary to Decimal Converter • uunc41
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/uunc41/Binary-to-Decimal-Converter"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
