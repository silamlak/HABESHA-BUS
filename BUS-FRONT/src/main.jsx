import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {store} from './app/store.js'
const  qclient = new QueryClient({})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={qclient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);