import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

console.log(import.meta.env.REACT_APP_SUPABASE_URL);
const supabaseClient = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL || '',
  import.meta.env.VITE_APP_ANON_KEY || '',
)

export const supabase = supabaseClient;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
