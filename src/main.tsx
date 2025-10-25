import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Утилиты для генерации комментариев (доступны в консоли через window.generateComments и window.fillAllComments)
import './utils/generateComments'

createRoot(document.getElementById("root")!).render(<App />);