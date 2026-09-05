import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { preloadCharacterAssets } from './lib/preloadAssets'
import './index.css'

// Preload character assets on startup.
void preloadCharacterAssets()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
