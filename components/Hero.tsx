
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Monitor, Database } from 'lucide-react';
import { useData } from './DataContext';
import { Page } from '../App';

interface HeroProps {
  onNavigate?: (page: Page, sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { data } = useData();
  const { hero } = data.home;

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('contact');
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('services');
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-secondary">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-right"
        >
          <h2 className="text-primary font-semibold text-lg mb-4 tracking-wide">{hero.h2}</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight mb-6 whitespace-pre-line">
            {hero.h1}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            {hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePrimaryClick}
              className="group flex items-center justify-center gap-2 bg-gradient-to-l from-primary to-accent text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-1 transition-all duration-300 w-full sm:w-[180px]"
            >
              {hero.ctaPrimary}
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleSecondaryClick}
              className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-text px-8 py-4 rounded-xl font-bold hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-[160px]"
            >
              {hero.ctaSecondary}
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative hidden md:block"
        >
           <div className="relative z-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
              <img 
                src={hero.image}
                alt="Hero Visual" 
                className="rounded-2xl w-full h-auto object-cover"
              />
              {/* Badges kept as static UI elements for visual flair */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600"><Database className="w-6 h-6" /></div>
                <div><p className="text-xs text-gray-500">امنیت داده‌ها</p><p className="font-bold text-text">تضمین ۱۰۰٪</p></div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
