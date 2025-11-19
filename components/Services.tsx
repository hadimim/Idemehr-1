
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Server, BarChart3, Briefcase, Code, PenTool } from 'lucide-react';
import { useData } from './DataContext';

// Map string icon names to components
const iconMap: any = {
  Globe: <Globe className="w-8 h-8 text-white" />,
  Smartphone: <Smartphone className="w-8 h-8 text-white" />,
  Server: <Server className="w-8 h-8 text-white" />,
  BarChart3: <BarChart3 className="w-8 h-8 text-white" />,
  Briefcase: <Briefcase className="w-8 h-8 text-white" />,
  Code: <Code className="w-8 h-8 text-white" />,
  PenTool: <PenTool className="w-8 h-8 text-white" />,
};

const Services: React.FC = () => {
  const { data } = useData();

  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-2">خدمات ما</h2>
          <h3 className="text-3xl font-bold text-text">راهکارهای جامع دیجیتال</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {data.home.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-secondary rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 flex flex-col h-[280px] lg:h-[320px]"
            >
              <div className={`${service.color || 'bg-primary'} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 rotate-3 hover:rotate-6 transition-transform`}>
                {iconMap[service.icon] || <Globe className="w-8 h-8 text-white" />}
              </div>
              <h4 className="text-xl font-bold text-text mb-4">{service.title}</h4>
              <p className="text-gray-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
