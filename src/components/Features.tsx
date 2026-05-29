import { motion } from 'framer-motion';
import { Zap, Focus, Lock, Layers } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-brand-purple" />,
      title: 'Instant results',
      description: 'Remove backgrounds in less than 3 seconds. Powered by industry-leading AI models.'
    },
    {
      icon: <Focus className="w-5 h-5 text-brand-purple" />,
      title: 'Studio-grade cutouts',
      description: 'Perfect hair, fur, and intricate edges. Get sharp, high-fidelity results every single time.'
    },
    {
      icon: <Lock className="w-5 h-5 text-brand-purple" />,
      title: 'Private by design',
      description: 'Your photos never leave your device. All processing happens locally in your browser.'
    },
    {
      icon: <Layers className="w-5 h-5 text-brand-purple" />,
      title: 'Transparent PNGs',
      description: 'Download raw high-resolution transparent PNG files ready for print, web, or social.'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything you need, <span className="text-gradient">nothing you don't</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            A focused tool built around a single, perfect interaction.
          </p>
        </div>

        {/* Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' }}
              className="p-8 rounded-3xl bg-white border border-slate-100/80 shadow-sm transition-all relative overflow-hidden group"
            >
              {/* Card Decorative background element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/2 rounded-bl-full pointer-events-none transition-all group-hover:scale-125" />

              {/* Icon Circle */}
              <div className="w-12 h-12 rounded-2xl bg-brand-lavender flex items-center justify-center mb-6 shadow-sm border border-brand-lavender/50 group-hover:bg-brand-purple/10 transition-colors">
                {feature.icon}
              </div>

              {/* Typography */}
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3 group-hover:text-brand-purple transition-colors">
                {feature.title}
              </h3>
              <p className="font-sans text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
