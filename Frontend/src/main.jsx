import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const paths = [
  {
    path : '/',
    element : (
      <App />
    ),
  },
];

const BrowserRouter = createBrowserRouter(paths);

createRoot(document.getElementById('root')).render(

  <RouterProvider router = {BrowserRouter} />

)
