export function Github({ projects }) {
  return (
    <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
      {projects.map((repo) => (
        <div
          key={repo.id || repo.name}
          className="h-screen w-full flex flex-col justify-center items-center p-8 border-b border-gray-200 text-center flex-shrink-0 snap-center"
        >
          <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
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
  )
}