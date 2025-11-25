
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, X, CheckCircle, Layers, TrendingUp, Clock, ArrowRight, Monitor, Smartphone, Building2 } from 'lucide-react';
import { useData, Project } from './DataContext';

interface PortfolioPageProps {
  onCtaClick: () => void;
}

type Category = 'All' | 'Web' | 'App' | 'Enterprise';

// Counter Component for KPIs
const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const display = useTransform(spring, (current) => Math.floor(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return display.on("change", (latest) => setDisplayValue(latest));
  }, [display]);

  return <span ref={ref} className="tabular-nums">{displayValue}{suffix}</span>;
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onCtaClick }) => {
  const { data } = useData();
  const projects = data.projects;
  const header = data.pageHeaders.portfolio;
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Reset scroll when opening detail
  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProject]);

  if (selectedProject) {
    // Detail View
    return (
      <div className="bg-white min-h-screen animate-fade-in pt-20">
        {/* Navigation Bar */}
        <div className="fixed top-20 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              بازگشت به لیست
            </button>
            <span className="text-sm font-bold text-gray-400 hidden md:block">{selectedProject.industry} / {selectedProject.client}</span>
          </div>
        </div>

        {/* Case Study Hero */}
        <div className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden mt-8">
           <img 
            src={selectedProject.image} 
            alt={selectedProject.title} 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
           <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 container mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-3xl"
             >
                <span className="inline-block bg-accent/20 backdrop-blur-md border border-accent/30 text-accent-100 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  {selectedProject.category === 'Web' ? 'وب‌سایت' : selectedProject.category === 'App' ? 'اپلیکیشن' : 'سازمانی'}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl">{selectedProject.excerpt}</p>
             </motion.div>
           </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Story */}
            <div className="lg:col-span-2 space-y-16">
               <section>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="bg-red-50 p-2 rounded-lg text-red-500"><X className="w-6 h-6" /></div>
                   <h2 className="text-2xl font-bold text-text">چالش و مسئله</h2>
                 </div>
                 <p className="text-gray-600 leading-loose text-lg text-justify">
                   {selectedProject.problem}
                 </p>
               </section>

               <section>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="bg-blue-50 p-2 rounded-lg text-primary"><Layers className="w-6 h-6" /></div>
                   <h2 className="text-2xl font-bold text-text">راهکار ما</h2>
                 </div>
                 <p className="text-gray-600 leading-loose text-lg text-justify">
                   {selectedProject.solution}
                 </p>
               </section>

               <section>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="bg-green-50 p-2 rounded-lg text-green-500"><CheckCircle className="w-6 h-6" /></div>
                   <h2 className="text-2xl font-bold text-text">نتیجه نهایی</h2>
                 </div>
                 <p className="text-gray-600 leading-loose text-lg text-justify">
                   {selectedProject.result}
                 </p>
               </section>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-1 space-y-8">
               {/* KPI Cards */}
               <div className="bg-secondary rounded-3xl p-8 border border-gray-100">
                 <h3 className="text-lg font-bold text-text mb-6 flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-primary" />
                   آمار کلیدی پروژه
                 </h3>
                 <div className="space-y-6">
                   {selectedProject.kpis.map((kpi, idx) => (
                     <div key={idx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                       <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
                       <p className="text-3xl font-bold text-primary dir-ltr">
                         <Counter value={kpi.value} suffix={kpi.suffix || ''} />
                       </p>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Tech Stack */}
               <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
                 <h3 className="text-lg font-bold text-text mb-6">تکنولوژی‌های استفاده شده</h3>
                 <div className="flex flex-wrap gap-2">
                   {selectedProject.techStack.map((tech, idx) => (
                     <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                       {tech}
                     </span>
                   ))}
                 </div>
               </div>

               {/* CTA */}
               <div className="bg-primary text-white rounded-3xl p-8 text-center">
                 <h3 className="text-xl font-bold mb-4">پروژه مشابهی دارید؟</h3>
                 <button onClick={onCtaClick} className="bg-white text-primary font-bold px-6 py-3 rounded-xl w-full hover:bg-blue-50 transition-colors">
                   درخواست مشاوره
                 </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="animate-fade-in bg-secondary/30">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-white text-center">
        <div className="container mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-text mb-6"
          >
            {header.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-10"
          >
            {header.subtitle}
          </motion.p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'All', label: 'همه', icon: <Layers className="w-4 h-4" /> },
              { id: 'Web', label: 'وب‌سایت', icon: <Monitor className="w-4 h-4" /> },
              { id: 'App', label: 'اپلیکیشن', icon: <Smartphone className="w-4 h-4" /> },
              { id: 'Enterprise', label: 'سازمانی', icon: <Building2 className="w-4 h-4" /> },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as Category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-lg shadow-blue-200 scale-105'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 container mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Wrapper */}
                <div className={`relative overflow-hidden ${project.featured ? 'h-80 md:h-96' : 'h-64'}`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="self-end">
                       <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                         مشاهده جزئیات
                       </span>
                     </div>
                     <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                           <p className="text-blue-200 text-xs mb-1">{project.industry}</p>
                           <h3 className="text-white font-bold text-lg">{project.title}</h3>
                        </div>
                     </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                      <Clock className="w-3 h-3" />
                      <span>منتخب</span>
                    </div>
                  )}
                </div>

                {/* Visible Content (Below Image) */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-500`}>
                       {project.category === 'Web' ? 'طراحی وب' : project.category === 'App' ? 'اپلیکیشن' : 'نرم‌افزار'}
                    </span>
                    <span className="text-xs text-gray-400">{project.client}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {project.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-2xl md:text-3xl font-bold mb-6">پروژه شما می‌تواند نفر بعدی باشد</h2>
           <button onClick={onCtaClick} className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
             شروع همکاری
             <ArrowLeft className="w-5 h-5" />
           </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
