import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2 text-xs font-black text-white shadow-xl border border-white/20 select-none animate-in fade-in slide-in-from-top-3">
      <WifiOff size={16} />
      <span>أنت غير متصل بالإنترنت — يمكنك تصفح الدروس والملخصات المحفوظة!</span>
    </div>
  );
};
