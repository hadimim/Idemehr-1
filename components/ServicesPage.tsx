
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft, Headphones } from 'lucide-react';
import { useData, DynamicIcon } from './DataContext';

interface ServicesPageProps {
  onCtaClick: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onCtaClick }) => {
  const { data } = useData();
  const serviceDetails = data.servicesPage;
  const header = data.pageHeaders.services;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Generate summary features from detail data
  const features = serviceDetails.map((s, idx) => ({
    icon: s.icon,
    title: s.title.split(' ').slice(0, 2).join(' '), // Simplify title for grid
    color: ['bg-blue-500', 'bg-purple-500', 'bg-indigo-500', 'bg-pink-500'][idx % 4]
  }));

  return (
    <div className="animate-fade-in bg-secondary/30">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-white overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b63d6_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         <div className="container mx-auto text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-text mb-6"
            >
              {header.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {header.subtitle}
            </motion.p>
            
            {header.image && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
              >
                 <img src={header.image} alt="Services Banner" className="w-full h-[200px] md:h-[300px] object-cover opacity-90" />
              </motion.div>
            )}
         </div>
      </section>

      {/* Features Grid Overview */}
      <section className="py-16 px-6 container mx-auto -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center transition-all duration-300 border border-gray-50 group cursor-pointer"
            >
              <div className={`${feature.color} p-3 rounded-xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <DynamicIcon name={feature.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-text text-sm md:text-base group-hover:text-primary transition-colors">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Services List */}
      <section className="py-16 px-6 container mx-auto space-y-8 md:space-y-24">
        {serviceDetails.map((service, index) => (
          <div key={service.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden md:border-0 md:shadow-none md:bg-transparent">
            
            {/* Mobile Accordion Header */}
            <div 
              className="md:hidden flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleExpand(service.id)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-2 rounded-lg text-primary">
                  <DynamicIcon name={service.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-text">{service.title}</h3>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedId === service.id ? 'rotate-180' : ''}`} />
            </div>

            {/* Desktop & Expanded Mobile Content */}
            <AnimatePresence initial={false}>
              <div className={`${expandedId === service.id ? 'block' : 'hidden'} md:block`}>
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="border-t border-gray-100 md:border-0"
                 >
                    <div className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} p-6 md:p-0`}>
                      
                      {/* Text Content */}
                      <div className="flex-1 space-y-6">
                         <div className="hidden md:flex items-center gap-3 mb-4">
                            <div className="bg-blue-50 p-3 rounded-xl text-primary">
                                <DynamicIcon name={service.icon} className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-text">{service.title}</h3>
                         </div>
                         
                         <p className="text-gray-600 leading-loose text-lg">
                           {service.description}
                         </p>
                         
                         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {service.features.map((feat, idx) => (
                             <li key={idx} className="flex items-center gap-2 text-gray-700 font-medium">
                               <div className="w-2 h-2 bg-accent rounded-full"></div>
                               {feat}
                             </li>
                           ))}
                         </ul>
                         
                         <div className="hidden md:block pt-4">
                            <button onClick={onCtaClick} className="text-primary font-bold hover:gap-3 flex items-center gap-2 transition-all">
                              سفارش پروژه
                              <ArrowLeft className="w-5 h-5" />
                            </button>
                         </div>
                      </div>

                      {/* Image */}
                      <div className="flex-1 w-full">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                        <div className="md:hidden mt-6">
                            <button onClick={onCtaClick} className="w-full bg-primary/10 text-primary font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-primary hover:text-white transition-all">
                              استعلام قیمت
                            </button>
                         </div>
                      </div>

                    </div>
                 </motion.div>
              </div>
            </AnimatePresence>

          </div>
        ))}
      </section>

      {/* Sticky Bottom CTA (Mobile Only) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40"
      >
        <button 
          onClick={onCtaClick}
          className="w-full bg-gradient-to-l from-primary to-accent text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          <Headphones className="w-5 h-5" />
          درخواست مشاوره رایگان
        </button>
      </motion.div>

      {/* Standard Bottom CTA (Desktop) */}
      <div className="hidden md:block bg-primary text-white py-16 mt-20">
         <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">پروژه بعدی خود را با ما شروع کنید</h2>
            <button 
              onClick={onCtaClick}
              className="bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              درخواست دمو و مشاوره
              <ArrowLeft className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Bottom Spacer for Mobile Sticky CTA */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
};

export default ServicesPage;
