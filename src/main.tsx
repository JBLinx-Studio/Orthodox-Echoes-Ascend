
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log cache busting info for debugging
console.info('Application initializing', {
  version: __BUILD_VERSION__,
  buildDate: __BUILD_DATE__,
  cacheBuster: __CACHE_BUSTER__
});

createRoot(document.getElementById("root")!).render(<App />);
