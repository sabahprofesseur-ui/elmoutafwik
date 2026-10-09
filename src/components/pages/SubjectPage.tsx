import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_SUBJECTS, GRADES, SAMPLE_LESSONS } from '../../data/curriculum';
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
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  Award,
  Play,
  Search,
  FileText,
  CheckSquare,
  Video,
  Printer
} from 'lucide-react';

export const SubjectPage: React.FC = () => {
  const { nav, navigate, selectedGrade, setSelectedGrade, profile, playClick } = useApp();
  const [selectedTrimester, setSelectedTrimester] = useState<0 | 1 | 2 | 3>(1);
  const [activeContentType, setActiveContentType] = useState<'lessons' | 'summaries' | 'exercises' | 'videos'>('lessons');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHubItem, setSelectedHubItem] = useState<
    | { type: 'summary'; data: GoldenSummary }
    | { type: 'exercise'; data: SolvedExercise }
    | { type: 'video'; data: EducationalVideo }
    | null
  >(null);

  const subjectId = nav.params?.id || 'arabic';
  const subject = ALL_SUBJECTS.find(s => s.id === subjectId) || ALL_SUBJECTS[0];
  const currentGrade = GRADES.find(g => g.id === selectedGrade) || GRADES[2];

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return SAMPLE_LESSONS.filter(l => {
      const matchSubject = l.subjectId === subjectId;
      const matchGrade = l.gradeId === selectedGrade;
      const matchTrimester = selectedTrimester === 0 || l.trimester === selectedTrimester;
      const matchSearch = !searchQuery.trim() || 
        l.title.includes(searchQuery.trim()) || 
        l.subtitle.includes(searchQuery.trim()) || 
        l.unit.includes(searchQuery.trim());
      
      return matchSubject && matchGrade && matchTrimester && matchSearch;
    });
  }, [subjectId, selectedGrade, selectedTrimester, searchQuery]);

  const displayLessons = filteredLessons.length > 0 
    ? filteredLessons 
    : SAMPLE_LESSONS.filter(l => l.subjectId === subjectId);

  // Filter summaries for this subject
  const subjectSummaries = GOLDEN_SUMMARIES.filter(s => s.subjectId === subjectId);
  const displaySummaries = subjectSummaries.length > 0 ? subjectSummaries : GOLDEN_SUMMARIES;

  // Filter exercises for this subject
  const subjectExercises = SOLVED_EXERCISES.filter(e => e.subjectId === subjectId);
  const displayExercises = subjectExercises.length > 0 ? subjectExercises : SOLVED_EXERCISES;

  // Filter videos for this subject
  const subjectVideos = EDUCATIONAL_VIDEOS.filter(v => v.subjectId === subjectId);
  const displayVideos = subjectVideos.length > 0 ? subjectVideos : EDUCATIONAL_VIDEOS;

  return (
    <div className="space-y-6 pb-12 select-none" dir="rtl">
      
      {/* Back button & Subject Title Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => navigate('dashboard')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
        >
          <ArrowRight size={18} />
          <span>العودة إلى لوحة المواد</span>
        </button>

        {/* Grade Pills Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          {GRADES.map(grade => (
            <button
              key={grade.id}
              onClick={() => {
                playClick();
                setSelectedGrade(grade.id);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGrade === grade.id
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-orange-50'
              }`}
            >
              <span>{grade.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Hero Card */}
      <div className={`p-6 sm:p-8 rounded-3xl ${subject.color} text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6`}>
        <div className="space-y-2 text-center sm:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
            <span>منهاج الجيل الثاني 🇩🇿 • {currentGrade.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {subject.nameAr}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            {subject.desc}
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 z-10">
          📚
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content Mode Switcher: Lessons, Summaries, Exercises, Videos */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => {
            playClick();
            setActiveContentType('lessons');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeContentType === 'lessons'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <BookOpen size={16} />
          <span>دروس المادة ({displayLessons.length})</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveContentType('summaries');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeContentType === 'summaries'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <FileText size={16} />
          <span>ملخصات جاهزة 📝</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveContentType('exercises');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeContentType === 'exercises'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <CheckSquare size={16} />
          <span>تمارين محلولة ✏️</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveContentType('videos');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeContentType === 'videos'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Video size={16} />
          <span>شروحات مرئية 🎥</span>
        </button>
      </div>

      {/* ================= SECTION 1: LESSONS ================= */}
      {activeContentType === 'lessons' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Trimester and Search Filter Bar */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-black text-slate-400 shrink-0 ml-1">
                الفصل:
              </span>
              {[
                { id: 0, label: 'جميع الفصول 📖' },
                { id: 1, label: 'الفصل الأول 🍂' },
                { id: 2, label: 'الفصل الثاني ❄️' },
                { id: 3, label: 'الفصل الثالث 🌸' },
              ].map(tri => (
                <button
                  key={tri.id}
                  onClick={() => {
                    playClick();
                    setSelectedTrimester(tri.id as 0 | 1 | 2 | 3);
                  }}
                  className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                    selectedTrimester === tri.id
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-orange-50'
                  }`}
                >
                  {tri.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن درس أو وحدة تعليمية..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pr-10 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 pointer-events-none">
                <Search size={16} />
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="grid grid-cols-1 gap-4">
            {displayLessons.map((lesson, idx) => {
              const isCompleted = profile.completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-orange-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-orange-100 text-orange-700 dark:bg-slate-700 dark:text-orange-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={24} /> : `0${idx + 1}`}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                          {lesson.unit}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">
                          الفصل {lesson.trimester}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {lesson.subtitle}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-[11px] font-bold text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          15 دقيقة
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle size={12} />
                          {lesson.quiz.length} أسئلة تفاعلية
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-black">
                          <Sparkles size={12} />
                          +20 نجمة
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                    <button
                      onClick={() => navigate('lesson', { id: lesson.id })}
                      className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Play size={15} fill="currentColor" />
                      <span>{isCompleted ? 'إعادة الدرس' : 'ابدأ الدرس 🚀'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: SUMMARIES ================= */}
      {activeContentType === 'summaries' && (
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

      {/* ================= SECTION 3: SOLVED EXERCISES ================= */}
      {activeContentType === 'exercises' && (
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

      {/* ================= SECTION 4: EDUCATIONAL VIDEOS ================= */}
      {activeContentType === 'videos' && (
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

      {/* Trimester Exam Callout */}
      <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
            👑
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black">
              اختبار {subject.nameAr} - تقييم المكتسبات
            </h3>
            <p className="text-xs text-purple-100 font-medium mt-0.5">
              نماذج وزارية رسمية مع شبكة التقويم المعيارية للطور الابتدائي.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('acquisition-exams')}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
        >
          خوض الاختبار الآن 📝
        </button>
      </div>

      {/* Content Hub Modal (1-Click Instant Viewer) */}
      <ContentHubModal
        item={selectedHubItem}
        onClose={() => setSelectedHubItem(null)}
      />

    </div>
  );
};
