import './IntroPage.css'
import Lines from "../../components/Lines.jsx"

const IntroPage = () => {
    return (
        <>
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                <Lines />
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-14   z-0 pointer-events-none select-none flex flex-col items-center gap-1 sm:gap-3 font-serif text-[26vh] sm:text-[32vh] font-bold text-white tracking-tighter leading-[1]">
                    <span className="rotate-[15deg]">G</span>
                    <span className="rotate-[15deg] -translate-x-4 sm:-translate-x-8">H</span>
                    <span className="rotate-[15deg]">L</span>
                </div>
                <h1 className="frontpage-quote font-serif ">
                    Tjena! 
                    My Name is Gustav <br />
                    I make Websites!
                </h1>
            </section>
            
        </>
    )

}
export default IntroPage