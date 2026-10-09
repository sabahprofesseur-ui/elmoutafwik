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
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SubscriptionPage: React.FC = () => {
  const { profile, setProfile, playCorrect, playFanfare } = useApp();

  const [activePaymentMethod, setActivePaymentMethod] = useState<'baridimob' | 'ccp' | 'flexy' | 'dahabiya'>('baridimob');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Activation simulator state
  const [transactionCode, setTransactionCode] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSimulateActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionCode.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setActivationSuccess(true);
      setProfile(p => ({ ...p, isSubscribed: true }));
      playFanfare();
      try {
        confetti({ particleCount: 100, spread: 70 });
      } catch {
        // safe
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>طرق الدفع المعتمدة محلياً بالجزائر 🇩🇿</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            باقات الاشتراك وتفعيل الحساب
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            اشتراك رمزي في متناول كل أسرة جزائرية: 2000 دج فقط (200 ألف سنتيم) للسنة الدراسية كاملة، مع دعم الدفع عبر بريدي موب ومكاتب البريد وفليكسي.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          💳
        </div>
      </div>

      {/* Subscription Status Pill */}
      <div className={`p-5 rounded-3xl border-2 flex items-center justify-between ${
        profile.isSubscribed
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
          : 'bg-amber-50 dark:bg-slate-800 border-amber-300 text-amber-900 dark:text-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{profile.isSubscribed ? '👑' : '⏳'}</span>
          <div>
            <h3 className="text-base font-black">
              {profile.isSubscribed ? 'حسابك مفعل بالباقة السنوية الشاملة' : 'أنت تستخدم الباقة التجريبية المجانية'}
            </h3>
            <p className="text-xs font-medium opacity-85">
              {profile.isSubscribed ? 'تتمتع بوصول كامل وغير محدود لكافة الدروس والامتحانات والمساعد الذكي.' : 'قم بالترقية لفتح كامل بنك الامتحانات والمذكرات.'}
            </p>
          </div>
        </div>
        {profile.isSubscribed && (
          <span className="text-xs font-black bg-emerald-500 text-white px-3 py-1 rounded-full">
            نشط ومفعل ✓
          </span>
        )}
      </div>

      {/* Payment Methods Tabs */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>اختر طريقة الدفع المناسبة لك في الجزائر:</span>
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
            تأكيد الدفع وتفعيل الحساب الفوري
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
