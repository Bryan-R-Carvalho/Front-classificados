import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.servidor = 'http://localhost:8080'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);