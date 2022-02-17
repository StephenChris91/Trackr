import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//auth
import { AuthContextProvider } from './Components/context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
