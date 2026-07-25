export function LeftPanel({ projects }) {
  return (
    <div className="w-1/2 h-screen overflow-y-auto p-12 border-r border-gray-200">
      <h2 className="text-3xl font-bold mb-8">GHL</h2>
      
      <div className="flex flex-col gap-12">
        {projects.map((repo, index) => (
          <div key={repo.id || index} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-sm font-mono text-indigo-600">0{index + 1}</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-2">{repo.name.replace(/-/g, ' ')}</h3>
            <p className="text-gray-600">{repo.description || "Ingen beskrivning tillgänglig."}</p>
          </div>
        ))}
      </div>
    </div>
  )
}