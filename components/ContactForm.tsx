
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from './DataContext';

interface ContactFormProps {
  sidebarTitle?: string;
  sidebarDesc?: string;
  formTitle?: string;
  formDesc?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  sidebarTitle = "اطلاعات تماس",
  sidebarDesc = "برای مشاوره رایگان و دریافت دمو محصولات، با ما در ارتباط باشید. تیم پشتیبانی ما آماده پاسخگویی به شماست.",
  formTitle = "درخواست دمو",
  formDesc = "فرم زیر را پر کنید، کارشناسان ما در کمتر از ۲۴ ساعت با شما تماس می‌گیرند."
}) => {
  const { data } = useData();
  const settings = data.settings;
  const [formState, setFormState] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: '', org: '', email: '', phone: '', service: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
          
          {/* Contact Info Side (Left on Desktop, Top on Mobile) */}
          <div className="lg:col-span-2 bg-primary text-white p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">{sidebarTitle}</h3>
              <p className="text-blue-100 mb-10 leading-relaxed">
                {sidebarDesc}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-300 mt-1" />
                  <div>
                    <p className="text-xs text-blue-200">شماره تماس</p>
                    <p className="font-bold dir-ltr text-right">{settings.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-300 mt-1" />
                  <div>
                    <p className="text-xs text-blue-200">ایمیل سازمانی</p>
                    <p className="font-bold">{settings.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-300 mt-1" />
                  <div>
                    <p className="text-xs text-blue-200">آدرس</p>
                    <p className="font-bold">{settings.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decoration Circles */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute top-10 -left-24 w-48 h-48 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 p-10 bg-white">
             <div className="mb-8">
               <h3 className="text-2xl font-bold text-text mb-2">{formTitle}</h3>
               <p className="text-gray-500 text-sm">{formDesc}</p>
             </div>

             {isSubmitted ? (
               <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
               >
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle className="w-8 h-8" />
                 </div>
                 <h4 className="text-xl font-bold text-green-800 mb-2">درخواست شما ثبت شد!</h4>
                 <p className="text-green-600">از تماس شما سپاسگزاریم. به زودی با شما تماس خواهیم گرفت.</p>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label htmlFor="name" className="text-sm font-bold text-text block">نام و نام خانوادگی</label>
                     <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="مثال: علی رضایی"
                    />
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="org" className="text-sm font-bold text-text block">نام سازمان / شرکت</label>
                     <input 
                      type="text" 
                      id="org" 
                      name="org"
                      value={formState.org}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="مثال: شرکت ایده‌پرداز"
                    />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label htmlFor="email" className="text-sm font-bold text-text block">ایمیل</label>
                     <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                      placeholder="name@company.com"
                    />
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="phone" className="text-sm font-bold text-text block">شماره تماس</label>
                     <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                      placeholder="0912..."
                    />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label htmlFor="service" className="text-sm font-bold text-text block">نوع سرویس مورد نیاز</label>
                   <select 
                    id="service" 
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                   >
                     <option value="">انتخاب کنید...</option>
                     <option value="web">طراحی وب‌سایت</option>
                     <option value="app">اپلیکیشن موبایل</option>
                     <option value="software">نرم‌افزار سازمانی</option>
                     <option value="seo">سئو و دیجیتال مارکتینگ</option>
                     <option value="consult">مشاوره</option>
                   </select>
                 </div>

                 <div className="space-y-2">
                   <label htmlFor="message" className="text-sm font-bold text-text block">پیام شما</label>
                   <textarea 
                    id="message" 
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="توضیحات تکمیلی پروژه..."
                  />
                 </div>

                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   type="submit"
                   className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                 >
                   <span>ارسال درخواست</span>
                   <Send className="w-5 h-5 rotate-180" />
                 </motion.button>
               </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
