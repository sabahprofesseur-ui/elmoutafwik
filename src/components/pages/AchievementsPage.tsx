import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Award,
  Sparkles,
  Flame,
  Star,
  ShieldCheck,
  Crown,
  Medal
} from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { profile } = useApp();

  const badges = [
    {
      id: 'first_step',
      name: 'خطوة البطل الأولى',
      icon: '🎒',
      desc: 'إكمال أول درس بنجاح على المنصة',
      isUnlocked: true,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'math_genius',
      name: 'عبقري الرياضيات',
      icon: '🤖',
      desc: 'تحقيق علامة كاملة في اختبار الحساب الذهني',
      isUnlocked: true,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      id: 'reading_hero',
      name: 'بطل القراءة الفصيحة',
      icon: '📖',
      desc: 'قراءة 3 قصص مشكولة والإجابة عن أسئلة الفهم',
      isUnlocked: true,
      color: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      id: 'grammar_hunter',
      name: 'صائد الأخطاء النحوية',
      icon: '🦊',
      desc: 'إعراب 5 جمل بنجاح مع مساعد الضاد',
      isUnlocked: false,
      color: 'bg-slate-100 text-slate-400 border-slate-200 opacity-60',
    },
    {
      id: 'science_explorer',
      name: 'مكتشف العلوم والتجارب',
      icon: '🔬',
      desc: 'إجراء تجارب المختبر ومحاكاة دورة الماء',
      isUnlocked: false,
      color: 'bg-slate-100 text-slate-400 border-slate-200 opacity-60',
    },
    {
      id: 'super_achiever',
      name: 'نجم الجزائر المتفوق',
      icon: '👑',
      desc: 'اجتياز امتحان تقييم المكتسبات بمستوى (أ)',
      isUnlocked: true,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'مريم بن علي', wilaya: 'سطيف (19)', stars: 2450, avatar: '👧', school: 'مدرسة مالك بن نبي' },
    { rank: 2, name: 'يوسف رحماني', wilaya: 'الجزائر العاصمة (16)', stars: 2310, avatar: '👦', school: 'مدرسة الأمير عبد القادر' },
    { rank: 3, name: 'إيناس بلقاسم', wilaya: 'وهران (31)', stars: 2190, avatar: '👩', school: 'مدرسة ابن خلدون' },
    { rank: 4, name: 'عبد الجليل بن منصور', wilaya: 'باتنة (05)', stars: 1980, avatar: '🧒', school: 'مدرسة الشهداء' },
    { rank: 5, name: 'خديجة زايدي', wilaya: 'قسنطينة (25)', stars: 1840, avatar: '👧', school: 'مدرسة عبد الحميد بن باديس' },
    { rank: 6, name: 'محمد الأمين س.', wilaya: 'تيزي وزو (15)', stars: 1620, avatar: '👦', school: 'مدرسة الأمل' },
    { rank: 7, name: `${profile.name} (أنت)`, wilaya: profile.wilaya, stars: profile.stars, avatar: profile.avatar, school: profile.schoolName, isCurrent: true },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>لوحة الشرف الوطنية للتلاميذ المتفوقين 🏆</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            أوسمة الشرف وصدارة الأوائل
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            تنافس مع زملائك في جميع ولايات الجزائر، حقق الإنجازات اليومية، واجمع شارات التفوق الذهبية!
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          🏆
        </div>
      </div>

      {/* Badges Collection Grid */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>الأوسمة والشارات التقديرية</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
              4 محرزة
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map(b => (
            <div
              key={b.id}
              className={`p-4 rounded-3xl border-2 text-center space-y-2 flex flex-col items-center justify-between transition-all ${b.color}`}
            >
              <span className="text-4xl block mt-1">{b.icon}</span>
              <div>
                <h3 className="text-xs font-black line-clamp-1">{b.name}</h3>
                <p className="text-[10px] opacity-80 mt-0.5 line-clamp-2">{b.desc}</p>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/60">
                {b.isUnlocked ? 'مكتمل ✓' : 'مغلق 🔒'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* National Leaderboard */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              ترتيب أوائل المتفوقين في الجزائر 🇩🇿
            </h2>
            <p className="text-xs text-slate-400">
              يتم تحديث الترتيب يومياً وفق النجوم ونقاط الخبرة المكتسبة من حل التمارين
            </p>
          </div>
          <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-slate-700 px-3 py-1 rounded-xl">
            محدث اليوم
          </span>
        </div>

        <div className="space-y-2.5">
          {leaderboard.map(student => (
            <div
              key={student.rank}
              className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all ${
                student.isCurrent
                  ? 'bg-orange-500 text-white shadow-md font-black scale-102 ring-2 ring-orange-300'
                  : student.rank === 1
                  ? 'bg-amber-50 dark:bg-slate-750 border-2 border-amber-300 text-slate-800 dark:text-slate-100'
                  : 'bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank number or medal */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                  student.rank === 1 ? 'bg-amber-400 text-slate-900' : student.rank === 2 ? 'bg-slate-300 text-slate-900' : student.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : student.rank}
                </div>

                <div className="text-2xl">{student.avatar}</div>

                <div>
                  <h3 className="text-sm font-black">{student.name}</h3>
                  <p className={`text-[11px] font-semibold ${student.isCurrent ? 'text-orange-100' : 'text-slate-400'}`}>
                    {student.school} • {student.wilaya}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-black text-sm">
                <Sparkles size={16} className={student.isCurrent ? 'text-yellow-200' : 'text-amber-500'} />
                <span>{student.stars} نجمة</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
