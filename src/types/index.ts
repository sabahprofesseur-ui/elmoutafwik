export type GradeId = '1ap' | '2ap' | '3ap' | '4ap' | '5ap';

export interface Grade {
  id: GradeId;
  name: string;
  shortName: string;
  icon: string;
  desc: string;
  levelNumber: number;
}

export interface Subject {
  id: string;
  nameAr: string;
  nameFr?: string;
  nameEn?: string;
  icon: string;
  color: string;
  lightColor: string;
  availableGrades: GradeId[];
  desc: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  gradeId: GradeId;
  subjectId: string;
  trimester: 1 | 2 | 3;
  unit: string;
  title: string;
  subtitle: string;
  storyIntro: string;
  summary: string[];
  keyRules: string[];
  examples: { text: string; note: string }[];
  quiz: QuizQuestion[];
  mascotTip: string;
}

export interface Mascot {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  quote: string;
  bio: string;
  subjectSpecialty: string;
  funFact: string;
}

export interface ExamCriteria {
  criteriaName: string;
  level: 'أ' | 'ب' | 'ج' | 'د'; // Algerian Ministry standard ratings
  score: number;
  maxScore: number;
  feedback: string;
}

export interface Worksheet {
  id: string;
  title: string;
  gradeId: GradeId;
  subjectId: string;
  trimester: 1 | 2 | 3;
  downloadsCount: number;
  pages: number;
  category: 'تمارين' | 'ملخصات' | 'اختبارات' | 'خط وإملاء';
  description: string;
  content: string[];
}

export interface DictionaryWord {
  id: string;
  word: string;
  vocalized: string;
  meaning: string;
  example: string;
  synonym: string;
  antonym: string;
  french: string;
  english: string;
  category: 'حيوانات' | 'علوم' | 'طبيعة' | 'أخلاق' | 'أدوات مدرسية' | 'تاريخ';
  icon: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
}

export interface StudentProfile {
  id: string;
  userId?: string;
  email?: string;
  name: string;
  avatar: string;
  avatarFrame: 'none' | 'gold-master' | 'silver-star' | 'nature-leaf' | 'neon-magic';
  gradeId: GradeId;
  wilaya: string;
  schoolName: string;
  stars: number;
  xp: number;
  streakDays: number;
  completedLessons: string[];
  completedExams: string[];
  unlockedBadges: string[];
  isSubscribed: boolean;
  parentPin: string;
  dailyTimeLimitMinutes: number;
  createdAt?: string;
  updatedAt?: string;
}

