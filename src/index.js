import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.servidor = 'https://classificados-ds2.herokuapp.com'//https://classificados-ds2.herokuapp.com http://localhost:8080

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);