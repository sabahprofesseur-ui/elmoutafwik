import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DICTIONARY_WORDS } from '../../data/dictionary';
import {
  BookMarked,
  Search,
  Volume2,
  Sparkles,
  ArrowRight,
  Languages,
  Tag
} from 'lucide-react';

export const DictionaryPage: React.FC = () => {
  const { speakText, playClick } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = ['الكل', 'أخلاق', 'علوم', 'تاريخ', 'حيوانات', 'أدوات مدرسية'];

  const filteredWords = DICTIONARY_WORDS.filter(w => {
    const matchesSearch =
      w.word.includes(searchQuery) ||
      w.meaning.includes(searchQuery) ||
      w.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'الكل' || w.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>المعجم اللغوي المصور للأطفال 📖</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            قاموس لغة الضاد المصور
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            استكشف معاني الكلمات الفصيحة مشكولة، مرادفاتها وأضدادها، مع ترجمتها إلى الفرنسية والإنجليزية ونطقها الصوتي.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          📚
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="relative">
          <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كلمة بالعربية، أو بالفرنسية والإنجليزية..."
            className="w-full pr-12 pl-4 py-3.5 rounded-2xl border-2 border-indigo-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map(word => (
          <div
            key={word.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{word.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-indigo-700 dark:text-indigo-400">
                      {word.vocalized}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakText(word.vocalized)}
                    title="استمع للنطق"
                    className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-slate-700 dark:text-indigo-300 cursor-pointer"
                  >
                    <Volume2 size={16} />
                  </button>
                  <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                    {word.category}
                  </span>
                </div>
              </div>

              {/* Meaning */}
              <div className="space-y-1">
                <span className="text-xs font-black text-slate-400">المعنى والشرح:</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {word.meaning}
                </p>
              </div>

              {/* Example */}
              <div className="p-3 bg-amber-50/70 dark:bg-slate-750 rounded-2xl border border-amber-200/60 dark:border-slate-700 text-xs text-amber-900 dark:text-amber-200 font-semibold leading-relaxed">
                مثال سياقي: "{word.example}"
              </div>

              {/* Synonyms & Antonyms */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-750 border border-emerald-100 dark:border-slate-700">
                  <span className="font-black text-emerald-700 dark:text-emerald-400 block text-[10px]">المرادفات:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{word.synonym}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-slate-750 border border-rose-100 dark:border-slate-700">
                  <span className="font-black text-rose-700 dark:text-rose-400 block text-[10px]">الأضداد:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{word.antonym}</span>
                </div>
              </div>
            </div>

            {/* Foreign Translations */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1">
                <span>🇫🇷</span>
                <span>{word.french}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>🇬🇧</span>
                <span>{word.english}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
