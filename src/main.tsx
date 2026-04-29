import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const crawlableFallback = document.getElementById('crawlable-content');
if (crawlableFallback) {
  // Keep fallback content for no-JS crawlers; hide it when the app hydrates.
  crawlableFallback.setAttribute('aria-hidden', 'true');
  crawlableFallback.style.display = 'none';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
