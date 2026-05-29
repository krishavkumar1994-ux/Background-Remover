import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onStartApp: () => void;
  onNavigateToPricing: () => void;
}

export default function FinalCTA({ onStartApp, onNavigateToPricing }: FinalCTAProps) {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Gradient Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-brand-blue to-brand-purple rounded-3xl py-16 px-8 md:px-16 text-center text-white overflow-hidden shadow-2xl shadow-brand-purple/20"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Tiny Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              100% Free to Try
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display leading-[1.1] mb-6">
              Ready to cut out the noise?
            </h2>

            {/* Subtext */}
            <p className="text-white/80 font-sans text-sm sm:text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              Process your first image free. <br />
              No credit card. No signup. No watermark.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onStartApp}
                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-purple hover:bg-slate-50 font-bold text-sm transition-all shadow-md active:scale-98"
              >
                <span>Start now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateToPricing}
                className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/30 hover:border-white bg-transparent hover:bg-white/5 text-white font-semibold text-sm transition-all active:scale-98"
              >
                View plans
              </button>
            </div>

            {/* Feature bullets */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-semibold text-xs text-white/90">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" />
                <span>No signup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" />
                <span>Transparent PNG</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" />
                <span>Private & secure</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
