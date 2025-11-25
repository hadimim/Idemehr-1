
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useData, DynamicIcon } from './DataContext';
import { Page } from '../App';

interface ProcessProps {
  title?: string;
  subtitle?: string;
  description?: string;
  onNavigate?: (page: Page, sectionId?: string) => void;
}

const Process: React.FC<ProcessProps> = ({ 
  title = "مراحل کار", 
  subtitle = "مسیر موفقیت پروژه شما",
  description,
  onNavigate
}) => {
  const { data } = useData();
  const steps = data.home.process;

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('contact');
  };

  return (
    <section className="py-20 px-6 bg-secondary overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side Text */}
          <div className="lg:w-1/3 text-right">
            <h2 className="text-primary font-bold text-lg mb-2">{title}</h2>
            <h3 className="text-3xl font-bold text-text mb-6">{subtitle}</h3>
            <p className="text-gray-600 mb-8 leading-loose">
              {description || "ما در ایده‌پرداز مهر با یک متدولوژی چابک و شفاف، ایده شما را به محصولی کارآمد تبدیل می‌کنیم. هر مرحله با دقت و مشارکت شما پیش می‌رود."}
            </p>
            <button onClick={handleCtaClick} className="inline-flex items-center text-primary font-bold hover:gap-4 gap-2 transition-all">
              شروع همکاری
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side Steps */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop Only) */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white p-6 rounded-2xl shadow-sm relative group hover:-translate-y-2 transition-all duration-300 border border-gray-100 h-full"
                >
                  <div className="w-16 h-16 bg-white border-4 border-secondary rounded-full flex items-center justify-center text-primary mb-6 mx-auto md:mx-0 shadow-sm group-hover:border-primary transition-colors">
                    <span className="text-2xl font-bold">{step.step}</span>
                  </div>
                  
                  {/* Icon floating */}
                  <div className="absolute top-6 left-6 text-gray-300 group-hover:text-accent transition-colors group-hover:scale-110 duration-300">
                    <DynamicIcon name={step.icon} className="w-6 h-6" />
                  </div>

                  <h4 className="text-xl font-bold text-text mb-3">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
