
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add logo as preload resource
const logoPreload = document.createElement('link');
logoPreload.rel = 'preload';
logoPreload.href = '/logo-advogados.svg';
logoPreload.as = 'image';
document.head.appendChild(logoPreload);

// Add favicon as preload resource
const faviconPreload = document.createElement('link');
faviconPreload.rel = 'preload';
faviconPreload.href = '/favicon.svg';
faviconPreload.as = 'image';
document.head.appendChild(faviconPreload);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
