
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'idehpardaz_db'
};

const initialData = {
    settings: {
        general: { title: 'ایده‌پرداز مهر', tagline: 'دنیای مجازی، راهکارهای واقعی', description: 'پیشرو در ارائه راهکارهای نوین نرم‌افزاری و تحول دیجیتال', logo: '', favicon: '' },
        contact: { phone: '۰۲۱-۸۸۸۸۸۸۸۸', email: 'info@idehpardaz.com', address: 'تهران، خیابان ولیعصر، برج فناوری', mapUrl: '' },
        socials: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', twitter: 'https://twitter.com', github: 'https://github.com' },
        headerLinks: [
            { id: '1', name: 'صفحه اصلی', page: 'home' },
            { id: '2', name: 'خدمات', page: 'services' },
            { id: '3', name: 'نمونه کارها', page: 'portfolio' },
            { id: '4', name: 'وبلاگ', page: 'blog' },
            { id: '5', name: 'تماس با ما', page: 'contact' }
        ],
        footer: { aboutText: 'ایده‌پرداز مهر با بیش از ۱۰ سال سابقه درخشان در زمینه تولید نرم‌افزارهای سازمانی و طراحی وب‌سایت، همراه مطمئن کسب‌وکارهای ایرانی در مسیر رشد است.', copyrightText: 'تمامی حقوق برای شرکت ایده‌پرداز مهر محفوظ است © ۱۴۰۳' },
        theme: { primaryColor: '#0b63d6', primaryHoverColor: '#0952b5', secondaryColor: '#f7f9fc', accentColor: '#4a90e2', textColor: '#14202b' },
        system: { maintenanceMode: false, allowRegistration: false }
    },
    home: {
        hero: { h1: 'راهکارهای نرم‌افزاری آینده', h2: 'ایده‌پرداز مهر', desc: 'ما با استفاده از جدیدترین تکنولوژی‌ها، ایده‌های شما را به واقعیت تبدیل می‌کنیم. توسعه نرم‌افزار، طراحی وب و اپلیکیشن موبایل با بالاترین استانداردها.', ctaPrimary: 'شروع کنید', ctaSecondary: 'خدمات ما', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        services: [
            { id: '1', title: 'طراحی وب‌سایت', desc: 'طراحی وب‌سایت‌های مدرن، واکنش‌گرا و بهینه برای موتورهای جستجو.', icon: 'Globe', color: 'bg-blue-500' },
            { id: '2', title: 'اپلیکیشن موبایل', desc: 'توسعه اپلیکیشن‌های Android و iOS با رابط کاربری جذاب.', icon: 'Smartphone', color: 'bg-green-500' },
            { id: '3', title: 'نرم‌افزار سازمانی', desc: 'سیستم‌های یکپارچه مدیریت منابع (ERP) و ارتباط با مشتری (CRM).', icon: 'Server', color: 'bg-purple-500' },
            { id: '4', title: 'دیجیتال مارکتینگ', desc: 'سئو، گوگل ادز و بازاریابی شبکه‌های اجتماعی برای رشد کسب‌وکار.', icon: 'BarChart3', color: 'bg-orange-500' }
        ],
        process: [
            { id: '1', title: 'تحلیل و نیازسنجی', desc: 'بررسی دقیق نیازهای شما و ارائه بهترین راهکار فنی.', step: '۱', icon: 'Search' },
            { id: '2', title: 'طراحی و توسعه', desc: 'پیاده‌سازی پروژه با متدهای چابک و کدهای استاندارد.', step: '۲', icon: 'Code' },
            { id: '3', title: 'تست و تحویل', desc: 'تست دقیق عملکرد و امنیت، آموزش و پشتیبانی فنی.', step: '۳', icon: 'Rocket' }
        ],
        settings: { spacing: 24, animations: true, showTestimonials: true, showBlog: true }
    },
    about: {
        hero: { title: 'درباره ایده‌پرداز مهر', subtitle: 'ما تیمی از متخصصان خلاق هستیم که با اشتیاق به دنبال خلق ارزش‌های دیجیتال برای کسب‌وکارهای پیشرو می‌باشیم.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        history: [
            { id: 1, year: '۱۳۹۳', title: 'تاسیس شرکت', desc: 'شروع فعالیت با یک تیم کوچک ۳ نفره', icon: 'Flag' },
            { id: 2, year: '۱۳۹۶', title: 'توسعه تیم', desc: 'گسترش فعالیت‌ها به حوزه اپلیکیشن موبایل', icon: 'Users' },
            { id: 3, year: '۱۴۰۰', title: 'همکاری‌های بین‌المللی', desc: 'شروع صادرات نرم‌افزار به کشورهای منطقه', icon: 'Globe' }
        ],
        team: [
            { id: 1, name: 'علی محمدی', role: 'مدیر عامل', bio: '۱۵ سال سابقه مدیریت پروژه‌های نرم‌افزاری', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
            { id: 2, name: 'سارا احمدی', role: 'مدیر فنی', bio: 'متخصص معماری سیستم‌های توزیع شده', image: 'https://images.unsplash.com/photo-1573496359-7013ac2bebb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
            { id: 3, name: 'رضا کریمی', role: 'طراح ارشد', bio: 'عاشق رابط کاربری و تجربه کاربری', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }
        ],
        values: [
            { id: 1, title: 'نوآوری', desc: 'همگام با تکنولوژی روز', icon: 'Zap' },
            { id: 2, title: 'تعهد', desc: 'پایبندی به زمان‌بندی', icon: 'CheckCircle' },
            { id: 3, title: 'کیفیت', desc: 'بدون باگ و ایمن', icon: 'Shield' }
        ],
        cta: { title: 'آماده همکاری هستید؟', desc: 'تیم ما مشتاق شنیدن ایده‌های شماست.', buttonText: 'تماس با ما' }
    },
    pageLayouts: {
        home: [
            { id: 'hero', component: 'Hero', title: 'بخش هیرو', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'none', animation: 'fade' } },
            { id: 'services', component: 'Services', title: 'خدمات', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'md', animation: 'slide', bgColor: 'bg-white' } },
            { id: 'process', component: 'Process', title: 'مراحل کار', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'md', animation: 'fade', bgColor: 'bg-secondary' } },
            { id: 'portfolio', component: 'Portfolio', title: 'نمونه کارها', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'md', animation: 'zoom', bgColor: 'bg-white' } },
            { id: 'testimonials', component: 'Testimonials', title: 'نظرات مشتریان', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'md', animation: 'fade' } },
            { id: 'blog', component: 'Blog', title: 'وبلاگ', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'md', animation: 'slide', bgColor: 'bg-secondary' } },
            { id: 'contact', component: 'ContactForm', title: 'فرم تماس', isVisible: true, props: {}, wrapper: { container: 'full', padding: 'md', animation: 'fade', bgColor: 'bg-white' } }
        ],
        about: [
            { id: 'hero', component: 'AboutHero', title: 'هیرو درباره ما', isVisible: true, wrapper: { container: 'full', padding: 'none', animation: 'fade' } }
        ],
        services: [
            { id: 'hero', component: 'ServicesHero', title: 'هیرو خدمات', isVisible: true, wrapper: { container: 'full', padding: 'none', animation: 'fade' } }
        ],
        solutions: [
            { id: 'hero', component: 'SolutionsHero', title: 'هیرو راهکارها', isVisible: true, wrapper: { container: 'full', padding: 'none', animation: 'fade' } }
        ],
        portfolio: [
            { id: 'hero', component: 'PortfolioHero', title: 'هیرو نمونه کارها', isVisible: true, wrapper: { container: 'full', padding: 'none', animation: 'fade' } }
        ],
        blog: [
            { id: 'hero', component: 'BlogHero', title: 'هیرو وبلاگ', isVisible: true, wrapper: { container: 'full', padding: 'none', animation: 'fade' } }
        ],
        contact: [
             { id: 'hero', component: 'ContactHero', title: 'هیرو تماس', isVisible: true, wrapper: { container: 'full', padding: 'none', animation: 'fade' } }
        ]
    },
    pageHeaders: {
        services: { title: 'خدمات ما', subtitle: 'طیف گسترده‌ای از خدمات دیجیتال برای رشد کسب‌وکار شما', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        portfolio: { title: 'نمونه کارها', subtitle: 'افتخار ما، موفقیت مشتریان ماست. نگاهی به پروژه‌های انجام شده.', image: '' },
        blog: { title: 'وبلاگ و اخبار', subtitle: 'آخرین مقالات آموزشی و اخبار دنیای تکنولوژی', image: '' },
        contact: { title: 'تماس با ما', subtitle: 'مشتاق شنیدن صدای گرم شما هستیم.', image: '' }
    },
    servicesPage: [
        { 
            id: '1', 
            title: 'طراحی و توسعه وب', 
            icon: 'Globe', 
            description: 'ما وب‌سایت‌هایی طراحی می‌کنیم که نه تنها زیبا هستند، بلکه سریع، امن و مقیاس‌پذیر می‌باشند.', 
            features: ['طراحی UI/UX اختصاصی', 'توسعه با React و Next.js', 'پنل مدیریت اختصاصی', 'سئو تکنیکال'], 
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
        },
        { 
            id: '2', 
            title: 'توسعه اپلیکیشن موبایل', 
            icon: 'Smartphone', 
            description: 'اپلیکیشن‌های نیتیو و کراس‌پلتفرم برای حضور قدرتمند در جیب مشتریان شما.', 
            features: ['Android & iOS', 'طراحی متریال دیزاین', 'عملکرد بالا', 'انتشار در مارکت‌ها'], 
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
        }
    ],
    solutions: {
        hero: { title: 'راهکارهای سازمانی', subtitle: 'محصولات نرم‌افزاری آماده برای مدیریت بهتر کسب‌وکار', image: '' },
        products: [
             { id: 1, title: 'سیستم مدیریت ارتباط با مشتری (CRM)', description: 'مدیریت کامل چرخه فروش و ارتباط با مشتریان.', fullDesc: '', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', icon: 'Users', featured: true, features: ['مدیریت سرنخ‌ها', 'اتوماسیون بازاریابی', 'گزارش‌گیری پیشرفته'] },
             { id: 2, title: 'اتوماسیون اداری', description: 'حذف کاغذبازی و دیجیتالی کردن مکاتبات اداری.', fullDesc: '', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', icon: 'FileText', featured: false, features: ['کارتابل الکترونیک', 'بایگانی دیجیتال', 'امضای دیجیتال'] }
        ],
        settings: { animations: true, showFeaturedBadge: true }
    }
};

const seedData = async () => {
    let connection;
    try {
        console.log('Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected!');

        // 1. Clear Tables
        console.log('Clearing tables...');
        const tables = ['site_config', 'media', 'activity_logs', 'testimonials', 'messages', 'articles', 'projects', 'users'];
        for (const table of tables) {
            await connection.query(`DELETE FROM ${table}`);
            // Reset Auto Increment
            await connection.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
        }

        // 2. Insert Users
        console.log('Seeding Users...');
        await connection.query(`
            INSERT INTO users (name, email, role, status, lastLogin, avatar) VALUES 
            ('مدیر سیستم', 'admin@example.com', 'Super Admin', 'active', NOW(), ''),
            ('نویسنده', 'editor@example.com', 'Content Manager', 'active', NOW(), '')
        `);

        // 3. Insert Projects
        console.log('Seeding Projects...');
        const projects = [
            { 
                title: 'پلتفرم آموزش آنلاین لرنیتو', 
                client: 'موسسه آموزشی پارس', 
                category: 'Web', 
                industry: 'آموزش', 
                image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                featured: true,
                json_data: JSON.stringify({
                    gallery: [], excerpt: 'طراحی و پیاده‌سازی سیستم مدیریت یادگیری (LMS) اختصاصی',
                    problem: 'کند بودن سیستم قبلی و عدم امکان برگزاری آزمون آنلاین',
                    solution: 'بازنویسی سیستم با معماری میکروسرویس و React',
                    result: 'افزایش ۲۰۰٪ سرعت بارگذاری و رضایت ۹۵٪ کاربران',
                    techStack: ['React', 'Node.js', 'MongoDB'],
                    kpis: [{ label: 'کاربر فعال', value: 5000, suffix: '+' }, { label: 'کلاس آنلاین', value: 120, suffix: '' }]
                })
            },
            { 
                title: 'اپلیکیشن فودمارکت', 
                client: 'فودمارکت', 
                category: 'App', 
                industry: 'فروشگاهی', 
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                featured: true,
                json_data: JSON.stringify({
                    gallery: [], excerpt: 'سوپرمارکت آنلاین با تحویل زیر ۳۰ دقیقه',
                    problem: '', solution: '', result: '', techStack: ['Flutter', 'Firebase'], kpis: []
                })
            }
        ];
        for (const p of projects) {
            await connection.query(
                'INSERT INTO projects (title, client, category, industry, image, featured, json_data) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [p.title, p.client, p.category, p.industry, p.image, p.featured, p.json_data]
            );
        }

        // 4. Insert Articles
        console.log('Seeding Blog...');
        const articles = [
            {
                title: 'آینده توسعه وب در سال ۲۰۲۵',
                slug: 'future-of-web-2025',
                status: 'published',
                category: 'تکنولوژی',
                author: 'علی محمدی',
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                excerpt: 'بررسی ترندهای جدید در دنیای برنامه‌نویسی وب و هوش مصنوعی.',
                content: '<p>تکنولوژی با سرعت نور در حال پیشرفت است...</p>',
                json_data: JSON.stringify({ readTime: '۵ دقیقه', tags: ['Web', 'AI'], authorRole: 'مدیر فنی', authorAvatar: '' })
            },
            {
                title: 'راهنمای سئو برای کسب‌وکارهای نوپا',
                slug: 'seo-guide-startups',
                status: 'published',
                category: 'دیجیتال مارکتینگ',
                author: 'سارا احمدی',
                image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                excerpt: 'چگونه بدون هزینه زیاد در گوگل دیده شویم؟',
                content: '<p>سئو یکی از مهم‌ترین کانال‌های بازاریابی است...</p>',
                json_data: JSON.stringify({ readTime: '۷ دقیقه', tags: ['SEO', 'Marketing'], authorRole: 'متخصص سئو', authorAvatar: '' })
            }
        ];
        for (const a of articles) {
            await connection.query(
                'INSERT INTO articles (title, slug, status, category, author, image, excerpt, content, json_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [a.title, a.slug, a.status, a.category, a.author, a.image, a.excerpt, a.content, a.json_data]
            );
        }

        // 5. Insert Testimonials
        console.log('Seeding Testimonials...');
        await connection.query(`
            INSERT INTO testimonials (name, role, avatar, text) VALUES 
            ('حسین رضایی', 'مدیر عامل شرکت پارس', 'https://randomuser.me/api/portraits/men/32.jpg', 'تجربه همکاری با ایده‌پرداز مهر بسیار عالی بود. تیم حرفه‌ای و متعهد.'),
            ('مریم کاظمی', 'مدیر بازاریابی', 'https://randomuser.me/api/portraits/women/44.jpg', 'سرعت پاسخگویی و کیفیت نهایی پروژه فراتر از انتظار ما بود.')
        `);

        // 6. Insert Config (The big JSONs)
        console.log('Seeding Configuration...');
        const configItems = [
            ['settings', initialData.settings],
            ['home', initialData.home],
            ['about', initialData.about],
            ['page_layouts', initialData.pageLayouts],
            ['page_headers', initialData.pageHeaders],
            ['services_page', initialData.servicesPage],
            ['solutions', initialData.solutions]
        ];

        for (const [key, value] of configItems) {
            await connection.query(
                'INSERT INTO site_config (config_key, config_value) VALUES (?, ?)',
                [key, JSON.stringify(value)]
            );
        }

        console.log('✅ Seeding completed successfully!');
    } catch (err) {
        console.error('❌ Seeding failed:', err);
    } finally {
        if (connection) await connection.end();
    }
};

seedData();
