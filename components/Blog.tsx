
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Page } from '../App';
import { useData } from './DataContext';

interface BlogProps {
  onNavigate?: (page: Page, sectionId?: string) => void;
  title?: string;
  subtitle?: string;
}

const Blog: React.FC<BlogProps> = ({ 
  onNavigate,
  title = "وبلاگ",
  subtitle = "آخرین مقالات آموزشی"
}) => {
  const { data } = useData();
  // Show latest 3 PUBLISHED articles, prioritize featured ones
  const articles = data.blog
    .filter(a => a.status === 'published')
    .sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1))
    .slice(0, 3);

  const handleNav = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('blog');
    }
  };

  if (articles.length === 0) return null;

  return (
    <section id="blog" className="py-20 px-6 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-2">{title}</h2>
          <h3 className="text-3xl font-bold text-text">{subtitle}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              onClick={handleNav}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime} مطالعه</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <span onClick={handleNav}>{article.title}</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                
                <button onClick={handleNav} className="text-primary text-sm font-bold hover:underline">
                  ادامه مطلب
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
