
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Check } from 'lucide-react';
import { useData, DynamicIcon } from './DataContext';

interface SolutionsPageProps {
  onCtaClick: () => void;
}

const SolutionsPage: React.FC<SolutionsPageProps> = ({ onCtaClick }) => {
  const { data } = useData();
  const { hero, products } = data.solutions;

  return (
    <div className="animate-fade-in bg-secondary/20">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-50 skew-x-12 translate-x-20 opacity-50"></div>
        <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-indigo-50 -skew-x-12 -translate-x-10 opacity-50"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-text mb-6"
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-10"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 flex flex-col ${product.featured ? 'ring-2 ring-accent ring-offset-2' : ''}`}
            >
              {/* Popular Badge */}
              {product.featured && (
                <div className="absolute top-4 right-4 z-20 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                  <Star className="w-3 h-3 fill-white" />
                  <span>محبوب‌ترین</span>
                </div>
              )}

              {/* Image Area */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Icon Overlay */}
                <div className="absolute -bottom-6 right-6 z-20 bg-white p-4 rounded-2xl shadow-lg border border-gray-50 group-hover:scale-110 transition-transform duration-300">
                   <div className="text-primary">
                     <DynamicIcon name={product.icon} className="w-5 h-5" />
                   </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 pt-10 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-2 mb-8 border-t border-gray-50 pt-4">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <Check className="w-3 h-3 text-green-500" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button 
                  onClick={onCtaClick}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    product.featured 
                      ? 'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl' 
                      : 'bg-secondary text-text hover:bg-gray-200'
                  }`}
                >
                  {product.featured ? 'درخواست دمو' : 'اطلاعات بیشتر'}
                  <ArrowLeft className={`w-4 h-4 ${product.featured ? '' : 'text-gray-500'}`} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#14202b] to-[#1e2d3b] text-white py-20 px-6 mt-10">
         <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">راهکار اختصاصی خود را پیدا نکردید؟</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              تیم فنی ما آماده است تا نرم‌افزاری دقیقاً منطبق بر نیازهای منحصر‌به‌فرد سازمان شما طراحی و پیاده‌سازی کند.
            </p>
            <button 
              onClick={onCtaClick}
              className="bg-white text-text font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              مشاوره رایگان
              <ArrowLeft className="w-5 h-5" />
            </button>
         </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
