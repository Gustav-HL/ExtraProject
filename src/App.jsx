import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from "./components/Nav/Navbar.jsx"
import Calendar from "./components/Calendar/Calendar.jsx"
import ProjectSection from "./components/ProjectSection/ProjectSection.jsx"
import Wind from "./components/Particles.jsx"
import Light from "./components/Light.jsx"
import './App.css'
import IntroPage from './components/IntroPage/IntroPage.jsx'
import WorksPage from './components/Works/WorksPage.jsx'

function App() {
  const [currentTheme, setCurrentTheme] = useState('teal')
  const [activeView, setActiveView] = useState('works')
  const lenisRef = useRef(null)


  // Removie GSAP scrollTrigger functions when changing page content
  const handleViewChange = (newView) => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
    setActiveView(newView)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full">
      <Light theme={currentTheme} />
      <Wind theme={currentTheme}/>

      <div className="relative z-10">
        <Navbar activeView={activeView} onViewChange={handleViewChange} />

        {activeView === 'works' ? (
          <WorksPage onBack={() => handleViewChange('home')} />
        ) : (
          <>
            <IntroPage />
            <ProjectSection onThemeChange={setCurrentTheme} />
          </>
        )}
      </div>
    </div>
  )
}

export default App