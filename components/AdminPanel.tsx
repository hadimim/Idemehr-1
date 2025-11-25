
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Briefcase, MessageSquare, Users, Settings, LogOut, 
  Eye, TrendingUp, Plus, Edit3, Trash2, Save, 
  Check, ChevronRight, List, 
  Type, Image as ImageIcon, Globe, Tag,
  Move, GripVertical, Moon, Sun, Menu,
  Target, Mail, Phone, CheckCircle, AlertTriangle, AlertCircle, X, Layers, Package,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Video, ListOrdered, List as ListIcon,
  MessageCircle, ShieldAlert, RefreshCcw, Search, ChevronLeft, Download, Send, Archive, UserPlus, Lock, RotateCcw, Activity,
  Palette, Monitor, AlertOctagon, Smartphone, Tablet, Monitor as DesktopIcon, ArrowUp, ArrowDown, Upload, Film, File, MoreVertical, Grid, Folder, MousePointerClick, Image,
  ChevronDown, MapPin, Share2, Maximize, Scissors, Link, Lock as LockIcon, Unlock, Bell
} from 'lucide-react';
import { useData, Project, Article, Message, User, PageSection, MediaItem, DynamicIcon, Service, ProcessStep, TeamMember, HistoryEvent, ValueItem } from './DataContext';

interface AdminPanelProps {
  onExit: () => void;
}

type Tab = 'dashboard' | 'pages' | 'services' | 'solutions' | 'blog' | 'portfolio' | 'messages' | 'users' | 'media' | 'settings';

// --- Standard Button Classes ---
const BTN_PRIMARY = "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 active:scale-95 transition-all rounded-xl px-4 py-2 font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
const BTN_SECONDARY = "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-primary hover:text-primary dark:hover:text-primary active:scale-95 transition-all rounded-xl px-4 py-2 font-bold flex items-center gap-2";
const BTN_DANGER = "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-95 transition-all rounded-xl px-4 py-2 font-bold flex items-center gap-2";
const BTN_ICON = "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors";

// --- Constants ---
const COMMON_ICONS = [
  "Globe", "Smartphone", "Server", "BarChart3", "Briefcase", "Code", "PenTool", "Search", "Rocket", "Award", "Users", "Target", "Zap", "Shield", "CheckCircle", "Code2", "LineChart", "PieChart", "Settings", "Cpu", "Database", "Cloud", "Lock"
];

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

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
          <h3 className="font-bold text-lg dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// --- Icon Picker ---
const IconPicker = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">آیکون</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          <DynamicIcon name={value} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-sm dark:text-white">{value}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-3 max-h-48 overflow-y-auto grid grid-cols-4 gap-2">
           {COMMON_ICONS.map(iconName => (
             <div 
               key={iconName}
               onClick={() => { onChange(iconName); setIsOpen(false); }}
               className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${value === iconName ? 'bg-blue-100 dark:bg-gray-600 text-primary' : 'text-gray-500 dark:text-gray-400'}`}
             >
                <DynamicIcon name={iconName} className="w-6 h-6 mb-1" />
                <span className="text-[10px] text-center truncate w-full">{iconName}</span>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

// --- Image Picker ---
const ImagePicker = ({ value, onChange, media }: { value: string, onChange: (val: string) => void, media: MediaItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-xs text-gray-500 dark:text-gray-400 block">انتخاب تصویر</label>
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden flex-shrink-0 relative group cursor-pointer" onClick={() => setIsOpen(true)}>
          {value ? <img src={value} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-6 h-6" /></div>}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">تغییر</div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={value} 
              onChange={(e) => onChange(e.target.value)} 
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white dir-ltr text-left"
              placeholder="https://..."
            />
            <button onClick={() => setIsOpen(!isOpen)} className="px-3 bg-primary text-white rounded-lg text-sm hover:bg-primary-hover whitespace-nowrap">
              گالری
            </button>
          </div>
          <p className="text-xs text-gray-400">لینک مستقیم تصویر را وارد کنید یا از گالری انتخاب نمایید.</p>
        </div>
      </div>
      
      {isOpen && (
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl relative z-20">
           <div className="flex justify-between items-center mb-2">
             <h4 className="text-xs font-bold text-gray-600 dark:text-gray-300">گالری فایل‌ها</h4>
             <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
           </div>
           <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
             {media.filter(m => m.type === 'image').map(item => (
               <div 
                key={item.id} 
                onClick={() => { onChange(item.url); setIsOpen(false); }}
                className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 cursor-pointer hover:border-primary hover:ring-2 ring-primary/20 transition-all relative group"
               >
                 <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

// --- Project Form ---
const ProjectForm = ({ project, onSave, media }: { project: Project, onSave: (p: Project) => void, media: MediaItem[] }) => {
  const [formData, setFormData] = useState<Project>(project);

  const handleChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">عنوان پروژه</label>
          <input 
            value={formData.title} 
            onChange={e => handleChange('title', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">نام مشتری</label>
          <input 
            value={formData.client} 
            onChange={e => handleChange('client', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">دسته‌بندی</label>
          <select 
            value={formData.category} 
            onChange={e => handleChange('category', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="Web">طراحی وب</option>
            <option value="App">اپلیکیشن موبایل</option>
            <option value="Enterprise">سازمانی</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">صنعت</label>
          <input 
            value={formData.industry} 
            onChange={e => handleChange('industry', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <ImagePicker value={formData.image} onChange={val => handleChange('image', val)} media={media} />

      <div>
        <label className="block text-sm font-bold mb-1 dark:text-gray-300">توضیح کوتاه (Excerpt)</label>
        <textarea 
          rows={3}
          value={formData.excerpt} 
          onChange={e => handleChange('excerpt', e.target.value)} 
          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 border-t pt-4 dark:border-gray-700">
         <h4 className="font-bold text-primary">جزئیات مطالعه موردی (Case Study)</h4>
         <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">چالش و مسئله (Problem)</label>
            <textarea rows={3} value={formData.problem} onChange={e => handleChange('problem', e.target.value)} className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
         </div>
         <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">راهکار ما (Solution)</label>
            <textarea rows={3} value={formData.solution} onChange={e => handleChange('solution', e.target.value)} className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
         </div>
         <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">نتیجه (Result)</label>
            <textarea rows={3} value={formData.result} onChange={e => handleChange('result', e.target.value)} className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
         </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <input 
          type="checkbox" 
          id="featured"
          checked={formData.featured}
          onChange={e => handleChange('featured', e.target.checked)}
          className="w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="featured" className="text-sm font-bold dark:text-gray-300">نمایش در صفحه اصلی (پروژه منتخب)</label>
      </div>

      <div className="flex justify-end pt-4 border-t dark:border-gray-700">
        <button onClick={() => onSave(formData)} className={BTN_PRIMARY}>
          <Save className="w-4 h-4" /> ذخیره پروژه
        </button>
      </div>
    </div>
  );
};

// --- Article Form ---
const ArticleForm = ({ article, onSave, media, categories }: { article: Article, onSave: (a: Article) => void, media: MediaItem[], categories: string[] }) => {
  const [formData, setFormData] = useState<Article>(article);

  const handleChange = (field: keyof Article, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">عنوان مقاله</label>
          <input 
            value={formData.title} 
            onChange={e => handleChange('title', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">دسته‌بندی</label>
          <select 
            value={formData.category} 
            onChange={e => handleChange('category', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">وضعیت انتشار</label>
          <select 
            value={formData.status} 
            onChange={e => handleChange('status', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">آرشیو</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 dark:text-gray-300">نویسنده</label>
          <input 
            value={formData.author} 
            onChange={e => handleChange('author', e.target.value)} 
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
           <label className="block text-sm font-bold mb-1 dark:text-gray-300">زمان مطالعه</label>
           <input 
             value={formData.readTime} 
             onChange={e => handleChange('readTime', e.target.value)} 
             className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
           />
        </div>
      </div>

      <ImagePicker value={formData.image} onChange={val => handleChange('image', val)} media={media} />

      <div>
        <label className="block text-sm font-bold mb-1 dark:text-gray-300">خلاصه (Excerpt)</label>
        <textarea 
          rows={3}
          value={formData.excerpt} 
          onChange={e => handleChange('excerpt', e.target.value)} 
          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 dark:text-gray-300">محتوای اصلی (HTML)</label>
        <textarea 
          rows={10}
          value={formData.content} 
          onChange={e => handleChange('content', e.target.value)} 
          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-mono text-sm dir-ltr"
          placeholder="<p>محتوای مقاله...</p>"
        />
      </div>

      <div className="flex justify-end pt-4 border-t dark:border-gray-700">
        <button onClick={() => onSave(formData)} className={BTN_PRIMARY}>
          <Save className="w-4 h-4" /> ذخیره مقاله
        </button>
      </div>
    </div>
  );
};


// --- Generic List Editor ---
interface ListEditorProps<T> {
  items: T[];
  onUpdate: (newItems: T[]) => void;
  renderItem: (item: T, index: number, update: (newItem: T) => void, remove: () => void) => React.ReactNode;
  getNewItem: () => T;
  label: string;
}

function ListEditor<T extends { id: string | number }>({ items, onUpdate, renderItem, getNewItem, label }: ListEditorProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <h4 className="text-xs font-bold text-gray-400 uppercase">{label}</h4>
         <button 
           onClick={() => onUpdate([...items, getNewItem()])}
           className="text-primary text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-colors flex items-center gap-1"
         >
           <Plus className="w-3 h-3" /> افزودن مورد
         </button>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              {renderItem(
                item, 
                index, 
                (newItem) => {
                  const updated = [...items];
                  updated[index] = newItem;
                  onUpdate(updated);
                },
                () => {
                  const updated = items.filter((_, i) => i !== index);
                  onUpdate(updated);
                }
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Pages Manager (Modular Builder) ---
const PagesManager = () => {
  const { 
    data, updatePageLayout, updateHome, updateAbout, updateTestimonials,
    updatePageHeaders, updateSettings
  } = useData();
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  
  const layout = data.pageLayouts[selectedPage] || [];

  const handleReorder = (newOrder: PageSection[]) => {
    updatePageLayout(selectedPage, newOrder);
  };

  const toggleVisibility = (id: string) => {
    const updated = layout.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s);
    updatePageLayout(selectedPage, updated);
  };

  const updateSectionProps = (key: string, value: any) => {
    if (!editingSection) return;
    const updatedLayout = layout.map(s => s.id === editingSection.id ? { ...s, props: { ...s.props, [key]: value } } : s);
    updatePageLayout(selectedPage, updatedLayout);
    setEditingSection({ ...editingSection, props: { ...editingSection.props, [key]: value } });
  };

  // Render specific editors based on section type
  const renderEditor = () => {
    if (!editingSection) return null;

    // --- HOME EDITORS ---
    if (editingSection.component === 'Hero') {
      const { hero } = data.home;
      return (
        <div className="space-y-4">
          <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش هیرو (بنر اصلی)</h4>
          <div className="space-y-3">
             <label className="block text-sm dark:text-gray-300">عنوان اصلی (H1)</label>
             <input value={hero.h1} onChange={e => updateHome({ ...data.home, hero: { ...hero, h1: e.target.value } })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
             
             <label className="block text-sm dark:text-gray-300">عنوان فرعی (H2)</label>
             <input value={hero.h2} onChange={e => updateHome({ ...data.home, hero: { ...hero, h2: e.target.value } })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
             
             <label className="block text-sm dark:text-gray-300">توضیحات</label>
             <textarea value={hero.desc} onChange={e => updateHome({ ...data.home, hero: { ...hero, desc: e.target.value } })} className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
             
             <ImagePicker value={hero.image} onChange={val => updateHome({ ...data.home, hero: { ...hero, image: val } })} media={data.media} />
          </div>
        </div>
      );
    }
    
    if (editingSection.component === 'Services') {
       const props = editingSection.props || {};
       return (
         <div className="space-y-6">
            <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش لیست خدمات (صفحه اصلی)</h4>
            
            <div className="space-y-2 mb-4">
               <label className="block text-sm dark:text-gray-300">عنوان بخش (H2)</label>
               <input value={props.title || ''} onChange={e => updateSectionProps('title', e.target.value)} placeholder="خدمات ما" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
               <label className="block text-sm dark:text-gray-300">توضیح زیرین (H3)</label>
               <input value={props.subtitle || ''} onChange={e => updateSectionProps('subtitle', e.target.value)} placeholder="راهکارهای جامع دیجیتال" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <ListEditor 
               label="خدمات"
               items={data.home.services}
               onUpdate={(items) => updateHome({ ...data.home, services: items })}
               getNewItem={() => ({ id: Date.now().toString(), title: 'خدمت جدید', desc: '', icon: 'Globe', color: 'bg-blue-500' })}
               renderItem={(item, idx, update, remove) => (
                  <div className="p-4 flex gap-4 items-start">
                     <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                           <input value={item.title} onChange={e => update({ ...item, title: e.target.value })} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="عنوان" />
                           <IconPicker value={item.icon} onChange={val => update({ ...item, icon: val })} />
                        </div>
                        <textarea value={item.desc} onChange={e => update({ ...item, desc: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="توضیحات" />
                     </div>
                     <button onClick={remove} className="text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                  </div>
               )}
            />
         </div>
       );
    }

    if (editingSection.component === 'Process') {
      const props = editingSection.props || {};
      return (
        <div className="space-y-6">
           <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش مراحل کار</h4>
           <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان کوچک</label>
                 <input value={props.title || ''} onChange={e => updateSectionProps('title', e.target.value)} placeholder="مراحل کار" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان اصلی</label>
                  <input value={props.subtitle || ''} onChange={e => updateSectionProps('subtitle', e.target.value)} placeholder="مسیر موفقیت پروژه شما" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
               <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">توضیحات</label>
                 <textarea value={props.description || ''} onChange={e => updateSectionProps('description', e.target.value)} placeholder="توضیح کوتاه..." className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
           
           <ListEditor 
             label="مراحل"
             items={data.home.process}
             onUpdate={(items) => updateHome({ ...data.home, process: items })}
             getNewItem={() => ({ id: Date.now().toString(), title: 'مرحله جدید', desc: '', icon: 'Search', step: (data.home.process.length + 1).toString() })}
             renderItem={(item, idx, update, remove) => (
                <div className="p-4 flex gap-4">
                   <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                         <input value={item.step} onChange={e => update({ ...item, step: e.target.value })} className="w-12 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="#" />
                         <input value={item.title} onChange={e => update({ ...item, title: e.target.value })} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="عنوان" />
                         <IconPicker value={item.icon} onChange={val => update({ ...item, icon: val })} />
                      </div>
                      <input value={item.desc} onChange={e => update({ ...item, desc: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="توضیحات" />
                   </div>
                   <button onClick={remove} className="text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
             )}
           />
        </div>
      )
    }

    if (editingSection.component === 'Testimonials') {
      const props = editingSection.props || {};
      return (
        <div className="space-y-6">
           <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش نظرات مشتریان</h4>
           <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان کوچک</label>
                 <input value={props.title || ''} onChange={e => updateSectionProps('title', e.target.value)} placeholder="نظرات مشتریان ما" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان اصلی</label>
                  <input value={props.subtitle || ''} onChange={e => updateSectionProps('subtitle', e.target.value)} placeholder="آنچه دیگران می‌گویند" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
           
           <ListEditor 
             label="نظرات"
             items={data.testimonials}
             onUpdate={(items) => updateTestimonials(items)}
             getNewItem={() => ({ id: Date.now(), name: 'نام مشتری', role: 'سمت', text: 'نظر...', avatar: 'https://picsum.photos/100' })}
             renderItem={(item, idx, update, remove) => (
                <div className="p-4 flex gap-4">
                   <img src={item.avatar} className="w-12 h-12 rounded-full border" />
                   <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                         <input value={item.name} onChange={e => update({ ...item, name: e.target.value })} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="نام" />
                         <input value={item.role} onChange={e => update({ ...item, role: e.target.value })} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="سمت" />
                      </div>
                      <textarea value={item.text} onChange={e => update({ ...item, text: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="متن نظر" />
                   </div>
                   <button onClick={remove} className="text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
             )}
           />
        </div>
      )
    }

    if (editingSection.component === 'Portfolio') {
      const props = editingSection.props || {};
      return (
        <div className="space-y-6">
           <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش بخش نمونه کارها (صفحه اصلی)</h4>
           <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان کوچک</label>
                 <input value={props.title || ''} onChange={e => updateSectionProps('title', e.target.value)} placeholder="نمونه کارها" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان اصلی</label>
                  <input value={props.subtitle || ''} onChange={e => updateSectionProps('subtitle', e.target.value)} placeholder="پروژه‌های منتخب" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
           <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-200">
             برای مدیریت پروژه‌ها به تب "نمونه کارها" در پنل مدیریت مراجعه کنید. این بخش پروژه‌هایی را که تیک "منتخب" دارند نمایش می‌دهد.
           </div>
        </div>
      )
    }

    if (editingSection.component === 'Blog') {
      const props = editingSection.props || {};
      return (
        <div className="space-y-6">
           <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش بخش وبلاگ (صفحه اصلی)</h4>
           <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان کوچک</label>
                 <input value={props.title || ''} onChange={e => updateSectionProps('title', e.target.value)} placeholder="وبلاگ" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان اصلی</label>
                  <input value={props.subtitle || ''} onChange={e => updateSectionProps('subtitle', e.target.value)} placeholder="آخرین مقالات" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
           <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-200">
             برای مدیریت مقالات به تب "وبلاگ" در پنل مدیریت مراجعه کنید.
           </div>
        </div>
      )
    }

    if (editingSection.component === 'ContactForm') {
      const props = editingSection.props || {};
      return (
        <div className="space-y-6">
           <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش فرم تماس</h4>
           <div className="grid grid-cols-1 gap-4">
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان سایدبار</label>
                 <input value={props.sidebarTitle || ''} onChange={e => updateSectionProps('sidebarTitle', e.target.value)} placeholder="اطلاعات تماس" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">توضیحات سایدبار</label>
                 <textarea value={props.sidebarDesc || ''} onChange={e => updateSectionProps('sidebarDesc', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">عنوان فرم</label>
                 <input value={props.formTitle || ''} onChange={e => updateSectionProps('formTitle', e.target.value)} placeholder="درخواست دمو" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                 <label className="text-sm dark:text-gray-300 block mb-1">توضیحات فرم</label>
                 <textarea value={props.formDesc || ''} onChange={e => updateSectionProps('formDesc', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
           
           <div className="border-t pt-4 mt-4">
              <h5 className="font-bold text-sm mb-2 dark:text-white">اطلاعات تماس (سراسری)</h5>
              <div className="space-y-2">
                 <input value={data.settings.contact.phone} onChange={e => updateSettings({ ...data.settings, contact: { ...data.settings.contact, phone: e.target.value } })} placeholder="تلفن" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dir-ltr" />
                 <input value={data.settings.contact.email} onChange={e => updateSettings({ ...data.settings, contact: { ...data.settings.contact, email: e.target.value } })} placeholder="ایمیل" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dir-ltr" />
                 <input value={data.settings.contact.address} onChange={e => updateSettings({ ...data.settings, contact: { ...data.settings.contact, address: e.target.value } })} placeholder="آدرس" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
        </div>
      )
    }

    // --- ABOUT EDITORS ---
    if (editingSection.component === 'AboutHero') {
       const { hero } = data.about;
       return (
         <div className="space-y-4">
            <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش معرفی (درباره ما)</h4>
            <label className="block text-sm dark:text-gray-300">عنوان</label>
            <input value={hero.title} onChange={e => updateAbout({ ...data.about, hero: { ...hero, title: e.target.value } })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label className="block text-sm dark:text-gray-300">توضیحات</label>
            <textarea value={hero.subtitle} onChange={e => updateAbout({ ...data.about, hero: { ...hero, subtitle: e.target.value } })} className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <ImagePicker value={hero.image} onChange={val => updateAbout({ ...data.about, hero: { ...hero, image: val } })} media={data.media} />
         </div>
       );
    }

    if (editingSection.component === 'History') {
       return (
          <div className="space-y-4">
             <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش تاریخچه</h4>
             <ListEditor 
               label="رویدادها"
               items={data.about.history}
               onUpdate={(items) => updateAbout({ ...data.about, history: items })}
               getNewItem={() => ({ id: Date.now(), year: '1403', title: 'رویداد جدید', desc: '', icon: 'Flag' })}
               renderItem={(item, idx, update, remove) => (
                  <div className="p-4 flex gap-4">
                     <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                           <input value={item.year} onChange={e => update({ ...item, year: e.target.value })} className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="سال" />
                           <input value={item.title} onChange={e => update({ ...item, title: e.target.value })} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="عنوان" />
                        </div>
                        <input value={item.desc} onChange={e => update({ ...item, desc: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="توضیحات" />
                     </div>
                     <button onClick={remove} className="text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                  </div>
               )}
            />
          </div>
       );
    }

    // --- GENERIC HEADER EDITOR (For Services, Portfolio, etc.) ---
    if (['ServicesHero', 'SolutionsHero', 'PortfolioHero', 'BlogHero', 'ContactHero'].includes(editingSection.component)) {
       const pageKey = selectedPage as keyof typeof data.pageHeaders;
       const header = data.pageHeaders[pageKey];
       
       if (!header) return <div className="p-4 text-gray-500">تنظیمات هدر برای این صفحه موجود نیست.</div>;

       return (
         <div className="space-y-4">
            <h4 className="font-bold border-b pb-2 dark:border-gray-700 dark:text-white">ویرایش هدر صفحه</h4>
            <label className="block text-sm dark:text-gray-300">عنوان</label>
            <input value={header.title} onChange={e => updatePageHeaders({ ...data.pageHeaders, [pageKey]: { ...header, title: e.target.value } })} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label className="block text-sm dark:text-gray-300">توضیحات</label>
            <textarea value={header.subtitle} onChange={e => updatePageHeaders({ ...data.pageHeaders, [pageKey]: { ...header, subtitle: e.target.value } })} className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <ImagePicker value={header.image || ''} onChange={val => updatePageHeaders({ ...data.pageHeaders, [pageKey]: { ...header, image: val } })} media={data.media} />
         </div>
       );
    }

    return <div className="p-4 text-gray-500 text-center">ویرایشگر اختصاصی برای این بخش در دسترس نیست.</div>;
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] gap-6">
      {/* Left: Builder Sidebar */}
      <div className="w-full md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col overflow-hidden shadow-sm">
         <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <select 
              value={selectedPage} 
              onChange={(e) => { setSelectedPage(e.target.value); setEditingSection(null); }}
              className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-bold dark:text-white"
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
         
         <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <Reorder.Group axis="y" values={layout} onReorder={handleReorder} className="space-y-2">
               {layout.map((section) => (
                 <Reorder.Item key={section.id} value={section} className={`bg-white dark:bg-gray-700 border ${editingSection?.id === section.id ? 'border-primary ring-1 ring-primary' : 'border-gray-200 dark:border-gray-600'} rounded-xl p-3 shadow-sm cursor-pointer transition-all hover:shadow-md`}>
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2" onClick={() => setEditingSection(section)}>
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                          <span className="font-bold text-sm dark:text-white">{section.title}</span>
                       </div>
                       <button onClick={() => toggleVisibility(section.id)} className={`p-1 rounded ${section.isVisible ? 'text-green-500' : 'text-gray-300'}`}>
                          {section.isVisible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                       </button>
                    </div>
                 </Reorder.Item>
               ))}
            </Reorder.Group>
         </div>
      </div>

      {/* Right: Editor Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        {editingSection ? (
           <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                 <h3 className="font-bold dark:text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-primary" />
                    {editingSection.title}
                 </h3>
                 <button onClick={() => setEditingSection(null)} className="text-gray-500 hover:text-red-500"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                 {renderEditor()}
              </div>
           </div>
        ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-bold mb-2">بخشی انتخاب نشده است</p>
              <p className="text-sm">برای ویرایش، یک بخش را از لیست سمت راست انتخاب کنید.</p>
           </div>
        )}
      </div>
    </div>
  );
};

// --- Media Manager ---
const MediaManager = () => {
  const { data, updateMedia, notify } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [meta, setMeta] = useState({
    name: '',
    width: 0,
    height: 0,
    originalWidth: 0,
    originalHeight: 0,
    quality: 0.9,
    category: 'general'
  });
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [estimatedSize, setEstimatedSize] = useState('0 KB');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = activeCategory === 'all' 
    ? data.media 
    : data.media.filter(m => m.category === activeCategory);

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این فایل اطمینان دارید؟')) {
      updateMedia(data.media.filter(m => m.id !== id));
      notify('success', 'فایل با موفقیت حذف شد');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        
        // Get Dimensions
        const img = new globalThis.Image();
        img.onload = () => {
          setPreviewUrl(result);
          setUploadFile(file);
          setMeta({
            name: file.name,
            width: img.width,
            height: img.height,
            originalWidth: img.width,
            originalHeight: img.height,
            quality: 0.9,
            category: activeCategory !== 'all' ? activeCategory : 'general'
          });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Update Estimated Size
  useEffect(() => {
    if (meta.width && meta.height) {
        // Rough estimation: pixels * 3 bytes (RGB) * quality * compression efficiency
        const pixels = meta.width * meta.height;
        const rawSize = pixels * 3;
        const compressionRatio = 0.2 * meta.quality; // heuristic for jpeg
        const estBytes = rawSize * compressionRatio;
        
        if (estBytes > 1024 * 1024) {
            setEstimatedSize(`${(estBytes / (1024 * 1024)).toFixed(2)} MB`);
        } else {
            setEstimatedSize(`${Math.round(estBytes / 1024)} KB`);
        }
    }
  }, [meta.width, meta.height, meta.quality]);

  const handleWidthChange = (val: number) => {
      if (keepAspectRatio && meta.originalWidth > 0) {
          const ratio = meta.originalHeight / meta.originalWidth;
          setMeta({ ...meta, width: val, height: Math.round(val * ratio) });
      } else {
          setMeta({ ...meta, width: val });
      }
  };

  const handleHeightChange = (val: number) => {
      if (keepAspectRatio && meta.originalHeight > 0) {
          const ratio = meta.originalWidth / meta.originalHeight;
          setMeta({ ...meta, height: val, width: Math.round(val * ratio) });
      } else {
          setMeta({ ...meta, height: val });
      }
  };

  const handleProcessAndUpload = () => {
    if (!uploadFile || !previewUrl) return;

    const img = new globalThis.Image();
    img.crossOrigin = "anonymous";
    img.src = previewUrl;
    img.onload = () => {
       const canvas = document.createElement('canvas');
       canvas.width = meta.width;
       canvas.height = meta.height;
       const ctx = canvas.getContext('2d');
       if (ctx) {
         // High quality scaling
         ctx.imageSmoothingEnabled = true;
         ctx.imageSmoothingQuality = 'high';
         ctx.drawImage(img, 0, 0, meta.width, meta.height);
         
         const mimeType = uploadFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
         const finalDataUrl = canvas.toDataURL(mimeType, meta.quality);
         
         // Calculate actual size from base64 string length approximation
         const head = 'data:' + mimeType + ';base64,';
         const size = Math.round((finalDataUrl.length - head.length) * 3 / 4);

         const newMediaItem: MediaItem = {
           id: Date.now().toString(),
           name: meta.name,
           url: finalDataUrl,
           type: 'image',
           size: size,
           dimensions: `${meta.width}x${meta.height}`,
           date: new Date().toLocaleDateString('fa-IR'),
           category: meta.category
         };
         
         updateMedia([newMediaItem, ...data.media]);
         notify('success', 'فایل با موفقیت پردازش و ذخیره شد');
         handleCloseModal();
       }
    };
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
    setUploadFile(null);
    setPreviewUrl('');
    setMeta({ name: '', width: 0, height: 0, originalWidth: 0, originalHeight: 0, quality: 0.9, category: 'general' });
    setKeepAspectRatio(true);
    setEstimatedSize('0 KB');
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
         <div className="flex gap-2">
           {['all', 'projects', 'blog', 'services', 'general'].map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}
             >
               {cat === 'all' ? 'همه' : cat}
             </button>
           ))}
         </div>
         <button onClick={() => setIsUploadModalOpen(true)} className={BTN_PRIMARY}>
           <Upload className="w-4 h-4" /> آپلود فایل
         </button>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto pb-4 custom-scrollbar">
         {filteredMedia.map(item => (
           <div key={item.id} className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
             <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
               {item.type === 'image' ? (
                 <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400">
                   <File className="w-12 h-12" />
                 </div>
               )}
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button onClick={() => window.open(item.url, '_blank')} className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/40 backdrop-blur-sm"><Eye className="w-4 h-4" /></button>
                 <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 backdrop-blur-sm"><Trash2 className="w-4 h-4" /></button>
               </div>
             </div>
             <div className="p-3">
               <p className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate" title={item.name}>{item.name}</p>
               <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                 <span>{item.dimensions || '---'}</span>
                 <span>{Math.round(item.size / 1024)} KB</span>
               </div>
             </div>
           </div>
         ))}
       </div>

       {/* Upload Modal */}
       <Modal isOpen={isUploadModalOpen} onClose={handleCloseModal} title="آپلود و ویرایش تصویر">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Left: Preview */}
             <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center relative min-h-[300px] overflow-hidden border border-gray-200 dark:border-gray-600">
                {previewUrl ? (
                   <img src={previewUrl} alt="Preview" className="max-w-full max-h-[400px] object-contain shadow-lg" />
                ) : (
                   <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">هنوز تصویری انتخاب نشده است</p>
                   </div>
                )}
                
                {/* File Input Trigger */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden" 
                />
                {!previewUrl && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                  />
                )}
             </div>

             {/* Right: Controls */}
             <div className="space-y-6">
                {!previewUrl ? (
                   <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl">
                      <h4 className="font-bold text-lg mb-2 dark:text-white">انتخاب فایل از کامپیوتر</h4>
                      <p className="text-gray-500 text-sm mb-6">فایل‌های JPG و PNG پشتیبانی می‌شوند</p>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-blue-200"
                      >
                         انتخاب فایل
                      </button>
                   </div>
                ) : (
                   <>
                      <div>
                         <label className="block text-sm font-bold mb-1 dark:text-gray-300">نام فایل</label>
                         <input 
                           value={meta.name}
                           onChange={e => setMeta({...meta, name: e.target.value})}
                           className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                         />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-bold mb-1 dark:text-gray-300">عرض (px)</label>
                            <input 
                              type="number"
                              value={meta.width}
                              onChange={e => handleWidthChange(parseInt(e.target.value) || 0)}
                              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                         </div>
                         <div>
                            <label className="block text-sm font-bold mb-1 dark:text-gray-300">ارتفاع (px)</label>
                            <input 
                              type="number"
                              value={meta.height}
                              onChange={e => handleHeightChange(parseInt(e.target.value) || 0)}
                              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                         </div>
                      </div>

                      <div className="flex items-center gap-2">
                         <input 
                           type="checkbox" 
                           checked={keepAspectRatio} 
                           onChange={e => setKeepAspectRatio(e.target.checked)}
                           className="w-4 h-4 rounded border-gray-300" 
                         />
                         <label className="text-sm text-gray-600 dark:text-gray-400">حفظ نسبت ابعاد</label>
                      </div>

                      <div>
                         <div className="flex justify-between mb-1">
                            <label className="text-sm font-bold dark:text-gray-300">کیفیت / فشرده‌سازی</label>
                            <span className="text-xs text-primary font-bold">{Math.round(meta.quality * 100)}%</span>
                         </div>
                         <input 
                           type="range" 
                           min="0.1" 
                           max="1" 
                           step="0.05"
                           value={meta.quality}
                           onChange={e => setMeta({...meta, quality: parseFloat(e.target.value)})}
                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                         />
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-1 dark:text-gray-300">دسته‌بندی</label>
                        <select 
                          value={meta.category}
                          onChange={e => setMeta({...meta, category: e.target.value})}
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                           <option value="general">عمومی</option>
                           <option value="projects">پروژه‌ها</option>
                           <option value="blog">وبلاگ</option>
                           <option value="services">خدمات</option>
                        </select>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex justify-between items-center">
                         <span className="text-sm font-bold text-blue-800 dark:text-blue-200">حجم تقریبی فایل نهایی:</span>
                         <span className="text-lg font-bold text-primary">{estimatedSize}</span>
                      </div>

                      <div className="flex gap-3 pt-4">
                         <button 
                           onClick={handleProcessAndUpload}
                           className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-blue-200"
                         >
                            آپلود و ذخیره
                         </button>
                         <button 
                           onClick={handleCloseModal}
                           className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700"
                         >
                            لغو
                         </button>
                      </div>
                   </>
                )}
             </div>
          </div>
       </Modal>
    </div>
  );
};

// --- Settings Manager ---
const SettingsManager = () => {
   const { data, updateSettings } = useData();
   const { settings } = data;

   return (
      <div className="p-6 max-w-4xl mx-auto space-y-8">
         {/* General Identity */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
               <Globe className="w-5 h-5 text-primary" />
               هویت سایت
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold mb-1 dark:text-gray-300">عنوان سایت</label>
                  <input 
                     value={settings.general.title}
                     onChange={e => updateSettings({...settings, general: {...settings.general, title: e.target.value}})}
                     className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold mb-1 dark:text-gray-300">شعار (Tagline)</label>
                  <input 
                     value={settings.general.tagline}
                     onChange={e => updateSettings({...settings, general: {...settings.general, tagline: e.target.value}})}
                     className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-1 dark:text-gray-300">توضیحات متا (SEO)</label>
                  <textarea 
                     value={settings.general.description}
                     onChange={e => updateSettings({...settings, general: {...settings.general, description: e.target.value}})}
                     className="w-full p-2 border rounded-lg h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
               </div>
            </div>
         </div>

         {/* Contact Info */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
               <Phone className="w-5 h-5 text-primary" />
               اطلاعات تماس
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold mb-1 dark:text-gray-300">تلفن</label>
                  <input 
                     value={settings.contact.phone}
                     onChange={e => updateSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
                     className="w-full p-2 border rounded-lg dir-ltr dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold mb-1 dark:text-gray-300">ایمیل</label>
                  <input 
                     value={settings.contact.email}
                     onChange={e => updateSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                     className="w-full p-2 border rounded-lg dir-ltr dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-1 dark:text-gray-300">آدرس پستی</label>
                  <input 
                     value={settings.contact.address}
                     onChange={e => updateSettings({...settings, contact: {...settings.contact, address: e.target.value}})}
                     className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
               </div>
            </div>
         </div>

         {/* Theme Colors */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
               <Palette className="w-5 h-5 text-primary" />
               ظاهر و رنگ‌بندی
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div>
                  <label className="block text-sm font-bold mb-2 dark:text-gray-300">رنگ اصلی</label>
                  <div className="flex gap-2">
                     <input 
                        type="color"
                        value={settings.theme.primaryColor}
                        onChange={e => updateSettings({...settings, theme: {...settings.theme, primaryColor: e.target.value}})}
                        className="w-10 h-10 rounded cursor-pointer"
                     />
                     <input 
                        type="text"
                        value={settings.theme.primaryColor}
                        onChange={e => updateSettings({...settings, theme: {...settings.theme, primaryColor: e.target.value}})}
                        className="w-full p-2 border rounded text-xs dir-ltr uppercase dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold mb-2 dark:text-gray-300">رنگ تاکید (Accent)</label>
                  <div className="flex gap-2">
                     <input 
                        type="color"
                        value={settings.theme.accentColor}
                        onChange={e => updateSettings({...settings, theme: {...settings.theme, accentColor: e.target.value}})}
                        className="w-10 h-10 rounded cursor-pointer"
                     />
                     <input 
                        type="text"
                        value={settings.theme.accentColor}
                        onChange={e => updateSettings({...settings, theme: {...settings.theme, accentColor: e.target.value}})}
                        className="w-full p-2 border rounded text-xs dir-ltr uppercase dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* System Settings */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
               <Settings className="w-5 h-5 text-primary" />
               تنظیمات سیستمی
            </h3>
            <div className="flex items-center gap-4">
               <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                     type="checkbox"
                     checked={settings.system.maintenanceMode}
                     onChange={e => updateSettings({...settings, system: {...settings.system, maintenanceMode: e.target.checked}})}
                     className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="font-bold dark:text-gray-300">حالت تعمیر و نگهداری</span>
               </label>
               <span className="text-sm text-gray-500">در این حالت فقط مدیران می‌توانند سایت را مشاهده کنند.</span>
            </div>
         </div>
      </div>
   );
};

// --- Messages Manager ---
const MessagesManager = () => {
   const { data } = useData();
   
   return (
      <DataTable<Message>
         title="پیام‌های دریافتی"
         data={data.messages}
         searchKeys={['name', 'email', 'phone', 'message']}
         columns={[
            { key: 'status', label: 'وضعیت', render: (m) => (
               <span className={`px-2 py-1 rounded text-xs font-bold ${
                  m.status === 'new' ? 'bg-green-100 text-green-700' : 
                  m.status === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
               }`}>
                  {m.status === 'new' ? 'جدید' : m.status === 'read' ? 'خوانده شده' : 'پاسخ داده شده'}
               </span>
            )},
            { key: 'name', label: 'فرستنده' },
            { key: 'phone', label: 'تماس', render: (m) => <span className="dir-ltr">{m.phone}</span> },
            { key: 'service', label: 'موضوع', render: (m) => (
               <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {m.service === 'project' ? 'سفارش پروژه' : m.service === 'demo' ? 'درخواست دمو' : m.service === 'consultation' ? 'مشاوره' : 'سایر'}
               </span>
            )},
            { key: 'date', label: 'تاریخ' },
            { key: 'actions', label: 'عملیات' }
         ]}
      />
   );
};

// --- Users Manager ---
const UsersManager = () => {
   const { data } = useData();
   
   return (
      <DataTable<User>
         title="کاربران سیستم"
         data={data.users}
         searchKeys={['name', 'email', 'role']}
         columns={[
            { key: 'avatar', label: '', render: (u) => <img src={u.avatar || 'https://via.placeholder.com/40'} className="w-8 h-8 rounded-full" /> },
            { key: 'name', label: 'نام کاربر' },
            { key: 'email', label: 'ایمیل' },
            { key: 'role', label: 'نقش', render: (u) => (
               <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">{u.role}</span>
            )},
            { key: 'status', label: 'وضعیت', render: (u) => (
               <span className={`text-xs font-bold ${u.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {u.status === 'active' ? 'فعال' : 'غیرفعال'}
               </span>
            )},
            { key: 'lastLogin', label: 'آخرین ورود' },
            { key: 'actions', label: 'عملیات' }
         ]}
      />
   );
};

// --- MAIN LAYOUT ---
const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { data, updateProjects, updateBlog, notify } = useData();
  
  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Stats
  const stats = [
    { label: 'بازدید کل', value: '12.5k', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'پیام‌های جدید', value: data.messages.filter(m => m.status === 'new').length, icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'پروژه‌ها', value: data.projects.length, icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'کاربران', value: data.users.length, icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const handleSaveProject = (project: Project) => {
    if (editingItem) {
      updateProjects(data.projects.map(p => p.id === project.id ? project : p));
      notify('success', 'پروژه با موفقیت ویرایش شد');
    } else {
      updateProjects([...data.projects, { ...project, id: Date.now() }]);
      notify('success', 'پروژه جدید ایجاد شد');
    }
    setIsProjectModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteProject = (project: Project) => {
    if (confirm(`آیا از حذف پروژه "${project.title}" اطمینان دارید؟`)) {
      updateProjects(data.projects.filter(p => p.id !== project.id));
      notify('info', 'پروژه حذف شد');
    }
  };

  const handleSaveArticle = (article: Article) => {
    if (editingItem) {
      updateBlog(data.blog.map(a => a.id === article.id ? article : a));
      notify('success', 'مقاله با موفقیت ویرایش شد');
    } else {
      updateBlog([...data.blog, { ...article, id: Date.now() }]);
      notify('success', 'مقاله جدید ایجاد شد');
    }
    setIsArticleModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteArticle = (article: Article) => {
    if (confirm(`آیا از حذف مقاله "${article.title}" اطمینان دارید؟`)) {
      updateBlog(data.blog.filter(a => a.id !== article.id));
      notify('info', 'مقاله حذف شد');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold mb-4 dark:text-white">آخرین فعالیت‌ها</h3>
                  <div className="space-y-4">
                     {data.activityLogs.map(log => (
                        <div key={log.id} className="flex items-center gap-4 py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                           <div className="w-2 h-2 rounded-full bg-primary"></div>
                           <p className="text-sm dark:text-gray-300">
                              <span className="font-bold text-gray-800 dark:text-gray-200">{log.userName}</span>
                              <span className="mx-1 text-gray-500">{log.action === 'LOGIN' ? 'وارد شد' : log.action === 'CREATE' ? 'ایجاد کرد:' : 'ویرایش کرد:'}</span>
                              <span className="text-primary">{log.target}</span>
                           </p>
                           <span className="mr-auto text-xs text-gray-400 dir-ltr">{log.date.split(' ')[1]}</span>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold mb-4 dark:text-white">وضعیت سیستم</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">فضای ذخیره‌سازی</span>
                        <span className="font-bold text-primary">45%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                     </div>
                     
                     <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-600 dark:text-gray-400">پهنای باند ماهانه</span>
                        <span className="font-bold text-accent">20%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '20%' }}></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'pages':
        return <PagesManager />;
      case 'media':
         return <MediaManager />;
      case 'settings':
         return <SettingsManager />;
      case 'messages':
         return <MessagesManager />;
      case 'users':
         return <UsersManager />;
      case 'portfolio':
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-end mb-4">
               <button 
                  onClick={() => { setEditingItem(null); setIsProjectModalOpen(true); }}
                  className={BTN_PRIMARY}
               >
                  <Plus className="w-4 h-4" /> پروژه جدید
               </button>
            </div>
            <DataTable<Project>
              title="لیست پروژه‌ها"
              data={data.projects}
              searchKeys={['title', 'client', 'category']}
              onEdit={(item) => { setEditingItem(item); setIsProjectModalOpen(true); }}
              onDelete={handleDeleteProject}
              columns={[
                { key: 'image', label: 'تصویر', render: (p) => <img src={p.image} className="w-12 h-12 rounded-lg object-cover" /> },
                { key: 'title', label: 'عنوان' },
                { key: 'client', label: 'مشتری' },
                { key: 'category', label: 'دسته‌بندی', render: (p) => <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{p.category}</span> },
                { key: 'featured', label: 'منتخب', render: (p) => p.featured ? <Check className="w-4 h-4 text-green-500" /> : <span className="text-gray-300">-</span> },
                { key: 'actions', label: 'عملیات' }
              ]}
            />
          </div>
        );
      case 'blog':
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-end mb-4">
               <button 
                  onClick={() => { setEditingItem(null); setIsArticleModalOpen(true); }}
                  className={BTN_PRIMARY}
               >
                  <Plus className="w-4 h-4" /> مقاله جدید
               </button>
            </div>
            <DataTable<Article>
              title="مدیریت مقالات"
              data={data.blog}
              searchKeys={['title', 'author', 'category']}
              onEdit={(item) => { setEditingItem(item); setIsArticleModalOpen(true); }}
              onDelete={handleDeleteArticle}
              columns={[
                { key: 'image', label: '', render: (a) => <img src={a.image} className="w-12 h-12 rounded-lg object-cover" /> },
                { key: 'title', label: 'عنوان' },
                { key: 'author', label: 'نویسنده' },
                { key: 'category', label: 'دسته‌بندی' },
                { key: 'status', label: 'وضعیت', render: (a) => (
                   <span className={`px-2 py-1 rounded text-xs ${a.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {a.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                   </span>
                )},
                { key: 'views', label: 'بازدید' },
                { key: 'actions', label: 'عملیات' }
              ]}
            />
          </div>
        );
      default:
        return <div className="p-10 text-center text-gray-500">این بخش در حال توسعه است...</div>;
    }
  };

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'pages', label: 'مدیریت صفحات', icon: Layers },
    { id: 'portfolio', label: 'نمونه کارها', icon: Briefcase },
    { id: 'blog', label: 'وبلاگ', icon: FileText },
    { id: 'media', label: 'رسانه‌ها', icon: ImageIcon },
    { id: 'messages', label: 'پیام‌ها', icon: MessageSquare },
    { id: 'users', label: 'کاربران', icon: Users },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl z-30 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
           <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">M</div>
           <div>
              <h1 className="font-bold text-lg text-primary tracking-tight">پنل مدیریت</h1>
              <p className="text-xs text-gray-400">نسخه ۳.۰.۰</p>
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'animate-pulse' : ''}`} />
              {item.label}
              {item.id === 'messages' && data.messages.some(m => m.status === 'new') && (
                 <span className="mr-auto w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
           <button onClick={onExit} className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold">
              <LogOut className="w-5 h-5" />
              خروج از سیستم
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64 min-h-screen flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4 lg:hidden">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="font-bold text-primary">پنل مدیریت</span>
           </div>
           
           <h2 className="text-xl font-bold hidden lg:block text-gray-800 dark:text-white">
              {navItems.find(i => i.id === activeTab)?.label}
           </h2>

           <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-primary relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm">
                 <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" />
              </div>
           </div>
        </header>

        <div className="p-6 md:p-8 flex-1 overflow-x-hidden">
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
             className="h-full"
           >
              {renderContent()}
           </motion.div>
        </div>
      </main>

      {/* Project Modal */}
      <Modal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        title={editingItem ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}
      >
         <ProjectForm 
           project={editingItem || {
             id: 0, title: '', client: '', category: 'Web', industry: '', 
             image: '', gallery: [], excerpt: '', problem: '', solution: '', result: '', 
             techStack: [], kpis: [], featured: false, seo: { title: '', desc: '', slug: '' }
           }} 
           onSave={handleSaveProject}
           media={data.media}
         />
      </Modal>

      {/* Article Modal */}
      <Modal 
        isOpen={isArticleModalOpen} 
        onClose={() => setIsArticleModalOpen(false)} 
        title={editingItem ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
      >
         <ArticleForm 
           article={editingItem || {
             id: 0, title: '', slug: '', excerpt: '', content: '', image: '', date: '', 
             status: 'draft', readTime: '', author: '', authorRole: '', authorAvatar: '', 
             category: 'تکنولوژی', tags: [], featured: false, allowComments: true, seo: { title: '', description: '', keywords: [] }, views: 0
           }}
           onSave={handleSaveArticle}
           media={data.media}
           categories={data.blogCategories}
         />
      </Modal>
    </div>
  );
};

export default AdminPanel;
