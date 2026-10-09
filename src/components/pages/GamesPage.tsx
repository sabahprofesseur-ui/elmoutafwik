import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Clock,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  Heart,
  Flame,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export const GamesPage: React.FC = () => {
  const { playCorrect, playWrong, playFanfare, playClick, addStars } = useApp();

  const [activeGame, setActiveGame] = useState<'math' | 'geo' | 'memory'>('math');

  // Math Game State
  const [mathNum1, setMathNum1] = useState(7);
  const [mathNum2, setMathNum2] = useState(8);
  const [mathOp, setMathOp] = useState<'+' | '-' | '×'>('×');
  const [mathScore, setMathScore] = useState(0);
  const [mathTime, setMathTime] = useState(30);
  const [isMathActive, setIsMathActive] = useState(false);
  const [userMathInput, setUserMathInput] = useState('');

  // Geography Game State
  const geoQuestions = [
    {
      q: 'أي ولاية جزائرية تُلقب بـ "مدينة الجسور المعلقة"؟ 🌉',
      opts: ['قسنطينة (25)', 'عنابة (23)', 'سطيف (19)', 'المدية (26)'],
      correct: 0,
      info: 'قسنطينة هي عاصمة الثقافة والجسور المعلقة التاريخية الشامخة.',
    },
    {
      q: 'أي ولاية جزائرية تُلقب بـ "عروس الزيبان" وتشتهر بأجود أنواع التمور (دقلة نور)؟ 🌴',
      opts: ['بسكرة (07)', 'ورقلة (30)', 'الوادي (39)', 'تيميمون (49)'],
      correct: 0,
      info: 'بسكرة بوابة الصحراء الجزائرية وموطن دقلة نور الشهيرة عالمياً.',
    },
    {
      q: 'أي ولاية جزائرية تُعرف بـ "الباهية" وتطل على خليج ساحر؟ 🌊',
      opts: ['وهران (31)', 'مستغانم (27)', 'جيجل (18)', 'سكيكدة (21)'],
      correct: 0,
      info: 'وهران الباهية ثاني كبرى المدن الجزائرية بساحلها الخلاب.',
    },
    {
      q: 'ما هو أعلى جبل في الجزائر ويقع في سلسلة الهقار بتمنراست؟ 🏔️',
      opts: ['قمة تاهات أتاكور (3003 م)', 'جبل لالة خديجة', 'جبل الشريعة', 'جبل الأوراس'],
      correct: 0,
      info: 'قمة تاهات في الهقار بولاية تمنراست ترتفع 3003 أمتار فوق سطح البحر.',
    },
  ];

  const [geoIdx, setGeoIdx] = useState(0);
  const [geoScore, setGeoScore] = useState(0);
  const [geoAnswered, setGeoAnswered] = useState<number | null>(null);

  // Memory Game State
  const memoryIcons = ['🦊', '🦉', '🦁', '🐬', '🐘', '🦅'];
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Init Memory game
  const initMemoryGame = () => {
    const deck = [...memoryIcons, ...memoryIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, id) => ({ id, icon, isFlipped: false, isMatched: false }));
    setMemoryCards(deck);
    setFlippedCards([]);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  // Math Timer
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isMathActive && mathTime > 0) {
      t = setInterval(() => setMathTime(time => time - 1), 1000);
    } else if (isMathActive && mathTime === 0) {
      setIsMathActive(false);
      playFanfare();
      addStars(mathScore * 2);
    }
    return () => clearInterval(t);
  }, [isMathActive, mathTime]);

  const generateMathQuestion = () => {
    const ops: Array<'+' | '-' | '×'> = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    setMathOp(op);

    if (op === '×') {
      setMathNum1(Math.floor(Math.random() * 9) + 2);
      setMathNum2(Math.floor(Math.random() * 9) + 2);
    } else if (op === '-') {
      const a = Math.floor(Math.random() * 40) + 15;
      const b = Math.floor(Math.random() * a);
      setMathNum1(a);
      setMathNum2(b);
    } else {
      setMathNum1(Math.floor(Math.random() * 50) + 10);
      setMathNum2(Math.floor(Math.random() * 50) + 10);
    }
    setUserMathInput('');
  };

  const handleStartMath = () => {
    setMathScore(0);
    setMathTime(30);
    setIsMathActive(true);
    generateMathQuestion();
  };

  const handleCheckMathAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMathActive) return;

    let expected = 0;
    if (mathOp === '+') expected = mathNum1 + mathNum2;
    if (mathOp === '-') expected = mathNum1 - mathNum2;
    if (mathOp === '×') expected = mathNum1 * mathNum2;

    if (parseInt(userMathInput, 10) === expected) {
      playCorrect();
      setMathScore(s => s + 1);
      generateMathQuestion();
    } else {
      playWrong();
      setUserMathInput('');
    }
  };

  // Geography Game check
  const handleSelectGeoOption = (idx: number) => {
    if (geoAnswered !== null) return;
    setGeoAnswered(idx);

    if (idx === geoQuestions[geoIdx].correct) {
      playCorrect();
      setGeoScore(s => s + 1);
    } else {
      playWrong();
    }
  };

  const handleNextGeo = () => {
    if (geoIdx + 1 < geoQuestions.length) {
      setGeoIdx(i => i + 1);
      setGeoAnswered(null);
    } else {
      playFanfare();
      addStars(geoScore * 5);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {
        // safe
      }
    }
  };

  // Memory card click
  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = memoryCards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    playClick();
    const newCards = memoryCards.map(c => (c.id === id ? { ...c, isFlipped: true } : c));
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = newCards.find(c => c.id === newFlipped[0])!;
      const card2 = newCards.find(c => c.id === newFlipped[1])!;

      if (card1.icon === card2.icon) {
        playCorrect();
        setTimeout(() => {
          setMemoryCards(cards =>
            cards.map(c =>
              c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          addStars(5);
        }, 500);
      } else {
        playWrong();
        setTimeout(() => {
          setMemoryCards(cards =>
            cards.map(c =>
              c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>تحديات ذهنية ومسابقات تحفيزية 🎮</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            ألعاب المتفوق التعليمية 🏆
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            سرعة الحساب الذهني، ألغاز ولايات الجزائر، وتحديات قوة الذاكرة. العب، تعلم، واجمع النجوم للأوائل!
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          🎮
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3 overflow-x-auto">
        {[
          { id: 'math', label: 'الحساب الذهني السريع ⚡' },
          { id: 'geo', label: 'لغز ولايات الجزائر 🇩🇿' },
          { id: 'memory', label: 'ذاكرة الأشكال والحيوانات 🃏' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playClick();
              setActiveGame(tab.id as any);
            }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeGame === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-purple-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Game 1: Mental Math Sprint */}
      {activeGame === 'math' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md max-w-2xl mx-auto space-y-6 text-center">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              سباق الـ 30 ثانية في الحساب الذهني ⚡
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              أجب عن أكبر قدر من العمليات قبل نفاد الوقت واربح ضعف النجوم!
            </p>
          </div>

          <div className="flex items-center justify-around p-4 rounded-2xl bg-purple-50 dark:bg-slate-750 border border-purple-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-purple-700 dark:text-purple-300">
              <Clock size={18} />
              <span>الوقت: {mathTime} ثانية</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-600">
              <Trophy size={18} />
              <span>النقاط: {mathScore} صحيحة</span>
            </div>
          </div>

          {isMathActive ? (
            <form onSubmit={handleCheckMathAnswer} className="space-y-6">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-purple-300 dark:border-slate-700 flex items-center justify-center gap-4 text-4xl sm:text-6xl font-black text-purple-600 dark:text-purple-400">
                <span>{mathNum1}</span>
                <span>{mathOp}</span>
                <span>{mathNum2}</span>
                <span>=</span>
                <span>?</span>
              </div>

              <div className="flex justify-center gap-3">
                <input
                  type="number"
                  autoFocus
                  value={userMathInput}
                  onChange={e => setUserMathInput(e.target.value)}
                  placeholder="أدخل الناتج واضغط Enter"
                  className="p-4 rounded-2xl border-2 border-purple-400 bg-white dark:bg-slate-800 text-2xl font-black text-center text-slate-900 dark:text-white focus:outline-none w-48 shadow-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-base rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  تحقق ✓
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 space-y-4">
              {mathScore > 0 && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm font-black text-amber-800">
                  🎉 أحسنت يا بطل! حققت {mathScore} إجابات صحيحة وربحت +{mathScore * 2} نجمة تفوق!
                </div>
              )}
              <button
                onClick={handleStartMath}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {mathScore > 0 ? 'العب جولة جديدة 🔄' : 'انطلق في التحدي الآن 🚀'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game 2: Algeria Geography Quiz */}
      {activeGame === 'geo' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs font-black text-purple-600">
              السؤال {geoIdx + 1} من {geoQuestions.length}
            </span>
            <span className="text-xs font-bold text-amber-600">
              النقاط: {geoScore} / {geoQuestions.length}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
              {geoQuestions[geoIdx].q}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {geoQuestions[geoIdx].opts.map((opt, idx) => {
                const isSelected = geoAnswered === idx;
                const isCorrect = idx === geoQuestions[geoIdx].correct;

                let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-purple-400 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-200';

                if (geoAnswered !== null) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectGeoOption(idx)}
                    className={`p-4 rounded-2xl border-2 text-right text-xs sm:text-sm font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {geoAnswered !== null && (
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-750 border border-purple-200 dark:border-slate-700 text-xs font-bold text-purple-900 dark:text-purple-200">
                💡 معلومة الباحث أمين: {geoQuestions[geoIdx].info}
              </div>
            )}
          </div>

          {geoAnswered !== null && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextGeo}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                {geoIdx + 1 < geoQuestions.length ? 'السؤال التالي ⬅️' : 'إنهاء اللعبة وتجميع النجوم 🏆'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game 3: Memory Matching */}
      {activeGame === 'memory' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md max-w-2xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              لعبة مطابقة البطاقات وقوة الذاكرة 🃏
            </h2>
            <button
              onClick={initMemoryGame}
              className="text-xs font-bold text-purple-600 flex items-center gap-1 cursor-pointer hover:underline"
            >
              <RotateCcw size={14} />
              <span>إعادة توزيع البطاقات</span>
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto pt-2">
            {memoryCards.map(card => {
              const show = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`h-20 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-sm transition-all duration-300 cursor-pointer select-none ${
                    show
                      ? 'bg-amber-100 dark:bg-slate-700 border-2 border-amber-400 rotate-y-180'
                      : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:scale-105'
                  }`}
                >
                  {show ? card.icon : '❓'}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
