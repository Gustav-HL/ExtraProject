import React, { useState } from 'react'
import ProjectContent from './ProjectContent.jsx'
import Calendar from '../Calendar/Calendar.jsx'

const ProjectSection = ({ sections = [], githubUsername = "Gustav-HL"  }) => {
  // State for highlightning what project is currently shown. If its null show the gallery.
  const [activeSection, setActiveSection] = useState(null)
  // View for the projects
  if (activeSection) {
    return (
      <div className="w-full">
        <div className="px-6 sm:px-16 pt-10">
          <button
            onClick={() => setActiveSection(null)}
            className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition"
          >
            &larr; Back to Gallery
          </button>
        </div>
        <ProjectContent
          title={activeSection.title}
          githubUrl={activeSection.githubUrl}
          theme={activeSection.theme}
          readme={activeSection.readme}
          content={activeSection.content}
        />
      </div>
    )
  }
  // Gallery view and github calendar 
  return (
    <section className="w-full min-h-screen px-6 sm:px-16 py-20 text-white">
      <div className="mb-12 border-b border-white/10 pb-6">
        <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white">
          My Projects Gallery
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((sec) => {
          // gathers a thumbnail from the sections content
          const thumbnail = sec.content?.find((c) => c.img)?.img
          const description = sec.content?.find((c) => c.desc)?.desc

          return (
            <div
              key={sec.id}
              onClick={() => setActiveSection(sec)}
              className="cursor-pointer bg-gray-900 border border-gray-800 hover:border-teal-400/50 transition duration-300 flex flex-col overflow-hidden shadow-xl group"
            >
              <div className="w-full h-56 bg-black/40 overflow-hidden">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={sec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-gray-500">
                    No image available :(
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-teal-400">
                    {sec.repo}
                  </span>
                  <h2 className="font-serif text-2xl font-normal text-white mt-1 group-hover:text-teal-300 transition-colors">
                    {sec.title}
                  </h2>
                  {description && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-400 group-hover:translate-x-1 transition-transform">
                    View Project
                  </span>
                  {sec.githubUrl && (
                    <a
                      href={sec.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      GitHub repo
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Calendar username={githubUsername} />
    </section>
  )
}

export default ProjectSection