// <reference path="../typings/lodash/lodash.d.ts"/>
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter } from 'react-router-dom';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AlertProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
