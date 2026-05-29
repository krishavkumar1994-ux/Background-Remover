import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BgRemover from './components/BgRemover';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState('home');

  // Track scrolling to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'remove-bg', 'pricing', 'about', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 250; // offset for detection

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveView(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveView(sectionId);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'contact') {
      const footer = document.getElementById('contact');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of the sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans selection:bg-brand-purple/10 selection:text-brand-purple">
      {/* Navbar */}
      <Navbar onNavigate={handleNavigate} activeView={activeView} />

      {/* Hero Section */}
      <div id="home">
        <Hero 
          onStartApp={() => handleNavigate('remove-bg')} 
          onNavigateToPricing={() => handleNavigate('pricing')} 
        />
      </div>

      {/* Background Removal Tool Workspace */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <BgRemover />
      </motion.div>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing onStartApp={() => handleNavigate('remove-bg')} />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Banner */}
      <FinalCTA 
        onStartApp={() => handleNavigate('remove-bg')} 
        onNavigateToPricing={() => handleNavigate('pricing')} 
      />

      {/* Footer */}
      <div id="contact">
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
