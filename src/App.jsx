import { useState, useEffect, useRef } from 'react'
import { GitHubCalendar } from 'react-github-calendar';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GITHUB_USERNAME = "Gustav-HL";

  const splitContainerRef = useRef(null)
  const rightColumnRef = useRef(null)

  useGSAP(() => {
    if (projects.length > 0 && !loading) {
      const timer = setTimeout(() => {
        const totalShift = -((projects.length - 1) * 100)

        gsap.to(rightColumnRef.current, {
          yPercent: totalShift,
          ease: 'none',
          scrollTrigger: {
            trigger: splitContainerRef.current,
            start: 'top top',
            end: `+=${projects.length * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })

        ScrollTrigger.refresh()
      }, 50)

      return () => clearTimeout(timer)
    }
  }, { scope: splitContainerRef, dependencies: [projects, loading] })


  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const CACHE_KEY = 'github_portfolio_projects';
        const CACHE_TIME_KEY = 'github_portfolio_time';
        const DAY = 24 * 60 * 60 * 1000;
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < DAY)) {
          console.log("local storage used");
          setProjects(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const fetchGithubData = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
        );
        if (!fetchGithubData.ok) throw new Error('Could not fetch data.');

        const data = await fetchGithubData.json();
        const myProjects = data.filter(repo => {
          return !repo.fork && repo.topics.includes('portfolio');
        });

        const otherProjects = [
          "Shania-a/Webbteknik-projekt",
          "Shania-a/OOP-Project",
          "GoblinBuilds/ChronoLogical"
        ];

        const fetchOtherRepos = otherProjects.map(async (path) => {
          const res = await fetch(`https://api.github.com/repos/${path}`);
          if (res.ok) return res.json();
          return null;
        });

        const externalData = await Promise.all(fetchOtherRepos);
        const combinedProjects = [...myProjects, ...externalData];

        combinedProjects.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        setProjects(combinedProjects);
        localStorage.setItem(CACHE_KEY, JSON.stringify(combinedProjects));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, [GITHUB_USERNAME]);

  return (
    <>
      <section ref={splitContainerRef} className="flex h-screen w-full overflow-hidden bg-white">

        <div className="w-1/2 h-full flex flex-col justify-center p-8 border-r border-gray-200">
          <h2 className="text-3xl font-bold mb-4">GHL</h2>
        </div>

        <div className="w-1/2 h-full overflow-hidden relative">
          <div ref={rightColumnRef} className="flex flex-col">
            {projects.map((repo) => (
              <div
                key={repo.id || repo.name}
                className="h-screen w-full flex flex-col justify-center items-center p-8 border-b border-gray-200 text-center flex-shrink-0"
              >
                <div className="max-w-md w-full">
                  <h3 className="text-3xl font-bold mb-3 text-gray-900">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {repo.description || "No description :("}
                  </p>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xs font-mono px-2.5 py-1 bg-gray-100 rounded text-gray-700">
                      {repo.language || "Blandat"}
                    </span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Go to github &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
      <section className="h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-400">Slut på projekt</h2>
      </section>
    </>
  )
}

export default App
