import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
// import { ToastContainer } from 'react-toastify';

import App from './App'
import store from './store'
import { GlobalStateContext, Login } from './views/pages/login/Login'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
