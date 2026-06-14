import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const GITHUB_USERNAME = "Gustav-HL";

 useEffect(() => {
  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const CACHE_KEY = 'github_portfolio_projects';
      const CACHE_TIME_KEY = 'github_portfolio_time';
      const ONE_DAT = 24 * 60 * 60 * 1000; 

      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

      if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_DAT)) {
        console.log("local storage used");
        setProjects(JSON.parse(cachedData));
        setLoading(false);
        return; 
      }

      const fetchGithubData = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
      );
      if (!fetchGithubData.ok) throw new Error('Coudnt fetch data.');

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
      <section id="center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((repo) => (
          <div 
            key={repo.id} 
            className=""
          >
            <div>
              <h3 className="">
                {repo.name.replace(/-/g, ' ')}
              </h3>
              <p className="">
                {repo.description || "No description :("}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="">
                {repo.language || "Blandat"}
              </span>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className=""
              >
                Go to github &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
