import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Winner from './assets/components/Winner.jsx';
import { WinnerProvider } from './assets/WinnerContext.jsx';

createRoot(document.getElementById('root')).render(
  <WinnerProvider>
    <BrowserRouter basename="/tictactoe">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </BrowserRouter>
  </WinnerProvider>
);
