import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Smartphone,
  GraduationCap,
  Sparkles,
  Download,
  ExternalLink,
  Users,
  CheckCircle2
} from 'lucide-react';

export const PlatformsPage: React.FC = () => {
  const { navigate } = useApp();

  const platforms = [
    {
      id: 'primary',
      title: 'منصة المتفوق الصغير (الطور الابتدائي)',
      level: '1AP - 5AP',
      desc: 'المنصة التفاعلية المخصصة لتلاميذ وتلميذات الابتدائي بالجزائر مع رفقاء المعرفة وتقييم المكتسبات.',
      icon: '🎒',
      status: 'المنصة الحالية نشطة 🟢',
      color: 'from-orange-500 to-amber-500',
      actionText: 'أنت تتصفحها الآن',
      isCurrent: true,
    },
    {
      id: 'bem',
      title: 'منصة المتفوق لشهادة التعليم المتوسط (BEM)',
      level: 'الطور المتوسط (1AM - 4AM)',
      desc: 'شروحات الدروس، حلول مواضيع شهادة التعليم المتوسط السابقة، ملخصات المواد العلمية والأدبية.',
      icon: '🎓',
      status: 'جاهزة للعام الدراسي 2026',
      color: 'from-blue-600 to-cyan-600',
      actionText: 'استكشاف منصة البيام BEM',
      isCurrent: false,
    },
    {
      id: 'bac',
      title: 'منصة المتفوق لشهادة البكالوريا (BAC)',
      level: 'الطور الثانوي لجميع الشعب',
      desc: 'بنك تمارين البكالوريا، المنهجية النموذجية في العلوم والفيزياء والفلسفة، وتوقعات الامتحانات الرسمية.',
      icon: '👑',
      status: 'تحديثات دورية لشعب الباكالوريا',
      color: 'from-purple-600 to-indigo-600',
      actionText: 'استكشاف منصة الباكالوريا BAC',
      isCurrent: false,
    },
    {
      id: 'mobile-app',
      title: 'تطبيق المتفوق للهواتف الذكية والأجهزة اللوحية',
      level: 'Android & Tablets',
      desc: 'استمتع بالتعلم دون انقطاع عبر تطبيق خفيف وسريع يدعم العمل دون إنترنت لبعض الأنشطة.',
      icon: '📲',
      status: 'متاح للتحميل مجاناً',
      color: 'from-emerald-600 to-teal-600',
      actionText: 'دليل تثبيت التطبيق',
      isCurrent: false,
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>منظومة المتفوق التعليمية المتكاملة 🇩🇿</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            شبكة منصاتنا وتطبيقاتنا
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            من التحضيري والابتدائي إلى غاية نيل شهادتي التعليم المتوسط BEM والبكالوريا BAC، نرافق أبناء الجزائر خطوة بخطوة نحو القمة.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          🌐
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map(p => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center text-3xl shadow-md`}>
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {p.title}
                    </h3>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      {p.level}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {p.desc}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={16} />
                <span>{p.status}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (p.id === 'mobile-app') navigate('google-play-guide');
                else if (p.id === 'primary') navigate('dashboard');
                else navigate('dashboard');
              }}
              className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                p.isCurrent
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-default'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:scale-102'
              }`}
            >
              <span>{p.actionText}</span>
              {!p.isCurrent && <ExternalLink size={16} />}
            </button>
          </div>
        ))}
      </div>

      {/* Community Callout */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-right">
          <h3 className="text-xl font-black">
            انضم إلى مجتمع المتفوقين على تلغرام وفيسبوك 📱
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            أكثر من 100,000 ولي أمر وأستاذ يتبادلون نماذج الاختبارات وسلالم التنقيط والنصائح التربوية يومياً.
          </p>
        </div>
        <button
          onClick={() => navigate('contact')}
          className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md whitespace-nowrap cursor-pointer hover:scale-105 transition-all"
        >
          الانضمام لقنوات المجتمع 🚀
        </button>
      </div>

    </div>
  );
};
