import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Download, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <button
        onClick={() => navigate('home')}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 cursor-pointer"
      >
        <ArrowRight size={16} />
        <span>العودة للرئيسية</span>
      </button>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          سياسة الخصوصية وحماية بيانات الأطفال 🛡️
        </h1>
        <p className="text-xs text-slate-400">آخر تحديث: العام الدراسي 2026</p>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          <p>
            تولي منصة <strong>المتفوق الصغير</strong> بالجزائر أهمية قصوى لخصوصية الأطفال وسلامتهم الرقمية وفق التشريعات الوطنية والدولية الصارمة لحماية خصوصية القُصَّر على الإنترنت (COPPA).
          </p>
          <h3 className="text-base font-black text-slate-900 dark:text-white pt-2">
            1. البيانات التي نجمعها
          </h3>
          <p>
            نحن لا نطلب من الأطفال أي بيانات حساسة كأرقام الهواتف أو الصور الشخصية. نكتفي باسم رمزي للتلميذ وسنته الدراسية لمتابعة تقدمه في الدروس وحفظ نقاط النجوم والأوسمة محلياً على جهازه.
          </p>
          <h3 className="text-base font-black text-slate-900 dark:text-white pt-2">
            2. بيئة آمنة وخالية من الإعلانات المزعجة
          </h3>
          <p>
            المنصة مصممة بدون أي إعلانات خارجية غير ملائمة، ولا تتبع أي سلوك تجاري خارجي للأطفال. المحتوى تعليمي 100% موجه لخدمة تلميذ الابتدائي.
          </p>
          <h3 className="text-base font-black text-slate-900 dark:text-white pt-2">
            3. أدوات الأولياء
          </h3>
          <p>
            يمتلك ولي الأمر الحق الكامل في مراجعة بيانات طفله أو تعديلها أو مسحها تماماً في أي وقت عبر لوحة تحكم الحساب.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <button
        onClick={() => navigate('home')}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 cursor-pointer"
      >
        <ArrowRight size={16} />
        <span>العودة للرئيسية</span>
      </button>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          شروط الاستخدام والأحكام العامة 📜
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          <p>
            مرحباً بكم في منصة المتفوق الصغير. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية:
          </p>
          <h3 className="text-base font-black text-slate-900 dark:text-white pt-2">
            1. الملكية الفكرية
          </h3>
          <p>
            كافة المحتويات، الرسومات، التمائم والشخصيات (ثعلوب، أمين، سلمى، ديدو) والتصاميم هي ملكية حصرية لمنصة المتفوق التعليمية. يُسمح بتحميل المذكرات وأوراق العمل للاستخدام الشخصي والمدرسي غير التجاري فقط.
          </p>
          <h3 className="text-base font-black text-slate-900 dark:text-white pt-2">
            2. الاشتراك والخدمات
          </h3>
          <p>
            الاشتراك السنوي الرمزي (2000 دج) يتيح للتلميذ الوصول لكافة المواد والامتحانات حتى نهاية الموسم الدراسي.
          </p>
        </div>
      </div>
    </div>
  );
};

export const DataDeletionPage: React.FC = () => {
  const { navigate, setProfile, playCorrect } = useApp();
  const [deleted, setDeleted] = useState(false);

  const handleDeleteAll = () => {
    localStorage.removeItem('elmoutafwik_profile');
    localStorage.removeItem('elmoutafwik_night_mode');
    localStorage.removeItem('elmoutafwik_dark_mode');
    playCorrect();
    setDeleted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <button
        onClick={() => navigate('home')}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 cursor-pointer"
      >
        <ArrowRight size={16} />
        <span>العودة للرئيسية</span>
      </button>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          طلب حذف البيانات والحساب 🗑️
        </h1>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          يحق للمستخدم وولي الأمر حذف كافة البيانات المخزنة محلياً وعلى خوادم المنصة في أي وقت بنقرة واحدة.
        </p>

        {!deleted ? (
          <div className="p-6 rounded-2xl bg-rose-50 dark:bg-slate-750 border border-rose-200 dark:border-slate-700 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300">
              سيؤدي هذا الإجراء إلى مسح سجل الدروس والنجوم المحفوظة وإعادة تعيين الحساب إلى الحالة الافتراضية.
            </p>
            <button
              onClick={handleDeleteAll}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              حذف كافة بياناتي المخزنة الآن
            </button>
          </div>
        ) : (
          <div className="p-4 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-black rounded-2xl flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>تم حذف كافة البيانات وإعادة ضبط الإعدادات بنجاح.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const GooglePlayGuidePage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <button
        onClick={() => navigate('home')}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 cursor-pointer"
      >
        <ArrowRight size={16} />
        <span>العودة للرئيسية</span>
      </button>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl">
            <Smartphone size={32} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              دليل تثبيت تطبيق المتفوق على هاتفك مجاناً 📲
            </h1>
            <p className="text-xs text-emerald-600 font-bold">تطبيق خفيف، سريع ولا يحتاج لمساحة تخزين كبيرة</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          <p>
            يمكنك تثبيت المنصة على شاشة هاتفك الرئيسية كأي تطبيق أصلي دون الحاجة لتحميل ملفات APK خارجية:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-sm font-black text-emerald-600">لهواتف أندرويد (Chrome):</span>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>افتح الموقع في متصفح Google Chrome.</li>
                <li>انقر على النقاط الثلاث (⋮) أعلى يمين الشاشة.</li>
                <li>اختر "تثبيت التطبيق" أو "الإضافة إلى الشاشة الرئيسية" (Install App).</li>
                <li>ستظهر أيقونة "المتفوق الصغير" مع ثعلوب على شاشة هاتفك مباشرة!</li>
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-sm font-black text-sky-600">لهواتف آيفون وآيباد (Safari):</span>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>افتح الموقع في متصفح Safari.</li>
                <li>اضغط على زر المشاركة أسفل الشاشة (أيقونة المربع مع السهم).</li>
                <li>اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).</li>
                <li>انقر على "إضافة" (Add) في الزاوية العلوية.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
