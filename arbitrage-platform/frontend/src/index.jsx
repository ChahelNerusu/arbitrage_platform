import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/output.css'; // Use the built Tailwind output for custom styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);