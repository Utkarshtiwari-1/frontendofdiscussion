import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {Provider} from "react-redux"
import { combinedreducer } from './store';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer:combinedreducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Toaster></Toaster>
      <Provider store={store}>
      <App />
      </Provider>
        
      </BrowserRouter>
  
  </React.StrictMode>
);
