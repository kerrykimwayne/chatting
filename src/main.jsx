import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import { Toaster } from 'react-hot-toast'
import Dashbord from './pages/Dashbord.jsx'
import Connexion from './pages/Connexion.jsx'
import Inscrition from './pages/Inscrition.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Messageperso from './coposant/Messageperso.jsx'

const queryclient = new QueryClient()
const route = createBrowserRouter([{
  path: '/',
  element: <Dashbord />
},
{
  path: '/connexion',
  element: <Connexion />
},
{
  path: '/inscription',
  element: <Inscrition />
},
{
  path: '/message/:id',
  element: <Messageperso />
}

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <Toaster />
      <RouterProvider router={route} />
    </QueryClientProvider>
  </React.StrictMode>,
)
