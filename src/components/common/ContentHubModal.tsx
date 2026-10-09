import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  Printer, 
  Share2, 
  Award,
  Video,
  FileText,
  Check,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { GoldenSummary, SolvedExercise, EducationalVideo } from '../../data/learningHub';
import { ThaloobMascot } from './ThaloobMascot';
import { useApp } from '../../context/AppContext';

type HubItem = 
  | { type: 'summary'; data: GoldenSummary }
  | { type: 'exercise'; data: SolvedExercise }
  | { type: 'video'; data: EducationalVideo };

interface ContentHubModalProps {
  item: HubItem | null;
  onClose: () => void;
}

export const ContentHubModal: React.FC<ContentHubModalProps> = ({ item, onClose }) => {
  const { speakText, stopSpeaking, playClick, playCorrect, addStars } = useApp();

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isSolutionRevealed, setIsSolutionRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setVideoProgress(0);
    setIsSolutionRevealed(false);
    return () => {
      stopSpeaking();
    };
  }, [item]);

  // Video progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            playCorrect();
            addStars(10);
            return 100;
          }
          return prev + 2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!item) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAudioSummary = (text: string) => {
    playClick();
    speakText(text);
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in select-none" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-orange-200 dark:border-slate-700 relative text-right flex flex-col animate-in zoom-in-95">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {item.type === 'summary' ? '📝' : item.type === 'exercise' ? '✏️' : '🎥'}
            </span>
            <div>
              <span className="text-[11px] font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {item.type === 'summary' ? 'ملخص ذهبي مباشر' : item.type === 'exercise' ? 'تمرين محلول مع التفسير' : 'شرح مرئي تفاعلي'}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                {item.data.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* ================= TYPE 1: GOLDEN SUMMARY ================= */}
          {item.type === 'summary' && (
            <div className="space-y-6">
              
              {/* Top Banner */}
              <div className={`p-6 rounded-3xl bg-gradient-to-r ${item.data.color} text-white shadow-lg space-y-2 relative overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full">
                    {item.data.category}
                  </span>
                  <button
                    onClick={() => handleAudioSummary(item.data.keyPoints.join('. ') + '. ' + item.data.goldenRule)}
                    className="flex items-center gap-1.5 text-xs font-black bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                  >
                    <Volume2 size={16} />
                    <span>استمع للملخص 🎙️</span>
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">{item.data.title}</h2>
              </div>

              {/* Key Summary Points */}
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>📌</span>
                  <span>النقاط الجوهرية التي يجب حفظها:</span>
                </h4>
                <div className="space-y-2.5">
                  {item.data.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Golden Rule Card */}
              <div className="p-5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-sm">
                  <Sparkles size={18} className="text-amber-500 fill-amber-400" />
                  <span>القاعدة الذهبية للاختبار:</span>
                </div>
                <p className="text-xs sm:text-sm font-black text-amber-950 dark:text-amber-100 leading-relaxed">
                  {item.data.goldenRule}
                </p>
              </div>

              {/* Quick Example */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-1">
                <span className="text-[11px] font-black text-emerald-800 dark:text-emerald-300">
                  مثال تطبيقي سريع:
                </span>
                <p className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200">
                  {item.data.quickExample}
                </p>
              </div>

              {/* Exam Tip */}
              <div className="p-4 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl space-y-1">
                <span className="text-[11px] font-black text-purple-800 dark:text-purple-300">
                  💡 نصيحة المعلم في تقييم المكتسبات:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-200">
                  {item.data.examAdvice}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer size={16} />
                  <span>طباعة الملخص 🖨️</span>
                </button>

                <button
                  onClick={() => {
                    addStars(5);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer"
                >
                  فهمت الملخص وأتممته! ⭐
                </button>
              </div>

            </div>
          )}

          {/* ================= TYPE 2: SOLVED EXERCISE ================= */}
          {item.type === 'exercise' && (
            <div className="space-y-6">
              
              {/* Question Box */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border-2 border-orange-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-100 dark:bg-slate-700 text-orange-700 dark:text-orange-300 text-xs font-black px-3 py-1 rounded-full">
                    مستوى: {item.data.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">نموذج وزاري رسمي</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-relaxed">
                  {item.data.question}
                </h4>
              </div>

              {/* Solution Reveal Button */}
              {!isSolutionRevealed ? (
                <div className="text-center py-6 space-y-3">
                  <p className="text-xs text-slate-500 font-bold">
                    حاول حل التمرين في مسودتك أولاً، ثم اضغط على الزر لمشاهدة الحل النموذجي خطوة بخطوة 🧠
                  </p>
                  <button
                    onClick={() => {
                      playClick();
                      setIsSolutionRevealed(true);
                      addStars(10);
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
                  >
                    <span>كشف الحل النموذجي والتفسير 💡</span>
                  </button>
                </div>
              ) : (
                /* Step-by-Step Solution Breakdown */
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>مراحل الحل النموذجي وسلم التنقيط:</span>
                  </h4>

                  <div className="space-y-3">
                    {item.data.steps.map(step => (
                      <div key={step.stepNumber} className="p-4 bg-emerald-50/60 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-1">
                        <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300">
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                            {step.stepNumber}
                          </span>
                          <span>{step.instruction}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-white pr-7">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Final Answer Banner */}
                  <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl space-y-1 shadow-md">
                    <span className="text-xs font-bold text-amber-100">النتيجة النهائية المعتمدة:</span>
                    <p className="text-sm sm:text-base font-black">{item.data.finalAnswer}</p>
                  </div>

                  {/* Mascot Note */}
                  <div className="p-4 bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 rounded-2xl flex items-start gap-3">
                    <span className="text-3xl animate-kid-bounce shrink-0">🦊</span>
                    <div className="text-xs space-y-0.5">
                      <p className="font-black text-orange-600">تفسير ثعلوب الذكي:</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.data.mascotExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TYPE 3: EDUCATIONAL VIDEO ================= */}
          {item.type === 'video' && (
            <div className="space-y-6">
              
              {/* Simulated Interactive Video Screen */}
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border-4 border-slate-800 shadow-2xl flex flex-col justify-between p-4 sm:p-6 text-white group">
                
                {/* Simulated Canvas Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center space-y-2">
                    <span className="text-6xl sm:text-7xl block animate-kid-bounce">
                      {item.data.thumbnail}
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-white px-4">
                      {item.data.title}
                    </h3>
                    <p className="text-xs text-amber-300 font-bold">
                      {isPlaying ? 'جارٍ تشغيل الشرح المرئي...' : 'اضغط على زر التشغيل للمشاهدة'}
                    </p>
                  </div>
                </div>

                {/* Top overlay badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-orange-500/90 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full">
                    {item.data.videoType === 'animation' ? 'رسوم كرتونية متحركة 🎬' : 'شرح تفاعلي مباشر 🎙️'}
                  </span>
                  <span className="bg-black/40 text-slate-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {item.data.duration}
                  </span>
                </div>

                {/* Center Big Play Button */}
                <div className="relative z-10 flex items-center justify-center">
                  <button
                    onClick={() => {
                      playClick();
                      setIsPlaying(prev => !prev);
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" fill="currentColor" />}
                  </button>
                </div>

                {/* Bottom Controls Bar */}
                <div className="relative z-10 space-y-2 bg-black/50 p-2.5 rounded-2xl backdrop-blur-md">
                  {/* Scrubber */}
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer">
                    <div 
                      className="bg-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setVideoProgress(0);
                          setIsPlaying(true);
                        }}
                        className="hover:text-white cursor-pointer"
                      >
                        <RotateCcw size={14} />
                      </button>
                      <span>{Math.floor((videoProgress / 100) * 6)}:{String(Math.floor((videoProgress % 10) * 6)).padStart(2, '0')}</span>
                    </div>

                    <span>{item.data.duration}</span>
                  </div>
                </div>

              </div>

              {/* Video Description */}
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  عن هذا الدرس المرئي:
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {item.data.description}
                </p>
              </div>

              {/* Timeline Chapters */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  فصول ومحطات الفيديو:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.data.chapters.map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playClick();
                        setVideoProgress(idx * 25);
                        setIsPlaying(true);
                      }}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      <span>{chap.title}</span>
                      <span className="text-orange-500 font-mono text-[10px] bg-orange-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        {chap.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Takeaway Note */}
              <div className="p-4 bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200">
                  الخلاصة الذهبية: {item.data.summaryNote}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
