import './IntroPage.css'

const IntroPage = () => {
    return (
        <>
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-20 z-0 pointer-events-none select-none flex flex-col items-center gap-1 sm:gap-3 font-serif text-[26vh] sm:text-[32vh] font-bold text-white tracking-tighter leading-[1]">
                    <span className="rotate-[15deg]">G</span>
                    <span className="rotate-[15deg]">H</span>
                    <span className="rotate-[15deg]">L</span>
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line
                        x1="35%" y1="20%"
                        x2="100%" y2="20%"
                        className="hero-line line-1"
                    />
                    <line
                        x1="55%" y1="25%"
                        x2="100%" y2="25%"
                        className="hero-line line-2"
                    />
                    <line
                        x1="70%" y1="30%"
                        x2="100%" y2="30%"
                        className="hero-line line-3"
                    />
                </svg>
                <h1 className="frontpage-quote font-serif ">
                    Tjena! 
                    My Name is Gustav <br />
                    I make Websites!
                </h1>
                <div className="bottom-right-boxes">
                    <div className="squeeze-box box-1" />
                    <div className="squeeze-box box-2" />
                    <div className="squeeze-box box-3" />
                </div>
            </section>
        </>
    )

}
export default IntroPage