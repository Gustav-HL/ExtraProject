import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from "./components/Nav/Navbar.jsx"
import { LeftPanel } from "./components/LeftPanel/LeftPanel.jsx"
import { RightPanel } from "./components/RightPanel/RightPanel.jsx"
import { Calendar } from "./components/Calendar/Calendar.jsx"
import './App.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const GITHUB_USERNAME = "Gustav-HL"

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const CACHE_KEY = 'github_portfolio_projects'
        const CACHE_TIME_KEY = 'github_portfolio_time'
        const DAY = 24 * 60 * 60 * 1000
        const cachedData = localStorage.getItem(CACHE_KEY)
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY)

        if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < DAY)) {
          setProjects(JSON.parse(cachedData))
          setLoading(false)
          return
        }

        const fetchGithubData = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
        )
        if (!fetchGithubData.ok) throw new Error('Could not fetch data.')

        const data = await fetchGithubData.json()
        const myProjects = data.filter(repo => !repo.fork && repo.topics.includes('portfolio'))

        const otherProjects = [
          "Shania-a/Webbteknik-projekt",
          "Shania-a/OOP-Project",
          "GoblinBuilds/ChronoLogical"
        ]

        const fetchOtherRepos = otherProjects.map(async (path) => {
          const res = await fetch(`https://api.github.com/repos/${path}`)
          if (res.ok) return res.json()
          return null
        })

        const externalData = await Promise.all(fetchOtherRepos)
        const combinedProjects = [...myProjects, ...externalData].filter(Boolean)

        combinedProjects.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))

        setProjects(combinedProjects)
        localStorage.setItem(CACHE_KEY, JSON.stringify(combinedProjects))
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAllProjects()
  }, [GITHUB_USERNAME])

  if (error) return <div className="p-8 text-red-500">Error {error}</div>

  return (
    <main className="relative w-full h-screen overflow-hidden bg-white">
      <Navbar />
      <div className="fixed top-1/2 -translate-y-1/2 -left-10 sm:-left-20 z-20 pointer-events-none select-none flex flex-col items-center gap-1 sm:gap-3 font-serif text-[26vh] sm:text-[32vh] font-bold text-gray-900/10 tracking-tighter leading-[1]">
        <span className="rotate-[15deg]">G</span>
        <span className="rotate-[15deg]">H</span>
        <span className="rotate-[15deg]">L</span>
      </div>
      <section className="group/container flex h-screen w-full bg-white overflow-hidden">

        <div className="group/left w-1/2 group-hover/container:w-[35%] hover:!w-[45%] transition-all duration-500 ease-in-out h-full">
          <div className="w-full h-full transform transition-transform duration-500 ease-in-out scale-[0.97] group-hover/left:scale-100 origin-center">
            <LeftPanel />
          </div>
        </div>
        <div className="group/right w-1/2 group-hover/container:w-[55%] hover:!w-[65%] transition-all duration-500 ease-in-out h-full">
          <div className="w-full h-full transform transition-transform duration-500 ease-in-out scale-[0.97] group-hover/right:scale-100 origin-center">
            <RightPanel projects={projects} />
          </div>
        </div>

      </section>
    </main>
  )
}

export default App