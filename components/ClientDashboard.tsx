
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Settings, LogOut, Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ClientDashboardProps {
  onLogout: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="font-bold text-gray-800">پورتال مشتریان</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://picsum.photos/seed/client/100/100" alt="User" />
              </div>
              <span className="text-sm font-bold text-gray-700 hidden sm:block">کاربر گرامی</span>
            </div>
            <button onClick={onLogout} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors" title="خروج">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">به پورتال ایده‌پرداز مهر خوش آمدید</h1>
              <p className="text-blue-100">وضعیت پروژه‌های فعال و تیکت‌های پشتیبانی خود را از اینجا پیگیری کنید.</p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
              <LayoutDashboard className="w-48 h-48 -mb-10 -mr-10" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">پروژه‌های فعال</p>
                <p className="text-2xl font-bold text-gray-800">1</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">تیکت‌های پاسخ داده شده</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">روزهای باقی‌مانده پشتیبانی</p>
                <p className="text-2xl font-bold text-gray-800">120</p>
              </div>
            </div>
          </div>

          {/* Active Project Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h3 className="font-bold text-lg text-gray-800">پروژه‌های فعال</h3>
               <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">در حال اجرا</span>
             </div>
             <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img src="https://picsum.photos/seed/project1/200/150" alt="Project" className="w-full md:w-48 h-32 object-cover rounded-xl" />
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-bold text-lg mb-1">طراحی وب‌سایت فروشگاهی</h4>
                      <p className="text-gray-500 text-sm">شامل طراحی UI/UX، توسعه فرانت‌اند و بک‌‌اند، اتصال به درگاه پرداخت</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>پیشرفت کلی</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">مشاهده جزئیات</button>
                      <button className="text-sm border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">ارسال تیکت</button>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Invoices */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
               <h3 className="font-bold text-lg text-gray-800 mb-4">آخرین فاکتورها</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                   <div className="flex items-center gap-3">
                     <div className="bg-white p-2 rounded-lg border border-gray-100"><FileText className="w-4 h-4 text-gray-500" /></div>
                     <div>
                       <p className="text-sm font-bold text-gray-800">پیش‌پرداخت قرارداد</p>
                       <p className="text-xs text-gray-400">1403/06/15</p>
                     </div>
                   </div>
                   <span className="text-green-600 text-sm font-bold">پرداخت شده</span>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                   <div className="flex items-center gap-3">
                     <div className="bg-white p-2 rounded-lg border border-gray-100"><FileText className="w-4 h-4 text-gray-500" /></div>
                     <div>
                       <p className="text-sm font-bold text-gray-800">قسط دوم (فاز طراحی)</p>
                       <p className="text-xs text-gray-400">1403/07/01</p>
                     </div>
                   </div>
                   <span className="text-orange-600 text-sm font-bold">در انتظار پرداخت</span>
                 </div>
               </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
               <h3 className="font-bold text-lg text-gray-800 mb-4">تیکت‌های پشتیبانی</h3>
               <div className="space-y-4">
                 <div className="p-3 border border-gray-100 rounded-xl hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold">مشکل در آپلود تصاویر</span>
                      <span className="text-xs text-gray-400">2 ساعت پیش</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">تصاویر محصولات در بخش گالری بارگذاری نمی‌شوند...</p>
                 </div>
                 <button className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 text-sm font-bold hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">
                   + ثبت تیکت جدید
                 </button>
               </div>
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default ClientDashboard;
