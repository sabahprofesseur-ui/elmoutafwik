import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  Play,
  Square,
  CheckCircle2,
  Clock,
  Award,
  ChevronLeft,
  RotateCcw,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Story {
  id: string;
  title: string;
  gradeText: string;
  durationMin: number;
  wordCount: number;
  vocalizedContent: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

const STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'قَطْرَةُ الْمَاءِ الْمُغَامِرَةُ فِي جِبَالِ جُرْجُرَة',
    gradeText: 'مناسب لجميع السنوات الابتدائية',
    durationMin: 3,
    wordCount: 85,
    vocalizedContent: `كَانَتْ قَطْرَةُ الْمَاءِ الصَّغِيرَةُ "نَدِيَّةُ" تَعِيشُ فَوْقَ قِمَّةِ جَبَلِ جُرْجُرَةَ الْعَالِي بِالْجَزَائِرِ. وَفِي صَبَاحٍ مُشْمِسٍ، شَعَرَتْ بِدِفْءِ أَشِعَّةِ الشَّمْسِ الذَّهَبِيَّةِ، فَتَحَوَّلَتْ إِلَى بُخَارٍ خَفِيفٍ وَطَارَتْ نَحْوَ السَّمَاءِ الزَّرْقَاءِ. هُنَاكَ الْتَقَتْ بِأَخَوَاتِهَا الْقَطَرَاتِ وَشَكَّلْنَ سَحَابَةً بَيْضَاءَ جَمِيلَةً. سَارَتِ السَّحَابَةُ مَعَ الرِّيَاحِ حَتَّى وَصَلَتْ إِلَى حُقُولِ الْقَمْحِ الْعَطْشَى، فَسَقَطَتْ نَدِيَّةُ عَلَى شَكْلِ حَبَّاتِ مَطَرٍ مُبَارَكٍ، فَفَرِحَ الْفَلَّاحُونَ وَاخْضَرَّتِ الْأَرْضُ بِالْخَيْرِ وَالْبَرَكَةِ.`,
    questions: [
      {
        question: 'أين كانت تعيش قطرة الماء "ندية" في البداية؟',
        options: ['في قاع البحر الأبيض المتوسط', 'فوق قمة جبل جرجرة العالي', 'في بئر بالصحراء', 'داخل حنفية المنزل'],
        correct: 1,
        explanation: 'عاشت ندية فوق قمة جبل جرجرة الشامخ في الجزائر.',
      },
      {
        question: 'إلى ماذا تحولت قطرة الماء بفعل حرارة الشمس؟',
        options: ['إلى جليد صلب', 'إلى بخار خفيف صعد للسماء', 'إلى زيت', 'إلى حجر'],
        correct: 1,
        explanation: 'الحرارة أدت إلى تبخر الماء وصعوده إلى طبقات الجو العليا.',
      },
      {
        question: 'ما هو الأثر الطيب الذي تركته قطرات المطر عند سقوطها؟',
        options: ['جفاف الأشجار', 'فرح الفلاحين واخضرار الأرض', 'إغلاق المدارس', 'ضياع المحصول'],
        correct: 1,
        explanation: 'المطر روى حقول القمح العطشى ففرح الفلاحون وازدهرت الأرض.',
      },
    ],
  },
  {
    id: 'story-2',
    title: 'أَمَانَةُ التِّلْمِيذِ سَلِيمٍ فِي سَاحَةِ الْمَدْرَسَةِ',
    gradeText: 'قصة تربوية هادفة في الأخلاق',
    durationMin: 2,
    wordCount: 75,
    vocalizedContent: `فِي وَقْتِ الِاسْتِرَاحَةِ، كَانَ التِّلْمِيذُ سَلِيمٌ يَتَمَشَّى فِي سَاحَةِ الْمَدْرَسَةِ، فَلَمَحَ مِحْفَظَةَ نُقُودٍ صَغِيرَةً مُلْقَاةً عَلَى الْأَرْضِ. لَمْ يَتَرَدَّدْ سَلِيمٌ لَحْظَةً وَاحِدَةً، بَلْ سَارَعَ وَحَمَلَهَا إِلَى مُدِيرِ الْمَدْرَسَةِ. أَعْلَنَ الْمُدِيرُ فِي الْمِكْرُوفُونِ، فَحَضَرَ صَاحِبُ الْمِحْفَظَةِ وَهُوَ يَبْكِي، وَلَمَّا وَجَدَهَا فَرِحَ كَثِيراً وَشَكَرَهُ. وَفِي الْيَوْمِ التَّالِي، كَرَّمَ الْمُدِيرُ سَلِيماً أَمَامَ جَمِيعِ التَّلَامِيذِ بِلَقَبِ "الْبَطَلُ الْأَمِينُ".`,
    questions: [
      {
        question: 'ماذا وجد سليم في ساحة المدرسة؟',
        options: ['قلم رصاص', 'محفظة نقود ملقاة على الأرض', 'كرة قدم جديدة', 'كتاب رياضيات'],
        correct: 1,
        explanation: 'وجد محفظة نقود ملقاة في الساحة.',
      },
      {
        question: 'ما هو التصرف النبيل الذي قام به سليم فوراً؟',
        options: ['أخذها إلى بيته', 'سلمها لمدير المدرسة بأمانة', 'تركها مكانها', 'فتحها وصرف النقود'],
        correct: 1,
        explanation: 'حملها مباشرة إلى الإدارة إيماناً بخلق الأمانة العظيم.',
      },
    ],
  },
];

export const ReadingCoachPage: React.FC = () => {
  const { playCorrect, playWrong, playFanfare, speakText, stopSpeaking, addStars } = useApp();

  const [selectedStory, setSelectedStory] = useState<Story>(STORIES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [readingTimerSeconds, setReadingTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Comprehension answers
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [comprehensionScore, setComprehensionScore] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setReadingTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartAudio = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(selectedStory.vocalizedContent, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleToggleTimer = () => {
    setIsTimerRunning(r => !r);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setReadingTimerSeconds(0);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckAnswers = () => {
    let correctCount = 0;
    selectedStory.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        correctCount += 1;
      }
    });

    setComprehensionScore(correctCount);
    setShowResults(true);

    if (correctCount === selectedStory.questions.length) {
      playFanfare();
      addStars(20);
      try {
        confetti({ particleCount: 80, spread: 60 });
      } catch {
        // safe
      }
    } else {
      playCorrect();
      addStars(10);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>نصوص مشكولة وقراءة جهورية واضحة 🎙️</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            مدرب القراءة والمطالعة الذكي
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            استمع للنصوص المقروءة بصوت نقي، تدرب على مخارج الحروف، قس سرعتك في القراءة، وأجب عن أسئلة الفهم لتربح النجوم!
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          📖
        </div>
      </div>

      {/* Story Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STORIES.map(story => (
          <div
            key={story.id}
            onClick={() => {
              stopSpeaking();
              setIsPlayingAudio(false);
              setSelectedStory(story);
              setUserAnswers({});
              setShowResults(false);
              handleResetTimer();
            }}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
              selectedStory.id === story.id
                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-slate-800 shadow-md'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 dark:bg-slate-700 px-2.5 py-0.5 rounded-full">
                {story.gradeText}
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {story.title}
              </h3>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 pt-1">
                <span>{story.wordCount} كلمة</span>
                <span>•</span>
                <span>{story.durationMin} دقائق</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
              قراءة
            </div>
          </div>
        ))}
      </div>

      {/* Story Reader Box */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Controls Bar: Audio narration & Timer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartAudio}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              }`}
            >
              {isPlayingAudio ? <Square size={16} /> : <Play size={16} />}
              <span>{isPlayingAudio ? 'إيقاف الاستماع ⏹️' : 'استمع للنص بصوت ثعلوب 🎙️'}</span>
            </button>
          </div>

          {/* Reading Timer */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-750 px-3.5 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Clock size={16} className="text-orange-500" />
            <span>وقت القراءة: {Math.floor(readingTimerSeconds / 60)}:{(readingTimerSeconds % 60).toString().padStart(2, '0')}</span>
            <button
              onClick={handleToggleTimer}
              className="text-emerald-600 hover:underline px-1 cursor-pointer font-black"
            >
              {isTimerRunning ? 'إيقاف' : 'بدء القياس'}
            </button>
            <button
              onClick={handleResetTimer}
              className="text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
            >
              إعادة
            </button>
          </div>
        </div>

        {/* Vocalized Content Text */}
        <div className="bg-amber-50/50 dark:bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-amber-200/70 dark:border-slate-700">
          <p className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-[2.4] text-justify selection:bg-emerald-200">
            {selectedStory.vocalizedContent}
          </p>
        </div>

        {/* Reading Tip */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-slate-750 text-xs text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-slate-700">
          <Sparkles size={18} className="shrink-0 text-emerald-600" />
          <span>نصيحة ثعلوب للقراءة المعبرة: قف عند الفاصلة وقفة خفيفة، وعند النقطة وقفة تامة، ولا تسكن الحرف الأخير إلا عند الوقف! 🦊</span>
        </div>
      </div>

      {/* Comprehension Quiz Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🎯</span>
            <span>أسئلة فهم المقروء والفكرة العامة:</span>
          </h2>
          <span className="text-xs font-bold text-orange-600">
            {selectedStory.questions.length} أسئلة
          </span>
        </div>

        <div className="space-y-6">
          {selectedStory.questions.map((q, qIdx) => {
            const chosen = userAnswers[qIdx];
            const isCorrect = chosen === q.correct;

            return (
              <div key={qIdx} className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700">
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-emerald-400 text-slate-800 dark:text-slate-200';

                    if (showResults) {
                      if (optIdx === q.correct) {
                        style = 'bg-emerald-100 border-emerald-500 text-emerald-800 font-black';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-100 border-rose-500 text-rose-800';
                      }
                    } else if (isSelected) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-700 font-black';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-right transition-all cursor-pointer ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 pt-1">
                    ✓ التفسير: {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Score */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          {!showResults ? (
            <button
              onClick={handleCheckAnswers}
              disabled={Object.keys(userAnswers).length < selectedStory.questions.length}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              تصحيح إجاباتي واحتساب النجوم ⭐
            </button>
          ) : (
            <div className="flex items-center gap-4 w-full justify-between">
              <span className="text-sm font-black text-slate-800 dark:text-white">
                نتيجتك: {comprehensionScore} من {selectedStory.questions.length} أسئلة صحيحة! 🎉
              </span>
              <button
                onClick={() => {
                  setUserAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-200"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
