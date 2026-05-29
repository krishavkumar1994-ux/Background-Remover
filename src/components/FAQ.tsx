import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: 'How accurate is the background removal?',
      answer: 'Extremely accurate. SnapCut AI uses customized deep learning neural networks optimized for identifying subject borders. It handles fine hair strands, transparent clothing, shadows, and complex textures with professional, studio-grade precision.'
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Yes, 100%. Unlike other services that upload your photos to cloud servers, SnapCut AI performs all processing locally in your browser. Your images never leave your computer, ensuring complete privacy and security.'
    },
    {
      question: 'What image formats and resolutions are supported?',
      answer: 'We support PNG, JPG, JPEG, and WebP images. Free tier users can download HD output. Pro tier users have access to full, original ultra-HD resolution (up to 50 megapixels) without any downscaling.'
    },
    {
      question: 'Do you offer an API for batch processing?',
      answer: 'Yes! Our Pro and Enterprise plans offer full REST API access. This allows developers to integrate our background removal engine directly into e-commerce backends, mobile apps, or design pipelines.'
    },
    {
      question: 'Can I use the cutouts for commercial purposes?',
      answer: 'Absolutely. All backgrounds removed using SnapCut AI are free to use in commercial work, marketing material, social media ads, product listings, or anything else.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Got questions? We've got answers. If you need further help, feel free to contact us.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/20 hover:bg-slate-50/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                >
                  <span className="font-display font-bold text-base md:text-lg text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-purple' : 'text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-500 font-sans text-sm md:text-base leading-relaxed border-t border-slate-100/50 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
