
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { Page } from '../App';
import { useData } from './DataContext';

interface PortfolioProps {
  onNavigate?: (page: Page, sectionId?: string) => void;
  title?: string;
  subtitle?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
  onNavigate,
  title = "نمونه کارها",
  subtitle = "پروژه‌های منتخب"
}) => {
  const { data } = useData();
  // Only show featured projects on Home
  const featuredProjects = data.projects.filter(p => p.featured);

  const handleViewAll = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('portfolio');
    }
  };

  return (
    <section id="portfolio" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-primary font-bold text-lg mb-2">{title}</h2>
            <h3 className="text-3xl font-bold text-text">{subtitle}</h3>
          </div>
          <button onClick={handleViewAll} className="hidden md:flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
            مشاهده همه
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.slice(0, 3).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-80"
            >
              <div className="absolute top-4 right-4 z-20 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                 پروژه برتر
              </div>
              
              <div className="relative h-full overflow-hidden rounded-2xl">
                 <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 right-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-blue-300 text-sm font-medium mb-1">{project.category}</p>
                  <h4 className="text-white text-xl md:text-2xl font-bold mb-4">{project.title}</h4>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleViewAll} className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white hover:text-primary transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <span className="text-white/80 text-sm">مشاهده جزئیات</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <button onClick={handleViewAll} className="inline-flex items-center gap-2 text-primary font-bold border border-primary px-6 py-3 rounded-xl">
            مشاهده همه
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
