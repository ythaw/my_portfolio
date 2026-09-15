import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { preloadClickSound } from './lib/clickSound'
import { preloadCharacterAssets } from './lib/preloadAssets'
import './index.css'

void preloadCharacterAssets()
void preloadClickSound()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
