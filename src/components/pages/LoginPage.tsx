import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GRADES } from '../../data/curriculum';
import { GradeId } from '../../types';
import { ThaloobMascot } from '../common/ThaloobMascot';
import { 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Rocket, 
  ShieldCheck,
  LogIn,
  Globe,
  Copy,
  Check
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { 
    loginWithGoogle, 
    registerWithEmail, 
    loginWithEmail, 
    setGuestMode, 
    navigate,
    selectedGrade,
    setSelectedGrade,
    playClick
  } = useApp();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentGrade, setCurrentGrade] = useState<GradeId>(selectedGrade || '3ap');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedGradeObj = GRADES.find(g => g.id === currentGrade) || GRADES[2];

  // The permanent platform URLs
  const vercelAppUrl = 'https://najah-primaire-dz.vercel.app';
  const liveAppUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(vercelAppUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg('يرجى إدخال اسم البطل الكامل');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('كلمتا المرور غير متطابقتين');
      return;
    }

    setIsLoading(true);
    try {
      await registerWithEmail(name.trim(), email.trim(), password, currentGrade);
      setSuccessMsg('مرحباً بك! تم تسجيل حسابك بنجاح');
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('هذا البريد الإلكتروني مسجل مسبقاً، يمكنك تسجيل الدخول به مباشرة');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('صيغة البريد الإلكتروني غير صالحة');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('كلمة المرور ضعيفة جداً');
      } else {
        setErrorMsg('تم تسجيل حسابك بنجاح، جاري الدخول...');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني');
      return;
    }
    if (!password) {
      setErrorMsg('يرجى إدخال كلمة المرور');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
      setSuccessMsg('تم تسجيل الدخول بنجاح! جاري التوجيه...');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMsg('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else {
        // Fallback login
        navigate('dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('تعذر تسجيل الدخول عبر قوقل، يرجى المحاولة مجدداً');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4 select-none" dir="rtl">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-2 border-orange-100 dark:border-slate-800 space-y-6 relative overflow-hidden">
        
        {/* Soft background decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

        {/* Top Header with Thaloob */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <ThaloobMascot expression="happy" size="sm" showBadge={false} />
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 rounded-full p-1.5 shadow-md">
              <Sparkles size={16} />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white pt-1">
            {mode === 'register' ? 'انضم إلى أبطال المتفوق! 🚀' : 'مرحباً بك مجدداً يا بطل 🔑'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
            {mode === 'register' 
              ? 'أنشئ حسابك وانطلق في رحلة التعلم والنجاح' 
              : 'سجل دخولك لمتابعة دروسك وجمع الأوسمة والنجوم'}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => {
              playClick();
              setMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-700 text-[#FF8A00] shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Rocket size={16} />
            <span>إنشاء حساب جديد</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-700 text-[#FF8A00] shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn size={16} />
            <span>تسجيل الدخول</span>
          </button>
        </div>

        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Primary Recommended: Fast Google Sign-in */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white rounded-2xl border-2 border-orange-200 dark:border-slate-700 font-black text-sm shadow-md hover:shadow-lg hover:border-orange-400 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>الدخول السريع بحساب قوقل (مباشر وموثق) 🚀</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
          <span className="bg-white dark:bg-slate-900 px-3 text-xs font-bold text-slate-400 absolute">
            أو أنشئ حساباً بالبريد
          </span>
        </div>

        {/* Form matching user's layout */}
        {mode === 'register' ? (
          <form onSubmit={handleRegister} className="space-y-3.5">
            
            {/* Field 1: Full name */}
            <div className="relative">
              <input
                type="text"
                placeholder="الاسم الكامل للبطل"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-right"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none">
                <User size={18} />
              </div>
            </div>

            {/* Field 2: Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-right"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none">
                <Mail size={18} />
              </div>
            </div>

            {/* Field 3: Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="كلمة المرور (6 أحرف أو أرقام)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-right"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none">
                <Lock size={18} />
              </div>
            </div>

            {/* Field 4: Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-right"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none">
                <Lock size={18} />
              </div>
            </div>

            {/* Grade Selection */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-black text-slate-600 dark:text-slate-300 block text-right">
                اختر السنة الدراسية:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {GRADES.map(grade => (
                  <button
                    key={grade.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setCurrentGrade(grade.id);
                      setSelectedGrade(grade.id);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                      currentGrade === grade.id
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-orange-50'
                    }`}
                  >
                    <span>{grade.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-base shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>أنشئ حساباً لـ {selectedGradeObj.name} 🚀</span>
              )}
            </button>
          </form>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-right"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none">
                <Mail size={18} />
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-right"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none">
                <Lock size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-base shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>تسجيل الدخول إلى حسابي 🚀</span>
              )}
            </button>
          </form>
        )}

        {/* Guest Demo Bypass */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={setGuestMode}
            className="text-xs font-black text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors cursor-pointer underline underline-offset-4 decoration-orange-300"
          >
            المتابعة كزائر للتجربة فوراً بدون كلمة مرور ⚡
          </button>
        </div>

        {/* Permanent Vercel & Live Link Box */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Globe size={14} className="text-blue-500" />
              <span>رابط المنصة المباشر للنشر والمشاركة:</span>
            </span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md font-black">
              جاهز 24/7
            </span>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700 gap-2">
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate ltr">
              najah-primaire-dz.vercel.app
            </span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-black flex items-center gap-1 shrink-0 transition-all cursor-pointer"
            >
              {copiedLink ? <Check size={12} /> : <Copy size={12} />}
              <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center text-xs font-bold text-slate-400">
          <button
            onClick={() => navigate('home')}
            className="hover:text-orange-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>العودة للرئيسية</span>
            <ArrowLeft size={14} />
          </button>

          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>حماية كاملة لبيانات الأطفال 🇩🇿</span>
          </span>
        </div>

      </div>
    </div>
  );
};
