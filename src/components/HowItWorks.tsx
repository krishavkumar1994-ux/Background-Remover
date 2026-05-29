import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Download } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: <UploadCloud className="w-8 h-8 text-brand-purple" />,
      title: 'Upload your image',
      description: 'Drag & drop or browse any PNG, JPG, or WebP. No limits on image size.'
    },
    {
      step: '02',
      icon: <Cpu className="w-8 h-8 text-brand-purple" />,
      title: 'AI processes instantly',
      description: 'Our neural networks separate the subject from the background with studio precision.'
    },
    {
      step: '03',
      icon: <Download className="w-8 h-8 text-brand-purple" />,
      title: 'Download transparent PNG',
      description: 'Save your clean cutout background image as a transparent PNG. Ready for use.'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-brand-lavender-light/40 border-y border-slate-100/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Three steps. <span className="text-gradient">Zero friction.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            Get professional cutouts in seconds with our optimized processing pipeline.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {steps.map((stepItem, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              {/* Step number badge */}
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-slate-100 group-hover:text-brand-purple/10 transition-colors">
                {stepItem.step}
              </div>

              {/* Large Icon */}
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/5 flex items-center justify-center mb-8 border border-brand-purple/10 group-hover:scale-110 transition-transform duration-300">
                {stepItem.icon}
              </div>

              {/* Step Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
                Step {stepItem.step}
              </span>

              {/* Text info */}
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                {stepItem.title}
              </h3>
              <p className="font-sans text-sm text-slate-500 leading-relaxed">
                {stepItem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
