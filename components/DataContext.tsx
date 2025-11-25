
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Icons from 'lucide-react';

// --- Types ---

export interface Service {
  id: string;
  title: string;
  desc: string;
  icon: string; // Lucide icon name
  color?: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  image: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  desc: string;
  step: string;
  icon: string;
}

export interface KPI {
  label: string;
  value: number;
  suffix?: string;
}

export interface Project {
  id: number;
  title: string;
  client: string;
  clientLogo?: string;
  category: string;
  industry: string;
  image: string;
  gallery: string[];
  excerpt: string;
  description?: string;
  fullDescription?: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  kpis: KPI[];
  testimonialLink?: string;
  featured: boolean;
  seo: { title: string; desc: string; slug: string };
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  status: 'published' | 'draft' | 'archived';
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  featured: boolean;
  allowComments: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  views: number;
}

export interface Comment {
  id: number;
  articleId: number;
  author: string;
  email: string;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  avatar?: string;
  ip?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  fullDesc?: string;
  image: string;
  icon: string;
  featured: boolean;
  popular?: boolean;
  visible?: boolean;
  features: string[];
  seo?: { title: string; desc: string; slug: string };
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  assignedTo?: string; // User ID
  replyNote?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor' | 'Content Manager' | 'Viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  date: string;
  details?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number; // in bytes
  dimensions?: string; // "800x600"
  date: string;
  category: string; // 'uncategorized', 'projects', 'blog', 'ui'
  alt?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface HistoryEvent {
  id: number;
  year: string;
  title: string;
  desc: string;
  icon: string;
}

export interface ValueItem {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface HeaderLink {
  id: string;
  name: string;
  page: string;
  sectionId?: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  image?: string;
}

export interface GlobalSettings {
  general: {
    title: string;
    tagline: string;
    description: string;
    logo: string;
    favicon: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  socials: {
    linkedin: string;
    instagram: string;
    twitter: string;
    github: string;
  };
  headerLinks: HeaderLink[];
  footer: {
    aboutText: string;
    copyrightText: string;
  };
  theme: {
    primaryColor: string;
    primaryHoverColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
  };
  system: {
    maintenanceMode: boolean;
    allowRegistration: boolean;
  };
}

// --- Modular Page Types ---

export interface PageSection {
  id: string;
  component: 'Hero' | 'Services' | 'Process' | 'Portfolio' | 'Testimonials' | 'Blog' | 'ContactForm' | 'ContentBlock' | 'AboutHero' | 'History' | 'Team' | 'Values' | 'AboutCTA' | 'ServicesList' | 'ServicesHero' | 'SolutionsHero' | 'SolutionsGrid' | 'PortfolioHero' | 'PortfolioGrid' | 'BlogHero' | 'ContactHero' | 'ContactMap' | 'ContactFormPage'; 
  title: string; // For Admin UI
  isVisible: boolean;
  props?: any; // Overrides or content for generic blocks
  wrapper: {
    container: 'full' | 'boxed'; // Layout width
    padding: 'none' | 'sm' | 'md' | 'lg';
    bgColor?: string;
    animation: 'none' | 'fade' | 'slide' | 'zoom';
  };
}

export interface SiteData {
  settings: GlobalSettings;
  home: {
    hero: { h1: string; h2: string; desc: string; ctaPrimary: string; ctaSecondary: string; image: string; };
    services: Service[];
    process: ProcessStep[];
    settings: { spacing: number; animations: boolean; showTestimonials: boolean; showBlog: boolean; };
  };
  about: {
    hero: { title: string; subtitle: string; image: string; };
    history: HistoryEvent[];
    team: TeamMember[];
    values: ValueItem[];
    cta: { title: string; desc: string; buttonText: string; };
  };
  // Dynamic Headers for other pages
  pageHeaders: {
    services: HeroData;
    portfolio: HeroData;
    blog: HeroData;
    contact: HeroData;
  };
  servicesPage: ServiceDetail[];
  solutions: {
    hero: { title: string; subtitle: string; image: string; };
    products: Product[];
    settings: { animations: boolean; showFeaturedBadge: boolean; };
  };
  projects: Project[];
  blog: Article[];
  comments: Comment[];
  blogCategories: string[];
  testimonials: Testimonial[];
  messages: Message[];
  users: User[];
  activityLogs: ActivityLog[];
  media: MediaItem[];
  // New: Modular Layout Configs
  pageLayouts: {
    [key: string]: PageSection[];
  };
}

export type NotificationType = 'success' | 'error' | 'info';
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

// --- Initial Data ---

const defaultWrapper = { container: 'boxed' as const, padding: 'lg' as const, animation: 'fade' as const };

const initialData: SiteData = {
  settings: {
    general: {
      title: 'ایده‌پرداز مهر',
      tagline: 'Virtual World Solutions',
      description: 'Official website for Idehpardaz Mehr - Professional software development.',
      logo: '',
      favicon: '',
    },
    contact: {
      phone: '۰۲۱ - ۸۸ ۹۹ ۶۶ ۳۳',
      email: 'info@idehpardaz.ir',
      address: 'تهران، خیابان ولیعصر، پارک ساعی، برج نگین',
      mapUrl: 'https://picsum.photos/seed/map/600/400',
    },
    socials: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
      github: '#',
    },
    headerLinks: [
      { id: '1', name: 'خانه', page: 'home', sectionId: 'hero' },
      { id: '2', name: 'درباره ما', page: 'about', sectionId: 'hero' },
      { id: '3', name: 'خدمات', page: 'services', sectionId: 'hero' },
      { id: '4', name: 'راهکارها', page: 'solutions', sectionId: 'hero' },
      { id: '5', name: 'نمونه کارها', page: 'portfolio', sectionId: 'hero' },
      { id: '6', name: 'وبلاگ', page: 'blog', sectionId: 'hero' },
      { id: '7', name: 'تماس با ما', page: 'contact', sectionId: 'hero' },
    ],
    footer: {
      aboutText: 'همراه هوشمند شما در مسیر تحول دیجیتال. ما با ترکیب خلاقیت و تکنولوژی، راهکارهای جامع نرم‌افزاری برای سازمان‌های پیشرو ارائه می‌دهیم.',
      copyrightText: '© ۱۴۰۳ ایده‌پرداز مهر. تمامی حقوق محفوظ است.',
    },
    theme: {
      primaryColor: '#0b63d6',
      primaryHoverColor: '#0952b5',
      secondaryColor: '#f7f9fc',
      accentColor: '#4a90e2',
      textColor: '#14202b',
    },
    system: {
      maintenanceMode: false,
      allowRegistration: true,
    }
  },
  home: {
    hero: {
      h1: 'دنیای مجازی، راه‌حل‌های واقعی\nبرای رشد کسب‌وکار شما',
      h2: 'توسعه‌دهنده راهکارهای سازمانی',
      desc: 'ایده‌پرداز مهر با بیش از ۱۰ سال تجربه در ارائه راهکارهای نرم‌افزاری یکپارچه، همراه هوشمند سازمان شما در مسیر تحول دیجیتال است.',
      ctaPrimary: 'درخواست دمو',
      ctaSecondary: 'خدمات ما',
      image: 'https://picsum.photos/seed/techhero/800/600'
    },
    services: [
      { id: '1', title: "طراحی و توسعه وب", icon: "Globe", desc: "پیاده‌سازی وب‌سایت‌های سازمانی و پورتال‌های اختصاصی.", color: "bg-blue-500" },
      { id: '2', title: "اپلیکیشن موبایل", icon: "Smartphone", desc: "طراحی اپلیکیشن‌های اندروید و iOS با رابط کاربری جذاب.", color: "bg-purple-500" },
      { id: '3', title: "نرم‌افزارهای اختصاصی", icon: "Server", desc: "تولید نرم‌افزارهای مدیریت منابع (ERP) و اتوماسیون.", color: "bg-indigo-500" },
      { id: '4', title: "مشاوره و تحلیل", icon: "BarChart3", desc: "تحلیل فرآیندهای کسب‌وکار و ارائه راهکارهای دیجیتال.", color: "bg-teal-500" },
    ],
    process: [
      { id: '1', title: "تحلیل و نیازسنجی", desc: "بررسی دقیق نیازمندی‌های کسب‌وکار شما.", step: "1", icon: "Search" },
      { id: '2', title: "طراحی رابط کاربری", desc: "خلق تجربه‌ای بصری، مدرن و کاربرپسند.", step: "2", icon: "PenTool" },
      { id: '3', title: "توسعه و پیاده‌سازی", desc: "کدنویسی تمیز و استاندارد با تکنولوژی روز.", step: "3", icon: "Code2" },
    ],
    settings: { spacing: 24, animations: true, showTestimonials: true, showBlog: true }
  },
  about: {
    hero: {
      title: 'درباره ایده‌پرداز مهر',
      subtitle: 'ما با ترکیب خلاقیت و تکنولوژی، راهکارهای نرم‌افزاری پایداری می‌سازیم.',
      image: 'https://picsum.photos/seed/office/800/500',
    },
    history: [
       { id: 1, year: '۱۳۹۳', title: 'تاسیس شرکت', desc: 'شروع فعالیت با تیمی ۳ نفره در مرکز رشد', icon: 'Rocket' },
       { id: 2, year: '۱۳۹۵', title: 'اولین پروژه ملی', desc: 'طراحی سامانه یکپارچه برای سازمان بنادر', icon: 'Award' },
       { id: 3, year: '۱۳۹۸', title: 'گسترش تیم', desc: 'افزایش نیروی انسانی به ۵۰ نفر متخصص', icon: 'Users' },
       { id: 4, year: '۱۴۰۲', title: 'شعبه بین‌المللی', desc: 'افتتاح دفتر دبی و شروع صادرات نرم‌افزار', icon: 'Globe' },
    ],
    team: [
      { id: 1, name: 'آرش مهدوی', role: 'مدیر عامل', image: 'https://picsum.photos/seed/ceo/300/300', bio: '۱۵ سال تجربه در مدیریت پروژه‌های کلان' },
      { id: 2, name: 'سارا کیانی', role: 'مدیر فنی', image: 'https://picsum.photos/seed/cto/300/300', bio: 'متخصص معماری سیستم‌های ابری' },
      { id: 3, name: 'علی رستمی', role: 'مدیر محصول', image: 'https://picsum.photos/seed/pm/300/300', bio: 'طراح استراتژی محصول' },
      { id: 4, name: 'مریم حسینی', role: 'تیم لید طراحی', image: 'https://picsum.photos/seed/design/300/300', bio: 'برنده جوایز متعدد طراحی رابط کاربری' },
      { id: 5, name: 'رضا نوری', role: 'توسعه‌دهنده ارشد', image: 'https://picsum.photos/seed/dev/300/300', bio: 'تخصص در توسعه سیستم‌های توزیع شده' },
      { id: 6, name: 'نازنین کریمی', role: 'مدیر مارکتینگ', image: 'https://picsum.photos/seed/marketing/300/300', bio: 'استراتژیست دیجیتال مارکتینگ و برندینگ' },
    ],
    values: [
      { id: 1, title: 'تحلیل دقیق', desc: 'شناخت عمیق نیازها', icon: 'Target' },
      { id: 2, title: 'طراحی کاربرمحور', desc: 'تمرکز بر تجربه نهایی', icon: 'Users' },
      { id: 3, title: 'توسعه چابک', desc: 'سرعت و کیفیت همزمان', icon: 'Zap' },
      { id: 4, title: 'تست و امنیت', desc: 'تضمین عملکرد بدون نقص', icon: 'Shield' },
      { id: 5, title: 'تحویل نهایی', desc: 'استقرار کامل سیستم', icon: 'CheckCircle' },
      { id: 6, title: 'پشتیبانی', desc: 'همراهی مداوم با مشتری', icon: 'Award' },
    ],
    cta: {
      title: 'آماده همکاری با ما هستید؟',
      desc: 'پروژه خود را به تیم متخصص ما بسپارید و از نتیجه شگفت‌زده شوید. مشاوره اولیه کاملاً رایگان است.',
      buttonText: 'شروع همکاری'
    }
  },
  pageHeaders: {
    services: {
      title: 'خدمات و راهکارهای دیجیتال',
      subtitle: 'از ایده تا اجرا، ما تمام ابزارهای لازم برای موفقیت دیجیتال کسب‌وکار شما را فراهم می‌کنیم.',
      image: 'https://picsum.photos/seed/services-hero/1200/400'
    },
    portfolio: {
      title: 'نمونه کارهای ایده‌پرداز مهر',
      subtitle: 'بررسی عمیق پروژه‌هایی که با نوآوری و تخصص پیاده‌سازی کرده‌ایم.'
    },
    blog: {
      title: 'وبلاگ تخصصی',
      subtitle: 'آخرین اخبار تکنولوژی، مقالات آموزشی و تحلیل‌های تخصصی دنیای نرم‌افزار را اینجا بخوانید.'
    },
    contact: {
      title: 'ارتباط با ایده‌پرداز مهر',
      subtitle: 'ما همیشه مشتاق شنیدن صدای شما هستیم. برای مشاوره رایگان، درخواست دمو یا شروع پروژه جدید با ما تماس بگیرید.'
    }
  },
  servicesPage: [
    {
      id: 'web',
      title: 'طراحی و توسعه وب‌سایت',
      icon: 'Code2',
      description: 'ما با استفاده از جدیدترین تکنولوژی‌های وب (React, Next.js, Node.js) وب‌سایت‌هایی سریع، امن و واکنش‌گرا طراحی می‌کنیم. از پورتال‌های سازمانی پیچیده تا لندینگ پیج‌های تبلیغاتی، همه چیز با دقت مهندسی می‌شود.',
      features: ['طراحی واکنش‌گرا (Responsive)', 'بهینه‌سازی سرعت و سئو', 'پنل مدیریت اختصاصی', 'امنیت چندلایه'],
      image: 'https://picsum.photos/seed/webdev/600/400'
    },
    {
      id: 'mobile',
      title: 'اپلیکیشن‌های موبایل',
      icon: 'Smartphone',
      description: 'توسعه اپلیکیشن‌های Native و Cross-platform برای Android و iOS. ما تمرکز ویژه‌ای بر تجربه کاربری (UX) داریم تا کاربران شما از کار با اپلیکیشن لذت ببرند.',
      features: ['React Native & Flutter', 'رابط کاربری مدرن', 'انتشار در کافه بازار و گوگل پلی', 'پشتیبانی فنی مداوم'],
      image: 'https://picsum.photos/seed/mobileapp/600/400'
    },
    {
      id: 'enterprise',
      title: 'نرم‌افزارهای سازمانی (ERP/CRM)',
      icon: 'Server',
      description: 'سیستم‌های یکپارچه مدیریت منابع که دقیقاً بر اساس نیازهای کسب‌وکار شما شخصی‌سازی می‌شوند. اتوماسیون اداری، مدیریت مشتریان و انبارداری هوشمند.',
      features: ['تحلیل فرآیندهای سازمان', 'یکپارچه‌سازی داده‌ها', 'گزارش‌گیری پیشرفته', 'قابلیت توسعه ماژولار'],
      image: 'https://picsum.photos/seed/enterprise/600/400'
    },
    {
      id: 'consulting',
      title: 'مشاوره و تحول دیجیتال',
      icon: 'LineChart',
      description: 'تیم متخصص ما به شما کمک می‌کند تا استراتژی دیجیتال مناسب خود را پیدا کنید. از انتخاب تکنولوژی تا معماری سیستم، ما در کنار شما هستیم.',
      features: ['نیازسنجی دقیق', 'معماری سیستم', 'انتخاب تکنولوژی', 'نظارت بر اجرا'],
      image: 'https://picsum.photos/seed/consult/600/400'
    }
  ],
  solutions: {
    hero: {
      title: 'راهکارهای نرم‌افزاری ما',
      subtitle: 'مجموعه‌ای از محصولات قدرتمند که برای ساده‌سازی فرآیندهای پیچیده و رشد کسب‌وکار شما طراحی شده‌اند.',
      image: 'https://picsum.photos/seed/solutions-hero/1200/400',
    },
    products: [
      {
        id: 1,
        title: "اتوماسیون اداری مهر",
        description: "سیستم جامع مکاتبات و فرآیندهای سازمانی با قابلیت تعریف چرخه کاری پویا و امضای دیجیتال.",
        image: "https://picsum.photos/seed/automation/600/400",
        icon: 'Zap',
        featured: true,
        popular: true,
        features: ["کارتابل آفلاین", "مدیریت جلسات", "آرشیو الکترونیک"]
      },
      {
        id: 2,
        title: "مدیریت ارتباط با مشتری (CRM)",
        description: "پلتفرم هوشمند مدیریت فروش و خدمات پس از فروش برای افزایش وفاداری مشتریان.",
        image: "https://picsum.photos/seed/crm/600/400",
        icon: 'BarChart',
        featured: false,
        popular: false,
        features: ["قیف فروش", "تیکتینگ", "گزارش‌ساز"]
      },
      {
        id: 3,
        title: "سامانه منابع انسانی (HRM)",
        description: "راهکاری برای مدیریت پرسنل، حقوق و دستمزد، ارزیابی عملکرد و جذب و استخدام.",
        image: "https://picsum.photos/seed/hr/600/400",
        icon: 'Shield',
        featured: false,
        popular: false,
        features: ["محاسبه حقوق", "مدیریت مرخصی", "ارزیابی KPI"]
      },
      {
        id: 4,
        title: "فروشگاه‌ساز اختصاصی",
        description: "پلتفرم فروش آنلاین قدرتمند با قابلیت اتصال به سیستم‌های حسابداری و انبارداری.",
        image: "https://picsum.photos/seed/shop/600/400",
        icon: 'Globe',
        featured: false,
        popular: false,
        features: ["درگاه پرداخت", "مدیریت موجودی", "کمپین‌های تخفیف"]
      },
      {
        id: 5,
        title: "اپلیکیشن سازمانی",
        description: "اپلیکیشن موبایل یکپارچه برای دسترسی پرسنل به خدمات سازمان در هر زمان و مکان.",
        image: "https://picsum.photos/seed/appcorp/600/400",
        icon: 'Smartphone',
        featured: false,
        popular: false,
        features: ["نسخه PWA", "نوتیفیکیشن", "دسترسی بیومتریک"]
      }
    ],
    settings: { animations: true, showFeaturedBadge: true }
  },
  projects: [
    {
      id: 1,
      title: "سامانه جامع بیمارستانی امید",
      client: "وزارت بهداشت",
      category: "Web",
      industry: "درمان و سلامت",
      image: "https://picsum.photos/seed/medical-dash/800/600",
      gallery: ["https://picsum.photos/seed/med1/800/600"],
      excerpt: "یکپارچه‌سازی فرآیندهای پذیرش تا ترخیص در ۱۵ بیمارستان بزرگ کشور.",
      problem: "عدم یکپارچگی سیستم‌های نوبت‌دهی، پرونده الکترونیک و حسابداری که منجر به اتلاف وقت بیماران و خطای انسانی می‌شد.",
      solution: "طراحی و پیاده‌سازی سیستم جامع تحت وب با معماری میکروسرویس، متصل به سامانه بیمه و درگاه‌های پرداخت.",
      result: "کاهش ۷۰ درصدی زمان انتظار بیماران و حذف کامل پرونده‌های کاغذی.",
      techStack: ["React.js", "Node.js", "MongoDB", "Docker"],
      kpis: [
        { label: "کاهش زمان انتظار", value: 70, suffix: "%" },
        { label: "بیمارستان تحت پوشش", value: 15, suffix: "+" },
        { label: "کاربر فعال روزانه", value: 5000, suffix: "+" }
      ],
      featured: true,
      seo: { title: "سامانه امید", desc: "سامانه مدیریت بیمارستانی", slug: "omid-hospital-system" }
    },
    {
      id: 2,
      title: "اپلیکیشن فروشگاهی مارکت‌تِک",
      client: "هلدینگ تجاری پارس",
      category: "App",
      industry: "تجارت الکترونیک",
      image: "https://picsum.photos/seed/ecommerce-app/800/600",
      gallery: [],
      excerpt: "تجربه خرید آنلاین سریع با قابلیت واقعیت افزوده (AR) برای محصولات.",
      problem: "نرخ پرش بالا در نسخه موبایل وب‌سایت و نیاز به تعامل بیشتر با مشتریان جوان.",
      solution: "توسعه اپلیکیشن Native با قابلیت‌های مدرن مانند جستجوی صوتی و تست محصول با AR.",
      result: "افزایش ۳ برابری نرخ تبدیل و رضایت ۹۵ درصدی کاربران.",
      techStack: ["Flutter", "Firebase", "AR Core", "Python AI"],
      kpis: [
        { label: "دانلود اپلیکیشن", value: 200, suffix: "k+" },
        { label: "افزایش فروش", value: 300, suffix: "%" },
        { label: "امتیاز کاربر", value: 4.8, suffix: "/5" }
      ],
      featured: true,
      seo: { title: "اپلیکیشن مارکت‌تک", desc: "خرید آنلاین با AR", slug: "markettech-app" }
    },
    {
      id: 3,
      title: "پورتال سازمانی پتروگاز",
      client: "شرکت ملی نفت",
      category: "Enterprise",
      industry: "نفت و انرژی",
      image: "https://picsum.photos/seed/oil-platform/800/600",
      gallery: [],
      excerpt: "داشبورد مدیریتی هوشمند برای نظارت بر پروژه‌های استخراج و تولید.",
      problem: "پراکندگی داده‌های آماری پروژه‌ها و تاخیر در تصمیم‌گیری‌های مدیریتی.",
      solution: "ایجاد داشبورد BI متمرکز با قابلیت گزارش‌گیری لحظه‌ای و پیش‌بینی با هوش مصنوعی.",
      result: "دسترسی آنی مدیران به داده‌ها و کاهش ۲۰ درصدی هزینه‌های عملیاتی.",
      techStack: ["Angular", ".NET Core", "SQL Server", "Power BI"],
      kpis: [
        { label: "صرفه‌جویی هزینه", value: 20, suffix: "%" },
        { label: "مدیران کاربر", value: 150, suffix: " نفر" },
        { label: "دقت پیش‌بینی", value: 92, suffix: "%" }
      ],
      featured: false,
      seo: { title: "پورتال پتروگاز", desc: "داشبورد مدیریتی نفت", slug: "petrogas-portal" }
    }
  ],
  blog: [
    {
      id: 1,
      title: "آینده توسعه نرم‌افزار با هوش مصنوعی",
      slug: "future-of-software-development-ai",
      excerpt: "چگونه هوش مصنوعی مولد (Generative AI) در حال تغییر پارادایم‌های برنامه‌نویسی، تست و مهندسی نرم‌افزار است؟",
      content: "<p>هوش مصنوعی مولد در حال حاضر یکی از بزرگترین تحولات در صنعت نرم‌افزار است. ابزارهایی مانند GitHub Copilot و ChatGPT به توسعه‌دهندگان کمک می‌کنند تا کد را سریع‌تر بنویسند، باگ‌ها را شناسایی کنند و حتی مستندات را به صورت خودکار تولید کنند.</p><h2>تأثیر بر بهره‌وری</h2><p>مطالعات نشان می‌دهد که استفاده از این ابزارها می‌تواند بهره‌وری تیم‌های فنی را تا ۴۰ درصد افزایش دهد. این بدان معناست که زمان بیشتری برای حل مسائل پیچیده و خلاقیت باقی می‌ماند.</p>",
      image: "https://picsum.photos/seed/ai-code-blog/800/500",
      date: "۱۵ مهر ۱۴۰۳",
      status: 'published',
      readTime: "۵ دقیقه",
      author: "سارا کیانی",
      authorRole: "مدیر فنی",
      authorAvatar: "https://picsum.photos/seed/cto/100/100",
      category: "تکنولوژی",
      tags: ["هوش مصنوعی", "توسعه نرم‌افزار", "آینده تکنولوژی"],
      featured: true,
      allowComments: true,
      seo: { title: "آینده نرم‌افزار با AI", description: "تاثیر هوش مصنوعی بر آینده برنامه‌نویسی", keywords: ["AI", "Software"] },
      views: 1250
    },
    {
      id: 2,
      title: "اهمیت تجربه کاربری (UX) در فروش",
      slug: "importance-of-ux-in-sales",
      excerpt: "تاثیر مستقیم طراحی رابط کاربری بهینه بر نرخ تبدیل و افزایش فروش آنلاین در کسب‌وکارهای دیجیتال.",
      content: "<p>رابط کاربری (UI) و تجربه کاربری (UX) دو روی یک سکه هستند. یک محصول زیبا اگر کاربردی نباشد، محکوم به شکست است.</p><ul><li>رابط کاربری ساده</li><li>دسترسی سریع به اطلاعات</li><li>فرآیند خرید کوتاه</li></ul>",
      image: "https://picsum.photos/seed/ux-design-blog/800/500",
      date: "۱۰ مهر ۱۴۰۳",
      status: 'published',
      readTime: "۳ دقیقه",
      author: "علی رستمی",
      authorRole: "مدیر محصول",
      authorAvatar: "https://picsum.photos/seed/pm/100/100",
      category: "طراحی",
      tags: ["تجربه کاربری", "طراحی رابط کاربری", "دیجیتال مارکتینگ"],
      featured: false,
      allowComments: true,
      seo: { title: "تاثیر UX بر فروش", description: "چگونه طراحی بهتر فروش را بیشتر میکند", keywords: ["UX", "Sales"] },
      views: 890
    },
    {
      id: 3,
      title: "راهنمای امنیت سایبری برای شرکت‌ها",
      slug: "cyber-security-guide",
      excerpt: "نکات کلیدی و استراتژی‌های ضروری برای محافظت از داده‌های سازمانی در برابر تهدیدات مدرن سایبری.",
      content: "<p>امنیت سایبری دیگر یک انتخاب نیست، بلکه یک ضرورت است. با افزایش حملات باج‌افزاری، شرکت‌ها باید استراتژی‌های دفاعی چند لایه داشته باشند.</p>",
      image: "https://picsum.photos/seed/cyber-blog/800/500",
      date: "۰۵ مهر ۱۴۰۳",
      status: 'published',
      readTime: "۷ دقیقه",
      author: "رضا نوری",
      authorRole: "توسعه‌دهنده ارشد",
      authorAvatar: "https://picsum.photos/seed/dev/100/100",
      category: "امنیت",
      tags: ["امنیت سایبری", "هک و امنیت", "داده‌های سازمانی"],
      featured: false,
      allowComments: false,
      seo: { title: "امنیت سایبری سازمانی", description: "راهنمای جامع امنیت", keywords: ["Security", "Cyber"] },
      views: 540
    }
  ],
  comments: [
    {
      id: 1,
      articleId: 1,
      author: "محمد علیزاده",
      email: "mohammad@example.com",
      content: "مطلب بسیار مفیدی بود. به نظرم آینده برنامه‌نویسی تغییرات زیادی خواهد کرد.",
      date: "1403/07/22",
      status: "approved",
      avatar: "https://picsum.photos/seed/user1/100/100"
    },
    {
      id: 2,
      articleId: 1,
      author: "سحر دانشور",
      email: "sahar@test.com",
      content: "آیا این ابزارها جایگزین برنامه‌نویسان می‌شوند؟",
      date: "1403/07/23",
      status: "pending",
      avatar: "https://picsum.photos/seed/user2/100/100"
    },
    {
      id: 3,
      articleId: 2,
      author: "Bot User",
      email: "bot@spam.com",
      content: "Buy cheap crypto now! Click here...",
      date: "1403/07/24",
      status: "spam",
      avatar: "https://picsum.photos/seed/user3/100/100"
    }
  ],
  blogCategories: ["تکنولوژی", "طراحی", "امنیت", "فین‌تک", "مارکتینگ", "اخبار شرکت"],
  testimonials: [
    {
      id: 1,
      name: "مهندس رضا کریمی",
      role: "مدیر عامل شرکت تک‌پرداز",
      avatar: "https://picsum.photos/seed/avatar1/100/100",
      text: "همکاری با تیم ایده‌پرداز مهر تجربه‌ای فوق‌العاده بود. دقت در جزئیات و تحویل به موقع پروژه، فراتر از انتظارات ما بود.",
    },
    {
      id: 2,
      name: "سارا محمدی",
      role: "مدیر مارکتینگ استارتاپ ویژن",
      avatar: "https://picsum.photos/seed/avatar2/100/100",
      text: "تیم فنی بسیار قوی و پشتیبانی عالی. آن‌ها دقیقا چیزی را ساختند که ما برای رشد کسب‌ و کارمان نیاز داشتیم.",
    },
    {
      id: 3,
      name: "علیرضا حسینی",
      role: "مدیر IT سازمان",
      avatar: "https://picsum.photos/seed/avatar3/100/100",
      text: "راهکارهای سازمانی ارائه شده توسط این شرکت، بهره‌وری مجموعه ما را به طرز چشمگیری افزایش داده است.",
    },
  ],
  messages: [
    { id: '1', name: 'محمد رضایی', email: 'mohammad@example.com', phone: '09120000000', service: 'project', message: 'درخواست مشاوره برای طراحی سایت شرکتی دارم.', date: '1403/07/20', status: 'new' },
    { id: '2', name: 'زهرا امینی', email: 'zahra@corp.com', phone: '09190000000', service: 'demo', message: 'لطفا دمو اتوماسیون اداری را ارسال کنید.', date: '1403/07/18', status: 'read', assignedTo: '1' },
  ],
  users: [
    { id: '1', name: 'آرش مهدوی', email: 'admin@idehpardaz.ir', role: 'Super Admin', status: 'active', lastLogin: '1403/07/21', avatar: 'https://picsum.photos/seed/ceo/100/100' },
    { id: '2', name: 'سارا کیانی', email: 'sara@idehpardaz.ir', role: 'Editor', status: 'active', lastLogin: '1403/07/20', avatar: 'https://picsum.photos/seed/cto/100/100' },
    { id: '3', name: 'شرکت فولاد', email: 'client@steel.com', role: 'Viewer', status: 'active', lastLogin: '1403/07/15' },
  ],
  activityLogs: [
    { id: '1', userId: '1', userName: 'آرش مهدوی', action: 'LOGIN', target: 'سیستم', date: '1403/07/21 10:30' },
    { id: '2', userId: '1', userName: 'آرش مهدوی', action: 'UPDATE', target: 'مقاله #1', date: '1403/07/21 11:15' },
    { id: '3', userId: '2', userName: 'سارا کیانی', action: 'CREATE', target: 'پروژه جدید', date: '1403/07/20 09:45' },
  ],
  media: [
    { id: '1', name: 'hero-tech.jpg', url: 'https://picsum.photos/seed/techhero/800/600', type: 'image', size: 102400, dimensions: '800x600', date: '1403/07/01', category: 'general' },
    { id: '2', name: 'office.jpg', url: 'https://picsum.photos/seed/office/800/500', type: 'image', size: 98000, dimensions: '800x500', date: '1403/07/02', category: 'about' },
    { id: '3', name: 'webdev.jpg', url: 'https://picsum.photos/seed/webdev/600/400', type: 'image', size: 45000, dimensions: '600x400', date: '1403/07/05', category: 'services' },
    { id: '4', name: 'mobile.jpg', url: 'https://picsum.photos/seed/mobileapp/600/400', type: 'image', size: 48000, dimensions: '600x400', date: '1403/07/05', category: 'services' },
    { id: '5', name: 'enterprise.jpg', url: 'https://picsum.photos/seed/enterprise/600/400', type: 'image', size: 52000, dimensions: '600x400', date: '1403/07/05', category: 'services' },
    { id: '6', name: 'consult.jpg', url: 'https://picsum.photos/seed/consult/600/400', type: 'image', size: 41000, dimensions: '600x400', date: '1403/07/05', category: 'services' },
    { id: '7', name: 'medical-dash.jpg', url: 'https://picsum.photos/seed/medical-dash/800/600', type: 'image', size: 120000, dimensions: '800x600', date: '1403/07/10', category: 'projects' },
    { id: '8', name: 'ecommerce-app.jpg', url: 'https://picsum.photos/seed/ecommerce-app/800/600', type: 'image', size: 115000, dimensions: '800x600', date: '1403/07/12', category: 'projects' },
    { id: '9', name: 'oil-platform.jpg', url: 'https://picsum.photos/seed/oil-platform/800/600', type: 'image', size: 130000, dimensions: '800x600', date: '1403/07/14', category: 'projects' },
    { id: '10', name: 'ai-blog.jpg', url: 'https://picsum.photos/seed/ai-code-blog/800/500', type: 'image', size: 85000, dimensions: '800x500', date: '1403/07/15', category: 'blog' },
    { id: '11', name: 'ux-blog.jpg', url: 'https://picsum.photos/seed/ux-design-blog/800/500', type: 'image', size: 82000, dimensions: '800x500', date: '1403/07/16', category: 'blog' },
    { id: '12', name: 'cyber-blog.jpg', url: 'https://picsum.photos/seed/cyber-blog/800/500', type: 'image', size: 88000, dimensions: '800x500', date: '1403/07/18', category: 'blog' },
  ],
  // Modular Layouts
  pageLayouts: {
    home: [
      { id: 'h1', component: 'Hero', title: 'هیرو (بنر اصلی)', isVisible: true, wrapper: { ...defaultWrapper, padding: 'none', container: 'full' } },
      { id: 'h2', component: 'Services', title: 'خدمات ما', isVisible: true, wrapper: defaultWrapper },
      { id: 'h3', component: 'Process', title: 'مراحل کار', isVisible: true, wrapper: { ...defaultWrapper, bgColor: 'bg-secondary' } },
      { id: 'h4', component: 'Portfolio', title: 'نمونه کارها', isVisible: true, wrapper: defaultWrapper },
      { id: 'h5', component: 'Testimonials', title: 'نظرات مشتریان', isVisible: true, wrapper: { ...defaultWrapper, container: 'full', padding: 'none' } },
      { id: 'h6', component: 'Blog', title: 'آخرین مقالات', isVisible: true, wrapper: { ...defaultWrapper, bgColor: 'bg-secondary' } },
      { id: 'h7', component: 'ContactForm', title: 'فرم تماس', isVisible: true, wrapper: defaultWrapper },
    ],
    about: [
      { id: 'a1', component: 'AboutHero', title: 'معرفی', isVisible: true, wrapper: defaultWrapper },
      { id: 'a2', component: 'History', title: 'تاریخچه', isVisible: true, wrapper: { ...defaultWrapper, bgColor: 'bg-secondary' } },
      { id: 'a3', component: 'Team', title: 'تیم ما', isVisible: true, wrapper: defaultWrapper },
      { id: 'a4', component: 'Values', title: 'ارزش‌ها', isVisible: true, wrapper: { ...defaultWrapper, bgColor: 'bg-secondary' } },
      { id: 'a5', component: 'AboutCTA', title: 'دعوت به همکاری', isVisible: true, wrapper: { ...defaultWrapper, container: 'full', padding: 'none' } },
    ],
    services: [
      { id: 's1', component: 'ServicesHero', title: 'هیرو خدمات', isVisible: true, wrapper: defaultWrapper },
      { id: 's2', component: 'ServicesList', title: 'لیست خدمات', isVisible: true, wrapper: defaultWrapper },
    ],
    solutions: [
      { id: 'sol1', component: 'SolutionsHero', title: 'هیرو راهکارها', isVisible: true, wrapper: defaultWrapper },
      { id: 'sol2', component: 'SolutionsGrid', title: 'لیست محصولات', isVisible: true, wrapper: defaultWrapper },
    ],
    portfolio: [
      { id: 'p1', component: 'PortfolioHero', title: 'هیرو نمونه‌کار', isVisible: true, wrapper: defaultWrapper },
      { id: 'p2', component: 'PortfolioGrid', title: 'لیست پروژه‌ها', isVisible: true, wrapper: defaultWrapper },
    ],
    blog: [
      { id: 'b1', component: 'BlogHero', title: 'هیرو وبلاگ', isVisible: true, wrapper: defaultWrapper },
    ],
    contact: [
      { id: 'c1', component: 'ContactHero', title: 'هیرو تماس', isVisible: true, wrapper: defaultWrapper },
      { id: 'c2', component: 'ContactMap', title: 'نقشه و اطلاعات', isVisible: true, wrapper: defaultWrapper },
      { id: 'c3', component: 'ContactFormPage', title: 'فرم ارسال پیام', isVisible: true, wrapper: defaultWrapper },
    ],
  }
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

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('siteData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const mergedData = {
           ...initialData,
           ...parsed,
           settings: { ...initialData.settings, ...(parsed.settings || {}) },
           pageLayouts: { ...initialData.pageLayouts, ...(parsed.pageLayouts || {}) },
           media: parsed.media || initialData.media,
           pageHeaders: { ...initialData.pageHeaders, ...(parsed.pageHeaders || {}) }
        };
        setData(mergedData);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    
    // Ensure light mode is forced
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('themeMode');

    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('siteData', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const notify = (type: NotificationType, message: string) => {
    const id = Date.now().toString();
    setNotification({ id, type, message });
    setTimeout(() => {
      setNotification(prev => prev?.id === id ? null : prev);
    }, 4000);
  };

  const updateHome = (newData: SiteData['home']) => setData(prev => ({ ...prev, home: newData }));
  const updateAbout = (newData: SiteData['about']) => setData(prev => ({ ...prev, about: newData }));
  const updateServicesPage = (newData: ServiceDetail[]) => setData(prev => ({ ...prev, servicesPage: newData }));
  const updateSolutions = (newData: SiteData['solutions']) => setData(prev => ({ ...prev, solutions: newData }));
  const updateProjects = (newData: Project[]) => setData(prev => ({ ...prev, projects: newData }));
  const updateBlog = (newData: Article[]) => setData(prev => ({ ...prev, blog: newData }));
  const updateComments = (newData: Comment[]) => setData(prev => ({ ...prev, comments: newData }));
  const updateBlogCategories = (newData: string[]) => setData(prev => ({ ...prev, blogCategories: newData }));
  const updateTestimonials = (newData: Testimonial[]) => setData(prev => ({ ...prev, testimonials: newData }));
  const updateMessages = (newData: Message[]) => setData(prev => ({ ...prev, messages: newData }));
  const updateUsers = (newData: User[]) => setData(prev => ({ ...prev, users: newData }));
  const updateActivityLogs = (newData: ActivityLog[]) => setData(prev => ({ ...prev, activityLogs: newData }));
  const updateSettings = (newData: GlobalSettings) => setData(prev => ({ ...prev, settings: newData }));
  const updatePageLayout = (page: string, newLayout: PageSection[]) => setData(prev => ({ ...prev, pageLayouts: { ...prev.pageLayouts, [page]: newLayout } }));
  const updateMedia = (newData: MediaItem[]) => setData(prev => ({ ...prev, media: newData }));
  const updatePageHeaders = (newData: SiteData['pageHeaders']) => setData(prev => ({ ...prev, pageHeaders: newData }));
  
  const resetData = () => {
    setData(initialData);
    localStorage.removeItem('siteData');
  };

  if (!isLoaded) return null;

  return (
    <DataContext.Provider value={{ 
      data, 
      notification,
      notify,
      updateHome, 
      updateAbout, 
      updateServicesPage,
      updateSolutions, 
      updateProjects, 
      updateBlog,
      updateComments, 
      updateBlogCategories,
      updateTestimonials,
      updateMessages,
      updateUsers,
      updateActivityLogs,
      updateSettings,
      updatePageLayout,
      updateMedia,
      updatePageHeaders,
      resetData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// --- Helper Component for Dynamic Icons ---
export const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};
