import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WebSocketProvider } from './socketContext';

ReactDOM.render(
  <React.StrictMode>
    <WebSocketProvider>
        <App />
    </WebSocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);