import React, {StrictMode} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import App from './App';
import {store} from './redux/store';

import 'react-toastify/dist/ReactToastify.css';
import './index.module.scss';

render(
  <StrictMode>
    <ToastContainer
      autoClose={2000}
      closeOnClick={false}
      draggable={false}
      pauseOnFocusLoss={false}
      theme="colored"
    />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
