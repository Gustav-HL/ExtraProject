import React from 'react'

const ProjectContent = ({
    title,
    content,
    horizontalTrackRef,
    sectionWrapperRef,
    titleClass,
    swipeSizeRef,
    textClass,
    isCurtain = false,
    swipeContentRef,
    curtainBackgroundRef,
    onReturnHome 
}) => {
    const sectionBlueprint = (
        <div className="w-full h-screen overflow-hidden flex items-center relative">
            <div className="absolute inset-0 z-0 flex flex-col justify-center px-12 sm:px-24 pointer-events-none">
                <h1 className={`${titleClass} font-serif text-6xl sm:text-[9.5vw] font-normal leading-none tracking-tight text-white whitespace-nowrap opacity-90 will-change-transform`}>
                    {title}
                </h1>
            </div>
            <div
                ref={horizontalTrackRef}
                className="flex flex-nowrap w-max shrink-0 items-center z-10 relative will-change-transform pl-[100vw]"
            >
                <div className="flex items-center px-16 sm:px-32 h-screen">
                    {content.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex items-center shrink-0 my-auto"
                            style={{ marginRight: item.marginRight }}
                        >
                            {item.isEndCard ? (
                                <div className={`w-[85vw] sm:w-[580px] p-8 sm:p-10 rounded-none bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 shadow-2xl space-y-6 pointer-events-auto transform transition-transform ${item.imageYClass}`}>
                                    <div>
                                        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-300 mt-2 font-sans leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {item.collaborators && item.collaborators.length > 0 && (
                                        <div className="space-y-3 pt-4 border-t border-gray-800">
                                            {item.collaborators.map((collab, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 rounded-none bg-gray-800/60 border border-gray-700/50 hover:border-gray-500 transition-colors"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium text-white">{collab.name}</p>
                                                        <p className="text-xs text-gray-400">{collab.role}</p>
                                                    </div>
                                                    {collab.github && (
                                                        <a
                                                            href={collab.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-none hover:bg-emerald-900/80 hover:text-white transition-all flex items-center gap-1.5"
                                                        >
                                                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                            </svg>
                                                            GitHub
                                                        </a>
                                                    )}
                                                     <button onClick={onReturnHome} className="text-xs uppercase tracking-widest text-emerald-400 hover:underline">
                                                        Backo
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className={`w-[85vw] sm:w-[680px] h-[58vh] sm:h-[65vh] rounded-none overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl shrink-0 relative z-0 transform transition-transform ${item.imageYClass}`}>
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className={`${textClass} absolute z-20 w-[70vw] sm:w-[360px] bg-gray-900/90 backdrop-blur-md border border-gray-700/60 p-6 sm:p-7 rounded-none shadow-2xl space-y-2 pointer-events-none will-change-transform ${item.textPositionClass}`}>
                                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    if (isCurtain) {
        return (
            <section ref={sectionWrapperRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <div ref={swipeSizeRef} className="w-full h-full overflow-hidden pointer-events-auto">
                    <div ref={swipeContentRef} className="w-full h-full overflow-hidden relative">
                        <div ref={curtainBackgroundRef} className="absolute inset-0 bg-[#0a0e17] z-0 pointer-events-none" />
                        <div className="relative z-10">{sectionBlueprint}</div>
                    </div>
                </div>
            </section>
        )
    }

    return <section ref={sectionWrapperRef} className="absolute inset-0 w-full h-full z-10">{sectionBlueprint}</section>
}

export default ProjectContent