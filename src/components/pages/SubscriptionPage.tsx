import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Upload,
  Sparkles,
  Phone,
  QrCode,
  ArrowRight,
  Power,
  PauseCircle,
  PlayCircle,
  Check,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SubscriptionPage: React.FC = () => {
  const { profile, setSubscriptionStatus, toggleSubscription, playFanfare, playClick } = useApp();

  const [activePaymentMethod, setActivePaymentMethod] = useState<'baridimob' | 'ccp' | 'flexy' | 'dahabiya'>('baridimob');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Manual status change notification
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Activation simulator state
  const [transactionCode, setTransactionCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleManualToggle = async () => {
    playClick();
    const newStatus = !profile.isSubscribed;
    await setSubscriptionStatus(newStatus);
    
    if (newStatus) {
      setStatusMessage('تم تفعيل اشتراك التلميذ يدوياً بنجاح! 🚀 (كامل الصلاحيات متاحة)');
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else {
      setStatusMessage('تم إيقاف اشتراك التلميذ مؤقتاً ⏸️ (الوضع التجريبي)');
    }

    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const handleSimulateActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionCode.trim()) return;

    setIsSubmitting(true);
    setTimeout(async () => {
      setIsSubmitting(false);
      setActivationSuccess(true);
      await setSubscriptionStatus(true);
      playFanfare();
      try {
        confetti({ particleCount: 100, spread: 70 });
      } catch {}
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-16 select-none" dir="rtl">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>طرق الدفع المعتمدة محلياً بالجزائر 🇩🇿</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            باقات الاشتراك وإدارة التفعيل
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            اشتراك رمزي في متناول كل أسرة جزائرية: 2000 دج فقط للسنة الدراسية كاملة، مع إمكانية التفعيل أو الإيقاف اليدوي الفوري للمنصة.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          💳
        </div>
      </div>

      {/* Manual Subscription Management Card (تفعيل / إيقاف التفعيل يدوياً) */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2.5rem] border-2 border-orange-200 dark:border-slate-700 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 ${
              profile.isSubscribed
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-600 dark:bg-slate-700 dark:text-amber-300'
            }`}>
              {profile.isSubscribed ? '👑' : '⏳'}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  التحكم اليدوي في اشتراك التلميذ:
                </h3>
                <span className={`text-xs font-black px-3 py-0.5 rounded-full ${
                  profile.isSubscribed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-300'
                }`}>
                  {profile.isSubscribed ? '● الاشتراك مفعّل ونشط' : '○ الاشتراك متوقف (باقة مجانية)'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                {profile.isSubscribed
                  ? 'التلميذ يتمتع بفتح كامل الدروس، بنك الامتحانات، المساعد الذكي، وحل التمارين التفاعلية.'
                  : 'يمكنك تفعيل الاشتراك بنقرة واحدة لفتح جميع المميزات للتلميذ فوراً دون انتظار.'}
              </p>
            </div>
          </div>

          {/* Quick Manual Toggle Action Button */}
          <button
            onClick={handleManualToggle}
            className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
              profile.isSubscribed
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300 dark:bg-slate-750 dark:text-rose-300 dark:border-rose-800'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/30'
            }`}
          >
            {profile.isSubscribed ? (
              <>
                <PauseCircle size={18} />
                <span>إيقاف / تجميد الاشتراك يدوياً ⏸️</span>
              </>
            ) : (
              <>
                <PlayCircle size={18} />
                <span>تفعيل اشتراك التلميذ يدوياً 🚀</span>
              </>
            )}
          </button>
        </div>

        {/* Status Notification Message */}
        {statusMessage && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-2xl text-xs font-black flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Payment Methods Tabs */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>طرق الدفع والشحن المعتمدة في الجزائر:</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'baridimob', title: 'بريدي موب BaridiMob', icon: '📱', color: 'border-yellow-400' },
            { id: 'ccp', title: 'حساب بريدي جاري CCP', icon: '📮', color: 'border-emerald-500' },
            { id: 'dahabiya', title: 'البطاقة الذهبية', icon: '💳', color: 'border-amber-500' },
            { id: 'flexy', title: 'فليكسي Flexy', icon: '📶', color: 'border-sky-500' },
          ].map(method => (
            <button
              key={method.id}
              onClick={() => setActivePaymentMethod(method.id as any)}
              className={`p-4 rounded-2xl border-2 text-center space-y-2 transition-all cursor-pointer ${
                activePaymentMethod === method.id
                  ? 'border-orange-500 bg-orange-50/60 dark:bg-slate-700 shadow-md scale-102 font-black'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 hover:border-orange-300'
              }`}
            >
              <span className="text-3xl block">{method.icon}</span>
              <span className="text-xs font-black block text-slate-800 dark:text-slate-200">
                {method.title}
              </span>
            </button>
          ))}
        </div>

        {/* Method Detail Box */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-4">
          {activePaymentMethod === 'baridimob' && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>📱 التحويل الفوري عبر تطبيق بريدي موب (BaridiMob):</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                قم بالدخول إلى تطبيق BaridiMob، اختر "تحويل الأموال" (Virement)، ثم أدخل رقم الـ RIP الخاص بإدارة المنصة:
              </p>
              
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">رقم الـ RIP:</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono tracking-wider">
                    007 99999 0023456789 45
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('00799999002345678945', 'rip')}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={14} />
                  <span>{copiedKey === 'rip' ? 'تم النسخ!' : 'نسخ الرقم'}</span>
                </button>
              </div>

              <p className="text-xs text-emerald-600 font-bold">
                ✓ المبلغ المطلوب: 2000 دج (اشتراك سنة دراسية كاملة).
              </p>
            </div>
          )}

          {activePaymentMethod === 'ccp' && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>📮 الدفع عبر مكاتب البريد (CCP):</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                يمكنك التوجه إلى أي مكتب بريد بالجزائر ودفع مبلغ 2000 دج في الحساب التالي:
              </p>
              
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">رقم الحساب البريدي والمفتاح (Clé):</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono tracking-wider">
                    CCP: 0023456789 Clé: 45
                  </span>
                  <span className="text-xs text-slate-500 font-bold block mt-1">باسم: منصة المتفوق التعليمية ش.ذ.م.م</span>
                </div>
                <button
                  onClick={() => handleCopy('0023456789 Clé 45', 'ccp')}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={14} />
                  <span>{copiedKey === 'ccp' ? 'تم النسخ!' : 'نسخ'}</span>
                </button>
              </div>
            </div>
          )}

          {activePaymentMethod === 'flexy' && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>📶 الدفع عن طريق التعبئة الرصيدية (فليكسي Flexy):</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                يمكنك إرسال رصيد فليكسي (2000 دج) إلى أحد الأرقام المعتمدة للمنصة:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border text-center">
                  <span className="text-emerald-600 font-black block">موبيليس Mobilis</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 mt-1 block">0661 XX XX XX</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border text-center">
                  <span className="text-rose-600 font-black block">أوريدو Ooredoo</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 mt-1 block">0550 XX XX XX</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border text-center">
                  <span className="text-amber-600 font-black block">جيزي Djezzy</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 mt-1 block">0770 XX XX XX</span>
                </div>
              </div>
            </div>
          )}

          {activePaymentMethod === 'dahabiya' && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>💳 الدفع الإلكتروني المباشر بالبطاقة الذهبية:</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                بوابة الدفع الآمنة الخاصة ببريد الجزائر (GIE Monétique). سيتم توجيهك إلى صفحة إدخال رقم البطاقة ورمز التأكيد السري عبر SMS.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Activation / Receipt Submission Box */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            تأكيد الدفع التلقائي برقم الوصل
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            بعد إجراء التحويل، أدخل رقم وصل المعاملة أو كود بطاقة الاشتراك لتفعيل حسابك تلقائياً في لحظات!
          </p>
        </div>

        <form onSubmit={handleSimulateActivation} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
              رقم العملية / رقم وصل التحويل (N° de transaction):
            </label>
            <input
              type="text"
              required
              value={transactionCode}
              onChange={e => setTransactionCode(e.target.value)}
              placeholder="مثال: BM-2026-889901 أو كود التفعيل"
              className="w-full p-3.5 rounded-2xl border-2 border-orange-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !transactionCode.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span>{isSubmitting ? 'جارِ التحقق وتفعيل الحساب...' : 'تأكيد وتفعيل الاشتراك السنوي 🚀'}</span>
          </button>
        </form>

        {activationSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <span>مبارك! تم التحقق من الدفع وتفعيل حساب المتفوق بنجاح. أهلاً بك في العائلة! 🎉</span>
          </div>
        )}
      </div>

    </div>
  );
};
