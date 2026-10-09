import React from 'react';
import { Smartphone, Globe } from 'lucide-react';

interface FloatingBottomBarProps {
  onOpenChrome: () => void;
  onDownload: () => void;
}

export const FloatingBottomBar: React.FC<FloatingBottomBarProps> = ({
  onOpenChrome,
  onDownload,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-2.5 px-3 py-1.5 bg-slate-900/40 backdrop-blur-md rounded-full shadow-2xl border border-white/20 select-none animate-in fade-in slide-in-from-bottom-5">
      {/* Orange Button: Download App */}
      <button
        onClick={onDownload}
        title="تثبيت التطبيق على شاشة الهاتف"
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-2xl shadow-lg border-2 border-white/80 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer font-black text-xs sm:text-sm whitespace-nowrap"
      >
        <Smartphone size={16} />
        <span>تحميل التطبيق 📥</span>
      </button>

      {/* Blue Button: Open in Chrome */}
      <button
        onClick={onOpenChrome}
        title="فتح التطبيق في متصفح قوقل كروم"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-2xl shadow-lg border-2 border-white/80 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer font-black text-xs sm:text-sm whitespace-nowrap"
      >
        <Globe size={16} />
        <span>افتح في كروم 🌐</span>
      </button>
    </div>
  );
};
