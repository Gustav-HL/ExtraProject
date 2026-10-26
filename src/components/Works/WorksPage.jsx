import React, { useState, useEffect } from 'react'
import Calendar from '../Calendar/Calendar'
import Github from '../Github/Github'

const WorksPage = () => {
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
  if (loading) return <div className="p-8 text-white">Loading...</div>

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div data-lenis-prevent className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
                <section className="h-screen w-full flex items-center justify-center p-6 flex-shrink-0 snap-center min-w-0">
                    <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl overflow-x-auto min-w-0">
                        <Calendar username={GITHUB_USERNAME} />
                    </div>
                </section>

                <Github projects={projects} />
            </div>
        </div>
    )
}

export default WorksPage