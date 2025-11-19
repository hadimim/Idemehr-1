
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Tag, Search, ArrowRight, Send } from 'lucide-react';
import { useData, Article } from './DataContext';

interface BlogPageProps {
  onCtaClick: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onCtaClick }) => {
  const { data } = useData();
  // Filter for published articles only
  const articles = data.blog.filter(a => a.status === 'published');
  const categories = ["همه", ...data.blogCategories];

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "همه" || article.category === activeCategory;
    const matchesSearch = article.title.includes(searchQuery) || article.excerpt.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Scroll to top when opening article or changing filter
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticle, activeCategory]);

  // Article Detail View
  if (selectedArticle) {
    return (
      <div className="animate-fade-in bg-white min-h-screen pt-24">
        {/* Sticky Navigation Bar */}
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold transition-colors group"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="hidden sm:inline">بازگشت به وبلاگ</span>
            </button>
            
            <div className="flex items-center gap-3">
               <span className="text-sm text-gray-500 hidden md:inline">اشتراک‌گذاری:</span>
               <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-[#1DA1F2] hover:bg-blue-50 rounded-full transition-all"><Twitter className="w-4 h-4" /></button>
                 <button className="p-2 text-gray-400 hover:text-[#0077b5] hover:bg-blue-50 rounded-full transition-all"><Linkedin className="w-4 h-4" /></button>
                 <button className="p-2 text-gray-400 hover:text-[#4267B2] hover:bg-blue-50 rounded-full transition-all"><Facebook className="w-4 h-4" /></button>
                 <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all"><Share2 className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl mt-8">
           {/* Header Info */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="mb-8 text-center"
            >
             <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
               <Tag className="w-4 h-4" />
               {selectedArticle.category}
             </div>
             <h1 className="text-3xl md:text-5xl font-bold text-text mb-6 leading-tight">
               {selectedArticle.title}
             </h1>
             
             <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm">
               <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4" />
                 {selectedArticle.date}
               </div>
               <div className="flex items-center gap-2">
                 <Clock className="w-4 h-4" />
                 {selectedArticle.readTime} مطالعه
               </div>
             </div>
           </motion.div>

           {/* Featured Image */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7, delay: 0.2 }}
             className="rounded-3xl overflow-hidden shadow-2xl mb-12 aspect-video relative group"
           >
             <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50"></div>
           </motion.div>

           {/* Content Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Sidebar (Author) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-3 order-2 lg:order-1"
              >
                 <div className="sticky top-40 bg-secondary/50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <img src={selectedArticle.authorAvatar} alt={selectedArticle.author} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-sm" />
                    <p className="text-xs text-gray-500 mb-1">نویسنده</p>
                    <h4 className="font-bold text-text mb-1">{selectedArticle.author}</h4>
                    <p className="text-primary text-sm text-center mb-4">{selectedArticle.authorRole}</p>
                    <button className="w-full border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
                      مشاهده پروفایل
                    </button>
                 </div>
              </motion.div>

              {/* Main Content */}
              <div className="lg:col-span-9 order-1 lg:order-2">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className="prose prose-lg prose-blue max-w-none text-justify"
                   dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                 />
                 
                 <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="mt-12 pt-8 border-t border-gray-100"
                  >
                   <h4 className="font-bold mb-4 flex items-center gap-2">
                     <Tag className="w-4 h-4 text-gray-400" />
                     برچسب‌ها:
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedArticle.tags.map((tag, idx) => (
                       <span key={idx} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer">
                         #{tag}
                       </span>
                     ))}
                   </div>
                 </motion.div>

                 {/* Comments Section (Placeholder) */}
                 {selectedArticle.allowComments && (
                   <div className="mt-12">
                     <h4 className="font-bold text-xl mb-6">نظرات کاربران</h4>
                     <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500">
                       بخش نظرات برای این مطلب فعال است.
                     </div>
                   </div>
                 )}

                 {/* Bottom Share */}
                 <div className="mt-8 flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                    <span className="font-bold text-gray-700">این مطلب را به اشتراک بگذارید:</span>
                    <div className="flex gap-3">
                       <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md hover:text-[#1DA1F2] transition-all"><Twitter className="w-5 h-5" /></button>
                       <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md hover:text-[#0077b5] transition-all"><Linkedin className="w-5 h-5" /></button>
                       <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md hover:text-gray-800 transition-all"><Send className="w-5 h-5 -rotate-45 translate-x-0.5" /></button>
                    </div>
                 </div>
              </div>
           </div>
        </article>
        
        {/* Related CTA */}
        <section className="bg-gradient-to-r from-secondary to-white py-20 mt-12 border-t border-gray-100">
           <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-4 text-text">به دنبال پیاده‌سازی این ایده‌ها هستید؟</h2>
              <p className="text-gray-500 mb-8 max-w-xl mx-auto">تیم فنی ما آماده است تا در مسیر تحول دیجیتال و پیاده‌سازی راهکارهای نوین نرم‌افزاری همراه شما باشد.</p>
              <button onClick={onCtaClick} className="bg-primary text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all inline-flex items-center gap-2">
                درخواست مشاوره رایگان
                <ArrowLeft className="w-5 h-5" />
              </button>
           </div>
        </section>
      </div>
    );
  }

  // List View
  return (
    <div className="animate-fade-in bg-secondary/20 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-text mb-6"
          >
            وبلاگ <span className="text-primary">تخصصی</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-10"
          >
            آخرین اخبار تکنولوژی، مقالات آموزشی و تحلیل‌های تخصصی دنیای نرم‌افزار را اینجا بخوانید.
          </motion.p>

          {/* Search & Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-4"
          >
             <div className="relative flex-grow w-full md:w-auto">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="جستجو در مقالات..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
               />
             </div>
             
             <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                     activeCategory === cat 
                       ? 'bg-primary text-white shadow-md' 
                       : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-6 container mx-auto">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <img src={article.authorAvatar} alt={article.author} className="w-8 h-8 rounded-full" />
                         <span className="text-xs font-bold text-gray-600">{article.author}</span>
                       </div>
                       <span className="text-primary text-sm font-bold flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                         مطالعه کامل
                         <ArrowLeft className="w-4 h-4" />
                       </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
           <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
             <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500 text-lg font-medium">مقاله‌ای با این مشخصات یافت نشد.</p>
             <button 
               onClick={() => { setActiveCategory("همه"); setSearchQuery(""); }}
               className="mt-4 text-primary font-bold hover:underline"
             >
               نمایش همه مقالات
             </button>
           </div>
        )}
      </section>

      <div className="pb-20 text-center">
        <button onClick={onCtaClick} className="inline-flex items-center gap-2 bg-white border-2 border-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:border-primary hover:text-primary transition-all">
          مشاوره برای پروژه نرم‌افزاری
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
