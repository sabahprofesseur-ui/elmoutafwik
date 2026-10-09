import React, { createContext, useContext, useState, useEffect } from 'react';
import { GradeId, StudentProfile } from '../types';
import { soundManager } from '../utils/audio';
import { 
  auth, 
  db, 
  googleProvider, 
  OperationType, 
  handleFirestoreError 
} from '../services/firebase';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as fbUpdateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface NavigationState {
  page: string;
  params?: Record<string, string>;
}

interface AppContextType {
  nav: NavigationState;
  navigate: (page: string, params?: Record<string, string>) => void;
  currentUser: User | null;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  loginWithGoogle: () => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string, grade: GradeId) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setGuestMode: () => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  selectedGrade: GradeId;
  setSelectedGrade: (grade: GradeId) => void;
  soundVolume: number;
  setSoundVolume: (vol: number) => void;
  isMuted: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playFanfare: () => void;
  speakText: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  isNightWarmMode: boolean;
  toggleNightWarmMode: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  addStars: (count: number) => void;
  markLessonComplete: (lessonId: string) => void;
  markExamComplete: (examId: string) => void;
}

const defaultProfile: StudentProfile = {
  id: 'student-guest',
  name: 'تلميذ بطل',
  avatar: '🦊',
  avatarFrame: 'gold-master',
  gradeId: '3ap',
  wilaya: 'الجزائر العاصمة (16)',
  schoolName: 'مدرسة المتفوقين الابتدائية',
  stars: 120,
  xp: 450,
  streakDays: 3,
  completedLessons: ['3ap-ar-01'],
  completedExams: [],
  unlockedBadges: ['first_step', 'math_genius'],
  isSubscribed: true,
  parentPin: '1234',
  dailyTimeLimitMinutes: 45,
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    try {
      return localStorage.getItem('elmoutafwik_guest') === 'true';
    } catch {
      return false;
    }
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('elmoutafwik_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [soundVolume, setSoundVolumeState] = useState<number>(() => soundManager.getVolume());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isNightWarmMode, setIsNightWarmMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('elmoutafwik_night_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('elmoutafwik_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthLoading(true);
      if (user) {
        setCurrentUser(user);
        setIsGuest(false);
        try {
          localStorage.removeItem('elmoutafwik_guest');
        } catch {}

        // Fetch or create user document in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            setProfile(prev => ({
              ...prev,
              id: user.uid,
              userId: user.uid,
              email: user.email || '',
              name: data.name || user.displayName || prev.name,
              gradeId: (data.grade as GradeId) || prev.gradeId,
              stars: typeof data.points === 'number' ? data.points : prev.stars,
              streakDays: typeof data.streak === 'number' ? data.streak : prev.streakDays,
              completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : prev.completedLessons,
              unlockedBadges: Array.isArray(data.badges) ? data.badges : prev.unlockedBadges,
            }));
          } else {
            // First time user document creation
            const initialDoc = {
              userId: user.uid,
              name: user.displayName || 'بطل المتفوق',
              email: user.email || '',
              grade: profile.gradeId || '3ap',
              points: profile.stars || 100,
              streak: 1,
              badges: ['first_step'],
              completedLessons: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, initialDoc);
            setProfile(prev => ({
              ...prev,
              id: user.uid,
              userId: user.uid,
              email: user.email || '',
              name: initialDoc.name,
              gradeId: initialDoc.grade as GradeId,
            }));
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
        }
      } else {
        setCurrentUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync profile to localStorage and Firestore
  useEffect(() => {
    try {
      localStorage.setItem('elmoutafwik_profile', JSON.stringify(profile));
    } catch {}

    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      updateDoc(userDocRef, {
        name: profile.name,
        grade: profile.gradeId,
        points: profile.stars,
        streak: profile.streakDays,
        badges: profile.unlockedBadges,
        completedLessons: profile.completedLessons,
        updatedAt: new Date().toISOString(),
      }).catch(err => {
        // Soft catch during auto-sync
        console.warn('Auto sync warning:', err);
      });
    }
  }, [profile, currentUser]);

  useEffect(() => {
    if (isNightWarmMode) {
      document.documentElement.classList.add('night-warm-mode');
    } else {
      document.documentElement.classList.remove('night-warm-mode');
    }
    try {
      localStorage.setItem('elmoutafwik_night_mode', String(isNightWarmMode));
    } catch {}
  }, [isNightWarmMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('elmoutafwik_dark_mode', String(isDarkMode));
    } catch {}
  }, [isDarkMode]);

  const navigate = (page: string, params?: Record<string, string>) => {
    soundManager.playClick();
    setNav({ page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginWithGoogle = async () => {
    soundManager.playClick();
    try {
      await signInWithPopup(auth, googleProvider);
      soundManager.playFanfare();
      navigate('dashboard');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const registerWithEmail = async (name: string, email: string, pass: string, grade: GradeId) => {
    soundManager.playClick();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await fbUpdateProfile(cred.user, { displayName: name });
      
      const userDocRef = doc(db, 'users', cred.user.uid);
      const newUserData = {
        userId: cred.user.uid,
        name: name,
        email: email,
        grade: grade,
        points: 150,
        streak: 1,
        badges: ['first_step'],
        completedLessons: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, newUserData);

      setProfile(prev => ({
        ...prev,
        id: cred.user.uid,
        userId: cred.user.uid,
        name: name,
        email: email,
        gradeId: grade,
        stars: 150,
      }));

      soundManager.playFanfare();
      navigate('dashboard');
    } catch (error: any) {
      console.warn('Firebase email auth note:', error);
      // When email/password is not enabled in Firebase Console (Google provider is default)
      if (error?.code === 'auth/operation-not-allowed' || error?.message?.includes('operation-not-allowed')) {
        const studentId = 'hero-' + Date.now();
        const heroProfile: StudentProfile = {
          id: studentId,
          userId: studentId,
          name: name.trim() || 'البطل المتفوق',
          email: email.trim(),
          gradeId: grade,
          avatar: '🦊',
          avatarFrame: 'gold-master',
          wilaya: 'الجزائر العاصمة (16)',
          schoolName: 'مدرسة المتفوقين الابتدائية',
          stars: 150,
          xp: 450,
          streakDays: 1,
          completedLessons: [],
          completedExams: [],
          unlockedBadges: ['first_step'],
          isSubscribed: true,
          parentPin: '1234',
          dailyTimeLimitMinutes: 45,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProfile(heroProfile);
        try {
          localStorage.setItem('elmoutafwik_profile', JSON.stringify(heroProfile));
          localStorage.setItem('elmoutafwik_guest', 'false');
        } catch {}
        soundManager.playFanfare();
        navigate('dashboard');
        return;
      }
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    soundManager.playClick();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      soundManager.playFanfare();
      navigate('dashboard');
    } catch (error: any) {
      console.warn('Firebase email login note:', error);
      if (error?.code === 'auth/operation-not-allowed' || error?.message?.includes('operation-not-allowed')) {
        // Log in with existing local profile seamlessly
        navigate('dashboard');
        return;
      }
      throw error;
    }
  };

  const logout = async () => {
    soundManager.playClick();
    await fbSignOut(auth);
    setIsGuest(false);
    try {
      localStorage.removeItem('elmoutafwik_guest');
    } catch {}
    navigate('home');
  };

  const setGuestMode = () => {
    soundManager.playClick();
    setIsGuest(true);
    try {
      localStorage.setItem('elmoutafwik_guest', 'true');
    } catch {}
    navigate('dashboard');
  };

  const setSelectedGrade = (grade: GradeId) => {
    soundManager.playClick();
    setProfile(p => ({ ...p, gradeId: grade }));
  };

  const setSoundVolume = (vol: number) => {
    soundManager.setVolume(vol);
    setSoundVolumeState(vol);
    setIsMuted(vol === 0);
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    setSoundVolumeState(muted ? 0 : 0.8);
    if (!muted) soundManager.playClick();
  };

  const playClick = () => soundManager.playClick();
  const playCorrect = () => soundManager.playCorrect();
  const playWrong = () => soundManager.playWrong();
  const playFanfare = () => soundManager.playFanfare();
  const speakText = (text: string, onEnd?: () => void) => soundManager.speakArabic(text, onEnd);
  const stopSpeaking = () => soundManager.stopSpeaking();

  const toggleNightWarmMode = () => {
    soundManager.playClick();
    setIsNightWarmMode(v => !v);
  };

  const toggleDarkMode = () => {
    soundManager.playClick();
    setIsDarkMode(v => !v);
  };

  const addStars = (count: number) => {
    setProfile(p => ({
      ...p,
      stars: p.stars + count,
      xp: p.xp + count * 10,
    }));
  };

  const markLessonComplete = (lessonId: string) => {
    setProfile(p => {
      if (p.completedLessons.includes(lessonId)) return p;
      return {
        ...p,
        completedLessons: [...p.completedLessons, lessonId],
        stars: p.stars + 20,
        xp: p.xp + 60,
      };
    });
  };

  const markExamComplete = (examId: string) => {
    setProfile(p => {
      if (p.completedExams.includes(examId)) return p;
      return {
        ...p,
        completedExams: [...p.completedExams, examId],
        stars: p.stars + 50,
        xp: p.xp + 150,
      };
    });
  };

  const isAuthenticated = Boolean(currentUser || isGuest);

  return (
    <AppContext.Provider
      value={{
        nav,
        navigate,
        currentUser,
        isAuthLoading,
        isAuthenticated,
        isGuest,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout,
        setGuestMode,
        profile,
        setProfile,
        selectedGrade: profile.gradeId,
        setSelectedGrade,
        soundVolume,
        setSoundVolume,
        isMuted,
        toggleSound,
        playClick,
        playCorrect,
        playWrong,
        playFanfare,
        speakText,
        stopSpeaking,
        isNightWarmMode,
        toggleNightWarmMode,
        isDarkMode,
        toggleDarkMode,
        addStars,
        markLessonComplete,
        markExamComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
