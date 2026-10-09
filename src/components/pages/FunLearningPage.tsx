import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MASCOTS } from '../../data/mascots';
import {
  Sparkles,
  Rocket,
  Compass,
  Award,
  Play,
  CheckCircle2,
  HelpCircle,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Adventure {
  id: string;
  title: string;
  desc: string;
  mascotId: string;
  color: string;
  badge: string;
  storySnippet: string;
  challenge: {
    question: string;
    options: string[];
    correct: number;
    rewardXp: number;
  };
}

export const FunLearningPage: React.FC = () => {
  const { playCorrect, playFanfare, playWrong, addStars } = useApp();

  const [adventures, setAdventures] = useState<Adventure[]>([
    {
      id: 'adv-1',
      title: 'مملكة القواعد والكلمات المفقودة 🏰',
      desc: 'مهمة المحقق اللغوي لاكتشاف أسرار الحروف، النحو، وصيد الأخطاء مع ثعلوب.',
      mascotId: 'thaloob',
      color: 'from-orange-500 to-amber-500',
      badge: 'وسام المحقق اللغوي 📜',
      storySnippet: 'دخل ثعلوب قلعة الكلمات، فوجد باب الكنز مغلقاً برمز سري لا يفتحه إلا من يميز الفاعل من المفعول به في ثوانٍ!',
      challenge: {
        question: 'في جملة "كَرَّمَ الْمُعَلِّمُ التِّلْمِيذَ"، من هو بطل الجملة الذي قام بالتكريم (الفاعل)؟',
        options: ['التلميذ', 'المعلمُ', 'كرّم', 'لا يوجد فاعل'],
        correct: 1,
        rewardXp: 30,
      },
    },
    {
      id: 'adv-2',
      title: 'كوكب الألغاز وسفينة ديدو الفضائية 🪐',
      desc: 'تحديات المتجر الافتراضي ومسائل الضرب الذهني السريع مع الروبوت ديدو.',
      mascotId: 'dido',
      color: 'from-emerald-500 to-teal-500',
      badge: 'شارة العبقري الحسابي 🤖',
      storySnippet: 'نفد وقود مركبة ديدو الفضائية فوق مدار كوكب الأرقام! ولتعبئة خزان الطاقة، يحتاج إلى حل معادلة المضاعفات فوراً!',
      challenge: {
        question: 'إذا كان خزان المركبة يحتاج إلى 6 أضعاف الرقم 9، كم لتراً من الطاقة يحتاج؟',
        options: ['45 لتراً', '54 لتراً', '63 لتراً', '36 لتراً'],
        correct: 1,
        rewardXp: 30,
      },
    },
    {
      id: 'adv-3',
      title: 'واحة الطبيعة وسر الواحات الصحراوية 🌴',
      desc: 'استكشاف منابع الماء العذبة في تيميمون وبسكرة وكيف تتكيف النخيل مع الحرارة.',
      mascotId: 'salma',
      color: 'from-cyan-500 to-blue-500',
      badge: 'وسام حامي الواحات 🌿',
      storySnippet: 'سافرت سلمى مع أمين إلى واحة تغيت الساحرة، وتساءلت كيف تبقى شجرة النخيل خضراء شامخة في قلب الرمال الحارقة؟',
      challenge: {
        question: 'ما الذي يساعد النخلة على امتصاص الماء من أعماق الأرض الصحراوية؟',
        options: ['جذورها العميقة الممتدة', 'أوراقها العريضة جداً', 'لون جذعها', 'أغصانها القصيرة'],
        correct: 0,
        rewardXp: 30,
      },
    },
  ]);

  const [activeAdventure, setActiveAdventure] = useState<Adventure | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generator modal state
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTopic, setCustomTopic] = useState('');

  const handleStartAdventure = (adv: Adventure) => {
    setActiveAdventure(adv);
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsSuccess(false);
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered || !activeAdventure) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === activeAdventure.challenge.correct) {
      playFanfare();
      setIsSuccess(true);
      addStars(15);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {
        // safe
      }
    } else {
      playWrong();
      setIsSuccess(false);
    }
  };

  const handleGenerateCustomAdventure = () => {
    if (!customTopic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const newAdv: Adventure = {
        id: `custom-${Date.now()}`,
        title: `مغامرة استكشاف: ${customTopic} ✨`,
        desc: `رحلة تفاعلية ذكية تم إنشاؤها خصيصاً لمفهوم "${customTopic}" لمساعدة التلاميذ.`,
        mascotId: 'thaloob',
        color: 'from-purple-600 to-pink-600',
        badge: 'وسام المستكشف المبتكر 🌟',
        storySnippet: `بينما كان ثعلوب وأصدقاؤه يبحثون في موسوعة المعرفة عن "${customTopic}"، ظهر لغز ذهبي غامض يتطلب شجاعة وإجابة ذكية!`,
        challenge: {
          question: `ما هي أهم معلومة يجب أن يتذكرها التلميذ عند دراسة "${customTopic}"؟`,
          options: [
            'التركيز والملاحظة الدقيقة وتطبيق القواعد',
            'التسرع والإجابة دون قراءة',
            'نسيان المراجعة',
            'عدم السؤال عند الصعوبة',
          ],
          correct: 0,
          rewardXp: 40,
        },
      };

      setAdventures(prev => [newAdv, ...prev]);
      setActiveAdventure(newAdv);
      setCustomTopic('');
      playCorrect();
    }, 800);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Banner matching elmoutafwik */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center lg:text-right max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black border border-white/30">
            <span className="text-yellow-300">🇩🇿</span>
            <span>مناهج الجيل الثاني الرسمية بالجزائر • متعة التعلم</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight">
            متعة التعلم باللعب والقصص 🚀✨
          </h1>
          <p className="text-xs sm:text-base font-bold opacity-90 leading-relaxed">
            مقررات السنوات الابتدائية تتحول إلى مغامرات مشوقة، تشبيهات بصرية ملموسة، وخرائط ذهنية ذكية وتحديات مع رفقاء المعرفة!
          </p>

          <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-2 text-xs font-black">
              <span>أوسمة متعة التعلم المحرزة: 4 أوسمة 🎖️</span>
            </div>
          </div>
        </div>

        {/* Mascot portraits strip */}
        <div className="shrink-0 flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-[2.5rem] border border-white/20">
          {MASCOTS.map(m => (
            <div key={m.id} className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/40 flex items-center justify-center text-3xl shadow-md transition-all hover:scale-110">
                {m.avatar}
              </div>
              <span className="text-[11px] font-black text-white">{m.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Adventure Generator Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-800 flex items-center justify-center text-2xl shrink-0">
            🪄
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              توليد مغامرة ذكية لأي درس تريده!
            </h3>
            <p className="text-xs text-slate-400">
              اكتب اسم أي درس (مثال: الكسور، الأفعال الخمسة، الثورة التحريرية) لتوليد مغامرة خاصة به.
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={e => setCustomTopic(e.target.value)}
            placeholder="اسم الدرس..."
            className="p-3 rounded-2xl border-2 border-yellow-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-xs sm:text-sm font-black text-slate-900 dark:text-white focus:outline-none"
          />
          <button
            onClick={handleGenerateCustomAdventure}
            disabled={isGenerating || !customTopic.trim()}
            className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-slate-900 font-black text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer whitespace-nowrap"
          >
            {isGenerating ? 'جارِ التوليد...' : 'انطلق 🚀'}
          </button>
        </div>
      </div>

      {/* Adventures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adventures.map(adv => (
          <div
            key={adv.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-purple-400 shadow-xs hover:shadow-lg transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                  {adv.badge}
                </span>
                <span className="text-2xl">
                  {MASCOTS.find(m => m.id === adv.mascotId)?.avatar || '🦊'}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {adv.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {adv.desc}
              </p>
            </div>

            <button
              onClick={() => handleStartAdventure(adv)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Play size={15} fill="currentColor" />
              <span>ابدأ المغامرة والتحدي</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Adventure Modal/Card */}
      {activeAdventure && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-purple-400 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-xs font-bold text-purple-600">{activeAdventure.badge}</span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {activeAdventure.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveAdventure(null)}
              className="text-slate-400 hover:text-slate-600 font-bold text-xs"
            >
              إغلاق ✕
            </button>
          </div>

          {/* Story intro snippet */}
          <div className="p-5 rounded-2xl bg-purple-50 dark:bg-slate-750 border border-purple-100 dark:border-slate-700 text-sm font-bold text-purple-950 dark:text-purple-200 leading-relaxed">
            "{activeAdventure.storySnippet}"
          </div>

          {/* Challenge Question */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              تحدي فتح البوابة السحرية: {activeAdventure.challenge.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeAdventure.challenge.options.map((opt, idx) => {
                const isCorrect = idx === activeAdventure.challenge.correct;
                const isSelected = selectedOpt === idx;

                let style = 'bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700 hover:border-purple-400 text-slate-800 dark:text-slate-200';

                if (isAnswered) {
                  if (isCorrect) {
                    style = 'bg-emerald-100 border-emerald-500 text-emerald-800 font-black';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-100 border-rose-500 text-rose-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 rounded-2xl border-2 text-right text-xs sm:text-sm font-bold transition-all cursor-pointer ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`p-4 rounded-2xl text-xs sm:text-sm font-black ${
                isSuccess ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
              }`}>
                {isSuccess
                  ? '🎉 إجابة عبقرية! فتحت البوابة السحرية وربحت +15 نجمة تفوق!'
                  : 'حاول مرة أخرى وركز مع رفيقك الذكي!'}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
