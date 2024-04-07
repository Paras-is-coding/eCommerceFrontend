import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import  "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/main.css"
import 'bootstrap';
import Routing from './routing/routing.config.jsx';
import ThemeProvider from './config/theme.context.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* to use any reducers in store in application */}
    <Provider  store={store}>
    <ThemeProvider>
    <Routing/>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
