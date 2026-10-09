import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe PWA ServiceWorker registration (guarded against iframe invalid state)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    // Only attempt registration in valid production state without breaking iframes
    try {
      if (document && document.readyState === 'complete') {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .catch((err) => {
            // Silently handle preview / iframe sandboxing restrictions
            console.debug('ServiceWorker registration postponed:', err?.message || err);
          });
      }
    } catch (e) {
      // Safe no-op in preview sandboxes
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
