import React, { useState } from 'react';
import { X, Smartphone, Globe, Download, CheckCircle2, Share, PlusSquare, Monitor } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChrome: () => void;
  onDownload?: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  onOpenChrome,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      // Desktop or in-app browser without event
      // Trigger browser prompt if supported
      onOpenChrome();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in select-none" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 dark:border-slate-700 relative text-right space-y-6 animate-in zoom-in-95">
        
        {/* Close Button top-left */}
        <button
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-5 left-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header with Icon & Badge */}
        <div className="flex items-start gap-4">
          {/* Badge Icon on right */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-400 bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center">
              <img
                src="/icon.svg"
                alt="المتفوق الصغير"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black border border-white">
              ⭐
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-slate-800 text-orange-800 dark:text-orange-300 text-[11px] font-black px-3 py-0.5 rounded-full">
              <Smartphone size={13} />
              <span>تثبيت التطبيق على الهاتف والحاسوب</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              ثبّت «المتفوق الصغير» على شاشتك 📲
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
          تصفح فائق السرعة، بملء الشاشة وبدون شريط المتصفح، مع إمكانية الوصول إلى الدروس والتمارين فوراً!
        </p>

        {installSuccess ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-2">
            <CheckCircle2 size={32} className="mx-auto text-emerald-600 animate-bounce" />
            <h4 className="text-sm font-black text-emerald-800 dark:text-emerald-200">
              تم التثبيت بنجاح! 🎉
            </h4>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              ستجد أيقونة "المتفوق الصغير" الآن على شاشة هاتفك الرئيسية.
            </p>
          </div>
        ) : showIOSInstructions ? (
          <div className="p-4 bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-2xl space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
            <h4 className="font-black text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <span>🍏 طريقة التثبيت على أجهزة iPhone و iPad:</span>
            </h4>
            <ol className="space-y-1.5 list-decimal list-inside font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
              <li>اضغط على زر المشاركة <Share size={13} className="inline mx-1 text-blue-500" /> أسفل متصفح Safari.</li>
              <li>انزل في القائمة واضغط على <span className="text-orange-600 font-black">"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</span>.</li>
              <li>اضغط على "إضافة" (Add) في الزاوية العلوية وستظهر الأيقونة فوراً على شاشتك.</li>
            </ol>
          </div>
        ) : (
          /* Buttons List matching Screenshot 1 */
          <div className="space-y-2.5 pt-1">
            {/* Direct PWA Install Button */}
            <button
              onClick={handleInstallClick}
              className="w-full py-4 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Smartphone size={20} />
              <span>تثبيت التطبيق على الشاشة الآن 📥</span>
            </button>

            {/* Blue Button: Open in Google Chrome */}
            <button
              onClick={onOpenChrome}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Globe size={18} />
              <span>فتح في قوقل كروم 🌐</span>
            </button>

            {/* Secondary Gray Button: Temporary Hide */}
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
            >
              إخفاء مؤقت
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
