
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Icons from 'lucide-react';

// --- Types ---
export interface Service { id: string; title: string; desc: string; icon: string; color?: string; }
export interface ServiceDetail { id: string; title: string; icon: string; description: string; features: string[]; image: string; }
export interface ProcessStep { id: string; title: string; desc: string; step: string; icon: string; }
export interface KPI { label: string; value: number; suffix?: string; }
export interface Project { id: number; title: string; client: string; clientLogo?: string; category: string; industry: string; image: string; gallery: string[]; excerpt: string; description?: string; fullDescription?: string; problem: string; solution: string; result: string; techStack: string[]; kpis: KPI[]; testimonialLink?: string; featured: boolean; seo: { title: string; desc: string; slug: string }; }
export interface Article { id: number; title: string; slug: string; excerpt: string; content: string; image: string; date: string; status: 'published' | 'draft' | 'archived'; readTime: string; author: string; authorRole: string; authorAvatar: string; category: string; tags: string[]; featured: boolean; allowComments: boolean; seo: { title: string; description: string; keywords: string[]; }; views: number; }
export interface Comment { id: number; articleId: number; author: string; email: string; content: string; date: string; status: 'pending' | 'approved' | 'rejected' | 'spam'; avatar?: string; ip?: string; }
export interface Testimonial { id: number; name: string; role: string; avatar: string; text: string; }
export interface Product { id: number; title: string; description: string; fullDesc?: string; image: string; icon: string; featured: boolean; popular?: boolean; visible?: boolean; features: string[]; seo?: { title: string; desc: string; slug: string }; }
export interface Message { id: string; name: string; email: string; phone: string; service: string; message: string; date: string; status: 'new' | 'read' | 'replied' | 'archived'; assignedTo?: string; replyNote?: string; }
export interface User { id: string; name: string; email: string; role: 'Super Admin' | 'Editor' | 'Content Manager' | 'Viewer'; status: 'active' | 'inactive'; lastLogin: string; avatar?: string; }
export interface ActivityLog { id: string; userId: string; userName: string; action: string; target: string; date: string; details?: string; }
export interface MediaItem { id: string; name: string; url: string; type: 'image' | 'video' | 'document'; size: number; dimensions?: string; date: string; category: string; alt?: string; }
export interface TeamMember { id: number; name: string; role: string; image: string; bio: string; }
export interface HistoryEvent { id: number; year: string; title: string; desc: string; icon: string; }
export interface ValueItem { id: number; title: string; desc: string; icon: string; }
export interface HeaderLink { id: string; name: string; page: string; sectionId?: string; }
export interface HeroData { title: string; subtitle: string; image?: string; }
export interface GlobalSettings { general: { title: string; tagline: string; description: string; logo: string; favicon: string; }; contact: { phone: string; email: string; address: string; mapUrl: string; }; socials: { linkedin: string; instagram: string; twitter: string; github: string; }; headerLinks: HeaderLink[]; footer: { aboutText: string; copyrightText: string; }; theme: { primaryColor: string; primaryHoverColor: string; secondaryColor: string; accentColor: string; textColor: string; }; system: { maintenanceMode: boolean; allowRegistration: boolean; }; }
export interface PageSection { id: string; component: string; title: string; isVisible: boolean; props?: any; wrapper: { container: 'full' | 'boxed'; padding: 'none' | 'sm' | 'md' | 'lg'; bgColor?: string; animation: 'none' | 'fade' | 'slide' | 'zoom'; }; }
export interface SiteData { settings: GlobalSettings; home: { hero: { h1: string; h2: string; desc: string; ctaPrimary: string; ctaSecondary: string; image: string; }; services: Service[]; process: ProcessStep[]; settings: { spacing: number; animations: boolean; showTestimonials: boolean; showBlog: boolean; }; }; about: { hero: { title: string; subtitle: string; image: string; }; history: HistoryEvent[]; team: TeamMember[]; values: ValueItem[]; cta: { title: string; desc: string; buttonText: string; }; }; pageHeaders: { services: HeroData; portfolio: HeroData; blog: HeroData; contact: HeroData; }; servicesPage: ServiceDetail[]; solutions: { hero: { title: string; subtitle: string; image: string; }; products: Product[]; settings: { animations: boolean; showFeaturedBadge: boolean; }; }; projects: Project[]; blog: Article[]; comments: Comment[]; blogCategories: string[]; testimonials: Testimonial[]; messages: Message[]; users: User[]; activityLogs: ActivityLog[]; media: MediaItem[]; pageLayouts: { [key: string]: PageSection[]; }; }
export type NotificationType = 'success' | 'error' | 'info';
export interface Notification { id: string; type: NotificationType; message: string; }

// --- API CONFIG ---
const API_URL = '/api'; // Use relative path via Vite proxy

// --- Initial Empty Data ---
const initialData: SiteData = {
  settings: { general: { title: 'ایده‌پرداز مهر', tagline: 'دنیای مجازی، راهکارهای واقعی', description: '', logo: '', favicon: '' }, contact: { phone: '۰۲۱-۸۸۸۸۸۸۸۸', email: 'info@idehpardaz.com', address: 'تهران، خیابان ولیعصر', mapUrl: '' }, socials: { linkedin: '', instagram: '', twitter: '', github: '' }, headerLinks: [{id:'1', name:'صفحه اصلی', page:'home'}, {id:'2', name:'خدمات', page:'services'}, {id:'3', name:'نمونه کارها', page:'portfolio'}, {id:'4', name:'وبلاگ', page:'blog'}, {id:'5', name:'تماس با ما', page:'contact'}], footer: { aboutText: 'توضیحات فوتر...', copyrightText: 'تمامی حقوق محفوظ است.' }, theme: { primaryColor: '#0b63d6', primaryHoverColor: '#0952b5', secondaryColor: '#f7f9fc', accentColor: '#4a90e2', textColor: '#14202b' }, system: { maintenanceMode: false, allowRegistration: false } },
  home: { hero: { h1: 'راهکارهای نرم‌افزاری آینده', h2: 'ایده‌پرداز مهر', desc: 'ما با استفاده از جدیدترین تکنولوژی‌ها...', ctaPrimary: 'شروع کنید', ctaSecondary: 'خدمات ما', image: 'https://picsum.photos/seed/hero/800/600' }, services: [], process: [], settings: { spacing: 24, animations: true, showTestimonials: true, showBlog: true } },
  about: { hero: { title: 'درباره ما', subtitle: 'تیم ما...', image: 'https://picsum.photos/seed/office/800/600' }, history: [], team: [], values: [], cta: { title: 'همکاری با ما', desc: '...', buttonText: 'تماس' } },
  pageHeaders: { services: { title: 'خدمات ما', subtitle: '...' }, portfolio: { title: 'نمونه کارها', subtitle: '...' }, blog: { title: 'وبلاگ', subtitle: '...' }, contact: { title: 'تماس با ما', subtitle: '...' } },
  servicesPage: [],
  solutions: { hero: { title: 'راهکارها', subtitle: '...', image: '' }, products: [], settings: { animations: true, showFeaturedBadge: true } },
  projects: [],
  blog: [],
  comments: [],
  blogCategories: ["تکنولوژی", "اخبار"],
  testimonials: [],
  messages: [],
  users: [],
  activityLogs: [],
  media: [],
  pageLayouts: {}
};

// --- Context ---
interface DataContextType {
  data: SiteData;
  notification: Notification | null;
  notify: (type: NotificationType, message: string) => void;
  updateHome: (newData: SiteData['home']) => void;
  updateAbout: (newData: SiteData['about']) => void;
  updateServicesPage: (newData: ServiceDetail[]) => void;
  updateSolutions: (newData: SiteData['solutions']) => void;
  updateProjects: (newData: Project[]) => void;
  updateBlog: (newData: Article[]) => void;
  updateComments: (newData: Comment[]) => void;
  updateBlogCategories: (newData: string[]) => void;
  updateTestimonials: (newData: Testimonial[]) => void;
  updateMessages: (newData: Message[]) => void;
  updateUsers: (newData: User[]) => void;
  updateActivityLogs: (newData: ActivityLog[]) => void;
  updateSettings: (newData: GlobalSettings) => void;
  updatePageLayout: (page: string, newLayout: PageSection[]) => void;
  updateMedia: (newData: MediaItem[]) => void;
  updatePageHeaders: (newData: SiteData['pageHeaders']) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Load from API on mount
  useEffect(() => {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));
    
    Promise.race([fetch(`${API_URL}/init`), timeout])
      .then((res: any) => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then(serverData => {
        const merged = { ...initialData, ...serverData };
        if (!merged.pageLayouts.home) merged.pageLayouts = initialData.pageLayouts;
        setData(merged);
      })
      .catch(err => {
        console.warn("API Connection Failed (Offline Mode):", err);
        // We stay with initialData in Offline Mode
      })
      .finally(() => {
        setIsLoaded(true);
      });
      
    document.documentElement.classList.remove('dark');
  }, []);

  const notify = (type: NotificationType, message: string) => {
    const id = Date.now().toString();
    setNotification({ id, type, message });
    setTimeout(() => setNotification(prev => prev?.id === id ? null : prev), 4000);
  };

  // --- API Wrappers with Offline Fallback ---
  
  const postConfig = (key: string, value: any) => {
      fetch(`${API_URL}/config/${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value)
      }).catch(() => notify('error', 'خطا در ذخیره (آفلاین)'));
  };

  const updateHome = (newData: SiteData['home']) => {
      setData(prev => ({ ...prev, home: newData }));
      postConfig('home', newData);
  };

  const updateAbout = (newData: SiteData['about']) => {
      setData(prev => ({ ...prev, about: newData }));
      postConfig('about', newData);
  };

  const updateServicesPage = (newData: ServiceDetail[]) => {
      setData(prev => ({ ...prev, servicesPage: newData }));
      postConfig('services_page', newData);
  };

  const updateSolutions = (newData: SiteData['solutions']) => {
      setData(prev => ({ ...prev, solutions: newData }));
      postConfig('solutions', newData);
  };

  const updateSettings = (newData: GlobalSettings) => {
      setData(prev => ({ ...prev, settings: newData }));
      postConfig('settings', newData);
  };

  const updatePageLayout = (page: string, newLayout: PageSection[]) => {
      const layouts = { ...data.pageLayouts, [page]: newLayout };
      setData(prev => ({ ...prev, pageLayouts: layouts }));
      postConfig('page_layouts', layouts);
  };

  const updatePageHeaders = (newData: SiteData['pageHeaders']) => {
      setData(prev => ({ ...prev, pageHeaders: newData }));
      postConfig('page_headers', newData);
  };

  const updateProjects = async (newData: Project[]) => {
      setData(prev => ({ ...prev, projects: newData })); // Optimistic update
      try {
          const project = newData[newData.length - 1];
          if (project) {
             const res = await fetch(`${API_URL}/projects`, {
                 method: 'POST', headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(project)
             });
             if(!res.ok) throw new Error('API Fail');
             const savedList = await res.json();
             setData(prev => ({ ...prev, projects: savedList }));
          }
      } catch (e) {
          console.warn("Offline: Projects saved locally");
      }
  };
  
  const updateBlog = async (newData: Article[]) => {
     setData(prev => ({ ...prev, blog: newData }));
     try {
         const article = newData.find(a => !data.blog.find(b => b.id === a.id)) || newData[newData.length-1];
         if(article) {
             const res = await fetch(`${API_URL}/blog`, { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(article)});
             if(!res.ok) throw new Error('API Fail');
             const list = await res.json();
             setData(prev => ({ ...prev, blog: list }));
         }
     } catch(e) { console.warn("Offline: Blog saved locally"); }
  };
  
  const updateMedia = async (newData: MediaItem[]) => {
      setData(prev => ({ ...prev, media: newData }));
      try {
          if (newData.length > data.media.length) {
              const newItem = newData[0]; 
              const res = await fetch(`${API_URL}/media`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newItem)});
              if(!res.ok) throw new Error('API Fail');
              const list = await res.json();
              setData(prev => ({...prev, media: list}));
          }
      } catch(e) { console.warn("Offline: Media saved locally"); }
  };

  const updateMessages = async (newData: Message[]) => {
      setData(prev => ({ ...prev, messages: newData }));
      try {
          if (newData.length > data.messages.length) {
              const msg = newData[newData.length - 1];
              await fetch(`${API_URL}/messages`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(msg)});
          }
      } catch(e) { console.warn("Offline: Message saved locally"); }
  };
  
  const updateComments = (newData: Comment[]) => setData(prev => ({ ...prev, comments: newData }));
  const updateBlogCategories = (newData: string[]) => setData(prev => ({ ...prev, blogCategories: newData }));
  const updateTestimonials = (newData: Testimonial[]) => setData(prev => ({ ...prev, testimonials: newData }));
  const updateUsers = (newData: User[]) => setData(prev => ({ ...prev, users: newData }));
  const updateActivityLogs = (newData: ActivityLog[]) => setData(prev => ({ ...prev, activityLogs: newData }));
  const resetData = () => { setData(initialData); };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center text-primary font-bold text-lg">در حال بارگذاری سیستم...</div>;

  return (
    <DataContext.Provider value={{ 
      data, notification, notify, updateHome, updateAbout, updateServicesPage, updateSolutions, 
      updateProjects, updateBlog, updateComments, updateBlogCategories, updateTestimonials,
      updateMessages, updateUsers, updateActivityLogs, updateSettings, updatePageLayout,
      updateMedia, updatePageHeaders, resetData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};

export const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};
