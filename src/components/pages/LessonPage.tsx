import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_LESSONS } from '../../data/curriculum';
import confetti from 'canvas-confetti';
import { LessonCompletionModal } from '../common/LessonCompletionModal';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  ChevronLeft,
  RotateCcw
} from 'lucide-react';

export const LessonPage: React.FC = () => {
  const { nav, navigate, playCorrect, playWrong, playFanfare, speakText, stopSpeaking, markLessonComplete } = useApp();
  
  const lessonId = nav.params?.id || '5ap-ar-01';
  const lesson = SAMPLE_LESSONS.find(l => l.id === lessonId) || SAMPLE_LESSONS[0];

  const [activeTab, setActiveTab] = useState<'story' | 'explanation' | 'quiz'>('story');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleAudioNarration = () => {
    if (isReadingAloud) {
      stopSpeaking();
      setIsReadingAloud(false);
    } else {
      setIsReadingAloud(true);
      const textToRead = `${lesson.title}. ${lesson.storyIntro}. ${lesson.summary.join('. ')}`;
      speakText(textToRead, () => setIsReadingAloud(false));
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const currentQ = lesson.quiz[currentQuizIdx];
    
    if (selectedOption === currentQ.correctAnswer) {
      playCorrect();
      setScore(s => s + 1);
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx + 1 < lesson.quiz.length) {
      setCurrentQuizIdx(idx => idx + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      setShowCelebrationModal(true);
      playFanfare();
      markLessonComplete(lesson.id);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Back button & Lesson Unit */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            stopSpeaking();
            navigate('subject', { id: lesson.subjectId });
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors"
        >
          <ArrowRight size={18} />
          <span>العودة إلى قائمة الدروس</span>
        </button>

        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800 px-3 py-1 rounded-full">
          {lesson.unit}
        </span>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {lesson.subtitle}
            </p>
          </div>

          {/* Voice Narration Button */}
          <button
            onClick={handleAudioNarration}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              isReadingAloud
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-orange-50 hover:bg-orange-100 text-orange-600 dark:bg-slate-700 dark:text-orange-300'
            }`}
          >
            {isReadingAloud ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isReadingAloud ? 'إيقاف الصوت ⏹️' : 'استمع للدرس 🎙️'}</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pt-2">
          <button
            onClick={() => setActiveTab('story')}
            className={`pb-3 px-4 text-xs sm:text-sm font-black transition-all border-b-2 cursor-pointer ${
              activeTab === 'story'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            قصة الدرس وشرح ثعلوب 🦊
          </button>
          <button
            onClick={() => setActiveTab('explanation')}
            className={`pb-3 px-4 text-xs sm:text-sm font-black transition-all border-b-2 cursor-pointer ${
              activeTab === 'explanation'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            القواعد والأمثلة 📖
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-3 px-4 text-xs sm:text-sm font-black transition-all border-b-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            اختبر فهمك 🎯 ({lesson.quiz.length} أسئلة)
          </button>
        </div>
      </div>

      {/* Tab 1: Story Intro */}
      {activeTab === 'story' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800/90 dark:to-slate-850 p-6 sm:p-8 rounded-3xl border-2 border-orange-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-kid-bounce">🦊</span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  قصة الانطلاق مع ثعلوب
                </h3>
                <span className="text-xs text-orange-600 font-bold">عش المغامرة واكتشف المعنى</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-loose font-bold bg-white/70 dark:bg-slate-900/50 p-5 rounded-2xl border border-orange-100 dark:border-slate-700">
              {lesson.storyIntro}
            </p>

            <div className="p-4 bg-orange-500 text-white rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                <Sparkles size={18} />
                <span>نصيحة ثعلوب: {lesson.mascotTip}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('explanation')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              انتقل إلى شرح القواعد والأمثلة ⬅️
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Explanation & Examples */}
      {activeTab === 'explanation' && (
        <div className="space-y-6">
          {/* Summary Points */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-orange-500">📌</span>
              <span>النقاط الأساسية للدرس:</span>
            </h3>

            <div className="space-y-2.5">
              {lesson.summary.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Rules */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800/60 p-6 rounded-3xl space-y-3">
            <h3 className="text-base font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <span>⭐</span>
              <span>القاعدة الذهبية التي لا تُنسى:</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-200">
              {lesson.keyRules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Examples */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              أمثلة نموذجية توضيحية:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.examples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-750 border border-amber-200 dark:border-slate-700">
                  <p className="text-sm font-black text-slate-900 dark:text-white text-center pb-2 border-b border-amber-200 dark:border-slate-700">
                    {ex.text}
                  </p>
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 text-center pt-2">
                    {ex.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              ابدأ الاختبار التفاعلي واربح النجوم 🎯
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
          
          {!isQuizCompleted ? (
            <>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-black text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 pb-3">
                <span>السؤال {currentQuizIdx + 1} من {lesson.quiz.length}</span>
                <span className="text-emerald-600 font-bold">النقاط: {score} / {lesson.quiz.length}</span>
              </div>

              {/* Question Body */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
                  {lesson.quiz[currentQuizIdx].question}
                </h3>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {lesson.quiz[currentQuizIdx].options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === lesson.quiz[currentQuizIdx].correctAnswer;

                    let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-orange-400 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-200';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-orange-500 bg-orange-50 dark:bg-slate-700 text-orange-700 dark:text-orange-300 font-black';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-4 rounded-2xl border-2 text-right text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-black">
                            {['أ', 'ب', 'ج', 'د'][idx]}
                          </span>
                          <span>{option}</span>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 size={20} className="text-emerald-600" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle size={20} className="text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation note after submitting */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-slate-750 border border-orange-200 dark:border-slate-700 text-xs space-y-1">
                  <p className="font-black text-orange-700 dark:text-orange-400">توضيح المعلم:</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300">{lesson.quiz[currentQuizIdx].explanation}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    تأكيد الإجابة 🚀
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{currentQuizIdx + 1 < lesson.quiz.length ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
                    <ChevronLeft size={16} />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Quiz Completed Celebration Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-5xl shadow-xl animate-bounce">
                🏆
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  أحسنت صنعاً يا بطل! تم إكمال الدرس بنجاح
                </h3>
                <p className="text-sm font-bold text-slate-500">
                  حصلت على <span className="text-orange-500 text-lg font-black">{score}</span> من أصل <span className="font-black">{lesson.quiz.length}</span> في الاختبار.
                </p>
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-black mt-2">
                  <Sparkles size={16} />
                  <span>ربحت +15 نجمة تفوق و +50 نقطة خبرة!</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>إعادة حل الاختبار</span>
                </button>
                <button
                  onClick={() => navigate('subject', { id: lesson.subjectId })}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  العودة إلى دروس المادة 📚
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Lesson Completion Celebratory Modal */}
      <LessonCompletionModal
        isOpen={showCelebrationModal}
        onClose={() => setShowCelebrationModal(false)}
        lessonTitle={lesson.title}
        starsEarned={20}
        scorePercentage={Math.round((score / lesson.quiz.length) * 100)}
        badgeEarned={score === lesson.quiz.length ? 'بطل الرياضيات الذكي' : undefined}
        onNextLesson={() => {
          setShowCelebrationModal(false);
          navigate('subject', { id: lesson.subjectId });
        }}
      />

    </div>
  );
};
