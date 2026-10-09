import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { InAppBrowserBanner } from './components/common/InAppBrowserBanner';
import { PwaInstallModal } from './components/common/PwaInstallModal';
import { FloatingBottomBar } from './components/common/FloatingBottomBar';
import { OfflineIndicator } from './components/common/OfflineIndicator';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { SubjectPage } from './components/pages/SubjectPage';
import { LessonPage } from './components/pages/LessonPage';
import { ReadingCoachPage } from './components/pages/ReadingCoachPage';
import { ScienceLabPage } from './components/pages/ScienceLabPage';
import { AcquisitionExamsPage } from './components/pages/AcquisitionExamsPage';
import { WorksheetsPage } from './components/pages/WorksheetsPage';
import { ArabicAssistantPage } from './components/pages/ArabicAssistantPage';
import { GamesPage } from './components/pages/GamesPage';
import { ArtStudioPage } from './components/pages/ArtStudioPage';
import { DictionaryPage } from './components/pages/DictionaryPage';
import { FunLearningPage } from './components/pages/FunLearningPage';
import { MascotsPage } from './components/pages/MascotsPage';
import { SubscriptionPage } from './components/pages/SubscriptionPage';
import { AchievementsPage } from './components/pages/AchievementsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { PlatformsPage } from './components/pages/PlatformsPage';
import { ContactPage } from './components/pages/ContactPage';
import {
  PrivacyPage,
  TermsPage,
  DataDeletionPage,
  GooglePlayGuidePage,
} from './components/pages/LegalPages';

const MainLayout: React.FC = () => {
  const { nav, isAuthenticated, isAuthLoading } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const handleOpenChrome = () => {
    const url = window.location.href;
    if (/android/i.test(navigator.userAgent || '')) {
      const cleanUrl = url.replace(/^https?:\/\//, '');
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      window.open(url, '_blank');
    }
  };

  const handleDownloadApp = () => {
    setIsInstallModalOpen(true);
  };

  // List of public pages accessible without login
  const publicPages = ['home', 'login', 'privacy', 'terms', 'data-deletion', 'google-play-guide', 'contact', 'platforms'];

  // Route protection logic
  const isProtectedPage = !publicPages.includes(nav.page);

  const renderCurrentPage = () => {
    // If route is protected and user is not authenticated, redirect/show LoginPage
    if (isProtectedPage && !isAuthenticated && !isAuthLoading) {
      return <LoginPage />;
    }

    switch (nav.page) {
      case 'home':
        return (
          <LandingPage
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenChrome={handleOpenChrome}
          />
        );
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'subject':
        return <SubjectPage />;
      case 'lesson':
        return <LessonPage />;
      case 'reading-coach':
        return <ReadingCoachPage />;
      case 'science-lab':
        return <ScienceLabPage />;
      case 'acquisition-exams':
        return <AcquisitionExamsPage />;
      case 'worksheets':
        return <WorksheetsPage />;
      case 'arabic-assistant':
        return <ArabicAssistantPage />;
      case 'games':
        return <GamesPage />;
      case 'art-studio':
        return <ArtStudioPage />;
      case 'dictionary':
        return <DictionaryPage />;
      case 'fun-learning':
        return <FunLearningPage />;
      case 'mascots':
        return <MascotsPage />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'platforms':
        return <PlatformsPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'data-deletion':
        return <DataDeletionPage />;
      case 'google-play-guide':
        return <GooglePlayGuidePage />;
      default:
        return (
          <LandingPage
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenChrome={handleOpenChrome}
          />
        );
    }
  };

  const isHome = nav.page === 'home';
  const isLoginPage = nav.page === 'login';

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#0B0F19] text-[#0F172A] dark:text-slate-100 flex flex-col transition-colors duration-200 font-['Cairo',sans-serif] relative">
      
      {/* Offline Connectivity Toast */}
      <OfflineIndicator />

      {/* In-App Browser Guidance Banner matching Screenshots 1-7 */}
      <InAppBrowserBanner onOpenChrome={handleOpenChrome} />

      {/* Header with Logo and Language Selector matching Screenshot 2 */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {!isHome && !isLoginPage && isAuthenticated && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 p-3 sm:p-6 w-full ${!isHome && !isLoginPage && isAuthenticated ? 'md:max-w-[calc(100%-18rem)]' : ''}`}>
          {renderCurrentPage()}
        </main>
      </div>

      {/* Footer matching Screenshot 7 */}
      <Footer />

      {/* Floating Bottom Bar matching Screenshots 2-7 */}
      <FloatingBottomBar
        onOpenChrome={handleOpenChrome}
        onDownload={handleDownloadApp}
      />

      {/* PWA Install Modal matching Screenshot 1 */}
      <PwaInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onOpenChrome={handleOpenChrome}
        onDownload={() => {
          setIsInstallModalOpen(false);
          if ('serviceWorker' in navigator) {
            window.dispatchEvent(new Event('beforeinstallprompt'));
          }
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
