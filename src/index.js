import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { WebSocketProvider } from './socketContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <WebSocketProvider>
      <Router>
        <App/>
      </Router>
    </WebSocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);