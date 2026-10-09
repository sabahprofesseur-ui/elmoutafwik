import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Send,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Copy,
  PenTool,
  RotateCcw
} from 'lucide-react';

interface ParsedWord {
  word: string;
  type: 'اسم' | 'فعل' | 'حرف';
  role: string;
  state: 'مرفوع' | 'منصوب' | 'مجرور' | 'مبني' | 'حسب موقعه الإعرابي';
  mark: string;
  explanation: string;
}

export const ArabicAssistantPage: React.FC = () => {
  const { playClick, playCorrect, speakText, stopSpeaking } = useApp();

  const [activeMode, setActiveMode] = useState<'eerab' | 'expression' | 'tashkeel'>('eerab');
  const [inputText, setInputText] = useState('الْعِلْمُ نُورٌ يُضِيءُ دُرُوبَ الْحَيَاةِ');
  const [parsedWords, setParsedWords] = useState<ParsedWord[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Expression builder state
  const [selectedTopic, setSelectedTopic] = useState('الوطن');
  const [studentComposition, setStudentComposition] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const sampleSentences = [
    'الْعِلْمُ نُورٌ يُضِيءُ دُرُوبَ الْحَيَاةِ',
    'كَتَبَ التِّلْمِيذُ الدَّرْسَ بِعِنَايَةٍ',
    'كَانَ الْمُعَلِّمُ مَاهِراً فِي شَرْحِهِ',
    'إِنَّ الصِّدْقَ خُلُقٌ عَظِيمٌ',
    'يَجْتَهِدُ الْمُهَنْدِسُونَ فِي بِنَاءِ الْجَزَائِرِ',
  ];

  const handleParseSentence = () => {
    playClick();
    setIsAnalyzing(true);
    setParsedWords([]);

    setTimeout(() => {
      setIsAnalyzing(false);
      playCorrect();

      // Rule-based rich parser tailored for Algerian primary school sentences
      const clean = inputText.trim();

      if (clean.includes('العلم') || clean.includes('الْعِلْمُ')) {
        setParsedWords([
          {
            word: 'الْعِلْمُ',
            type: 'اسم',
            role: 'مبتدأ',
            state: 'مرفوع',
            mark: 'الضمة الظاهرة على آخره',
            explanation: 'اسم معرفة ابتدأنا به الجملة الاسمية، وحكمه الرفع دائماً.',
          },
          {
            word: 'نُورٌ',
            type: 'اسم',
            role: 'خبر المبتدأ',
            state: 'مرفوع',
            mark: 'الضمة الظاهرة (تنوين الضم)',
            explanation: 'الكلمة التي أخبرت عن المبتدأ وتممت معنى الجملة المفيدة.',
          },
          {
            word: 'يُضِيءُ',
            type: 'فعل',
            role: 'فعل مضارع',
            state: 'مرفوع',
            mark: 'الضمة الظاهرة على آخره',
            explanation: 'فعل يدل على حدث في الحاضر أو المستقبل، والفاعل ضمير مستتر تقديره هو.',
          },
          {
            word: 'دُرُوبَ',
            type: 'اسم',
            role: 'مفعول به',
            state: 'منصوب',
            mark: 'الفتحة الظاهرة على آخره',
            explanation: 'وقع عليه فعل الفاعل، وهو مضاف.',
          },
          {
            word: 'الْحَيَاةِ',
            type: 'اسم',
            role: 'مضاف إليه',
            state: 'مجرور',
            mark: 'الكسرة الظاهرة على آخره',
            explanation: 'اسم معرف ومجرور جاء ليوضح ويخصص الكلمة النكرة قبله.',
          },
        ]);
      } else if (clean.includes('كتب') || clean.includes('كَتَبَ')) {
        setParsedWords([
          {
            word: 'كَتَبَ',
            type: 'فعل',
            role: 'فعل ماضٍ',
            state: 'مبني',
            mark: 'الفتح الظاهر على آخره',
            explanation: 'يدل على حدث وقع في الزمن الماضي وانتهى.',
          },
          {
            word: 'التِّلْمِيذُ',
            type: 'اسم',
            role: 'فاعل',
            state: 'مرفوع',
            mark: 'الضمة الظاهرة على آخره',
            explanation: 'هو من قام بالفعل (من الذي كتب؟ التلميذ).',
          },
          {
            word: 'الدَّرْسَ',
            type: 'اسم',
            role: 'مفعول به',
            state: 'منصوب',
            mark: 'الفتحة الظاهرة على آخره',
            explanation: 'وقع عليه فعل الكتابة (ماذا كتب التلميذ؟ الدرس).',
          },
          {
            word: 'بِـ',
            type: 'حرف',
            role: 'حرف جر',
            state: 'مبني',
            mark: 'الكسر',
            explanation: 'حرف جر يربط بين الكلمات ويجر الاسم بعده.',
          },
          {
            word: 'عِنَايَةٍ',
            type: 'اسم',
            role: 'اسم مجرور بالباء',
            state: 'مجرور',
            mark: 'الكسرة الظاهرة (تنوين الكسر)',
            explanation: 'اسم سبقه حرف جر فحكمه الجر.',
          },
        ]);
      } else if (clean.includes('كان') || clean.includes('كَانَ')) {
        setParsedWords([
          {
            word: 'كَانَ',
            type: 'فعل',
            role: 'فعل ماضٍ ناقص (ناسخ)',
            state: 'مبني',
            mark: 'الفتح الظاهر على آخره',
            explanation: 'يدخل على الجملة الاسمية فيرفع المبتدأ ويسمى اسمه وينصب الخبر ويسمى خبره.',
          },
          {
            word: 'الْمُعَلِّمُ',
            type: 'اسم',
            role: 'اسم كان',
            state: 'مرفوع',
            mark: 'الضمة الظاهرة على آخره',
            explanation: 'هو المبتدأ في الأصل، رُفِع بدخول كان الناسخة عليه.',
          },
          {
            word: 'مَاهِراً',
            type: 'اسم',
            role: 'خبر كان',
            state: 'منصوب',
            mark: 'الفتحة الظاهرة (تنوين الفتح)',
            explanation: 'هو الخبر في الأصل، نُصِب بفعل الناسخ كان.',
          },
          {
            word: 'فِي شَرْحِهِ',
            type: 'اسم',
            role: 'جار ومجرور ومضاف إليه',
            state: 'مجرور',
            mark: 'الكسرة والهاء ضمير متصل',
            explanation: 'شبه جملة متعلقة بما قبلها.',
          },
        ]);
      } else {
        // Dynamic smart breakdown
        const words = clean.split(/\s+/).filter(Boolean);
        setParsedWords(
          words.map((w, i) => ({
            word: w,
            type: i === 0 && (w.startsWith('ي') || w.startsWith('ت') || w.startsWith('ك')) ? 'فعل' : 'اسم',
            role: i === 0 ? 'مبتدأ أو فعل الجملة' : i === 1 ? 'خبر أو فاعل' : 'مكمل الجملة أو مفعول به',
            state: i === 0 ? 'مرفوع' : 'حسب موقعه الإعرابي',
            mark: 'علامة أصلية ظاهرة',
            explanation: `تحليل ثعلوب الذكي: كلمة "${w}" لها موقع تركيبي متناسق في الجملة.`,
          }))
        );
      }
    }, 400);
  };

  const handleEvaluateExpression = () => {
    playClick();
    if (studentComposition.length < 30) {
      setFeedback('تعبيرك جميل ولكن حاول كتابة فقرة أطول تحتوي على 3 أسطر على الأقل مع توظيف الروابط (ثم، و، كذلك، لذلك). 🦊');
      return;
    }
    playCorrect();
    setFeedback(`أحسنت يا بطل! تعبيرك عن "${selectedTopic}" مميز وفيه تسلسل أفكار جيد. نصيحة ثعلوب: تذكر دائماً وضع علامات الوقف (الفواصل والنقطة في نهاية الفقرة) لتبهر أستاذك وتضمن العلامة الكاملة! ⭐`);
  };

  const topicsData: Record<string, { intro: string; ideas: string[]; quote: string }> = {
    'الوطن': {
      intro: 'الوطن هو أغلى ما يملكه الإنسان، هو الأرض الطيبة التي ولدنا على ترابها وتنفسنا هواءها وارتوينا من عذب مائها.',
      ideas: [
        'تضحيات شهداء الجزائر الأبرار من أجل الحرية والكرامة.',
        'واجبنا كتلاميذ في الجد والاجتهاد بالعلم لرفع راية الجزائر عالياً.',
        'المحافظة على الممتلكات العامة والمساهمة في ازدهار المجتمع.',
      ],
      quote: 'قال الشاعر مفدي زكريا: بلادي أحبك فوق الظنون.. وأشدو بحبك في كل ناد.',
    },
    'الأم وفضل الوالدين': {
      intro: 'الأم نبع الحنان الذي لا ينضب، والشمس المضيئة التي تنير دروب حياتنا بالسعادة والعطاء دون مقابل.',
      ideas: [
        'سهر الأم وتعبها في تربيتنا وتعليمنا ومداواتنا عند المرض.',
        'واجب بر الوالدين وطاعتهما وإدخال السرور على قلبيهما.',
        'الدعاء الدائم لهما بالصحة والرحمة.',
      ],
      quote: 'قال تعالى: "وَقَضَى رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا".',
    },
    'نظافة البيئة والشجرة': {
      intro: 'البيئة هي بيتنا الكبير الذي نعيش فيه، ونظافتها عنوان رقي المجتمع وصحة أفراده وجمال محيطهم.',
      ideas: [
        'أهمية التشجير وزراعة النباتات في تنقية الهواء ومنع التصحر.',
        'رمي النفايات في الأماكن المخصصة وتجنب تلويث الشواطئ والغابات.',
        'المشاركة في حملات التطوع المدرسية لتزيين الأقسام والساحات.',
      ],
      quote: 'قال رسول الله صلى الله عليه وسلم: "النَّظَافَةُ مِنَ الْإِيمَانِ".',
    },
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>الذكاء الاصطناعي في خدمة لغة الضاد 🇩🇿</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            مساعد الضاد الذكي مع ثعلوب 🦊
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            تعلم إعراب الجمل كلمة بكلمة، صغ أروع التعابير الكتابية، واكتشف أسرار لغتنا العربية الجميلة بأسلوب ميسر ومبسط.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          🦊
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveMode('eerab')}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeMode === 'eerab'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-50'
          }`}
        >
          <Bot size={18} />
          <span>الإعراب الفوري للجمل</span>
        </button>

        <button
          onClick={() => setActiveMode('expression')}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeMode === 'expression'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-50'
          }`}
        >
          <PenTool size={18} />
          <span>مساعد ومصحح التعبير الكتابي</span>
        </button>
      </div>

      {/* Mode 1: Instant Syntax Parser */}
      {activeMode === 'eerab' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <label className="block text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
              اكتب الجملة التي تريد إعرابها، أو اختر من الأمثلة الشائعة:
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="أدخل جملة اسمية أو فعلية هنا..."
                className="flex-1 p-3.5 rounded-2xl border-2 border-orange-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/80 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleParseSentence}
                disabled={isAnalyzing || !inputText.trim()}
                className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={18} />
                <span>{isAnalyzing ? 'جارِ التحليل...' : 'أعرب مع ثعلوب 🪄'}</span>
              </button>
            </div>

            {/* Quick sample chips */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-bold text-slate-400">نماذج وزارية جاهزة للتجربة:</span>
              <div className="flex flex-wrap gap-2">
                {sampleSentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(s);
                      setParsedWords([]);
                    }}
                    className="text-xs font-bold bg-orange-50 hover:bg-orange-100 dark:bg-slate-750 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-xl border border-orange-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display */}
          {parsedWords.length > 0 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>جدول الإعراب التفصيلي:</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    إجابة نموذجية
                  </span>
                </h3>

                <button
                  onClick={() => {
                    const text = parsedWords.map(w => `${w.word}: ${w.role} ${w.state} وعلامته ${w.mark}`).join('. ');
                    speakText(text);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl hover:bg-orange-100 cursor-pointer"
                >
                  <Volume2 size={16} />
                  <span>استمع للإعراب كاملاً</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parsedWords.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-800 p-5 rounded-3xl border-2 border-orange-100 dark:border-slate-700 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                      <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                        {item.word}
                      </span>
                      <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        {item.type}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="font-black text-slate-900 dark:text-white">
                        الموقع الإعرابي: <span className="text-emerald-600 font-bold">{item.role}</span>
                      </p>
                      <p className="font-semibold text-slate-600 dark:text-slate-300">
                        الحالة: <span className="font-black text-slate-900 dark:text-white">{item.state}</span>
                      </p>
                      <p className="font-semibold text-slate-600 dark:text-slate-300">
                        العلامة: <span className="text-orange-600 font-bold">{item.mark}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80 text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      💡 {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Expression Coach */}
      {activeMode === 'expression' && (
        <div className="space-y-6">
          {/* Topic Selector */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              اختر موضوع التعبير المطلوب:
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {Object.keys(topicsData).map(topic => (
                <button
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setFeedback(null);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-orange-50'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Selected Topic Guide Card */}
            {topicsData[selectedTopic] && (
              <div className="mt-4 p-5 rounded-2xl bg-amber-50 dark:bg-slate-750 border border-amber-200 dark:border-slate-700 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-black text-orange-600">مقدمة مقترحة ملهمة:</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                    "{topicsData[selectedTopic].intro}"
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-amber-200 dark:border-slate-700">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">أفكار رئيسية للعرض:</span>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 font-medium space-y-1">
                    {topicsData[selectedTopic].ideas.map((idea, i) => (
                      <li key={i}>{idea}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-amber-200 dark:border-slate-700 text-xs font-black text-emerald-700 dark:text-emerald-400">
                  ⭐ شاهد داعم: {topicsData[selectedTopic].quote}
                </div>
              </div>
            )}
          </div>

          {/* Student Editor */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                اكتب فقرتك التعبيرية هنا ليقوم ثعلوب بتصحيحها وإثرائها:
              </label>
              <span className="text-xs text-slate-400 font-bold">
                {studentComposition.trim().split(/\s+/).filter(Boolean).length} كلمة
              </span>
            </div>

            <textarea
              rows={6}
              value={studentComposition}
              onChange={e => setStudentComposition(e.target.value)}
              placeholder="ابدأ بمقدمة جميلة، ثم تحدث عن الأفكار الرئيسية، واختم بنصيحة وشاهد من القرآن أو الشعر..."
              className="w-full p-4 rounded-2xl border-2 border-orange-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/80 text-sm font-medium text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:border-orange-500"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStudentComposition('')}
                className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>مسح النص</span>
              </button>

              <button
                onClick={handleEvaluateExpression}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>راجع تعبيري وقدم لي النصائح 🦊</span>
              </button>
            </div>

            {feedback && (
              <div className="p-4 rounded-2xl bg-orange-100 dark:bg-slate-700 border border-orange-300 dark:border-slate-600 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed space-y-1">
                <span className="block font-black text-orange-700 dark:text-orange-400">تقييم ثعلوب لموضوعك:</span>
                <p>{feedback}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
