import React from 'react';
import { useApp } from '../../context/AppContext';
import { MASCOTS } from '../../data/mascots';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  Heart,
  Star,
  Compass,
  Award
} from 'lucide-react';

export const MascotsPage: React.FC = () => {
  const { profile, setProfile, speakText, playClick, playCorrect } = useApp();

  const handleSelectCompanion = (avatar: string) => {
    playCorrect();
    setProfile(p => ({ ...p, avatar }));
  };

  const handleListenQuote = (mascot: typeof MASCOTS[0]) => {
    speakText(`أنا ${mascot.name}، ${mascot.role}. ${mascot.quote}`);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>شخصيات المنصة وأبطال التمائم 🦊</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            رفقاء المعرفة الأذكياء
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            تعرف على أبطال منصة المتفوق، استمع لرسائلهم الصوتية المشجعة، واختر رفيقك المفضل ليظهر في ملفك ويدعمك في رحلتك!
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          👥
        </div>
      </div>

      {/* Mascots Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MASCOTS.map(mascot => {
          const isCurrentAvatar = profile.avatar === mascot.avatar;

          return (
            <div
              key={mascot.id}
              className={`bg-white dark:bg-slate-800 rounded-3xl border-2 transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg ${
                isCurrentAvatar
                  ? 'border-orange-500 bg-orange-50/30 dark:bg-slate-800 ring-4 ring-orange-200 dark:ring-orange-950'
                  : 'border-slate-200 dark:border-slate-700 hover:border-orange-300'
              }`}
            >
              <div className="space-y-4">
                {/* Header with avatar & role */}
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${mascot.color} text-white flex items-center justify-center text-4xl shadow-md shrink-0`}>
                    {mascot.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                        {mascot.name}
                      </h3>
                      {isCurrentAvatar && (
                        <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-black">
                          رفيقك المختار ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      {mascot.role}
                    </p>
                  </div>
                </div>

                {/* Voice Quote Banner */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-750 border border-amber-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 italic leading-relaxed">
                    "{mascot.quote}"
                  </p>
                  <button
                    onClick={() => handleListenQuote(mascot)}
                    title="استمع لصوت الرفيق"
                    className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shrink-0 shadow-xs cursor-pointer transition-transform hover:scale-105"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                {/* Bio & Details */}
                <div className="space-y-2 text-xs">
                  <p className="font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                    {mascot.bio}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1">
                    <p className="font-black text-slate-800 dark:text-slate-200">
                      المواد والمجالات المفضلة: <span className="text-emerald-600 font-bold">{mascot.subjectSpecialty}</span>
                    </p>
                    <p className="font-semibold text-slate-500">
                      💡 سر لطيف: {mascot.funFact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action: Select Avatar */}
              <button
                onClick={() => handleSelectCompanion(mascot.avatar)}
                disabled={isCurrentAvatar}
                className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isCurrentAvatar
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 cursor-default'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:scale-102 active:scale-98'
                }`}
              >
                {isCurrentAvatar ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>تم اختياره كشخصيتك الرمزية</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>اختر {mascot.name.split(' ')[0]} كشخصيتك الرمزية</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
