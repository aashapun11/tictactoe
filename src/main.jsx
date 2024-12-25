import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Winner from './assets/components/Winner.jsx'
import { WinnerProvider } from './assets/WinnerContext.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<App />} />
    <Route path="/winner" element={<Winner />} /> 
  </Route>
))


createRoot(document.getElementById('root')).render(
  <WinnerProvider> 
    <RouterProvider router={router} />
  </WinnerProvider>,
)
