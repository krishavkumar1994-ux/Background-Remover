import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "SnapCut AI has completely replaced Photoshop for our product catalogue. Cutting background removal from 3 minutes per image to 2 seconds has tripled our cataloguing velocity.",
      name: "Sarah Jenkins",
      role: "Director of E-commerce, Aura Goods",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "The hair cutout detail is absolutely insane. Even on windy outdoor shots, the AI gets the strands right. The fact that it processes client-side in the browser means our customer data is safe.",
      name: "Alex Rivera",
      role: "Creative Director, Velo Media",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "I've tried every API background remover under the sun. SnapCut's browser implementation is the cleanest, easiest, and fastest by far. It's a UX masterclass.",
      name: "Michael Chen",
      role: "SaaS Founder, IndieRank",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Loved by <span className="text-gradient">makers worldwide</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            Hear from the designers, founders, and developers who rely on SnapCut every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-brand-purple/20 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              {/* Review Stars & Quote */}
              <div>
                <div className="flex gap-1 mb-6 text-brand-purple">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-purple" />
                  ))}
                </div>
                <p className="text-slate-600 font-sans text-sm italic leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white ring-2 ring-brand-purple/10"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    {t.name}
                  </h4>
                  <p className="text-slate-400 text-xs font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
