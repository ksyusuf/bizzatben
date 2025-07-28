import { useModeStore } from './store/modeStore'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Hero from './components/shared/Hero'
import Projects from './components/shared/Projects'
import Contact from './components/shared/Contact'
import ProgrammingAbout from './components/programming/About'
import CivilAbout from './components/civil/About'
import PlayStationBackground from './components/shared/PlayStationBackground'

function App() {
  const { currentMode } = useModeStore()

  return (
    <div className="min-h-screen transition-colors duration-500 relative overflow-hidden">
      {/* PlayStation Arka Plan */}
      <PlayStationBackground />
      
      <Navbar />
      
      <main className="pt-14 relative z-10">
        {currentMode === 'programming' ? (
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
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
