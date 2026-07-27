import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ProjectSection() {
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)

  const rawProjects = [
    {
      id: 1,
      tag: '01 / ARCHITECTURE',
      title: 'Minimalist Spatial Concept',
      desc: 'An exploration of natural light and raw textures in modern residential design.',
      img: 'https://picsum.photos/id/1018/1200/800',
    },
    {
      id: 2,
      tag: '02 / INTERIOR',
      title: 'Monochrome Living',
      desc: 'Reducing cognitive noise through clean geometry and warm timber accents.',
      img: 'https://picsum.photos/id/1067/1200/800',
    },
    {
      id: 3,
      tag: '03 / DIGITAL',
      title: 'Interactive Interfaces',
      desc: 'Focusing on fluid animations, clear hierarchy, and seamless user experiences.',
      img: 'https://picsum.photos/id/1060/1200/800',
    },
    {
      id: 4,
      tag: '04 / URBAN',
      title: 'Concrete Horizons',
      desc: 'Mapping spatial interactions within dense metropolitan environments.',
      img: 'https://picsum.photos/id/1040/1200/800',
    }
  ]

  // Slumpa BÅDE bildernas och textrutornas positioner
  const projects = useMemo(() => {
    // 1. Bilders Y-förskjutning (förhindrar att bilderna ligger på en rak horisontell linje)
    const imageYOffsets = [
      '-translate-y-12 sm:-translate-y-20', // Högt upp
      'translate-y-10 sm:translate-y-16',   // Lågt ner
      '-translate-y-4 sm:-translate-y-6',   // Lätt förskjuten uppåt
      'translate-y-0'                        // Centrerad
    ]

    // 2. Textrutornas vertikala slump-lägen
    const textVerticalPositions = [
      '-top-16 sm:-top-24',
      'top-4',
      'top-1/3',
      '-bottom-12',
      '-bottom-20 sm:-bottom-28'
    ]
    
    // 3. Textrutornas horisontella slump-lägen
    const textHorizontalOffsets = [
      'left-1/4 sm:left-1/3',
      'left-1/2 sm:left-2/3',
      'left-full ml-4 sm:ml-12',
      '-ml-12 sm:-ml-24'
    ]

    return rawProjects.map((project) => {
      const imgY = imageYOffsets[Math.floor(Math.random() * imageYOffsets.length)]
      const textVert = textVerticalPositions[Math.floor(Math.random() * textVerticalPositions.length)]
      const textHoriz = textHorizontalOffsets[Math.floor(Math.random() * textHorizontalOffsets.length)]

      // Slumpmässigt extra X-avstånd (gap) till NÄSTA bild (mellan 120px och 280px)
      const extraMarginRight = 120 + Math.floor(Math.random() * 160)
      

      return {
        ...project,
        imageYClass: imgY,
        textPositionClass: `${textVert} ${textHoriz}`,
        marginRight: `${extraMarginRight}px`,
        speed: -(500 + Math.floor(Math.random() * 350))
      }
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current

    if (!container || !wrapper) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(container.scrollWidth - window.innerWidth)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${container.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Huvudscroll för hela galleriet
      tl.to(container, {
        x: getScrollAmount,
        ease: 'none',
      }, 0)

      // Titelns bakgrundsrörelse
      tl.to('.slow-title', {
        x: -120,
        ease: 'none',
      }, 0)

      // Snabb parallax för textrutorna
      const textElements = gsap.utils.toArray('.parallax-text')
      textElements.forEach((text, i) => {
        tl.to(
          text,
          {
            x: projects[i]?.speed || -650,
            ease: 'none',
          },
          0
        )
      })
    })

    return () => ctx.revert()
  }, [projects])

  return (
    <div className="w-full bg-[#15151e] text-white">
      {/* SEKTION FÖRE */}
      <div className="h-[50vh] bg-[#1a1a24] flex items-center justify-center">
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
          Scroll down to enter experience ↓
        </p>
      </div>

      {/* HORISONTELL WRAPPER */}
      <div 
        ref={wrapperRef} 
        className="w-full h-screen overflow-hidden flex items-center bg-[#15151e] relative"
      >
        
        {/* TITEL I BAKGRUNDEN */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center px-12 sm:px-24 pointer-events-none">
          <h1 className="slow-title font-serif text-6xl sm:text-[9.5vw] font-normal leading-none tracking-tight text-white whitespace-nowrap opacity-90 will-change-transform">
            DESIGN PORTFOLIO
          </h1>
        </div>

        {/* BILDER OCH TEXTRUTOR */}
        <div 
          ref={containerRef} 
          className="flex flex-nowrap w-max shrink-0 items-center z-10 relative will-change-transform pl-[100vw]"
        >
          <div className="flex items-center px-16 sm:px-32  h-screen">
            {projects.map((item) => (
              <div 
                key={item.id} 
                className="relative flex items-center shrink-0 my-auto"
                style={{ marginRight: item.marginRight }} // Slumpad X-distans till nästa bild
              >
                
                {/* BILD-KORT: Med slumpad Y-förskjutning */}
                <div className={`w-[70vw] sm:w-[500px] h-[48vh] sm:h-[52vh] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl shrink-0 relative z-0 transform transition-transform ${item.imageYClass}`}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXTRUTA: Med egen slumpad position och parallax-hastighet */}
                <div 
                  className={`parallax-text absolute z-20 w-[60vw] sm:w-[340px] bg-gray-900/90 backdrop-blur-md border border-gray-700/60 p-6 rounded-xl shadow-2xl space-y-2 pointer-events-none ${item.textPositionClass} ${item.imageYClass}`}
                >
                  <span className="text-xs font-mono text-emerald-400 block">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SEKTION EFTER */}
      <div className="h-screen bg-[#1a1a24] flex items-center justify-center">
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
          End of Showcase ↑
        </p>
      </div>
    </div>
  )
}