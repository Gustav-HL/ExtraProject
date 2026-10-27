import React from 'react'

const ProjectContent = ({
  title,
  githubUrl,
  content = [],
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-8 sm:px-20 py-20 border-b border-white/10">
      {/* Sektionstitel och GitHub-länk */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white">
          {title}
        </h2>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition text-sm text-teal-300 font-mono"
          >
            GitHub Källkod &rarr;
          </a>
        )}
      </div>

      {/* Grid med projektets kort */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {content.map((item) => (
          <div key={item.id} className="relative flex flex-col">
            {item.isEndCard ? (
              <div className="h-full p-6 sm:p-8 bg-gray-900/95 border border-gray-700/80 shadow-2xl flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {item.collaborators?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.collaborators.map((c) => (
                      <a
                        key={c.name}
                        href={c.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition text-xs text-teal-300"
                      >
                        {c.avatar && (
                          <img src={c.avatar} alt={c.name} className="w-4 h-4 rounded-full" />
                        )}
                        <span>@{c.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full bg-gray-900 border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
                {item.img && (
                  <div className="w-full h-56 sm:h-64 overflow-hidden">
                    <img
                      src={item.img}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {item.desc && (
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-gray-900/90">
                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectContent