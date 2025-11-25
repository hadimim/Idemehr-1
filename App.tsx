
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import SolutionsPage from './components/SolutionsPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import ClientDashboard from './components/ClientDashboard';
import { DataProvider, useData, PageSection } from './components/DataContext';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type Page = 'home' | 'about' | 'services' | 'solutions' | 'portfolio' | 'contact' | 'blog' | 'admin' | 'login' | 'client-dashboard';

// Generic Content Block Component
const ContentBlock: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
);

// Section Wrapper to handle layout settings
const SectionWrapper: React.FC<{ section: PageSection; children: React.ReactNode }> = ({ section, children }) => {
  if (!section.isVisible) return null;

  const paddingClass = {
    none: '',
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
  }[section.wrapper.padding];

  const animationVariants = {
    none: {},
    fade: { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
    slide: { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } },
    zoom: { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true } }
  };

  return (
    <section className={`${section.wrapper.bgColor || ''} ${paddingClass}`}>
      <motion.div
        {...animationVariants[section.wrapper.animation]}
        className={section.wrapper.container === 'boxed' ? 'container mx-auto px-6' : 'w-full'}
      >
        {children}
      </motion.div>
    </section>
  );
};

const DynamicPageRenderer: React.FC<{ page: string, onNavigate: any }> = ({ page, onNavigate }) => {
  const { data } = useData();
  const layout = data.pageLayouts[page];

  if (!layout) {
    if (page === 'about') return <AboutPage onCtaClick={() => onNavigate('contact')} />;
    if (page === 'services') return <ServicesPage onCtaClick={() => onNavigate('contact')} />;
    if (page === 'solutions') return <SolutionsPage onCtaClick={() => onNavigate('contact')} />;
    if (page === 'portfolio') return <PortfolioPage onCtaClick={() => onNavigate('contact')} />;
    if (page === 'blog') return <BlogPage onCtaClick={() => onNavigate('contact')} />;
    if (page === 'contact') return <ContactPage />;
    return null;
  }

  return (
    <>
      {layout.map((section) => {
        let Component = null;
        const props = section.props || {};

        switch (section.component) {
          case 'Hero': Component = <Hero onNavigate={onNavigate} />; break;
          case 'Services': Component = <Services {...props} />; break;
          case 'Process': Component = <Process onNavigate={onNavigate} {...props} />; break;
          case 'Portfolio': Component = <Portfolio onNavigate={onNavigate} {...props} />; break;
          case 'Testimonials': Component = <Testimonials {...props} />; break;
          case 'Blog': Component = <Blog onNavigate={onNavigate} {...props} />; break;
          case 'ContactForm': Component = <ContactForm {...props} />; break;
          case 'AboutHero': Component = <AboutPage onCtaClick={() => onNavigate('contact')} />; break;
          case 'ContentBlock': Component = <ContentBlock content={props.content || ''} />; break;
          case 'ServicesHero': Component = <ServicesPage onCtaClick={() => onNavigate('contact')} />; break;
          case 'SolutionsHero': Component = <SolutionsPage onCtaClick={() => onNavigate('contact')} />; break;
          case 'PortfolioHero': Component = <PortfolioPage onCtaClick={() => onNavigate('contact')} />; break;
          case 'BlogHero': Component = <BlogPage onCtaClick={() => onNavigate('contact')} />; break;
          case 'ContactHero': Component = <ContactPage />; break;
          default: Component = null;
        }

        if (!Component) return null;

        const isSectionComponent = ['Hero', 'Services', 'Process', 'Portfolio', 'Testimonials', 'Blog', 'ContactForm', 'ContentBlock'].includes(section.component);

        if (isSectionComponent) {
             return <SectionWrapper key={section.id} section={section}>{Component}</SectionWrapper>;
        }
        
        return <React.Fragment key={section.id}>{Component}</React.Fragment>;
      })}
    </>
  );
};

const ToastNotification = () => {
  const { notification } = useData();
  
  if (!notification) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 50, x: '-50%' }}
        className={`fixed bottom-8 left-1/2 ${colors[notification.type]} text-white px-6 py-3 rounded-xl shadow-xl z-[100] flex items-center gap-3`}
      >
        {icons[notification.type]}
        <span className="font-bold">{notification.message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

const AppContent: React.FC = () => {
  const { data } = useData();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const { theme } = data.settings;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-primary-hover', theme.primaryHoverColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--color-accent', theme.accentColor);
  }, [data.settings.theme]);

  useEffect(() => {
    document.title = `${data.settings.general.title} | ${data.settings.general.tagline}`;
  }, [data.settings.general]);

  const handleNavigation = (page: Page, sectionId?: string) => {
    setCurrentPage(page);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (role: 'admin' | 'client') => {
    setIsAuthenticated(true);
    if (role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('client-dashboard');
    }
  };

  if (data.settings.system.maintenanceMode && !isAuthenticated && currentPage !== 'login' && currentPage !== 'admin') {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 text-center">
         <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl max-w-lg w-full">
            <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-text dark:text-white mb-4">سایت در حال بروزرسانی است</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              کاربر گرامی، وب‌سایت جهت ارتقای زیرساخت‌ها موقتاً از دسترس خارج می‌باشد. لطفاً ساعاتی دیگر مراجعه فرمایید.
            </p>
            <button onClick={() => handleNavigation('login')} className="text-primary font-bold hover:underline">
              ورود مدیران
            </button>
         </div>
      </div>
    );
  }

  if (currentPage === 'admin') {
    return (
      <>
        <AdminPanel onExit={() => { handleNavigation('home'); setIsAuthenticated(false); }} />
        <ToastNotification />
      </>
    );
  }

  if (currentPage === 'login') {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => handleNavigation('home')} />
        <ToastNotification />
      </>
    );
  }

  if (currentPage === 'client-dashboard') {
    return (
      <>
         <ClientDashboard onLogout={() => { handleNavigation('home'); setIsAuthenticated(false); }} />
         <ToastNotification />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden font-sans bg-secondary dark:bg-gray-900 text-text dark:text-white transition-colors duration-300">
      <Header activePage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-grow">
        <DynamicPageRenderer page={currentPage} onNavigate={handleNavigation} />
      </main>
      <Footer onNavigate={handleNavigation} />
      <ToastNotification />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
