import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Smartphone, MessageCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-28 border-t border-slate-800 relative z-10 select-none">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        
        {/* Logo matching Screenshot 7 */}
        <div
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FF8A00] flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap size={28} />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            منصة النجاح
          </span>
        </div>

        {/* Links Stack matching Screenshot 7 */}
        <div className="space-y-4 text-sm sm:text-base font-bold text-slate-300">
          {/* Row 1 */}
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => navigate('privacy')}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <button
              onClick={() => navigate('terms')}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              شروط الاستخدام
            </button>
          </div>

          {/* Row 2 */}
          <div>
            <button
              onClick={() => navigate('data-deletion')}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              حذف الحساب والبيانات
            </button>
          </div>

          {/* Row 3 */}
          <div>
            <button
              onClick={() => navigate('google-play-guide')}
              className="hover:text-orange-400 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>📱 دليل النشر (Play Console)</span>
            </button>
          </div>

          {/* Row 4 */}
          <div className="flex items-center justify-center gap-8 pt-1">
            <button
              onClick={() => navigate('contact')}
              className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle size={18} />
              <span>راسلنا (قنوات التواصل)</span>
            </button>
            <button
              onClick={() => navigate('contact')}
              className="hover:text-orange-400 transition-colors cursor-pointer underline underline-offset-4 decoration-orange-500"
            >
              اتصل بنا
            </button>
          </div>
        </div>

        {/* Copyright matching Screenshot 7 */}
        <div className="pt-6 border-t border-slate-800/80 text-xs sm:text-sm font-bold text-slate-400">
          © 2026 تم التطوير بكل حب في الجزائر 🇩🇿
        </div>

      </div>
    </footer>
  );
};
