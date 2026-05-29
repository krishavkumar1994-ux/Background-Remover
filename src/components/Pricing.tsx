import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onStartApp: () => void;
}

export default function Pricing({ onStartApp }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? 0 : 0,
      description: 'Perfect for casual designers and testing quality.',
      features: [
        '10 free cutouts per month',
        'Standard HD resolution',
        'Client-side local processing',
        'Standard community support'
      ],
      cta: 'Get Started',
      popular: false,
      gradient: false
    },
    {
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 12 : 9,
      description: 'Ideal for creators, marketers, and active e-commerce shops.',
      features: [
        'Unlimited cutouts & downloads',
        'Ultra-HD studio resolution',
        'Priority high-speed queue',
        'Batch processing (Up to 50)',
        '24/7 Priority support'
      ],
      cta: 'Start Free Trial',
      popular: true,
      gradient: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored for high-growth startups and creative agencies.',
      features: [
        'Unlimited batch files',
        'Custom REST API integration',
        'Dedicated account manager',
        'Self-hosted WASM options',
        'SLA uptime guarantee'
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: false
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple pricing for <span className="text-gradient">limitless creation</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-8">
            Choose the plan that fits your creative workflow. No hidden fees. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-brand-purple shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-brand-purple shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Billed Yearly</span>
              <span className="px-1.5 py-0.5 rounded bg-brand-purple/10 text-brand-purple text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-white border-brand-purple shadow-xl shadow-brand-purple/5 glow-purple ring-2 ring-brand-purple/10 lg:scale-105 z-10'
                  : 'bg-white border-slate-200/80 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-brand text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="font-display font-black text-4xl text-slate-900">
                        ${plan.price}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">
                        /month
                      </span>
                    </>
                  ) : (
                    <span className="font-display font-black text-4xl text-slate-900">
                      {plan.price}
                    </span>
                  )}
                </div>

                <hr className="border-slate-100 mb-8" />

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-brand-purple/5 flex items-center justify-center border border-brand-purple/10 flex-shrink-0">
                        <Check className="w-3 h-3 text-brand-purple" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={onStartApp}
                className={`cursor-pointer w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-98 ${
                  plan.gradient
                    ? 'bg-gradient-brand text-white hover:brightness-110 shadow-md shadow-brand-purple/20'
                    : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-purple hover:border-brand-purple/30'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
