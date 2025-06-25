import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DeadlineScreen from './components/DeadlineScreen'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeadlineScreen />
  </StrictMode>,
)
