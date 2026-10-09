import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_EXAMS, AcquisitionExam } from '../../data/exams';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  CheckCircle2,
  FileCheck,
  Printer,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

export const AcquisitionExamsPage: React.FC = () => {
  const { profile, playCorrect, playFanfare, playWrong, addStars, markExamComplete } = useApp();

  const [selectedExam, setSelectedExam] = useState<AcquisitionExam>(SAMPLE_EXAMS[0]);
  const [examState, setExamState] = useState<'intro' | 'active' | 'results'>('intro');
  const [timeLeft, setTimeLeft] = useState(selectedExam.durationMinutes * 60);

  // User answers { questionId: chosenOptionIndex }
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userLevel, setUserLevel] = useState<'أ' | 'ب' | 'ج' | 'د'>('أ');
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (examState === 'active' && timeLeft === 0) {
      handleFinishExam();
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const handleStartExam = () => {
    setAnswers({});
    setTimeLeft(selectedExam.durationMinutes * 60);
    setExamState('active');
  };

  const handleAnswerChange = (qId: string, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleFinishExam = () => {
    let score = 0;
    selectedExam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const percent = (score / selectedExam.questions.length) * 100;
    let lvl: 'أ' | 'ب' | 'ج' | 'د' = 'أ';
    if (percent >= 80) lvl = 'أ';
    else if (percent >= 60) lvl = 'ب';
    else if (percent >= 40) lvl = 'ج';
    else lvl = 'د';

    setUserLevel(lvl);
    setFinalScore(score);
    setExamState('results');

    markExamComplete(selectedExam.id);
    addStars(50);
    playFanfare();

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch {
      // safe
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>امتحان تقييم مكتسبات مرحلة التعليم الابتدائي بالجزائر 🇩🇿</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            بنك امتحانات تقييم المكتسبات الرسمية
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            محاكاة دقيقة للامتحان الوزاري مع معايير التقييم الرباعية (أ: تحكم أقصى، ب: تحكم مقبول، ج: تحكم جزئي، د: تحكم محدود) وتوليد شهادة تفوق رسمية.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          👑
        </div>
      </div>

      {/* Exam selector buttons (Intro state) */}
      {examState === 'intro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SAMPLE_EXAMS.map(exam => (
              <div
                key={exam.id}
                onClick={() => setSelectedExam(exam)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
                  selectedExam.id === exam.id
                    ? 'border-purple-500 bg-purple-50/70 dark:bg-slate-800 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 bg-purple-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    السنة 5 ابتدائي
                  </span>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Clock size={14} />
                    {exam.durationMinutes} دقيقة
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                  {exam.subtitle}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-xs font-bold text-purple-600">
                  {exam.questions.length} وضعيات تقييمية
                </div>
              </div>
            ))}
          </div>

          {/* Exam Details & Instructions Card */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                تفاصيل: {selectedExam.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {selectedExam.subtitle}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-purple-600">الكفاءات المستهدفة بالتقويم:</span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-bold">
                {selectedExam.competencies.map((comp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-750 border border-amber-200 dark:border-slate-700 text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
              ⚠️ تنبيه للتلميذ: هذا الامتحان يتبع نفس المعايير الرسمية لوزارة التربية الوطنية. يُرجى قراءة السند بعناية، والتركيز في اختيار الإجابة الأكثر دقة.
            </div>

            <button
              onClick={handleStartExam}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              ابدأ الاختبار الرسمي الآن ⏱️
            </button>
          </div>
        </div>
      )}

      {/* Active Exam Mode */}
      {examState === 'active' && (
        <div className="space-y-6">
          {/* Sticky Header with Timer */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 dark:text-white">{selectedExam.title}</span>
            </div>

            <div className="flex items-center gap-2 bg-purple-50 dark:bg-slate-750 px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-purple-700 dark:text-purple-300">
              <Clock size={16} className="animate-spin text-purple-600" />
              <span>الوقت المتبقي: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Reading Passage if available */}
          {selectedExam.passageText && (
            <div className="bg-amber-50/70 dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border-2 border-amber-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-black text-orange-600 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-orange-200">
                السند المكتوب (النص القرائي) 📜
              </span>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-bold leading-loose text-justify">
                {selectedExam.passageText}
              </p>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-6">
            {selectedExam.questions.map((q, idx) => {
              const selectedOpt = answers[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                    <span className="text-xs font-black text-purple-600 bg-purple-50 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
                      {q.field}
                    </span>
                    <span className="text-xs font-bold text-slate-400">سؤال {idx + 1}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-relaxed">
                    {q.prompt}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswerChange(q.id, optIdx)}
                        className={`p-3.5 rounded-2xl border-2 text-right text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-3 ${
                          selectedOpt === optIdx
                            ? 'border-purple-600 bg-purple-50 dark:bg-slate-700 text-purple-900 dark:text-purple-200 font-black'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 border flex items-center justify-center text-xs font-black shrink-0">
                          {['أ', 'ب', 'ج', 'د'][optIdx]}
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleFinishExam}
              disabled={Object.keys(answers).length < selectedExam.questions.length}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              تسليم ورقة الامتحان وعرض التقييم الوزاري 🏁
            </button>
          </div>
        </div>
      )}

      {/* Results & Official Printable Certificate */}
      {examState === 'results' && (
        <div className="space-y-8">
          {/* Printable Official Certificate */}
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white border-8 border-amber-300 shadow-2xl relative text-slate-900 space-y-8 print:border-4 print:shadow-none print:m-0">
            {/* Algerian Official Header */}
            <div className="text-center space-y-1.5 border-b-2 border-slate-300 pb-6">
              <p className="text-sm font-black text-slate-700">الجمهورية الجزائرية الديمقراطية الشعبية</p>
              <p className="text-xs font-bold text-slate-500">وزارة التربية الوطنية • ديوان الامتحانات والمسابقات</p>
              <h2 className="text-2xl sm:text-4xl font-black text-amber-600 pt-2 tracking-wide font-['Cairo']">
                شَهَادَةُ تَقْيِيمِ الْمُكْتَسَبَاتِ وَالتَّفَوُّقِ 🎓
              </h2>
            </div>

            <div className="space-y-4 text-center max-w-2xl mx-auto py-2">
              <p className="text-base sm:text-lg font-bold text-slate-600 leading-relaxed">
                تَشْهَدُ إِدَارَةُ مَنْصَةِ <span className="font-black text-orange-600">الْمُتَفَوِّقِ الصَّغِيرِ</span> بِأَنَّ التِّلْمِيذَ الْبَطَلَ:
              </p>
              <p className="text-2xl sm:text-4xl font-black text-slate-900 border-b-2 border-dashed border-amber-400 inline-block px-8 pb-1">
                {profile.name}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-500">
                المسجل في: {profile.schoolName} ({profile.wilaya})
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-700 leading-loose">
                قَدِ اجْتَازَ بِنَجَاحٍ وَجَدَارَةٍ امْتِحَانَ: <br />
                <span className="font-black text-purple-700">{selectedExam.title}</span>
              </p>
            </div>

            {/* Assessment Grid */}
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 max-w-xl mx-auto flex items-center justify-around text-center">
              <div>
                <p className="text-xs text-slate-500 font-bold">مستوى التحكم الوزاري المحقق</p>
                <p className="text-3xl font-black text-emerald-600 mt-1">
                  المستوى ({userLevel})
                </p>
                <span className="text-xs font-black text-slate-700">
                  {userLevel === 'أ' ? 'تحكم أقصى ممتاز ⭐' : userLevel === 'ب' ? 'تحكم مقبول جيد' : 'تحكم جزئي'}
                </span>
              </div>
              <div className="h-12 w-0.5 bg-amber-200" />
              <div>
                <p className="text-xs text-slate-500 font-bold">العلامة التقديرية</p>
                <p className="text-3xl font-black text-amber-600 mt-1">
                  {Math.round((finalScore / selectedExam.questions.length) * 20)} / 20
                </p>
                <span className="text-xs font-bold text-slate-500">
                  {finalScore} من {selectedExam.questions.length} كفاءات
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 text-xs font-black text-slate-600">
              <div className="text-center">
                <p>تاريخ الإنجاز:</p>
                <p className="text-slate-400 font-normal mt-1">{new Date().toLocaleDateString('ar-DZ')}</p>
              </div>

              <div className="w-20 h-20 rounded-full border-4 border-amber-500 flex items-center justify-center text-center text-[10px] font-black text-amber-600 rotate-12 shadow-sm">
                ختم التفوق 🇩🇿
              </div>

              <div className="text-center">
                <p>توقيع مرشد المتفوقين (ثعلوب):</p>
                <p className="text-xl mt-1">🦊 ✍️</p>
              </div>
            </div>
          </div>

          {/* Action buttons (Print & Restart) */}
          <div className="flex flex-wrap items-center justify-center gap-4 print:hidden">
            <button
              onClick={handlePrintCertificate}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
            >
              <Printer size={18} />
              <span>طباعة الشهادة الرسمية أو حفظها كـ PDF</span>
            </button>

            <button
              onClick={() => setExamState('intro')}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-sm rounded-2xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw size={18} />
              <span>العودة لقائمة الامتحانات</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
