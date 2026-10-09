import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GRADES } from '../../data/curriculum';
import { ThaloobMascot } from '../common/ThaloobMascot';
import {
  Sparkles,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ChevronLeft,
  Smartphone,
  Globe,
  Trophy,
  Rocket,
  ShieldCheck,
  Play
} from 'lucide-react';

interface LandingPageProps {
  onOpenInstallModal?: () => void;
  onOpenChrome?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenInstallModal,
  onOpenChrome,
}) => {
  const { navigate, setSelectedGrade, isAuthenticated, playClick } = useApp();

  const handleDownloadClick = () => {
    playClick();
    if (onOpenInstallModal) onOpenInstallModal();
  };

  const handleChromeClick = () => {
    playClick();
    if (onOpenChrome) {
      onOpenChrome();
    } else {
      const url = window.location.href;
      if (/android/i.test(navigator.userAgent || '')) {
        const cleanUrl = url.replace(/^https?:\/\//, '');
        window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
      } else {
        window.open(url, '_blank');
      }
    }
  };

  const handleStartLearning = () => {
    playClick();
    if (isAuthenticated) {
      navigate('dashboard');
    } else {
      navigate('login');
    }
  };

  return (
    <div className="space-y-24 pb-20 select-none" dir="rtl">
      
      {/* Hero Section matching Screenshots 2 & 3 */}
      <section className="text-center pt-6 sm:pt-12 px-4 max-w-4xl mx-auto space-y-8">
        
        {/* Top Tag matching Screenshot 2 */}
        <div className="inline-flex items-center gap-2 bg-[#FFF3E0] dark:bg-slate-800 text-[#FF8A00] font-black text-xs sm:text-sm px-5 py-2.5 rounded-full border border-orange-200/80 dark:border-slate-700 shadow-xs">
          <span>🚀</span>
          <span>أول تطبيق جزائري يستعمل الذكاء الاصطناعي</span>
        </div>

        {/* Giant Headline matching Screenshot 2 */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white leading-[1.2] tracking-tight">
          اجعل طفلك
          <br />
          من المتفوقين
          <br />
          بطريقة ممتعة
        </h1>

        {/* Subtitle description matching Screenshot 3 */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
          منصة تعليمية متكاملة تقدم المنهاج الجزائري الرسمي بأسلوب تفاعلي حديث يجمع بين اللعب والتعلم.
        </p>

        {/* Action Buttons Stack matching Screenshot 3 */}
        <div className="flex flex-col items-center gap-3 pt-2 max-w-md mx-auto w-full">
          {/* Main Orange Button */}
          <button
            onClick={handleStartLearning}
            className="w-full py-4 px-6 bg-[#FF8A00] hover:bg-[#E67E00] text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            سجل الآن وابدأ رحلة التعلم 🚀
          </button>

          {/* Light Blue Button: Open in Chrome */}
          <button
            onClick={handleChromeClick}
            className="w-full py-3.5 px-6 bg-[#EBF5FF] hover:bg-sky-100 text-blue-700 dark:bg-slate-800 dark:text-blue-300 font-black text-sm rounded-2xl border border-blue-200 dark:border-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Globe size={18} />
            <span>فتح في كروم 🌐</span>
          </button>

          {/* Light Cream Button: Download App */}
          <button
            onClick={handleDownloadClick}
            className="w-full py-3.5 px-6 bg-[#FFF8F0] hover:bg-orange-100/70 text-orange-800 dark:bg-slate-800 dark:text-orange-300 font-black text-sm rounded-2xl border border-orange-200 dark:border-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Smartphone size={18} />
            <span>تحميل التطبيق 📥</span>
          </button>
        </div>

        {/* Social Proof matching Screenshot 3 */}
        <div className="pt-4 flex items-center justify-center gap-3">
          {/* Overlapping 4 Avatars */}
          <div className="flex items-center -space-x-2.5 rtl:space-x-reverse">
            <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm shadow-xs">
              👦
            </div>
            <div className="w-9 h-9 rounded-full bg-pink-100 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm shadow-xs">
              👧
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm shadow-xs">
              🧑
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm shadow-xs">
              👧
            </div>
          </div>

          <span className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300">
            +10,000 تلميذ متفوق في الجزائر
          </span>
        </div>

      </section>

      {/* Mascot Thaloob Section matching Screenshot 4 */}
      <section className="flex flex-col items-center justify-center px-4 max-w-lg mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Exact Fox Vector Mascot */}
          <ThaloobMascot expression="excited" size="lg" />

          {/* Floating Achievement Card matching Screenshot 4 */}
          <div className="mt-4 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl border-2 border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-kid-bounce">
            {/* Green Trophy Icon */}
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Trophy size={22} />
            </div>

            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-bold">آخر وسام محقق</p>
              <p className="text-sm sm:text-base font-black text-slate-800 dark:text-white">
                📐 بطل الرياضيات الذكي!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "لماذا يختارنا الأولياء والتلاميذ؟" Section matching Screenshot 5 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white">
            لماذا يختارنا الأولياء والتلاميذ؟
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold">
            كل ما يحتاجه طفلك للتفوق في مكان واحد
          </p>
        </div>

        {/* Feature Cards in warm cream matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: AI Interactive */}
          <div className="bg-[#FFF9F2] dark:bg-slate-800/90 rounded-[2.5rem] p-8 border-2 border-orange-100 dark:border-slate-700 space-y-5 shadow-xs">
            <div className="w-14 h-14 bg-[#FF8A00] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
              ذكاء اصطناعي تفاعلي
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              مساعدنا "ثعلوب" يشرح الدروس بطريقة بسيطة ويساعد في حل التمارين خطوة بخطوة.
            </p>
          </div>

          {/* Card 2: Official Curriculum */}
          <div className="bg-[#F0F7FF] dark:bg-slate-800/90 rounded-[2.5rem] p-8 border-2 border-blue-100 dark:border-slate-700 space-y-5 shadow-xs">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
              وفق المنهاج الرسمي
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              جميع الدروس والمحتوى مراجع ومطابق تماماً لتوزيع وزارة التربية الوطنية للجيل الثاني بالجزائر.
            </p>
          </div>

          {/* Card 3: Gamified Learning */}
          <div className="bg-[#F2FCF5] dark:bg-slate-800/90 rounded-[2.5rem] p-8 border-2 border-emerald-100 dark:border-slate-700 space-y-5 shadow-xs">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Trophy size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
              ألعاب ومسابقات تحفيزية
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              مسابقات الحساب الذهني وألغاز ولايات الجزائر وأوسمة الشرف لتعزيز شغف التعلم.
            </p>
          </div>

          {/* Card 4: Guardian Dashboard */}
          <div className="bg-[#FAF5FF] dark:bg-slate-800/90 rounded-[2.5rem] p-8 border-2 border-purple-100 dark:border-slate-700 space-y-5 shadow-xs">
            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
              لوحة تحكم كاملة للأولياء
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              متابعة درجات التلميذ، ضبط وقت الشاشة اليومي، وضع راحة العين وطباعة كشف تقييم المكتسبات.
            </p>
          </div>

        </div>
      </section>

      {/* Grade Selector Strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-orange-500 uppercase tracking-widest">
            المنهاج الجزائري الرسمي
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
            اختر سنتك الدراسية وانطلق في التعلم
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {GRADES.map(grade => (
            <button
              key={grade.id}
              onClick={() => {
                setSelectedGrade(grade.id);
                if (isAuthenticated) {
                  navigate('dashboard');
                } else {
                  navigate('login');
                }
              }}
              className="p-4 rounded-3xl bg-white dark:bg-slate-800 border-2 border-orange-100 dark:border-slate-700 hover:border-orange-500 shadow-xs hover:shadow-md transition-all text-center space-y-2 cursor-pointer group"
            >
              <span className="text-3xl block group-hover:scale-110 transition-transform">
                {grade.icon}
              </span>
              <h3 className="text-xs sm:text-sm font-black text-[#0F172A] dark:text-white">
                {grade.name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Orange Banner matching Screenshot 6 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-[2.5rem] bg-[#FF8A00] p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Soft background dot pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              لبدء المغامرة التعليمية مع ثعلوب؟
            </h2>

            <p className="text-sm sm:text-lg font-bold text-amber-100 leading-relaxed">
              أكثر من 500 درس تفاعلي، 2000 تمرين، ومئات الألعاب التعليمية في انتظارك!
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  playClick();
                  if (isAuthenticated) {
                    navigate('dashboard');
                  } else {
                    navigate('login');
                  }
                }}
                className="px-8 sm:px-12 py-4 bg-white hover:bg-amber-50 text-[#FF8A00] font-black text-lg rounded-full shadow-2xl border-4 border-sky-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                سجل طفلك مجاناً 🚀
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
