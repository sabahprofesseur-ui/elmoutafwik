import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Award,
  FileText,
  BookMarked,
  Sparkles,
  Bot,
  Gamepad2,
  Palette,
  Users2,
  CreditCard,
  Trophy,
  UserCircle2,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { nav, navigate } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'الرئيسية والدروس',
      icon: LayoutDashboard,
      badge: '',
      color: 'text-orange-500',
    },
    {
      id: 'reading-coach',
      label: 'مدرب القراءة والمطالعة',
      icon: BookOpen,
      badge: 'مشكول 🎙️',
      color: 'text-emerald-500',
    },
    {
      id: 'science-lab',
      label: 'مختبر العلوم والتجارب',
      icon: FlaskConical,
      badge: 'تفاعلي 🧪',
      color: 'text-cyan-500',
    },
    {
      id: 'acquisition-exams',
      label: 'امتحانات تقييم المكتسبات',
      icon: Award,
      badge: 'وزاري 🇩🇿',
      color: 'text-amber-500',
    },
    {
      id: 'worksheets',
      label: 'أوراق عمل ومذكرات',
      icon: FileText,
      badge: 'طباعة 📄',
      color: 'text-blue-500',
    },
    {
      id: 'dictionary',
      label: 'القاموس اللغوي المصور',
      icon: BookMarked,
      badge: 'جديد 📖',
      color: 'text-indigo-500',
    },
    {
      id: 'fun-learning',
      label: 'متعة التعلم والقصص',
      icon: Sparkles,
      badge: 'مغامرات 🚀',
      color: 'text-pink-500',
    },
    {
      id: 'arabic-assistant',
      label: 'مساعد الضاد الذكي',
      icon: Bot,
      badge: 'إعراب فوري 🦊',
      color: 'text-orange-600',
    },
    {
      id: 'games',
      label: 'ألعاب تعليمية',
      icon: Gamepad2,
      badge: 'تحدي 🎮',
      color: 'text-purple-500',
    },
    {
      id: 'art-studio',
      label: 'أستوديو الإبداع والرسم',
      icon: Palette,
      badge: 'تلوين 🎨',
      color: 'text-rose-500',
    },
    {
      id: 'mascots',
      label: 'رفقاء المعرفة',
      icon: Users2,
      badge: '',
      color: 'text-yellow-600',
    },
    {
      id: 'subscription',
      label: 'اشتراكاتي والترقية',
      icon: CreditCard,
      badge: '2000 دج',
      color: 'text-green-600',
    },
    {
      id: 'achievements',
      label: 'الإنجازات والأوسمة',
      icon: Trophy,
      badge: 'أوائل 🏆',
      color: 'text-amber-600',
    },
    {
      id: 'profile',
      label: 'حسابي ولوحة الولي',
      icon: UserCircle2,
      badge: '',
      color: 'text-slate-600',
    },
    {
      id: 'platforms',
      label: 'منصاتنا وتطبيقاتنا',
      icon: Layers,
      badge: 'BEM • BAC',
      color: 'text-sky-600',
    },
  ];

  const handleItemClick = (pageId: string) => {
    navigate(pageId);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-[61px] right-0 h-screen md:h-[calc(100vh-61px)] w-72 bg-white dark:bg-slate-900 border-l border-orange-100 dark:border-slate-800 p-4 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          {/* Quick Mascot Banner */}
          <div 
            onClick={() => handleItemClick('mascots')}
            className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white flex items-center justify-between cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-3xl animate-kid-bounce">🦊</span>
              <div>
                <p className="text-xs font-black text-amber-100">رفيقك اليوم</p>
                <p className="text-sm font-black">ثعلوب البطل</p>
              </div>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
              تحدث معه
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = nav.page === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-800/80 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={19}
                      className={isActive ? 'text-white' : item.color}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support & Help */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <button
            onClick={() => handleItemClick('contact')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-orange-600 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircle size={16} />
              <span>المساعدة والدعم الفني</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-sm">24/7</span>
          </button>
        </div>
      </aside>
    </>
  );
};
