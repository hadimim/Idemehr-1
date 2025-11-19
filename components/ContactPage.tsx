
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useData, Message } from './DataContext';

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
}

const ContactPage: React.FC = () => {
  const { data, updateMessages } = useData();
  const [formState, setFormState] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    
    // Clear error when user types
    if (errors[name as keyof Errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formState.name.trim()) newErrors.name = 'لطفا نام و نام خانوادگی را وارد کنید.';
    if (!formState.email.trim()) {
      newErrors.email = 'ایمیل الزامی است.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست.';
    }
    if (!formState.phone.trim()) {
      newErrors.phone = 'شماره تماس الزامی است.';
    } else if (formState.phone.length < 10) {
      newErrors.phone = 'شماره تماس معتبر نیست.';
    }
    if (!formState.message.trim()) newErrors.message = 'لطفا پیام خود را بنویسید.';
    if (!formState.service) newErrors.service = 'لطفا نوع سرویس را انتخاب کنید.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Create new message object
      const newMessage: Message = {
        id: Date.now().toString(),
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        service: formState.service,
        message: formState.message,
        date: new Date().toLocaleDateString('fa-IR'),
        status: 'new'
      };

      // Simulate API call and update context
      setTimeout(() => {
        updateMessages([...data.messages, newMessage]);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: '', org: '', email: '', phone: '', service: '', message: '' });
      }, 1500);
    }
  };

  // Animation variants for staggered form fields
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="animate-fade-in bg-secondary/20 min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-text mb-6"
          >
            ارتباط با <span className="text-primary">ایده‌پرداز مهر</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            ما همیشه مشتاق شنیدن صدای شما هستیم. برای مشاوره رایگان، درخواست دمو یا شروع پروژه جدید با ما تماس بگیرید.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Map & Contact Info */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="lg:col-span-5 space-y-8"
          >
            {/* Map Card */}
            <div className="bg-white rounded-3xl p-2 shadow-xl border border-gray-100 overflow-hidden group relative">
               <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-gray-100">
                 {/* Simulated Map */}
                 <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/600/400')] bg-cover bg-center opacity-80 grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110"></div>
                 <div className="absolute inset-0 bg-primary/10"></div>
                 
                 {/* Pin Animation */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                     <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute top-0 left-0"></div>
                     <MapPin className="w-10 h-10 text-primary drop-shadow-lg relative z-10 -mt-8" fill="currentColor" />
                   </div>
                 </div>
               </div>
               
               <div className="p-6">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <MapPin className="w-5 h-5 text-primary" />
                   دفتر مرکزی
                 </h3>
                 <p className="text-gray-600 leading-relaxed">
                   تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه ۳۴، پلاک ۱۲، برج نگین، طبقه ۴
                 </p>
               </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Phone className="w-8 h-8 text-blue-500 mb-4 bg-blue-50 p-1.5 rounded-lg" />
                <p className="text-sm text-gray-500 mb-1">تلفن تماس</p>
                <a href="tel:+982188996633" className="font-bold text-lg dir-ltr block text-right hover:text-primary transition-colors">۰۲۱ - ۸۸ ۹۹ ۶۶ ۳۳</a>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Mail className="w-8 h-8 text-green-500 mb-4 bg-green-50 p-1.5 rounded-lg" />
                <p className="text-sm text-gray-500 mb-1">پست الکترونیک</p>
                <a href="mailto:info@idehpardaz.ir" className="font-bold text-lg hover:text-primary transition-colors">info@idehpardaz.ir</a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text mb-2">ارسال پیام</h2>
                <p className="text-gray-500 text-sm">
                  پروژه خود را شرح دهید یا سوالات خود را بپرسید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                </p>
              </div>

              {isSubmitted ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center py-12 text-center"
                 >
                   <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle className="w-12 h-12" />
                   </div>
                   <h3 className="text-2xl font-bold text-green-800 mb-3">پیام شما با موفقیت ارسال شد!</h3>
                   <p className="text-gray-500 max-w-md">
                     اطلاعات شما در سیستم ثبت گردید. همکاران ما در واحد مربوطه به زودی با شما تماس خواهند گرفت.
                   </p>
                   <button 
                     onClick={() => setIsSubmitted(false)}
                     className="mt-8 text-primary font-bold hover:underline"
                   >
                     ارسال پیام جدید
                   </button>
                 </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {/* Name & Org */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-bold text-text">نام و نام خانوادگی <span className="text-red-500">*</span></label>
                        <input 
                          type="text" name="name" value={formState.name} onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'} outline-none transition-all`}
                        />
                        {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-bold text-text">نام سازمان / شرکت</label>
                        <input 
                          type="text" name="org" value={formState.org} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none transition-all"
                        />
                      </motion.div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-bold text-text">شماره تماس <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" name="phone" value={formState.phone} onChange={handleChange}
                          placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                          className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'} outline-none transition-all dir-ltr text-right`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-bold text-text">ایمیل <span className="text-red-500">*</span></label>
                        <input 
                          type="email" name="email" value={formState.email} onChange={handleChange}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'} outline-none transition-all dir-ltr text-right`}
                        />
                        {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </motion.div>
                    </div>

                    {/* Service Selection */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-bold text-text">موضوع درخواست <span className="text-red-500">*</span></label>
                      <select 
                        name="service" value={formState.service} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.service ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'} outline-none transition-all appearance-none cursor-pointer`}
                      >
                        <option value="">انتخاب کنید...</option>
                        <option value="consultation">درخواست مشاوره رایگان</option>
                        <option value="demo">درخواست دمو محصول</option>
                        <option value="project">سفارش پروژه نرم‌افزاری</option>
                        <option value="support">پشتیبانی فنی</option>
                        <option value="other">سایر موارد</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.service}</p>}
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-bold text-text">متن پیام <span className="text-red-500">*</span></label>
                      <textarea 
                        name="message" rows={5} value={formState.message} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'} outline-none transition-all resize-none`}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants} className="pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-primary-hover hover:shadow-blue-300 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <span>در حال ارسال...</span>
                        ) : (
                          <>
                            <span>ثبت درخواست</span>
                            <Send className="w-5 h-5 rotate-180" />
                          </>
                        )}
                      </button>
                    </motion.div>

                  </motion.div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
