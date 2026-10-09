import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FlaskConical,
  Sun,
  CloudRain,
  Zap,
  Flame,
  Droplets,
  Heart,
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const ScienceLabPage: React.FC = () => {
  const { playClick, playCorrect, addStars } = useApp();

  const [activeExp, setActiveExp] = useState<'water' | 'circuit' | 'matter' | 'plant'>('water');

  // Experiment 1: Water Cycle
  const [sunHeat, setSunHeat] = useState(60);

  // Experiment 2: Circuit
  const [isSwitchClosed, setIsSwitchClosed] = useState(false);
  const [selectedConductor, setSelectedConductor] = useState<'iron' | 'wood' | 'copper' | 'plastic'>('iron');

  // Experiment 3: Matter States
  const [temperature, setTemperature] = useState(25);

  // Experiment 4: Plant
  const [hasSun, setHasSun] = useState(true);
  const [hasWater, setHasWater] = useState(true);

  const conductors: Record<string, { name: string; isConductive: boolean }> = {
    iron: { name: 'مسمار حديدي 🔩', isConductive: true },
    copper: { name: 'سلك نحاسي 🔌', isConductive: true },
    wood: { name: 'قطعة خشبية 🪵', isConductive: false },
    plastic: { name: 'مسطرة بلاستيكية 📏', isConductive: false },
  };

  const isCircuitLit = isSwitchClosed && conductors[selectedConductor].isConductive;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>مختبر التجارب الافتراضية التفاعلي 🧪</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            مختبر العلوم مع الباحثة سلمى 🔬
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            حرك المؤشرات، بدّل العناصر، واكتشف بنفسك قوانين الطبيعة وحالات المادة والكهرباء وفق مقرر التربية العلمية والتكنولوجية.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          🧪
        </div>
      </div>

      {/* Experiment Selector Tabs */}
      <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-700 pb-3 overflow-x-auto">
        {[
          { id: 'water', label: 'دورة الماء في الطبيعة 💧', icon: Droplets },
          { id: 'circuit', label: 'الدارة الكهربائية البسيطة ⚡', icon: Zap },
          { id: 'matter', label: 'حالات المادة والحرارة 🌡️', icon: Flame },
          { id: 'plant', label: 'نمو النبات والتركيب الضوئي 🌱', icon: Sun },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveExp(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeExp === tab.id
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-cyan-50'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Experiment 1: Water Cycle */}
      {activeExp === 'water' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              محاكاة دورة الماء في الطبيعة
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              غيّر حرارة الشمس لمشاهدة سرعة التبخر، وتكاثف الغيوم، وتساقط الأمطار فوق التلال.
            </p>
          </div>

          {/* Interactive Canvas Viewport */}
          <div className="h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 dark:from-slate-900 dark:via-sky-950 dark:to-emerald-950 relative overflow-hidden border-2 border-cyan-200 dark:border-slate-700 p-4 flex flex-col justify-between">
            {/* Sun */}
            <div
              className="absolute top-4 right-6 transition-all duration-500 flex flex-col items-center"
              style={{ transform: `scale(${0.8 + (sunHeat / 100) * 0.5})` }}
            >
              <span className="text-5xl animate-spin" style={{ animationDuration: '20s' }}>☀️</span>
              <span className="text-[10px] font-black text-amber-800 bg-white/70 px-2 py-0.5 rounded-full mt-1">
                حرارة {sunHeat}%
              </span>
            </div>

            {/* Clouds & Rain */}
            <div className="flex items-center gap-8 justify-center pt-8">
              <div className="relative">
                <span className="text-6xl select-none">☁️</span>
                {sunHeat > 50 && (
                  <div className="absolute top-12 left-3 flex gap-2 animate-bounce">
                    <span className="text-blue-500 text-xs">💧</span>
                    <span className="text-blue-500 text-xs">💧</span>
                    <span className="text-blue-500 text-xs">💧</span>
                  </div>
                )}
              </div>
              <div className="relative hidden sm:block">
                <span className="text-5xl select-none">⛅</span>
                {sunHeat > 70 && (
                  <div className="absolute top-10 left-3 flex gap-2 animate-bounce">
                    <span className="text-blue-500 text-xs">💧</span>
                    <span className="text-blue-500 text-xs">💧</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ground & Sea */}
            <div className="relative z-10 flex items-end justify-between">
              <div className="flex items-center gap-1 text-2xl">
                <span>🏔️</span>
                <span>🌲</span>
                <span>🏡</span>
              </div>
              <div className="p-3 bg-blue-500/80 text-white rounded-2xl font-black text-xs shadow-md">
                🌊 البحر والمسطحات المائية (مصدر التبخر)
              </div>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-2 bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-black">
              <span>شدة سطوع الشمس والحرارة: {sunHeat}%</span>
              <span className="text-cyan-600">
                {sunHeat > 70 ? 'تبخر سريع وغيوم كثيفة وأمطار غزيرة' : sunHeat > 40 ? 'تبخر معتدل' : 'تبخر بطيء جداً'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={sunHeat}
              onChange={e => setSunHeat(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Observation Note */}
          <div className="p-4 bg-cyan-50 dark:bg-slate-750 text-cyan-900 dark:text-cyan-200 text-xs font-bold rounded-2xl flex items-center gap-3">
            <Info size={18} className="shrink-0 text-cyan-600" />
            <span>استنتاج سلمى: يتبخر ماء البحر بفعل حرارة الشمس، ثم يتكاثف في الأعالي ليشكل السحب، ثم يعود مطراً يروي الأرض ويعود للبحر عبر الوديان!</span>
          </div>
        </div>
      )}

      {/* Experiment 2: Circuit */}
      {activeExp === 'circuit' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              الدارة الكهربائية البسيطة: النواقل والعوازل
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              أغلق القاطعة واختر مادة الوصل لتكتشف إن كانت ناقلة للتيار الكهربائي أم عازلة له.
            </p>
          </div>

          {/* Circuit Interactive Board */}
          <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center space-y-8 relative">
            {/* Bulb */}
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-all duration-300 ${
                isCircuitLit
                  ? 'bg-amber-400 text-white shadow-2xl shadow-amber-400/80 scale-110'
                  : 'bg-slate-300 text-slate-500 opacity-60'
              }`}>
                💡
              </div>
              <span className={`text-xs font-black mt-2 ${isCircuitLit ? 'text-amber-500' : 'text-slate-400'}`}>
                {isCircuitLit ? 'المصباح يضيء توهجاً! ⚡' : 'المصباح منطفئ'}
              </span>
            </div>

            {/* Components row */}
            <div className="flex flex-wrap items-center justify-around w-full gap-6 pt-4 border-t-2 border-dashed border-slate-300 dark:border-slate-700">
              
              {/* Battery */}
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <span className="text-3xl">🔋</span>
                <div>
                  <p className="text-xs font-black">بطارية (مولد 4.5V)</p>
                  <p className="text-[10px] text-emerald-600 font-bold">مصدر الطاقة</p>
                </div>
              </div>

              {/* Switch */}
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setIsSwitchClosed(prev => !prev)}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    isSwitchClosed
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  }`}
                >
                  {isSwitchClosed ? 'القاطعة مغلقة [ | ]' : 'القاطعة مفتوحة [ O ]'}
                </button>
              </div>

              {/* Tested Material */}
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <span className="text-xl">🪛</span>
                <div>
                  <p className="text-xs font-black">{conductors[selectedConductor].name}</p>
                  <p className={`text-[10px] font-bold ${conductors[selectedConductor].isConductive ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {conductors[selectedConductor].isConductive ? 'ناقل للكهرباء ✓' : 'عازل للكهرباء ✗'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Conductor Options */}
          <div className="space-y-2">
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">اختر مادة الاختبار في الدارة:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.entries(conductors).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedConductor(key as any)}
                  className={`p-3 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${
                    selectedConductor === key
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-slate-700 text-cyan-800 dark:text-cyan-200'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-cyan-300'
                  }`}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experiment 3: Matter States */}
      {activeExp === 'matter' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              حالات المادة الثلاث وتغيراتها بالحرارة
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              ارفع أو اخفض درجة الحرارة لمشاهدة تحولات الماء بين الحالة الصلبة، السائلة، والغازية.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl animate-kid-bounce">
              {temperature <= 0 ? '🧊' : temperature < 100 ? '💧' : '💨'}
            </div>

            <div className="text-center space-y-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {temperature}°C
              </span>
              <p className="text-base font-black text-orange-600 dark:text-orange-400">
                {temperature <= 0 ? 'الحالة الصلبة (جليد متماسك)' : temperature < 100 ? 'الحالة السائلة (ماء جاري)' : 'الحالة الغازية (بخار متطاير)'}
              </p>
              <p className="text-xs text-slate-500">
                {temperature <= 0 ? 'تحت الصفر المئوي: عملية التجمد' : temperature >= 100 ? 'عند الغليان: عملية التبخر' : 'درجة حرارة عادية: عملية الانصهار'}
              </p>
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-black">
              <span>ضبط مقياس الحرارة (°C):</span>
              <span className="text-orange-500 font-black">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="-20"
              max="120"
              value={temperature}
              onChange={e => setTemperature(parseInt(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
              <span>-20°C تجمد</span>
              <span>0°C انصهار</span>
              <span>50°C سائل</span>
              <span>100°C غليان وتبخر</span>
            </div>
          </div>
        </div>
      )}

      {/* Experiment 4: Plant Growth */}
      {activeExp === 'plant' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              شروط نمو النبات الأخضر والتركيب الضوئي
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              وفر للنبتة الضوء والماء لتراها تنمو وتزهر خضراء يانعة.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-slate-900 border-2 border-emerald-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl transition-transform duration-500">
              {hasSun && hasWater ? '🌻' : hasWater ? '🌱' : hasSun ? '🥀' : '🍂'}
            </div>

            <div className="text-center space-y-1">
              <p className="text-base font-black text-slate-900 dark:text-white">
                {hasSun && hasWater ? 'نبتة نامية وقوية ومزهرة! 🌿' : 'نبتة تعاني من نقص أحد شروط الحياة الأساسية'}
              </p>
              <p className="text-xs text-slate-500">
                {hasSun && hasWater ? 'توفر الضوء والماء وأملاح التربة يمكن النبات من صنع غذائه بنفسه.' : 'بدون ماء أو ضوء يذبل النبات ويفقد لونه الأخضر.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setHasSun(prev => !prev)}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
                hasSun ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Sun size={18} />
              <span>{hasSun ? 'أشعة الشمس متوفرة ☀️' : 'حجب ضوء الشمس 🌑'}</span>
            </button>

            <button
              onClick={() => setHasWater(prev => !prev)}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
                hasWater ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Droplets size={18} />
              <span>{hasWater ? 'الري بالماء متوفر 💧' : 'قطع السقي 🏜️'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
