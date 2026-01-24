import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'highlight.js/styles/github-dark-dimmed.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ProjectsPage from './pages/ProjectsPage'
import NotesPage from './pages/NotesPage'
import MarkdownRenderer from './components/MarkdownRenderer'
import Spotlight from './ui/Spotlight'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Spotlight />
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:slug" element={<MarkdownRenderer />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
