
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Globe } from 'lucide-react';
import { useData, DynamicIcon } from './DataContext';

interface AboutPageProps {
  onCtaClick: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onCtaClick }) => {
  const { data } = useData();
  const { hero, history, team, values, cta } = data.about;

  return (
    <div className="animate-fade-in">
      {/* About Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 -z-10" />
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Text */}
          <div className="lg:w-1/2 text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                {hero.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {hero.subtitle}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> ۱۰ سال تجربه</span>
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> ۱۰۰+ پروژه موفق</span>
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> پشتیبانی ۲۴/۷</span>
              </div>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <img src={hero.image} alt="Our Office" className="w-full h-auto" />
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-multiply"></div>
             </div>
             {/* Floating elements */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
             <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse delay-700"></div>
          </motion.div>
        </div>
      </section>

      {/* History / Timeline Section */}
      <section className="py-20 px-6 bg-secondary overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-lg mb-2">داستان ما</h2>
            <h3 className="text-3xl font-bold text-text">مسیر رشد و تعالی</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 left-8 bottom-0 w-1 bg-gray-200 md:w-full md:h-1 md:left-0 md:top-8 md:bottom-auto"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {history.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex md:flex-col items-start md:items-center gap-6 md:gap-0 md:text-center relative"
                >
                  {/* Icon/Dot */}
                  <div className="w-16 h-16 bg-white border-4 border-primary text-primary rounded-full flex items-center justify-center z-10 shrink-0 md:mb-6 shadow-lg transition-transform hover:scale-110">
                    <DynamicIcon name={event.icon} className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="pt-2 md:pt-0 bg-white md:bg-transparent p-4 md:p-0 rounded-xl shadow-sm md:shadow-none w-full">
                    <span className="block text-2xl font-bold text-primary mb-2">{event.year}</span>
                    <h4 className="font-bold text-lg text-text mb-2">{event.title}</h4>
                    <p className="text-gray-500 text-sm">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-lg mb-2">تیم ما</h2>
            <h3 className="text-3xl font-bold text-text">متخصصین با انگیزه</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div 
                key={member.id}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-blue-300 text-sm font-medium mb-4">{member.role}</p>
                  
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                    <p className="text-sm text-gray-300 border-t border-white/20 pt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Process Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-secondary to-white">
        <div className="container mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-lg mb-2">ارزش‌ها و فرآیند</h2>
            <h3 className="text-3xl font-bold text-text">چگونه کار می‌کنیم؟</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {values.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.id * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <DynamicIcon name={item.icon} className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-text mb-2 text-sm md:text-base">{item.title}</h5>
                <p className="text-xs text-gray-500 hidden md:block">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{cta.title}</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            {cta.desc}
          </p>
          
          <motion.button
            onClick={onCtaClick}
            animate={{ boxShadow: ["0 0 0 0 rgba(255, 255, 255, 0.4)", "0 0 0 20px rgba(255, 255, 255, 0)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-white text-primary text-lg font-bold px-10 py-4 rounded-full shadow-xl hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
          >
            {cta.buttonText}
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
