
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../App';
import { useData } from './DataContext';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page, sectionId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { data } = useData();
  const settings = data.settings;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (link: { page: string, sectionId?: string }) => {
    setIsOpen(false);
    onNavigate(link.page as Page, link.page === activePage ? link.sectionId : (link.page === 'home' && link.sectionId !== 'hero' ? link.sectionId : undefined));
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate('login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-text dark:text-white hover:text-primary p-2"
          onClick={() => setIsOpen(true)}
          aria-label="منوی اصلی"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          {settings.general.logo ? (
             <img src={settings.general.logo} alt={settings.general.title} className="h-10 w-auto" />
          ) : (
             <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-lg">
               M
             </div>
          )}
          <span className="text-xl font-bold text-primary tracking-tight">{settings.general.title}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {settings.headerLinks.map((link) => {
            const isActive = activePage === link.page;
            
            return (
              <button 
                key={link.id} 
                onClick={() => handleLinkClick(link)}
                className={`relative font-medium text-sm transition-colors px-2 py-1 rounded-md group ${
                  isActive 
                    ? 'text-primary bg-primary/5 dark:bg-primary/10' 
                    : 'text-text dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLoginClick}
            className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            <LogIn className="w-4 h-4" />
            <span>ورود مشتریان</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 z-50 shadow-xl flex flex-col"
            >
              <div className="p-5 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                 <span className="text-lg font-bold text-primary">منوی سایت</span>
                 <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-red-500">
                   <X className="w-6 h-6" />
                 </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-2">
                <ul className="space-y-1">
                  {settings.headerLinks.map((link) => (
                    <li key={link.id}>
                      <button 
                        onClick={() => handleLinkClick(link)}
                        className={`block w-full text-right px-4 py-3 rounded-lg font-medium transition-colors ${
                          activePage === link.page 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-text dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800'
                        }`}
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-5 border-t border-gray-100 dark:border-gray-800">
                 <button 
                  onClick={handleLoginClick}
                  className="flex w-full items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>ورود مشتریان</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
