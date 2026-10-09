import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, Sparkles, MessageCircle, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SharePlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SharePlatformModal: React.FC<SharePlatformModalProps> = ({ isOpen, onClose }) => {
  const { playClick } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Official new chosen platform link
  const officialDomain = 'https://thaloob-dz.vercel.app';
  const livePreviewUrl = 'https://ais-pre-qh3q5go3wfd522bhhvrk2k-113220139459.europe-west3.run.app';

  if (!isOpen) return null;

  const handleCopy = (url: string) => {
    playClick();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    playClick();
    const text = encodeURIComponent(`منصة المتفوق الصغير (ثعلوب) للتعليم التفاعلي للطور الابتدائي بالجزائر 🇩🇿 وفق منهاج الجيل الثاني:\n${officialDomain}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in select-none" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-orange-200 dark:border-slate-700 relative text-right space-y-5 animate-in zoom-in-95">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
            🦊
          </div>
          <div>
            <span className="text-[11px] font-black text-orange-600 bg-orange-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              الرابط الرسمي الجديد للمنصة 🇩🇿
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              منصة ثعلوب التعليمية
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
          تم تحديث وتثبيت اسم رابط المنصة الجديد رسمياً لدخول التلاميذ والأولياء وتثبيت التطبيق:
        </p>

        {/* Primary Official Domain Card */}
        <div className="p-4 rounded-2xl bg-orange-50/80 dark:bg-slate-800/90 border-2 border-orange-300 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5 text-orange-700 dark:text-orange-400">
              <Globe size={15} />
              <span>رابط المنصة الأساسي (Vercel):</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
              معتمد ورسمي ✓
            </span>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 gap-2">
            <span className="text-sm font-mono font-black text-orange-600 dark:text-orange-400 truncate ltr">
              thaloob-dz.vercel.app
            </span>
            <button
              onClick={() => handleCopy(officialDomain)}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-black flex items-center gap-1 transition-all cursor-pointer shrink-0"
            >
              {copiedLink ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>
          </div>
        </div>

        {/* Alternative Direct Live Link */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
            الرابط السحابي المباشر المتاح حالياً 24/7:
          </span>
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700 gap-2">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate ltr">
              {livePreviewUrl}
            </span>
            <button
              onClick={() => handleCopy(livePreviewUrl)}
              className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg text-[11px] font-black shrink-0 transition-colors cursor-pointer"
            >
              نسخ
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>مشاركة الرابط عبر واتساب (WhatsApp) 💬</span>
          </button>
        </div>

      </div>
    </div>
  );
};
