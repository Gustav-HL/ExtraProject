import Navbar from "./components/Nav/Navbar.jsx"
import Calendar from "./components/Calendar/Calendar.jsx"
import WorksPage from "./components/Works/WorksPage.jsx"
import './App.css'

function App() {
  const GITHUB_USERNAME = "Gustav-HL"

  return (
    <div className="relative min-h-screen w-full">
      <Navbar />
      <WorksPage githubUsername={GITHUB_USERNAME} />
      <Calendar username={GITHUB_USERNAME} />
    </div>
  )
}

export default App