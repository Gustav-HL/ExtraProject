import React from 'react'
import ProjectContent from './ProjectContent.jsx'

const ProjectSection = ({ sections = [] }) => {
  return (
    <div className="relative w-full text-white">
      {sections.map((sec) => (
        <ProjectContent
          key={sec.id}
          title={sec.title}
          githubUrl={sec.githubUrl}
          readme={sec.readme}
          content={sec.content}
        />
      ))}
    </div>
  )
}

export default ProjectSection