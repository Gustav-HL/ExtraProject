export function LeftPanel() {
  return (
    <div className="w-full h-screen overflow-y-auto p-8 sm:p-16 border-r border-gray-200 snap-y snap-mandatory">
      <section className="h-screen w-full flex items-center justify-center snap-start">
        <blockquote className="max-w-xl text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-gray-900 leading-[1.15]">
            Let’s Build Something Brilliant
          </h1>
        </blockquote>
      </section>
      <section className="min-h-screen w-full flex flex-col justify-center py-20 snap-start">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-gray-900 mb-6">
            About Me
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed font-sans text-lg">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
      <section className="min-h-screen w-full flex flex-col justify-center py-20 snap-start">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-gray-900 mb-8">
            My Competence
          </h2>

 
        </div>
      </section>

    </div>
  )
}