import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GRADES } from '../../data/curriculum';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Eye, 
  Menu, 
  X, 
  Flame,
  User as UserIcon,
  LogOut,
  LogIn,
  Star,
  Share2
} from 'lucide-react';
import { SharePlatformModal } from '../common/SharePlatformModal';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const {
    nav,
    navigate,
    profile,
    selectedGrade,
    setSelectedGrade,
    soundVolume,
    setSoundVolume,
    isMuted,
    toggleSound,
    isNightWarmMode,
    toggleNightWarmMode,
    isDarkMode,
    toggleDarkMode,
    currentUser,
    isGuest,
    logout,
    playClick
  } = useApp();

  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'ar' | 'fr' | 'en'>('ar');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const currentGrade = GRADES.find(g => g.id === selectedGrade) || GRADES[2];
  const isHome = nav.page === 'home';

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-orange-100/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Right side (RTL start): Brand Logo matching Screenshot 2 */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isHome && (
            <button
              onClick={onToggleSidebar}
              aria-label="القائمة الجانبية"
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none"
          >
            {/* Round Logo Icon from Screenshot 2 */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
              <img
                src="/icon.svg"
                alt="المتفوق الصغير"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col text-right">
              <span className="text-lg sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight leading-none">
                المتفوق الصغير
              </span>
              <span className="text-[10px] sm:text-xs font-black text-[#FF8A00] mt-1 hidden sm:block">
                منصة التعليم التفاعلي للطور الابتدائي 🇩🇿
              </span>
            </div>
          </div>
        </div>

        {/* Center/Left: Controls & Authentication */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Language Switcher Pill */}
          <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs font-black shadow-xs">
            <button
              onClick={() => setSelectedLang('ar')}
              className={`px-2.5 sm:px-3 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                selectedLang === 'ar'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>عربي</span>
              <span>🇩🇿</span>
            </button>

            <button
              onClick={() => setSelectedLang('fr')}
              className={`px-2 sm:px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                selectedLang === 'fr'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>FR</span>
            </button>

            <button
              onClick={() => setSelectedLang('en')}
              className={`px-1.5 sm:px-2 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                selectedLang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>🇬🇧</span>
            </button>
          </div>

          {/* User Status / Login / Dashboard Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate('profile')}
                className="flex items-center gap-1.5 py-1.5 px-2.5 bg-orange-100 dark:bg-slate-800 rounded-xl text-xs font-black text-orange-900 dark:text-orange-300 hover:scale-105 transition-all cursor-pointer"
                title="الملف الشخصي"
              >
                <span>{profile.avatar}</span>
                <span className="hidden md:inline">{profile.name}</span>
                <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                  <Star size={12} className="fill-amber-400" />
                  {profile.stars}
                </span>
              </button>

              <button
                onClick={logout}
                title="تسجيل الخروج"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : isGuest ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate('login')}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-black text-xs shadow-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                تسجيل الدخول 🚀
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('login')}
              className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black text-xs shadow-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <LogIn size={14} />
              <span>دخول / تسجيل 🚀</span>
            </button>
          )}

          {/* Share Link Button */}
          <button
            onClick={() => {
              playClick();
              setIsShareModalOpen(true);
            }}
            title="رابط المنصة للنشر والمشاركة"
            className="flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl bg-orange-100 hover:bg-orange-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-orange-800 dark:text-orange-300 font-black text-xs transition-all cursor-pointer shadow-xs"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">رابط المنصة 🔗</span>
          </button>

          {/* Sound & Dark Mode */}
          <button
            onClick={toggleSound}
            aria-label="التحكم بالصوت"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                : 'bg-orange-50 text-orange-600 dark:bg-slate-800 dark:text-orange-400'
            }`}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            onClick={toggleDarkMode}
            aria-label="الوضع المظلم"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-orange-50 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>

        </div>

      </div>

      {/* Share Platform Modal */}
      <SharePlatformModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </header>
  );
};
