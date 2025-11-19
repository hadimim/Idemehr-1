
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft, Shield, Smartphone, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: 'admin' | 'client') => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Admin Form State
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');

  // Client Form State
  const [clientPhone, setClientPhone] = useState('');
  const [clientPass, setClientPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      if (activeTab === 'admin') {
        // Hardcoded Admin Credentials
        if (adminUser.toLowerCase() === 'admin' && adminPass === 'admin') {
          onLoginSuccess('admin');
        } else {
          setError('نام کاربری یا رمز عبور اشتباه است.');
          setIsLoading(false);
        }
      } else {
        // Client Validation (Regex for Iranian Mobile Number)
        const phoneRegex = /^09[0-9]{9}$/;
        
        if (phoneRegex.test(clientPhone) && clientPass.length >= 4) {
           onLoginSuccess('client');
        } else {
           setError('لطفا شماره موبایل صحیح (۱۱ رقم با شروع ۰۹) و رمز عبور وارد کنید.');
           setIsLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 flex flex-col md:flex-row"
      >
        {/* Info Side (Hidden on Mobile) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary to-[#004e92] text-white p-12 flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
                <Shield className="w-6 h-6 text-white" />
             </div>
             <h2 className="text-3xl font-bold mb-4">خوش آمدید</h2>
             <p className="text-blue-100 leading-loose">
               به پورتال یکپارچه خدمات ایده‌پرداز مهر وارد شوید. 
               <br/>
               دسترسی به پنل مدیریت پروژه‌ها، تیکت‌های پشتیبانی و صورت‌حساب‌های مالی.
             </p>
           </div>
           
           <div className="relative z-10">
             <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
               <CheckCircle className="w-4 h-4" />
               <span>امنیت بالا و رمزنگاری داده‌ها</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-blue-200">
               <CheckCircle className="w-4 h-4" />
               <span>پشتیبانی ۲۴/۷ اختصاصی</span>
             </div>
           </div>

           {/* Circles */}
           <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
           <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full"></div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
           <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-primary text-sm font-bold mb-8 transition-colors">
             <ArrowLeft className="w-4 h-4" />
             بازگشت به سایت
           </button>

           <div className="text-center mb-8">
             <h3 className="text-2xl font-bold text-gray-800 mb-2">ورود به حساب کاربری</h3>
             <p className="text-gray-500 text-sm">لطفا نوع حساب خود را انتخاب کنید</p>
           </div>

           {/* Tabs */}
           <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
             <button 
               type="button"
               onClick={() => { setActiveTab('client'); setError(''); }}
               className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'client' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               <User className="w-4 h-4" />
               مشتریان
             </button>
             <button 
               type="button"
               onClick={() => { setActiveTab('admin'); setError(''); }}
               className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               <Shield className="w-4 h-4" />
               پرسنل / ادمین
             </button>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              {activeTab === 'client' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">شماره موبایل</label>
                    <div className="relative">
                      <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="tel" 
                        className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                        placeholder="0912..."
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        maxLength={11}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">رمز عبور</label>
                    <div className="relative">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full pr-12 pl-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                        placeholder="••••••••"
                        value={clientPass}
                        onChange={(e) => setClientPass(e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">نام کاربری</label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                        placeholder="Username"
                        value={adminUser}
                        onChange={(e) => setAdminUser(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">رمز عبور</label>
                    <div className="relative">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full pr-12 pl-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                        placeholder="••••••••"
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'در حال اعتبارسنجی...' : 'ورود به حساب'}
              </button>

              {activeTab === 'client' && (
                <div className="text-center mt-4">
                  <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    رمز عبور خود را فراموش کرده‌اید؟
                  </a>
                </div>
              )}
           </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
