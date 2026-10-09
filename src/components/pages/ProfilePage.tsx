import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GRADES } from '../../data/curriculum';
import {
  UserCircle2,
  ShieldCheck,
  Settings,
  Clock,
  Eye,
  Award,
  Printer,
  Sparkles,
  KeyRound,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, setProfile, isNightWarmMode, toggleNightWarmMode, playClick, playCorrect } = useApp();

  const [studentName, setStudentName] = useState(profile.name);
  const [schoolName, setSchoolName] = useState(profile.schoolName);
  const [wilaya, setWilaya] = useState(profile.wilaya);
  const [parentPin, setParentPin] = useState(profile.parentPin);
  const [dailyLimit, setDailyLimit] = useState(profile.dailyTimeLimitMinutes);
  const [isSaved, setIsSaved] = useState(false);

  const algerianWilayas = [
    'الجزائر العاصمة (16)',
    'وهران (31)',
    'قسنطينة (25)',
    'سطيف (19)',
    'باتنة (05)',
    'تيزي وزو (15)',
    'تلمسان (13)',
    'عنابة (23)',
    'بسكرة (07)',
    'بجاية (06)',
    'البليدة (09)',
    'ورقلة (30)',
    'أدرار (01)',
  ];

  const avatarFrames = [
    { id: 'none', label: 'بدون إطار' },
    { id: 'gold-master', label: 'إطار الذهب الخالص 🥇' },
    { id: 'silver-star', label: 'إطار النجوم الفضية 🥈' },
    { id: 'nature-leaf', label: 'إطار الطبيعة الخضراء 🌿' },
    { id: 'neon-magic', label: 'إطار النيون السحري 🔮' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playCorrect();
    setProfile(p => ({
      ...p,
      name: studentName,
      schoolName,
      wilaya,
      parentPin,
      dailyTimeLimitMinutes: dailyLimit,
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-orange-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>لوحة تحكم التلميذ والولي 👨‍👩‍👧‍👦</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            الملف الشخصي وإعدادات الولي
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium leading-relaxed">
            تخصيص بيانات التلميذ، ضبط أوقات الشاشة، تفعيل وضع راحة العين، وطباعة كشف تقييم المكتسبات الفصلي.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0">
          👤
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 print:hidden">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>بيانات التلميذ والمدرسة:</span>
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                اسم التلميذ(ة):
              </label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                الولاية:
              </label>
              <select
                value={wilaya}
                onChange={e => setWilaya(e.target.value)}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              >
                {algerianWilayas.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                اسم المدرسة الابتدائية:
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                إطار الأفاتار المفضل:
              </label>
              <select
                value={profile.avatarFrame}
                onChange={e => setProfile(p => ({ ...p, avatarFrame: e.target.value as any }))}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              >
                {avatarFrames.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              حفظ التعديلات 💾
            </button>
            {isSaved && (
              <span className="text-xs text-emerald-600 font-bold mr-3">
                ✓ تم حفظ التغييرات بنجاح!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Guardian Safety & Screen Time Controls */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 print:hidden">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="text-emerald-500" />
          <span>أدوات الرقابة الأبوية وراحة الطفل:</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                <span>الحد اليومي لوقت الشاشة:</span>
              </span>
              <span className="text-xs font-bold text-orange-600">{dailyLimit} دقيقة</span>
            </div>
            <input
              type="range"
              min="20"
              max="120"
              step="10"
              value={dailyLimit}
              onChange={e => setDailyLimit(parseInt(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Eye size={16} className="text-amber-500" />
                <span>وضع راحة العين (المرشح الدافئ):</span>
              </span>
              <p className="text-[10px] text-slate-400">تقليل الضوء الأزرق المجهد لعين الطفل</p>
            </div>
            <button
              onClick={toggleNightWarmMode}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                isNightWarmMode ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'
              }`}
            >
              {isNightWarmMode ? 'مفعل ✓' : 'معطل'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Report Card Generator */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between print:hidden">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              كشف تقييم المكتسبات الفصلي
            </h2>
            <p className="text-xs text-slate-400">
              تقرير رسمي مطبوع يلخص أداء التلميذ ودرجاته ونقاط القوة
            </p>
          </div>
          <button
            onClick={handlePrintReport}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Printer size={16} />
            <span>طباعة الكشف</span>
          </button>
        </div>

        {/* Printable Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex justify-between items-center border-b pb-3 text-xs font-black">
            <span>التلميذ: {profile.name}</span>
            <span>المستوى: {GRADES.find(g => g.id === profile.gradeId)?.name}</span>
            <span>النجوم المحرزة: {profile.stars} ⭐</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-bold">اللغة العربية (فهم المنطوق والتراكيب النحوية):</span>
              <span className="font-black text-emerald-600">تحكم أقصى (أ)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">الرياضيات (الحساب وحل المشكلات الهندسية):</span>
              <span className="font-black text-emerald-600">تحكم أقصى (أ)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">التربية العلمية والتكنولوجية (التجارب والملاحظة):</span>
              <span className="font-black text-blue-600">تحكم مقبول (ب)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">التربية الإسلامية والمدنية:</span>
              <span className="font-black text-emerald-600">تحكم أقصى (أ)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
