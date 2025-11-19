
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Briefcase, MessageSquare, Users, Settings, LogOut, 
  Eye, TrendingUp, Plus, Edit3, Trash2, Save, 
  Check, ChevronRight, List, 
  Type, Image as ImageIcon, Globe, Tag,
  Move, GripVertical, Moon, Sun, Menu,
  Target, Mail, Phone, CheckCircle, AlertTriangle, X, Layers, Package,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Video, ListOrdered, List as ListIcon,
  MessageCircle, ShieldAlert, RefreshCcw, Search, ChevronLeft, Download, Send, Archive, UserPlus, Lock, RotateCcw, Activity,
  Palette, Monitor, AlertOctagon, Smartphone, Tablet, Monitor as DesktopIcon, ArrowUp, ArrowDown, Upload, Film, File, MoreVertical, Grid, Folder, MousePointerClick
} from 'lucide-react';
import { useData, Project, Article, Message, User, PageSection, MediaItem } from './DataContext';

interface AdminPanelProps {
  onExit: () => void;
}

type Tab = 'dashboard' | 'pages' | 'services' | 'solutions' | 'blog' | 'portfolio' | 'messages' | 'users' | 'media' | 'settings';

// --- Standard Button Classes ---
const BTN_PRIMARY = "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 active:scale-95 transition-all rounded-xl px-4 py-2 font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
const BTN_SECONDARY = "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-primary hover:text-primary dark:hover:text-primary active:scale-95 transition-all rounded-xl px-4 py-2 font-bold flex items-center gap-2";
const BTN_DANGER = "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-95 transition-all rounded-xl px-4 py-2 font-bold flex items-center gap-2";
const BTN_ICON = "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors";

// --- Reusable Data Table ---
interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T | 'actions'; label: string; render?: (item: T) => React.ReactNode }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  title: string;
  searchKeys: (keyof T)[];
}

function DataTable<T extends { id: string | number }>({ data, columns, onEdit, onDelete, title, searchKeys }: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredData = data.filter(item => 
    searchKeys.some(key => String(item[key]).toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
          <List className="w-5 h-5 text-primary" />
          {title} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({filteredData.length})</span>
        </h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="جستجو..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50 dark:bg-gray-900/50 sticky top-0 z-10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 text-sm font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4 text-sm text-gray-700 dark:text-gray-300 align-middle">
                    {col.key === 'actions' ? (
                      <div className="flex items-center gap-2">
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-1.5 rounded-lg transition-colors" title="ویرایش">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition-colors" title="حذف">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : col.render ? col.render(item) : String(item[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-gray-500 dark:text-gray-400">
                  داده‌ای یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30">
             <ChevronRight className="w-4 h-4" />
          </button>
          <span className="flex items-center px-4 text-sm font-bold text-gray-600 dark:text-gray-300">صفحه {page} از {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30">
             <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// --- Rich Text Editor ---
const RichTextEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-2 flex flex-wrap gap-1">
        <button onClick={() => execCmd('bold')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"><Bold className="w-4 h-4" /></button>
        <button onClick={() => execCmd('italic')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"><Italic className="w-4 h-4" /></button>
        <button onClick={() => execCmd('underline')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"><Underline className="w-4 h-4" /></button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-500 mx-1 self-center"></div>
        <button onClick={() => execCmd('justifyLeft')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"><AlignLeft className="w-4 h-4" /></button>
        <button onClick={() => execCmd('justifyCenter')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"><AlignCenter className="w-4 h-4" /></button>
        <button onClick={() => execCmd('justifyRight')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"><AlignRight className="w-4 h-4" /></button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onInput={() => editorRef.current && onChange(editorRef.current.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-4 min-h-[200px] outline-none prose dark:prose-invert max-w-none text-right dir-rtl"
      ></div>
    </div>
  );
};

// --- Media Manager ---
const MediaManager = () => {
  const { data, updateMedia, notify } = useData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.src = result;
          img.onload = () => {
             const canvas = document.createElement('canvas');
             const ctx = canvas.getContext('2d');
             const maxWidth = 1000;
             const scale = maxWidth / img.width;
             canvas.width = scale < 1 ? maxWidth : img.width;
             canvas.height = scale < 1 ? img.height * scale : img.height;
             ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
             
             const newItem: MediaItem = {
               id: Date.now().toString() + Math.random(),
               name: file.name,
               url: canvas.toDataURL(file.type, 0.8),
               type: 'image',
               size: Math.round(file.size * 0.8),
               dimensions: `${canvas.width}x${canvas.height}`,
               date: new Date().toLocaleDateString('fa-IR'),
               category: 'uncategorized'
             };
             updateMedia([newItem, ...data.media]);
             notify('success', 'فایل با موفقیت آپلود شد');
          };
        }
      };
      reader.readAsDataURL(file);
    });
    setTimeout(() => setIsUploading(false), 1000);
  };

  const deleteItem = (id: string) => {
    if (confirm('آیا از حذف این فایل اطمینان دارید؟')) {
      updateMedia(data.media.filter(item => item.id !== id));
      setSelectedItem(null);
      notify('success', 'فایل حذف شد');
    }
  };

  const filteredMedia = data.media.filter(item => filter === 'all' || item.type === filter);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] gap-6">
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2">
            {['all', 'image', 'video'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)} 
                className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                  filter === f ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'همه' : f === 'image' ? 'تصاویر' : 'ویدیو'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
             <label className={BTN_PRIMARY}>
                <Upload className="w-4 h-4" />
                آپلود فایل
                <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
             </label>
             <div className="border-r border-gray-200 dark:border-gray-600 mx-2 h-8 hidden md:block"></div>
             <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} text-gray-600 dark:text-gray-300`}><Grid className="w-4 h-4" /></button>
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} text-gray-600 dark:text-gray-300`}><ListIcon className="w-4 h-4" /></button>
          </div>
        </div>
        
        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50">
          {isUploading && <div className="mb-4 bg-blue-50 text-primary p-3 rounded-lg flex items-center gap-2 animate-pulse"><RefreshCcw className="w-4 h-4 animate-spin" /> در حال پردازش و آپلود...</div>}
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMedia.map(item => (
                <div key={item.id} onClick={() => setSelectedItem(item)} className={`relative group aspect-square bg-white dark:bg-gray-800 rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${selectedItem?.id === item.id ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                   {item.type === 'image' ? (
                     <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400"><File className="w-12 h-12" /></div>
                   )}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              {filteredMedia.map(item => (
                <div key={item.id} onClick={() => setSelectedItem(item)} className={`flex items-center gap-4 p-3 border-b dark:border-gray-700 last:border-0 cursor-pointer transition-colors ${selectedItem?.id === item.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0">
                    {item.type === 'image' ? <img src={item.url} className="w-full h-full object-cover" /> : <File className="w-6 h-6 m-3 text-gray-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-gray-800 dark:text-gray-200">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.dimensions} • {Math.round(item.size / 1024)} KB</p>
                  </div>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Sidebar */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl overflow-y-auto shadow-xl"
          >
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-800 dark:text-white">جزئیات فایل</h3>
               <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
             </div>
             
             <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-6 border border-gray-200 dark:border-gray-600">
                {selectedItem.type === 'image' ? <img src={selectedItem.url} className="w-full h-full object-contain" /> : <div className="flex items-center justify-center h-full"><File className="w-16 h-16 text-gray-300" /></div>}
             </div>
             
             <div className="space-y-4">
               <div>
                 <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">نام فایل</label>
                 <input type="text" value={selectedItem.name} readOnly className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-200" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">حجم</label>
                   <p className="text-sm font-bold dir-ltr text-gray-800 dark:text-gray-200">{Math.round(selectedItem.size / 1024)} KB</p>
                 </div>
                 <div>
                   <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">ابعاد</label>
                   <p className="text-sm font-bold dir-ltr text-gray-800 dark:text-gray-200">{selectedItem.dimensions || '-'}</p>
                 </div>
               </div>
               <div>
                 <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">لینک مستقیم</label>
                 <div className="flex">
                   <input type="text" value={selectedItem.url} readOnly className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-r p-2 text-xs text-gray-500 dir-ltr truncate" />
                   <button onClick={() => navigator.clipboard.writeText(selectedItem.url)} className="bg-gray-200 dark:bg-gray-600 px-3 rounded-l hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"><Check className="w-4 h-4" /></button>
                 </div>
               </div>
               
               <button onClick={() => deleteItem(selectedItem.id)} className="w-full mt-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2">
                 <Trash2 className="w-4 h-4" />
                 حذف فایل
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Settings Manager ---
const SettingsManager = () => {
  const { data, updateSettings } = useData();
  const [activeTab, setActiveTab] = useState<'general' | 'menu' | 'theme' | 'system'>('general');
  const settings = data.settings;

  const handleChange = (section: keyof typeof settings, key: string, value: any) => {
    updateSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof typeof settings],
        [key]: value
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'عمومی' },
    { id: 'theme', label: 'ظاهر' },
    { id: 'menu', label: 'فهرست‌ها' },
    { id: 'system', label: 'سیستم' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex gap-2 mb-8 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 w-fit">
         {tabs.map(tab => (
           <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
           >
             {tab.label}
           </button>
         ))}
       </div>

       <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          {activeTab === 'general' && (
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300">عنوان سایت</label>
                   <input type="text" value={settings.general.title} onChange={(e) => handleChange('general', 'title', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300">توضیح کوتاه (Tagline)</label>
                   <input type="text" value={settings.general.tagline} onChange={(e) => handleChange('general', 'tagline', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white" />
                 </div>
               </div>
               
               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">اطلاعات تماس</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="تلفن" value={settings.contact.phone} onChange={(e) => handleChange('contact', 'phone', e.target.value)} className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white" />
                    <input type="text" placeholder="ایمیل" value={settings.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dir-ltr dark:text-white" />
                    <input type="text" placeholder="آدرس" value={settings.contact.address} onChange={(e) => handleChange('contact', 'address', e.target.value)} className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white" />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {['primaryColor', 'secondaryColor', 'textColor', 'accentColor'].map((colorKey) => (
                   <div key={colorKey} className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block capitalize">{colorKey.replace('Color', '')}</label>
                     <div className="flex gap-2">
                       <input type="color" value={(settings.theme as any)[colorKey]} onChange={(e) => handleChange('theme', colorKey, e.target.value)} className="h-10 w-10 rounded-lg cursor-pointer border border-gray-200" />
                       <input type="text" value={(settings.theme as any)[colorKey]} onChange={(e) => handleChange('theme', colorKey, e.target.value)} className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dir-ltr dark:text-white" />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div>
              <div className="flex justify-between mb-4 items-center">
                 <h3 className="font-bold text-gray-800 dark:text-white">مدیریت منوی هدر</h3>
                 <button className={BTN_PRIMARY} onClick={() => {
                    const newLink = { id: Date.now().toString(), name: 'لینک جدید', page: 'home' };
                    updateSettings({ ...settings, headerLinks: [...settings.headerLinks, newLink] });
                 }}>
                   <Plus className="w-4 h-4" /> افزودن
                 </button>
              </div>
              <Reorder.Group axis="y" values={settings.headerLinks} onReorder={(newOrder) => updateSettings({ ...settings, headerLinks: newOrder })} className="space-y-2">
                 {settings.headerLinks.map((link) => (
                   <Reorder.Item key={link.id} value={link} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-200 dark:border-gray-600">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                      <input 
                        value={link.name} 
                        onChange={(e) => {
                          const updated = settings.headerLinks.map(l => l.id === link.id ? { ...l, name: e.target.value } : l);
                          updateSettings({ ...settings, headerLinks: updated });
                        }}
                        className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-sm font-medium dark:text-white"
                      />
                      <select 
                        value={link.page}
                        onChange={(e) => {
                          const updated = settings.headerLinks.map(l => l.id === link.id ? { ...l, page: e.target.value } : l);
                          updateSettings({ ...settings, headerLinks: updated });
                        }}
                        className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-sm dark:text-white"
                      >
                        <option value="home">خانه</option>
                        <option value="about">درباره ما</option>
                        <option value="services">خدمات</option>
                        <option value="solutions">راهکارها</option>
                        <option value="portfolio">نمونه کار</option>
                        <option value="blog">وبلاگ</option>
                        <option value="contact">تماس</option>
                      </select>
                      <button 
                        onClick={() => updateSettings({ ...settings, headerLinks: settings.headerLinks.filter(l => l.id !== link.id) })}
                        className="mr-auto text-red-400 hover:text-red-600 bg-red-50 dark:bg-transparent p-2 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </Reorder.Item>
                 ))}
              </Reorder.Group>
            </div>
          )}
          
          {activeTab === 'system' && (
             <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">حالت تعمیر و نگهداری</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">با فعال‌سازی این گزینه، سایت برای کاربران عادی غیرقابل دسترس می‌شود.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.system.maintenanceMode} onChange={(e) => handleChange('system', 'maintenanceMode', e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
             </div>
          )}
       </div>
    </div>
  );
};

// --- Pages Manager (Modular Builder) ---
const PagesManager = () => {
  const { data, updatePageLayout, updateHome } = useData();
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const layout = data.pageLayouts[selectedPage] || [];

  const handleReorder = (newOrder: PageSection[]) => {
    updatePageLayout(selectedPage, newOrder);
  };

  const toggleVisibility = (id: string) => {
    const updated = layout.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s);
    updatePageLayout(selectedPage, updated);
  };

  const deleteSection = (id: string) => {
    if (confirm('حذف شود؟')) {
      updatePageLayout(selectedPage, layout.filter(s => s.id !== id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] gap-6">
      {/* Left: Builder Sidebar */}
      <div className="w-full md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col overflow-hidden">
         <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <select 
              value={selectedPage} 
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-white outline-none focus:border-primary"
            >
              <option value="home">صفحه اصلی</option>
              <option value="about">درباره ما</option>
              <option value="services">خدمات</option>
              <option value="solutions">راهکارها</option>
              <option value="portfolio">نمونه کارها</option>
              <option value="blog">وبلاگ</option>
              <option value="contact">تماس با ما</option>
            </select>
         </div>

         <div className="flex-1 overflow-y-auto p-4">
            <Reorder.Group axis="y" values={layout} onReorder={handleReorder} className="space-y-3">
              {layout.map(section => (
                <Reorder.Item key={section.id} value={section} className={`bg-white dark:bg-gray-700 border rounded-xl p-3 shadow-sm transition-all ${editingSection?.id === section.id ? 'border-primary ring-1 ring-primary' : 'border-gray-200 dark:border-gray-600'}`}>
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <span className="font-bold text-sm dark:text-gray-200">{section.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleVisibility(section.id)} className={`p-1.5 rounded-lg ${section.isVisible ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-gray-300 bg-gray-100 dark:bg-gray-600'}`}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteSection(section.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <button 
                      onClick={() => setEditingSection(section)}
                      className="w-full bg-gray-50 dark:bg-gray-600 text-xs py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500 font-bold transition-colors"
                     >
                       تنظیمات
                     </button>
                   </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            
            <button 
              onClick={() => {
                const newSec: PageSection = { 
                   id: Date.now().toString(), 
                   component: 'ContentBlock', 
                   title: 'بلاک متن جدید', 
                   isVisible: true, 
                   props: { content: '<h2>عنوان جدید</h2><p>متن خود را اینجا بنویسید...</p>' },
                   wrapper: { container: 'boxed', padding: 'md', animation: 'fade' }
                };
                updatePageLayout(selectedPage, [...layout, newSec]);
              }}
              className="w-full mt-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-3 text-gray-500 dark:text-gray-400 font-bold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> افزودن سکشن
            </button>
         </div>
      </div>

      {/* Middle: Editor Panel (Contextual) */}
      {editingSection && (
        <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col p-4 overflow-y-auto shadow-lg">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-800 dark:text-white">ویرایش: {editingSection.title}</h3>
             <button onClick={() => setEditingSection(null)}><X className="w-5 h-5 text-gray-400 hover:text-red-500" /></button>
           </div>

           {/* Wrapper Settings */}
           <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase">تنظیمات ظاهری</h4>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">عرض محتوا</label>
                <select 
                  value={editingSection.wrapper.container}
                  onChange={(e) => {
                    const updated = layout.map(s => s.id === editingSection.id ? { ...s, wrapper: { ...s.wrapper, container: e.target.value as any } } : s);
                    updatePageLayout(selectedPage, updated);
                    setEditingSection({ ...editingSection, wrapper: { ...editingSection.wrapper, container: e.target.value as any } });
                  }}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                >
                  <option value="boxed">مرکزی (Boxed)</option>
                  <option value="full">تمام عرض (Full Width)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">انیمیشن ورود</label>
                <select 
                  value={editingSection.wrapper.animation}
                  onChange={(e) => {
                    const updated = layout.map(s => s.id === editingSection.id ? { ...s, wrapper: { ...s.wrapper, animation: e.target.value as any } } : s);
                    updatePageLayout(selectedPage, updated);
                    setEditingSection({ ...editingSection, wrapper: { ...editingSection.wrapper, animation: e.target.value as any } });
                  }}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                >
                  <option value="none">بدون انیمیشن</option>
                  <option value="fade">Fade In</option>
                  <option value="slide">Slide Up</option>
                  <option value="zoom">Zoom In</option>
                </select>
              </div>
           </div>

           {/* Content Editor */}
           {editingSection.component === 'ContentBlock' && (
             <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase">محتوای متنی</h4>
                <RichTextEditor 
                  value={editingSection.props?.content || ''} 
                  onChange={(val) => {
                    const updated = layout.map(s => s.id === editingSection.id ? { ...s, props: { ...s.props, content: val } } : s);
                    updatePageLayout(selectedPage, updated);
                  }}
                />
             </div>
           )}
           
           {editingSection.component === 'Hero' && selectedPage === 'home' && (
             <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase">محتوای هیرو</h4>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400">عنوان اصلی</label>
                  <textarea 
                    value={data.home.hero.h1}
                    onChange={(e) => updateHome({ ...data.home, hero: { ...data.home.hero, h1: e.target.value } })}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                    rows={3}
                  />
                </div>
             </div>
           )}
        </div>
      )}

      {/* Right: Live Preview Area */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col overflow-hidden">
         <div className="p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-center gap-4">
            <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-lg ${previewMode === 'desktop' ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400'}`}><DesktopIcon className="w-5 h-5" /></button>
            <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-lg ${previewMode === 'tablet' ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400'}`}><Tablet className="w-5 h-5" /></button>
            <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400'}`}><Smartphone className="w-5 h-5" /></button>
         </div>
         <div className="flex-1 p-8 flex justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div className={`bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 overflow-y-auto border border-gray-300 dark:border-gray-700 ${
              previewMode === 'desktop' ? 'w-full h-full rounded-none' : 
              previewMode === 'tablet' ? 'w-[768px] h-[90%] rounded-2xl my-auto' : 
              'w-[375px] h-[90%] rounded-3xl my-auto'
            }`}>
               <div className="w-full h-full pointer-events-none select-none scale-[0.8] origin-top p-4">
                  <div className="space-y-4">
                    {layout.filter(s => s.isVisible).map(s => (
                      <div key={s.id} className={`border-2 border-dashed border-transparent hover:border-primary rounded p-2 relative group`}>
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center">
                           <h3 className="text-gray-800 dark:text-white font-bold">{s.title}</h3>
                           <p className="text-gray-400 text-sm">Component Preview Placeholder</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Generic Resource Manager (Blog, Portfolio, Users, Messages) ---
const ResourceManager = ({ type }: { type: 'blog' | 'projects' | 'messages' | 'users' }) => {
  const { data, updateBlog, updateProjects, updateMessages, updateUsers, notify } = useData();

  // Define columns and actions based on type
  let tableData: any[] = [];
  let columns: any[] = [];
  let onDelete: ((item: any) => void) | undefined;
  let onEdit: ((item: any) => void) | undefined;
  let searchKeys: string[] = [];
  let title = "";

  if (type === 'blog') {
    title = "مدیریت وبلاگ";
    tableData = data.blog;
    searchKeys = ['title', 'author', 'category'];
    columns = [
      { key: 'title', label: 'عنوان مقاله' },
      { key: 'author', label: 'نویسنده' },
      { key: 'category', label: 'دسته‌بندی', render: (i: Article) => <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{i.category}</span> },
      { key: 'status', label: 'وضعیت', render: (i: Article) => <span className={`px-2 py-1 rounded-full text-xs ${i.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{i.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}</span> },
      { key: 'actions', label: 'عملیات' }
    ];
    onDelete = (item: Article) => {
      if(confirm('حذف شود؟')) {
        updateBlog(data.blog.filter(b => b.id !== item.id));
        notify('success', 'مقاله حذف شد');
      }
    };
  } else if (type === 'projects') {
    title = "مدیریت پروژه‌ها";
    tableData = data.projects;
    searchKeys = ['title', 'client', 'industry'];
    columns = [
      { key: 'title', label: 'نام پروژه' },
      { key: 'client', label: 'کارفرما' },
      { key: 'category', label: 'نوع', render: (i: Project) => <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">{i.category}</span> },
      { key: 'featured', label: 'ویژه', render: (i: Project) => i.featured ? <CheckCircle className="w-4 h-4 text-green-500" /> : null },
      { key: 'actions', label: 'عملیات' }
    ];
    onDelete = (item: Project) => {
      if(confirm('حذف شود؟')) {
        updateProjects(data.projects.filter(p => p.id !== item.id));
        notify('success', 'پروژه حذف شد');
      }
    };
  } else if (type === 'messages') {
    title = "پیام‌های دریافتی";
    tableData = data.messages;
    searchKeys = ['name', 'email', 'message'];
    columns = [
      { key: 'name', label: 'فرستنده' },
      { key: 'email', label: 'ایمیل' },
      { key: 'service', label: 'موضوع', render: (i: Message) => <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg text-xs">{i.service}</span> },
      { key: 'date', label: 'تاریخ' },
      { key: 'status', label: 'وضعیت', render: (i: Message) => <span className={`px-2 py-1 rounded-full text-xs ${i.status === 'new' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-600'}`}>{i.status === 'new' ? 'جدید' : 'خوانده شده'}</span> },
      { key: 'actions', label: 'عملیات' }
    ];
    onDelete = (item: Message) => {
      if(confirm('حذف شود؟')) updateMessages(data.messages.filter(m => m.id !== item.id));
    };
    onEdit = (item: Message) => {
      // Mark as read
      const updated = data.messages.map(m => m.id === item.id ? { ...m, status: 'read' as const } : m);
      updateMessages(updated);
      notify('info', 'پیام به عنوان خوانده شده علامت‌گذاری شد');
    }
  } else if (type === 'users') {
    title = "مدیریت کاربران";
    tableData = data.users;
    searchKeys = ['name', 'email', 'role'];
    columns = [
      { key: 'name', label: 'نام کاربر' },
      { key: 'email', label: 'ایمیل' },
      { key: 'role', label: 'نقش', render: (i: User) => <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">{i.role}</span> },
      { key: 'status', label: 'وضعیت', render: (i: User) => i.status === 'active' ? <span className="text-green-500 text-xs font-bold">فعال</span> : <span className="text-red-500 text-xs font-bold">غیرفعال</span> },
      { key: 'actions', label: 'عملیات' }
    ];
    onDelete = (item: User) => {
      if(confirm('کاربر حذف شود؟')) updateUsers(data.users.filter(u => u.id !== item.id));
    }
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {type !== 'messages' && (
        <div className="flex justify-end">
           <button className={BTN_PRIMARY} onClick={() => notify('info', 'قابلیت افزودن در نسخه دمو غیرفعال است')}>
             <Plus className="w-4 h-4" /> افزودن جدید
           </button>
        </div>
      )}
      <DataTable 
        title={title}
        data={tableData}
        columns={columns}
        searchKeys={searchKeys as any}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

// --- Main Admin Panel Layout ---
const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { data } = useData();

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'pages', label: 'مدیریت صفحات', icon: Layers },
    { id: 'media', label: 'مدیریت فایل‌ها', icon: Folder },
    { id: 'blog', label: 'وبلاگ', icon: FileText },
    { id: 'projects', label: 'پروژه‌ها', icon: Briefcase },
    { id: 'messages', label: 'پیام‌ها', icon: Mail },
    { id: 'users', label: 'کاربران', icon: Users },
    { id: 'settings', label: 'تنظیمات سایت', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-text dark:text-white transition-colors duration-300" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-[#14202b] text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">M</div>
          <span className="font-bold text-lg">پنل مدیریت</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>خروج از سیستم</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 shadow-sm z-10">
           <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
             {menuItems.find(i => i.id === activeTab)?.icon && React.createElement(menuItems.find(i => i.id === activeTab)!.icon, { className: "w-6 h-6 text-primary" })}
             {menuItems.find(i => i.id === activeTab)?.label}
           </h2>
           <div className="flex items-center gap-4">
             <div className="text-left hidden sm:block">
               <p className="text-sm font-bold text-gray-800 dark:text-white">ادمین سیستم</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">مدیر کل</p>
             </div>
             <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm">
               <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" />
             </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'media' && <MediaManager />}
              {activeTab === 'settings' && <SettingsManager />}
              {activeTab === 'pages' && <PagesManager />}
              {activeTab === 'blog' && <ResourceManager type="blog" />}
              {activeTab === 'projects' && <ResourceManager type="projects" />} // mapped portfolio -> projects
              {activeTab === 'portfolio' && <ResourceManager type="projects" />} 
              {activeTab === 'messages' && <ResourceManager type="messages" />}
              {activeTab === 'users' && <ResourceManager type="users" />}
              
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-gray-500 dark:text-gray-400">بازدید امروز</h3>
                       <TrendingUp className="text-green-500 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg w-9 h-9" />
                     </div>
                     <p className="text-3xl font-bold text-gray-800 dark:text-white">1,254</p>
                   </div>
                   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-gray-500 dark:text-gray-400">پیام‌های جدید</h3>
                       <Mail className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg w-9 h-9" />
                     </div>
                     <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.messages.filter(m => m.status === 'new').length}</p>
                   </div>
                   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-gray-500 dark:text-gray-400">پروژه‌های فعال</h3>
                       <Briefcase className="text-purple-500 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg w-9 h-9" />
                     </div>
                     <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.projects.length}</p>
                   </div>
                   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-gray-500 dark:text-gray-400">مقالات منتشر شده</h3>
                       <FileText className="text-orange-500 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg w-9 h-9" />
                     </div>
                     <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.blog.filter(b => b.status === 'published').length}</p>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
