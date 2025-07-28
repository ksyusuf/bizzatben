import { motion, AnimatePresence } from 'framer-motion'
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
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <AnimatePresence mode="wait">
          {currentMode === 'programming' ? (
            <motion.div
              key="programming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProgrammingAbout />
            </motion.div>
          ) : (
            <motion.div
              key="civil"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CivilAbout />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
