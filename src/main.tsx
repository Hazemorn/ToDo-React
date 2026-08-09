import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import './styles/_reset.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
