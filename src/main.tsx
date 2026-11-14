import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { FamilyProvider } from './context/FamilyContext';
import './index.css';

// Registro automático do Service Worker para suporte a PWA Offline-first
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('Falha ao registrar Service Worker do PWA:', err);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <FamilyProvider>
        <App />
      </FamilyProvider>
    </ThemeProvider>
  </React.StrictMode>
);
