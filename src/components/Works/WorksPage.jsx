import { useState, useEffect, useMemo } from 'react'
import ProjectSection from '../ProjectSection/ProjectSection.jsx'

const sectionsBlueprint = [
  {
    id: 'sec-1',
    repo: 'IoT_project',
    theme: 'teal',
    fetchReadme: true,
    content: [
      {
        id: 1,
        title: 'IoT Project',
        desc: 'A small proof of concept I created.',
        isEndCard: false,
      }
    ]
  },
  {
    id: 'sec-2',
    repo: 'SkitEnkelt',
    theme: 'night',
    fetchReadme: true,
    content: [
      {
        id: 5,
        desc: 'Objektorienterad arkitektur och klassdesign.',
        img: 'https://picsum.photos/id/1060/1200/800',
      },
      {
        id: 6,
        title: 'A Collaberative Effort',
        desc: 'Arkitektur och utveckling i grupp.',
        isEndCard: true,
      }
    ]
  },
  {
    id: 'sec-3',
    repo: 'GoblinBuilds/ChronoLogical',
    theme: 'forest',
    fetchReadme: false,
    content: [
      {
        id: 7,
        desc: 'Interaktiv tidslinje och spelmekanik.',
        img: 'https://picsum.photos/id/1018/1200/800',
      },
      {
        id: 8,
        desc: 'Spelgränssnitt och nivåer.',
        img: 'https://picsum.photos/id/1067/1200/800',
      },
      {
        id: 9,
        title: 'A collaberative effort',
        desc: 'Projekt skapat i grupp.',
        isEndCard: true,
      }
    ]
  }
]

const WorksPage = ({ githubUsername = "Gustav-HL" }) => {
  const [projects, setProjects] = useState([])
  const [readmes, setReadmes] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          `https://api.github.com/users/${githubUsername}/repos?sort=updated`
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

        const projectsWithContributors = await Promise.all(
          combinedProjects.map(async (repo) => {
            try {
              const res = await fetch(repo.contributors_url)
              const users = res.ok ? await res.json() : []
              const contributors = users.map((u) => ({
                name: u.login,
                avatar: u.avatar_url,
                github: u.html_url
              }))
              return { ...repo, contributors }
            } catch {
              return { ...repo, contributors: [] }
            }
          })
        )

        projectsWithContributors.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))

        setProjects(projectsWithContributors)
        localStorage.setItem(CACHE_KEY, JSON.stringify(projectsWithContributors))
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAllProjects()
  }, [githubUsername])

  useEffect(() => {
    if (!projects.length) return

    const loadReadmes = async () => {
      const readmeMap = {}
      for (const sec of sectionsBlueprint) {
        if (!sec.fetchReadme || !sec.repo) continue

        const gitData = projects.find((r) => {
          const target = sec.repo.toLowerCase()
          return (
            r.name.toLowerCase() === target ||
            r.full_name?.toLowerCase() === target ||
            r.name.toLowerCase() === target.split('/').pop()
          )
        })

        if (gitData) {
          const fullName = gitData.full_name || `${githubUsername}/${gitData.name}`
          try {
            let res = await fetch(`https://raw.githubusercontent.com/${fullName}/main/README.md`)
            if (!res.ok) {
              res = await fetch(`https://raw.githubusercontent.com/${fullName}/master/README.md`)
            }
            if (res.ok) {
              readmeMap[sec.id] = await res.text()
            }
          } catch {}
        }
      }
      setReadmes(readmeMap)
    }

    loadReadmes()
  }, [projects, githubUsername])

  const sections = useMemo(() => {
    return sectionsBlueprint.map((sec, secIndex) => {
      const gitData = sec.repo
        ? projects.find((r) => {
            const target = sec.repo.toLowerCase()
            return (
              r.name.toLowerCase() === target ||
              r.full_name?.toLowerCase() === target ||
              r.name.toLowerCase() === target.split('/').pop()
            )
          })
        : null

      const resolvedTitle = sec.title || gitData?.name.replace(/[-_]/g, ' ') || `Projekt ${secIndex + 1}`
      const resolvedCollaborators = gitData?.contributors || []

      const mergedContent = sec.content.map((item) => ({
        ...item,
        title: item.title || resolvedTitle,
        githubUrl: gitData?.html_url || null,
        collaborators: item.collaborators || (item.isEndCard ? resolvedCollaborators : null)
      }))

      return {
        ...sec,
        title: resolvedTitle,
        githubUrl: gitData?.html_url || null,
        readme: readmes[sec.id] || null,
        content: mergedContent
      }
    })
  }, [projects, readmes])

  return (
    <div className="w-full">
      <ProjectSection sections={sections} />
    </div>
  )
}

export default WorksPage