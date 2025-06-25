import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DeadlineScreen from './components/DeadlineScreen'
import App from './App'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
