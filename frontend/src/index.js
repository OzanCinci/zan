import React from 'react';
import ReactDOM from 'react-dom';

// STYLES
import './index.css';
import './bootstrap.min.css'
// COMPONENTS
import App from './App';
// REDUX -> STORE AND PROVIDER
import store from './store.js'
import {Provider} from 'react-redux'



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);