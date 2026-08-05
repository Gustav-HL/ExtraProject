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
  // const [projects, setProjects] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // const GITHUB_USERNAME = "Gustav-HL"

  // useEffect(() => {
  //   const fetchAllProjects = async () => {
  //     try {
  //       setLoading(true)
  //       setError(null)
  //       const CACHE_KEY = 'github_portfolio_projects'
  //       const CACHE_TIME_KEY = 'github_portfolio_time'
  //       const DAY = 24 * 60 * 60 * 1000
  //       const cachedData = localStorage.getItem(CACHE_KEY)
  //       const cachedTime = localStorage.getItem(CACHE_TIME_KEY)

  //       if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < DAY)) {
  //         setProjects(JSON.parse(cachedData))
  //         setLoading(false)
  //         return
  //       }

  //       const fetchGithubData = await fetch(
  //         `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
  //       )
  //       if (!fetchGithubData.ok) throw new Error('Could not fetch data.')

  //       const data = await fetchGithubData.json()
  //       const myProjects = data.filter(repo => !repo.fork && repo.topics.includes('portfolio'))

  //       const otherProjects = [
  //         "Shania-a/Webbteknik-projekt",
  //         "Shania-a/OOP-Project",
  //         "GoblinBuilds/ChronoLogical"
  //       ]

  //       const fetchOtherRepos = otherProjects.map(async (path) => {
  //         const res = await fetch(`https://api.github.com/repos/${path}`)
  //         if (res.ok) return res.json()
  //         return null
  //       })

  //       const externalData = await Promise.all(fetchOtherRepos)
  //       const combinedProjects = [...myProjects, ...externalData].filter(Boolean)

  //       combinedProjects.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))

  //       setProjects(combinedProjects)
  //       localStorage.setItem(CACHE_KEY, JSON.stringify(combinedProjects))
  //       localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())

  //     } catch (err) {
  //       setError(err.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchAllProjects()
  // }, [GITHUB_USERNAME])

  // if (error) return <div className="p-8 text-red-500">Error {error}</div>

  const [currentTheme, setCurrentTheme] = useState('teal')
  const [activeView, setActiveView] = useState('home')
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