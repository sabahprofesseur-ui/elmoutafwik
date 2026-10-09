import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GRADES, getSubjectsForGrade } from '../../data/curriculum';
import { 
  GOLDEN_SUMMARIES, 
  SOLVED_EXERCISES, 
  EDUCATIONAL_VIDEOS,
  GoldenSummary,
  SolvedExercise,
  EducationalVideo
} from '../../data/learningHub';
import { ContentHubModal } from '../common/ContentHubModal';
import {
  Sparkles,
  BookOpen,
  Calculator,
  Moon,
  FlaskConical,
  Users,
  Lightbulb,
  Languages,
  Terminal,
  Palette,
  ChevronLeft,
  Flame,
  Award,
  Compass,
  ArrowRight,
  CheckCircle2,
  Play,
  Trophy,
  Star,
  FileText,
  Video,
  CheckSquare,
  UserCheck
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    profile, 
    selectedGrade, 
    setSelectedGrade, 
    navigate, 
    currentUser, 
    isGuest, 
    playClick
  } = useApp();

  const [activeTab, setActiveTab] = useState<'subjects' | 'summaries' | 'exercises' | 'videos'>('subjects');
  const [selectedHubItem, setSelectedHubItem] = useState<
    | { type: 'summary'; data: GoldenSummary }
    | { type: 'exercise'; data: SolvedExercise }
    | { type: 'video'; data: EducationalVideo }
    | null
  >(null);

  const currentGrade = GRADES.find(g => g.id === selectedGrade) || GRADES[2];
  const subjects = getSubjectsForGrade(selectedGrade);

  // Filter content for this grade (or fallback)
  const summaries = GOLDEN_SUMMARIES.filter(s => s.gradeId === selectedGrade);
  const displaySummaries = summaries.length > 0 ? summaries : GOLDEN_SUMMARIES;

  const exercises = SOLVED_EXERCISES.filter(e => e.gradeId === selectedGrade);
  const displayExercises = exercises.length > 0 ? exercises : SOLVED_EXERCISES;

  const videos = EDUCATIONAL_VIDEOS.filter(v => v.gradeId === selectedGrade);
  const displayVideos = videos.length > 0 ? videos : EDUCATIONAL_VIDEOS;

  const ALL_BADGES = [
    { id: 'first_step', title: 'خطوة البداية', desc: 'أتممت أول درس تفاعلي بنجاح!', icon: '🚀', xp: 50 },
    { id: 'math_genius', title: 'بطل الرياضيات الذكي', desc: 'حققت درجة كاملة في اختبار الحساب!', icon: '📐', xp: 100 },
    { id: 'reading_hero', title: 'فصيح الضاد', desc: 'قرأت 3 نصوص واستمعت لتسجيلها الصوتي!', icon: '📖', xp: 100 },
    { id: 'science_star', title: 'مستكشف الطبيعة', desc: 'أجريت أول تجربة في مختبر العلوم!', icon: '🔬', xp: 75 },
    { id: 'streak_master', title: 'شعلة الالتزام', desc: 'تعلمت لمدة 3 أيام متتالية دون انقطاع!', icon: '🔥', xp: 150 },
    { id: 'exam_ace', title: 'فارس تقييم المكتسبات', desc: 'اجتزت نموذج امتحان وزاري رسمي بتقييم (أ)!', icon: '👑', xp: 200 },
  ];

  const renderSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={26} />;
      case 'Calculator': return <Calculator size={26} />;
      case 'Moon': return <Moon size={26} />;
      case 'FlaskConical': return <FlaskConical size={26} />;
      case 'Users': return <Users size={26} />;
      case 'Lightbulb': return <Lightbulb size={26} />;
      case 'Languages': return <Languages size={26} />;
      case 'Terminal': return <Terminal size={26} />;
      case 'Palette': return <Palette size={26} />;
      default: return <BookOpen size={26} />;
    }
  };

  return (
    <div className="space-y-8 pb-12 select-none" dir="rtl">
      
      {/* Student Welcome Banner */}
      <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-[2.5rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -ml-10 -mt-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-right">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl sm:text-5xl shadow-lg shrink-0">
              {profile.avatar}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black">
                  مرحباً بك يا {profile.name}! 🌟
                </h1>
                {currentUser ? (
                  <span className="bg-emerald-500/80 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <UserCheck size={12} />
                    <span>حساب موثق</span>
                  </span>
                ) : isGuest ? (
                  <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span>حساب زائر</span>
                  </span>
                ) : null}
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-100">
                أنت في <span className="bg-white/25 px-2 py-0.5 rounded-lg text-white">{currentGrade.name}</span> • جاهز للمغامرة التعليمية اليوم؟
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-1 text-xs font-bold text-white/90 flex-wrap">
                <span className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-xl">
                  <Flame size={14} className="text-yellow-300 fill-yellow-300" />
                  {profile.streakDays} أيام متتالية
                </span>
                <span className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-xl">
                  <Sparkles size={14} className="text-yellow-300 fill-yellow-300" />
                  {profile.stars} نجمة تفوق
                </span>
                <span className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-xl">
                  <Trophy size={14} className="text-yellow-300" />
                  {profile.unlockedBadges.length} أوسمة شرف
                </span>
              </div>
            </div>
          </div>

          {/* Quick Mascot Tip card */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-sm flex items-start gap-3">
            <span className="text-3xl animate-kid-bounce shrink-0">🦊</span>
            <div className="text-xs">
              <p className="font-black text-yellow-300">نصيحة ثعلوب اليومية:</p>
              <p className="font-semibold text-white/95 mt-0.5 leading-relaxed">
                "اختر ملخصاً أو تمريناً محلولاً أو درساً مرئياً بضغطة زر واحدة وانطلق مباشرة دون أي تعقيد!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Selector Switcher */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>اختر السنة الدراسية:</span>
            <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              المنهاج الجزائري
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {GRADES.map(grade => {
            const isSelected = selectedGrade === grade.id;
            return (
              <button
                key={grade.id}
                onClick={() => {
                  playClick();
                  setSelectedGrade(grade.id);
                }}
                className={`p-3 rounded-2xl flex items-center justify-center gap-2 font-black text-xs sm:text-sm transition-all border-2 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                }`}
              >
                <span className="text-lg">{grade.icon}</span>
                <span>{grade.shortName}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Learning Hub Tabs (One-click Access) */}
      <section className="space-y-4">
        
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                playClick();
                setActiveTab('subjects');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'subjects'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <BookOpen size={16} />
              <span>الدروس والمواد المقررة 📚</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setActiveTab('summaries');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'summaries'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <FileText size={16} />
              <span>الملخصات الذهبية الجاهزة 📝</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setActiveTab('exercises');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'exercises'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <CheckSquare size={16} />
              <span>تمارين محلولة بالتفصيل ✏️</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setActiveTab('videos');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Video size={16} />
              <span>فيديوهات وشروحات مرئية 🎥</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SUBJECTS & LESSONS */}
        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in">
            {subjects.map(subject => (
              <div
                key={subject.id}
                onClick={() => navigate('subject', { id: subject.id })}
                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-orange-400 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-13 h-13 rounded-2xl ${subject.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      {renderSubjectIcon(subject.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                        {subject.nameAr}
                      </h3>
                      {subject.nameFr && (
                        <span className="text-xs text-slate-400 font-bold block">{subject.nameFr}</span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-black text-orange-500 bg-orange-50 dark:bg-slate-700/80 px-2.5 py-1 rounded-xl">
                    3 فصول
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2">
                  {subject.desc}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs font-black text-orange-600 dark:text-orange-400">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>دخول الدروس</span>
                    <ChevronLeft size={16} />
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">تصفح فوري</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: GOLDEN SUMMARIES */}
        {activeTab === 'summaries' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
            {displaySummaries.map(summary => (
              <div
                key={summary.id}
                onClick={() => {
                  playClick();
                  setSelectedHubItem({ type: 'summary', data: summary });
                }}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-orange-100 dark:border-slate-700 hover:border-orange-400 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-2xl bg-orange-50 dark:bg-slate-700 group-hover:scale-110 transition-transform">
                      {summary.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                        {summary.category}
                      </span>
                      <h3 className="text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-orange-500 transition-colors">
                        {summary.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/80 dark:bg-slate-700/60 rounded-2xl border border-amber-200 dark:border-slate-600">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">
                    القاعدة الذهبية:
                  </span>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-2 mt-0.5">
                    {summary.goldenRule}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs font-black text-orange-600 dark:text-orange-400">
                  <span>فتح وقراءة الملخص مباشرة 📄</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg text-slate-500">جاهز للطباعة 🖨️</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SOLVED EXERCISES */}
        {activeTab === 'exercises' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
            {displayExercises.map(exercise => (
              <div
                key={exercise.id}
                onClick={() => {
                  playClick();
                  setSelectedHubItem({ type: 'exercise', data: exercise });
                }}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-emerald-100 dark:border-slate-700 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                    مستوى: {exercise.difficulty}
                  </span>
                  <span className="text-[11px] font-black text-amber-500 flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>+10 نقاط</span>
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {exercise.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-750 p-3 rounded-2xl">
                  {exercise.question}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
                  <span>عرض الحل خطوة بخطوة 💡</span>
                  <span className="text-[10px] bg-emerald-50 dark:bg-slate-700 px-2 py-1 rounded-lg">مع سلم التنقيط</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: EDUCATIONAL VIDEOS */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
            {displayVideos.map(video => (
              <div
                key={video.id}
                onClick={() => {
                  playClick();
                  setSelectedHubItem({ type: 'video', data: video });
                }}
                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border-2 border-purple-100 dark:border-slate-700 hover:border-purple-400 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-3 group"
              >
                {/* Simulated Thumbnail */}
                <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-900 flex items-center justify-center text-white relative overflow-hidden shadow-inner">
                  <span className="text-5xl group-hover:scale-125 transition-transform duration-300">
                    {video.thumbnail}
                  </span>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} fill="currentColor" className="translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {video.duration}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                    {video.videoType === 'animation' ? 'رسوم متحركة 🎬' : 'شرح تفاعلي 🎙️'}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* Rewards & Points Hub Section */}
      <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 border-2 border-orange-100 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-md">
              <Trophy size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                خزانة الأوسمة ومكافآت التلميذ
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                أكمل الدروس وحل التمارين لفتح كل الأوسمة والحصول على لقب البطل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-orange-100 dark:bg-slate-700 text-orange-700 dark:text-orange-300 font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Star size={14} className="fill-amber-400 text-amber-500" />
              <span>{profile.xp} نقطة خبرة (XP)</span>
            </span>
          </div>
        </div>

        {/* Badges Cards Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {ALL_BADGES.map(badge => {
            const isUnlocked = profile.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl text-center space-y-1.5 border transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/70 dark:bg-slate-700/60 border-amber-300 dark:border-amber-500/40 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60 grayscale'
                }`}
              >
                <div className="text-3xl sm:text-4xl block animate-kid-bounce">
                  {badge.icon}
                </div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                  {badge.desc}
                </p>
                <div className="pt-1">
                  {isUnlocked ? (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                      <CheckCircle2 size={10} />
                      <span>محقّق</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                      +{badge.xp} XP
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Content Hub Modal (1-Click Instant Viewer) */}
      <ContentHubModal
        item={selectedHubItem}
        onClose={() => setSelectedHubItem(null)}
      />

    </div>
  );
};
