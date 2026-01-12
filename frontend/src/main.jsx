import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Components/Store/store.js'
import { Provider } from 'react-redux'

import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>,
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>,
)
