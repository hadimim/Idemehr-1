
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useData } from './DataContext';

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title = "نظرات مشتریان ما",
  subtitle = "آنچه دیگران درباره تجربه همکاری با ما می‌گویند"
}) => {
  const { data } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = data.testimonials;

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-primary text-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-4xl text-center">
        <div className="mb-12">
          <Quote className="w-12 h-12 mx-auto text-blue-300 mb-6 opacity-50" />
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-blue-100">{subtitle}</p>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name} 
                  className="w-14 h-14 rounded-full border-2 border-white/30"
                />
                <div className="text-right">
                  <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-blue-200 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
