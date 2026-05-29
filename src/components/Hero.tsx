import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import originalImage from '../assets/portrait_original.png';
import transparentImage from '../assets/portrait_transparent.png';

interface HeroProps {
  onStartApp: () => void;
  onNavigateToPricing: () => void;
}

export default function Hero({ onStartApp, onNavigateToPricing }: HeroProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-brand-lavender-light via-white to-white">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/15 text-brand-purple text-xs font-semibold tracking-wide uppercase mb-8 cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Powered by AI · No signup required</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-slate-900 leading-[1.08] tracking-tight mb-8"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)' }}
        >
          Remove image backgrounds <br className="hidden md:block" />
          <span className="text-gradient">in one click</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto font-sans text-lg md:text-xl text-slate-500 leading-relaxed mb-12"
        >
          SnapCut AI turns any photo into a transparent PNG in seconds. <br className="hidden sm:block" />
          Built for e-commerce, marketing, and design teams.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <button 
            onClick={onStartApp}
            className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold text-base transition-all hover:brightness-110 shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/35 active:scale-95"
          >
            <span>Try it free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onNavigateToPricing}
            className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 hover:border-brand-purple/50 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-purple font-semibold text-base transition-all active:scale-95"
          >
            See pricing
          </button>
        </motion.div>

        {/* Large Before/After showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto rounded-3xl p-6 bg-brand-lavender border border-brand-lavender/50 shadow-xl glow-purple"
        >
          <div 
            ref={containerRef}
            onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
            onTouchMove={(e) => handleTouchMove(e.nativeEvent)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="relative h-[300px] sm:h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none bg-slate-100"
          >
            {/* Checkerboard Pattern for transparent view */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,8px_0px] bg-slate-200" />
            
            {/* Transparent Cutout (After Image) */}
            <img 
              src={transparentImage} 
              alt="Transparent Cutout" 
              className="absolute inset-0 h-full w-full object-contain pointer-events-none"
            />
            
            {/* Original Image (Before) clipped by slider */}
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none bg-white"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={originalImage} 
                alt="Original Portrait" 
                className="absolute inset-0 h-full w-[400px] sm:w-[600px] md:w-[800px] lg:w-[832px] object-contain pointer-events-none max-w-none"
                style={{ width: containerRef.current?.getBoundingClientRect().width }}
              />
            </div>

            {/* Centered Labels */}
            <div className="absolute top-4 left-4 glassmorphism px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-sm pointer-events-none">
              Original
            </div>
            <div className="absolute top-4 right-4 glassmorphism px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-purple shadow-sm pointer-events-none">
              BG Removed
            </div>

            {/* Draggable vertical bar/handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center gap-0.5">
                <span className="w-0.5 h-4 bg-slate-400 rounded-full" />
                <span className="w-0.5 h-4 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-slate-400 text-xs font-medium">
            Drag the slider to compare original vs background-removed image
          </div>
        </motion.div>

      </div>
    </section>
  );
}
