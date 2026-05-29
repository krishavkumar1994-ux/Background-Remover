import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeView: string;
}

export default function Navbar({ onNavigate, activeView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Remove BG', id: 'remove-bg' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glassmorphism border-b border-slate-100/60 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleLinkClick('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-md shadow-brand-purple/20 transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-brand-purple transition-colors">
              SnapCut<span className="text-gradient">.ai</span>
            </span>
          </div>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`cursor-pointer hover:text-brand-purple transition-colors relative py-2 ${
                  (activeView === link.id || (activeView === 'home' && link.id === 'home'))
                    ? 'text-brand-purple font-semibold' 
                    : ''
                }`}
              >
                {link.name}
                {(activeView === link.id || (activeView === 'home' && link.id === 'home')) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right: CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => handleLinkClick('remove-bg')}
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-gradient-brand hover:brightness-110 active:scale-95 text-white font-medium text-sm transition-all shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/35"
            >
              Try Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl px-6 py-6 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-left font-medium text-slate-700 py-2 border-b border-slate-50 hover:text-brand-purple transition-colors ${
                activeView === link.id ? 'text-brand-purple font-semibold' : ''
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('remove-bg')}
            className="cursor-pointer w-full text-center px-6 py-3 rounded-xl bg-gradient-brand text-white font-medium text-sm transition-all shadow-md shadow-brand-purple/20 mt-2"
          >
            Try Free
          </button>
        </div>
      )}
    </nav>
  );
}
