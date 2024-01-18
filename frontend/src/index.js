import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SurveysContextProvider } from './context/SurveysContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SurveysContextProvider>
    <App />
    </SurveysContextProvider>
  </React.StrictMode>
);


