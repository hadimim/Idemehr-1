
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github, Heart, Mail, Phone, ChevronLeft, Shield, MapPin } from 'lucide-react';
import { Page } from '../App';
import { useData } from './DataContext';

interface FooterProps {
  onNavigate?: (page: Page, sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { data } = useData();
  const settings = data.settings;

  const handleNav = (e: React.MouseEvent, page: Page, id?: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-[#14202b] text-white pt-20 pb-10 px-6 border-t border-gray-800 font-sans">
      <motion.div 
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 mb-12 border-b border-gray-800">
          
          {/* Brand Column (Wider) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              {settings.general.logo ? (
                 <img src={settings.general.logo} alt={settings.general.title} className="h-12 w-auto brightness-0 invert" />
              ) : (
                 <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/30">M</div>
              )}
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">{settings.general.title}</span>
                <span className="text-sm text-blue-400 font-medium tracking-wide">{settings.general.tagline}</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-justify pl-4">
              {settings.footer.aboutText}
            </p>
            
            <div className="space-y-4">
              <p className="text-sm font-bold text-white">ما را دنبال کنید:</p>
              <div className="flex gap-3">
                {settings.socials.linkedin && (
                  <a href={settings.socials.linkedin} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {settings.socials.instagram && (
                  <a href={settings.socials.instagram} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#E1306C] hover:text-white hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {settings.socials.twitter && (
                  <a href={settings.socials.twitter} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {settings.socials.github && (
                  <a href={settings.socials.github} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Container */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Column */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                محصولات
              </h4>
              <ul className="space-y-4">
                {[
                  { label: 'اتوماسیون اداری', page: 'solutions' },
                  { label: 'سیستم مدیریت CRM', page: 'solutions' },
                  { label: 'فروشگاه‌ساز اختصاصی', page: 'solutions' },
                  { label: 'اپلیکیشن سازمانی', page: 'solutions' },
                  { label: 'نرم‌افزار حسابداری', page: 'solutions' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      onClick={(e) => handleNav(e, item.page as Page)} 
                      className="text-gray-400 hover:text-primary hover:pr-2 transition-all duration-300 inline-flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft className="w-3 h-3 opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                شرکت
              </h4>
              <ul className="space-y-4">
                {[
                  { label: 'درباره ما', page: 'about' },
                  { label: 'تیم متخصصان', page: 'about' },
                  { label: 'نمونه کارها', page: 'portfolio' },
                  { label: 'وبلاگ و اخبار', page: 'blog' },
                  { label: 'فرصت‌های شغلی', page: 'contact' },
                  { label: 'ورود پرسنل', page: 'login' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      onClick={(e) => handleNav(e, item.page as Page)} 
                      className="text-gray-400 hover:text-primary hover:pr-2 transition-all duration-300 inline-flex items-center gap-1 text-sm"
                    >
                      {item.label === 'ورود پرسنل' && <Shield className="w-3 h-3 ml-1 text-gray-600" />}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Column */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                پشتیبانی
              </h4>
              <div className="bg-[#1e2d3b] rounded-2xl p-5 border border-gray-700/50 hover:border-primary/30 transition-colors mb-6">
                 <a href={`tel:${settings.contact.phone}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors mb-3 group">
                   <div className="bg-gray-700 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                     <Phone className="w-4 h-4" />
                   </div>
                   <span className="dir-ltr font-bold">{settings.contact.phone}</span>
                 </a>
                 <a href={`mailto:${settings.contact.email}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group">
                   <div className="bg-gray-700 p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                     <Mail className="w-4 h-4" />
                   </div>
                   <span className="font-medium">{settings.contact.email}</span>
                 </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mt-1 text-gray-500" />
                  <p>{settings.contact.address}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm"
        >
          <p className="mb-4 md:mb-0">{settings.footer.copyrightText}</p>
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
            <span className="text-gray-400">طراحی و توسعه با</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-gray-400">در ایران</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
