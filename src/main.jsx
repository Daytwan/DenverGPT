import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('DenverGPT application root was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
