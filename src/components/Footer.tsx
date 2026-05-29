import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100/80 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-200/55">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleLinkClick('home')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 group-hover:text-brand-purple transition-colors">
                SnapCut<span className="text-gradient">.ai</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Professional, AI-driven background removal running entirely in the browser. Fast, private, and high-fidelity.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-purple hover:border-brand-purple/20 transition-all hover:-translate-y-0.5" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-purple hover:border-brand-purple/20 transition-all hover:-translate-y-0.5" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-purple hover:border-brand-purple/20 transition-all hover:-translate-y-0.5" aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-800">
              Product
            </h4>
            <div className="flex flex-col gap-3 text-slate-400 font-medium text-sm">
              <button onClick={() => handleLinkClick('remove-bg')} className="text-left cursor-pointer hover:text-brand-purple transition-colors">
                Remove BG Tool
              </button>
              <button onClick={() => handleLinkClick('remove-bg')} className="text-left cursor-pointer hover:text-brand-purple transition-colors">
                Batch Cutout
              </button>
              <button onClick={() => handleLinkClick('pricing')} className="text-left cursor-pointer hover:text-brand-purple transition-colors">
                Pricing Plans
              </button>
              <a href="#" className="hover:text-brand-purple transition-colors">
                API Docs
              </a>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-800">
              Company
            </h4>
            <div className="flex flex-col gap-3 text-slate-400 font-medium text-sm">
              <button onClick={() => handleLinkClick('about')} className="text-left cursor-pointer hover:text-brand-purple transition-colors">
                About Us
              </button>
              <a href="#" className="hover:text-brand-purple transition-colors">
                Careers
              </a>
              <a href="#" className="hover:text-brand-purple transition-colors">
                Customer Blog
              </a>
              <a href="#" className="hover:text-brand-purple transition-colors">
                Press Kit
              </a>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-800">
              Legal
            </h4>
            <div className="flex flex-col gap-3 text-slate-400 font-medium text-sm">
              <a href="#" className="hover:text-brand-purple transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-brand-purple transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-brand-purple transition-colors">
                Cookie Settings
              </a>
              <a href="#" className="hover:text-brand-purple transition-colors">
                Security Shield
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs font-semibold text-slate-400">
          <p>© 2026 SnapCut AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-brand-purple transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
