import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from './store/store.js';
import { UserProvider } from './store/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
