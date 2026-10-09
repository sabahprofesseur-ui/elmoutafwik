import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { playCorrect } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('الجزائر العاصمة');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    playCorrect();
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setIsSent(false);
    }, 3000);
  };

  const faqs = [
    {
      q: 'كيف أقوم بتفعيل الاشتراك السنوي بعد الدفع؟',
      a: 'بعد الدفع عبر BaridiMob أو CCP، التقط صورة للوصل أو انسخ رقم المعاملة وأدخله في صفحة "اشتراكاتي"، أو أرسله مباشرة لفريق الدعم عبر واتساب ليتم التفعيل الفوري لحسابك.',
    },
    {
      q: 'هل المنصة مطابقة لمنهاج وزارة التربية الوطنية للجيل الثاني؟',
      a: 'نعم 100%، جميع الدروس والوضعيات الإدماجية ونماذج تقييم المكتسبات مراجعة ومطابقة للكتب المدرسية وتدرجات التعلمات الرسمية.',
    },
    {
      q: 'هل يمكن تشغيل المنصة على الهاتف الذكي واللوحة اللمسية؟',
      a: 'بالتأكيد، المنصة مصممة بتقنية تطبيق الويب التقدمي (PWA) وتعمل بسلاسة فائقة على جميع الهواتف والأجهزة اللوحية دون الحاجة لتنزيل تطبيقات ثقيلة.',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>خدمة العملاء والدعم الفني 24/7 🇩🇿</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            اتصل بنا ومركز المساعدة
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            فريقنا التربوي والتقني مستعد دائماً للإجابة على استفسارات الأولياء والأساتذة ومساعدتكم في كل ما يخص تفعيل المنصة والتفوق الدراسي.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          📞
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            أرسل لنا رسالة أو استفساراً:
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                الاسم واللقب:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="اسم ولي الأمر أو الأستاذ"
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  رقم الهاتف:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0550 XX XX XX"
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  الولاية:
                </label>
                <input
                  type="text"
                  value={wilaya}
                  onChange={e => setWilaya(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                رسالتك أو استفسارك:
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="اكتب استفسارك هنا بالتفصيل..."
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span>إرسال الرسالة إلى فريق الدعم</span>
            </button>

            {isSent && (
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 rounded-xl text-xs font-black text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>شكراً لتواصلك! تم استلام رسالتك وسيتواصل معك فريقنا في أقرب وقت.</span>
              </div>
            )}
          </form>
        </div>

        {/* Direct Contacts & FAQ */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              قنوات التواصل المباشرة:
            </h2>

            <div className="space-y-3 text-xs sm:text-sm font-bold">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">خدمة الواتساب السريعة:</p>
                  <p className="font-mono text-slate-900 dark:text-white">+213 550 XX XX XX</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">الهاتف الثابت / المحمول:</p>
                  <p className="font-mono text-slate-900 dark:text-white">+213 23 XX XX XX</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">البريد الإلكتروني الرسمي:</p>
                  <p className="text-slate-900 dark:text-white">contact@elmoutafwik.dz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini FAQ */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-orange-500" />
              <span>الأسئلة الشائعة:</span>
            </h3>

            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="text-xs space-y-1 border-b border-slate-100 dark:border-slate-700 pb-2">
                  <p className="font-black text-slate-800 dark:text-slate-200">
                    • {f.q}
                  </p>
                  <p className="font-medium text-slate-500 dark:text-slate-400 leading-relaxed pr-3">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
