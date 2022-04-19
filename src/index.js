import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.servidor = 'https://classificados-back.herokuapp.com'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);