import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Утилиты для генерации комментариев (доступны в консоли через window.generateComments и window.fillAllComments)
import './utils/generateComments'
import { setupLinkPrefetch } from './utils/prefetch'

// Service Worker регистрация
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

// Prefetch для улучшения навигации
window.addEventListener('load', () => {
  setTimeout(() => setupLinkPrefetch(), 2000);
});

createRoot(document.getElementById("root")!).render(<App />);