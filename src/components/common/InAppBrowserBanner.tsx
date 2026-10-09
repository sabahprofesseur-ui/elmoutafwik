import React, { useState } from 'react';
import { Compass, Copy, Globe, Info, X, Check } from 'lucide-react';

interface InAppBrowserBannerProps {
  onOpenChrome?: () => void;
}

export const InAppBrowserBanner: React.FC<InAppBrowserBannerProps> = ({ onOpenChrome }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [showInfoAlert, setShowInfoAlert] = useState(false);

  if (!isVisible) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenChrome = () => {
    if (onOpenChrome) {
      onOpenChrome();
    } else {
      const url = window.location.href;
      // Android Chrome intent URL
      if (/android/i.test(navigator.userAgent || '')) {
        const cleanUrl = url.replace(/^https?:\/\//, '');
        window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
      } else {
        window.open(url, '_blank');
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#FF7A00] via-[#FF8A00] to-[#E65100] text-white p-3 sm:p-4 shadow-md relative z-50 border-b border-orange-600/40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Right side (RTL start): Badges & Text */}
        <div className="flex items-start gap-3 w-full md:w-auto">
          {/* Compass Icon */}
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 mt-0.5">
            <Compass size={22} className="animate-spin" style={{ animationDuration: '12s' }} />
          </div>

          <div className="space-y-1">
            {/* Top Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-black/25 text-amber-100 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                مفتوح داخل فيسبوك (Facebook)
              </span>
              <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span>توجيه هام للمستخدم</span>
                <span>✨</span>
              </span>
            </div>

            {/* Main Headline */}
            <h4 className="text-xs sm:text-sm font-black leading-snug">
              افتح التطبيق في متصفح خارجي (Google Chrome) لتثبيته على الهاتف!
            </h4>

            {/* Description */}
            <p className="text-[11px] sm:text-xs text-amber-100/90 font-medium leading-relaxed">
              المتصفحات الداخلية لا تتيح تثبيت التطبيق بكامل الشاشة ولا حفظ بياناتك دون انقطاع.
            </p>
          </div>
        </div>

        {/* Left side (RTL end): Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-1 md:pt-0">
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="إغلاق التنبيه"
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-black/15 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Info button */}
          <button
            onClick={() => setShowInfoAlert(prev => !prev)}
            aria-label="معلومات إضافية"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
          >
            <Info size={16} />
          </button>

          {/* Copy link button */}
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 bg-black/25 hover:bg-black/35 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            {isCopied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
            <span>{isCopied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
          </button>

          {/* Open in Chrome button */}
          <button
            onClick={handleOpenChrome}
            className="px-4 py-2 bg-white hover:bg-amber-50 text-orange-950 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Globe size={15} className="text-orange-600" />
            <span>فتح في قوقل كروم 🌐</span>
          </button>
        </div>

      </div>

      {showInfoAlert && (
        <div className="mt-2.5 p-3 rounded-xl bg-black/30 border border-white/20 text-xs text-white leading-relaxed max-w-6xl mx-auto animate-in fade-in">
          💡 يمكنك النقر على زر "نسخ الرابط" ثم فتح تطبيق متصفح Google Chrome ولصق الرابط في شريط العناوين للحصول على أقصى سرعة وإمكانية تثبيت المنصة كتطبيق على شاشتك.
        </div>
      )}
    </div>
  );
};
