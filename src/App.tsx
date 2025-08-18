import { useModeStore } from './store/modeStore'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Hero from './components/shared/hero/Hero'
import Projects from './components/shared/Projects'
import Contact from './components/shared/Contact'
import ProgrammingAbout from './components/programming/About'
import CivilAbout from './components/civil/About'
import PlayStationBackground from './components/shared/PlayStationBackground'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TechProjects from './components/project/TechProjects'
import ScrollToTop from './components/shared/ScrollToTop'

function App() {
  const { currentMode } = useModeStore()

  return (
    <Router> {/* Uygulama Router ile sarmalandı */}
    <ScrollToTop />
      <div className="min-h-screen transition-colors duration-500 relative overflow-hidden flex flex-col">
        {/* PlayStation Arka Plan */}
        <PlayStationBackground />
        
        <Navbar />
        
        <main className="pt-14 relative z-10 flex-1">
          <Routes>
          
            <Route path="/" element={
              // Ana sayfa içeriği
              currentMode === 'programming' ? (
                <div key="programming">
                  <Hero />
                  <ProgrammingAbout />
                  <Projects/>
                  <Contact />
                </div>
              ) : (
                <div key="civil">
                  <Hero />
                  <CivilAbout />
                  <Projects/>
                  <Contact />
                </div>
              )
            } />
            {/* Teknolojiye göre filtrelenmiş projeler sayfası için yeni rota */}
            <Route path="/projects/tech/:tech" element={<TechProjects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
