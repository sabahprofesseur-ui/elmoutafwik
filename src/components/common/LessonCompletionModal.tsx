import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { ThaloobMascot } from './ThaloobMascot';

interface LessonCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  starsEarned: number;
  scorePercentage: number;
  badgeEarned?: string;
  onNextLesson?: () => void;
}

export const LessonCompletionModal: React.FC<LessonCompletionModalProps> = ({
  isOpen,
  onClose,
  lessonTitle,
  starsEarned,
  scorePercentage,
  badgeEarned,
  onNextLesson,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF8A00', '#FFD700', '#3B82F6', '#10B981'],
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-400 dark:border-slate-700 text-center space-y-6 relative overflow-hidden animate-in zoom-in-95">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Mascot */}
        <div className="flex justify-center -mb-4">
          <ThaloobMascot expression="excited" size="sm" showBadge={false} />
        </div>

        <div className="space-y-1.5">
          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black px-3.5 py-1 rounded-full inline-block">
            🎉 مبروك يا بطل! أحسنت عملاً
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
            أتممت درس «{lessonTitle}» بنجاح!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            لقد أظهرت تركيزاً رائعاً واكتسبت مهارات جديدة اليوم
          </p>
        </div>

        {/* Rewards Summary Box */}
        <div className="grid grid-cols-2 gap-3 bg-amber-50/70 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-200 dark:border-slate-700">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">النجوم المكتسبة</span>
            <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-lg">
              <Star size={18} className="fill-amber-400" />
              <span>+{starsEarned} نجمة</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">درجة التقييم</span>
            <div className="flex items-center justify-center gap-1 text-emerald-600 font-black text-lg">
              <CheckCircle2 size={18} />
              <span>{scorePercentage}%</span>
            </div>
          </div>
        </div>

        {badgeEarned && (
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2.5 text-xs font-black shadow-md">
            <Award size={18} />
            <span>وسام جديد: {badgeEarned}! 🏅</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              الانتقال إلى الدرس التالي 🚀
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            العودة إلى لوحة الدروس
          </button>
        </div>

      </div>
    </div>
  );
};
