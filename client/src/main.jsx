import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import { SearchProvider } from "./assets/components/Context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <SearchProvider>
    <App />
    </SearchProvider>
  </CookiesProvider>
);
