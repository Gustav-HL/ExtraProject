export function RightPanel() {
    const mainImage1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    const overlayImage1 = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    const mainImage2 = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"

    return (
        <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory bg-transparent">
            <section className="h-screen w-full flex items-center justify-center snap-start p-8 sm:p-12">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <h2 className="absolute top-2 -left-12 sm:top-4 sm:-left-20 z-20 font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-gray-950 tracking-tight whitespace-nowrap select-none pointer-events-none drop-shadow-md">
                        Featured <span className="">Project</span>
                    </h2>
                    <div className="w-full h-full overflow-hidden shadow-xl border border-gray-100 bg-gray-100 z-0">
                        <img
                            src={mainImage1}
                            alt="Main feature"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-3/5 aspect-[3/2] overflow-hidden shadow-2xl border-4 border-white bg-gray-200 z-10">
                        <img
                            src={overlayImage1}
                            alt="Overlay detail"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
            </section>
            <section className="h-screen w-full flex items-center justify-center snap-start p-8 sm:p-12">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <h2 className="absolute top-2 -left-12 sm:top-4 sm:-left-20 z-20 font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-gray-950 tracking-tight whitespace-nowrap select-none pointer-events-none drop-shadow-md">
                        Recent <span className="">Work</span>
                    </h2>
                    <div className="w-full h-full overflow-hidden shadow-xl border border-gray-100 bg-gray-100 z-0">
                        <img
                            src={mainImage2}
                            alt="Recent work"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <a
                        href="#project-details"
                        className="group/card absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-3/5 aspect-[3/2] shadow-2xl border-4 border-white bg-white p-5 sm:p-6 z-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
                    >
                        <div>
                            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-400 uppercase block mb-1">
                                Concept / 2026
                            </span>
                            <h3 className="font-serif text-base sm:text-lg font-medium text-gray-900 leading-snug group-hover/card:text-blue-600 transition-colors">
                                Minimalist Interior Space
                            </h3>
                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                A exploration of light, form, and functionality in modern architecture.
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                            <span className="text-xs font-medium text-gray-900">View Project</span>
                            <span className="text-xs text-gray-900 transition-transform duration-300 group-hover/card:translate-x-1">
                                →
                            </span>
                        </div>
                    </a>
                </div>
            </section>

        </div>
    )
}