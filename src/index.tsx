import React from 'react';
import ReactDOM from 'react-dom/client';
import './vendor/normalize.css'
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/rootReducer';
import {configureStore} from "@reduxjs/toolkit";
import CustomRouter from "./components/CustomRouter/CustomRouter";
import {socketMiddleware} from "./services/socketMiddleware";
import {wsActions, wsActions_user} from "./services/actions/ws-actions";
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunkMiddleware,socketMiddleware('wss://norma.nomoreparties.space/orders/all',wsActions),socketMiddleware('wss://norma.nomoreparties.space/orders?token=',wsActions_user)]
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //<React.StrictMode>
      <Provider store={store}>

             <CustomRouter/>
      </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
