import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectContent from './ProjectContent.jsx'

gsap.registerPlugin(ScrollTrigger)

const data = [
    {
        id: 'sec-1',
        title: 'Projekt Huoan 1',
        theme: 'teal',
        content: [
            {
                id: 1,
                title: 'Minimalist Spatial Concept',
                desc: 'An exploration of natural light and raw textures in modern residential design.',
                img: 'https://picsum.photos/id/1018/1200/800',
            },
            {
                id: 2,
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
                title: 'Samarbeten i Sektion 1',
                desc: 'Projekt skapade tillsammans med fina kollegor och vänner.',
                isEndCard: true,
                collaborators: [
                    { name: 'Shania', github: 'https://github.com/Shania-a', role: 'Webbteknik & OOP' },
                    { name: 'GoblinBuilds', github: 'https://github.com/GoblinBuilds', role: 'ChronoLogical' }
                ]
            }
        ]
    },
    {
        id: 'sec-2',
        title: 'Projekt dos',
        theme: 'night',
        content: [
            {
                id: 5,
                title: 'Generative Shader Work',
                desc: 'Real-time WebGL graphics exploring raymarching and particle physics.',
                img: 'https://picsum.photos/id/1060/1200/800',
            },
            {
                id: 6,
                title: 'Samarbeten i Sektion 2',
                desc: 'Projekt skapade tillsammans med mina fantastiska teammedlemmar.',
                isEndCard: true,
                collaborators: [
                    { name: 'Pelle Persson', github: 'https://github.com/PellePersson', role: 'UX & Frontend' }
                ]
            }
        ]
    },
    {
        id: 'sec-3',
        title: 'Projekt tres',
        theme: 'forest',
        content: [
            {
                id: 7,
                title: 'Minimalist Spatial Concept',
                desc: 'An exploration of natural light and raw textures in modern residential design.',
                img: 'https://picsum.photos/id/1018/1200/800',
            },
            {
                id: 8,
                title: 'Monochrome Living',
                desc: 'Reducing cognitive noise through clean geometry and warm timber accents.',
                img: 'https://picsum.photos/id/1067/1200/800',
            },
            {
                id: 9,
                tag: '03 / DIGITAL',
                title: 'Interactive Interfaces',
                desc: 'Focusing on fluid animations, clear hierarchy, and seamless user experiences.',
                img: 'https://picsum.photos/id/1060/1200/800',
            },
            {
                id: 10,
                title: 'Samarbeten i Sektion 1',
                desc: 'Projekt skapade tillsammans med fina kollegor och vänner.',
                isEndCard: true,
                collaborators: [
                    { name: 'Shania', github: 'https://github.com/Shania-a', role: 'Webbteknik & OOP' },
                    { name: 'GoblinBuilds', github: 'https://github.com/GoblinBuilds', role: 'ChronoLogical' }
                ]
            }
        ]
    }
]

const ProjectSection = ({ onThemeChange }) => {
    const mainWrap = useRef(null)
    const sectionWrapperRefs = useRef([])
    const horizontalTrackRefs = useRef([])
    const swipeSizeRefs = useRef([])
    const swipeContentRefs = useRef([])
    const curtainBackgroundRefs = useRef([])

    // Format content with random poistions and palalax speeds.
    const formatContent = (data) => {
        const imageYOffsets = ['-translate-y-4', 'translate-y-4', 'translate-y-0']
        
        // Set of random cooridinates in Y axis for text boxes
        const textVerticalPositions = [
            'top-4', 
            'top-1/4', 
            'top-1/2 -translate-y-1/2', 
            'top-2/3', 
            'bottom-4'
        ]
        const textHorizontalOffsets = ['left-8 sm:left-16']

        return data.map((project) => ({
            ...project,
            imageYClass: imageYOffsets[Math.floor(Math.random() * imageYOffsets.length)],
            textPositionClass: `${textVerticalPositions[Math.floor(Math.random() * textVerticalPositions.length)]} ${textHorizontalOffsets[Math.floor(Math.random() * textHorizontalOffsets.length)]}`,
            marginRight: `${160 + Math.floor(Math.random() * 160)}px`,
            speed: -(500 + Math.floor(Math.random() * 350))
        }))
    }

    // Memorera den formatterade projektdata för alla sektioner
    const sections = useMemo(() => {
        return data.map((sec) => ({
            ...sec,
            content: formatContent(sec.content)
        }))
    }, [])

    useEffect(() => {
        const wrapper = mainWrap.current
        if (!wrapper) return

        const context = gsap.context(() => {
            // Get the total scroll width 
            let totalScrollWidth = 0
            horizontalTrackRefs.current.forEach((c) => {
                if (c) totalScrollWidth += c.scrollWidth
            })

            // GSAP settings
            sections.forEach((sec, index) => {
                if (index === 0) {
                    if (sectionWrapperRefs.current[0]) gsap.set(sectionWrapperRefs.current[0], { display: 'block' })
                } else {
                    if (swipeSizeRefs.current[index]) gsap.set(swipeSizeRefs.current[index], { xPercent: 100 })
                    if (swipeContentRefs.current[index]) gsap.set(swipeContentRefs.current[index], { xPercent: -100 })
                    if (curtainBackgroundRefs.current[index]) gsap.set(curtainBackgroundRefs.current[index], { opacity: 1 })
                }
            })

            const scrollDuration = 3
            const wipeDuration = 1
            const extraDrift = 120

            // Create the main timeline that will be scrolled trhough
            const scrollHandler = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top top',
                    end: () => `+=${totalScrollWidth + window.innerWidth * sections.length}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            })

            // Loop through the data and build the timeline
            sections.forEach((sec, i) => {
                const track = horizontalTrackRefs.current[i]
                if (!track) return

                const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)
                const currentStartTime = scrollHandler.duration()

                scrollHandler.to(track, {
                    x: getScrollAmount,
                    ease: 'none',
                    duration: scrollDuration
                }, currentStartTime)

                scrollHandler.to(`.slow-title-${i}`, {
                    x: -160,
                    ease: 'none',
                    duration: scrollDuration
                }, currentStartTime)

                gsap.utils.toArray(`.parallax-text-${i}`).forEach((text, itemIndex) => {
                    scrollHandler.to(text, {
                        x: sec.content[itemIndex]?.speed || -650,
                        ease: 'none',
                        duration: scrollDuration
                    }, currentStartTime)
                })

                if (i < sections.length - 1) {
                    const nextIndex = i + 1
                    const wipeStart = scrollHandler.duration()

                    scrollHandler.to(track, {
                        x: () => getScrollAmount() - extraDrift,
                        ease: 'none',
                        duration: wipeDuration
                    }, wipeStart)

                    // At the section transitions animate a swipe
                    scrollHandler
                        .to(swipeSizeRefs.current[nextIndex], { xPercent: 0, ease: 'power2.inOut', duration: wipeDuration }, wipeStart)
                        .to(swipeContentRefs.current[nextIndex], { xPercent: 0, ease: 'power2.inOut', duration: wipeDuration }, wipeStart)
                        .add(() => {
                            const isMovingForward = scrollHandler.scrollTrigger.direction > 0
                            const activeSec = isMovingForward ? sections[nextIndex] : sections[i]

                            // Hide the previous content and 
                            if (isMovingForward && sectionWrapperRefs.current[i]) {
                                gsap.set(sectionWrapperRefs.current[i], { display: 'none' })
                            } else if (!isMovingForward && sectionWrapperRefs.current[i]) {
                                gsap.set(sectionWrapperRefs.current[i], { display: 'block' })
                            }

                            if (onThemeChange && activeSec.theme) {
                                onThemeChange(activeSec.theme)
                            }
                        }, '>')
                        .to(curtainBackgroundRefs.current[nextIndex], { opacity: 0, duration: 0.4, ease: 'power1.out' }, '>')
                }
            })

        }, mainWrap)

        return () => {
            context.revert()
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [sections, onThemeChange])

    return (
        <div ref={mainWrap} className="relative w-full h-screen overflow-hidden text-white select-none">
            {sections.map((sec, index) => (
                <ProjectContent
                    key={sec.id}
                    title={sec.title}
                    content={sec.content}
                    titleClass={`slow-title-${index}`}
                    textClass={`parallax-text-${index}`}
                    // No swipe at start
                    isCurtain={index > 0}
                    sectionWrapperRef={(el) => (sectionWrapperRefs.current[index] = el)}
                    horizontalTrackRef={(el) => (horizontalTrackRefs.current[index] = el)}
                    swipeSizeRef={(el) => (swipeSizeRefs.current[index] = el)}
                    swipeContentRef={(el) => (swipeContentRefs.current[index] = el)}
                    curtainBackgroundRef={(el) => (curtainBackgroundRefs.current[index] = el)}
                />
            ))}
        </div>
    )
}

export default ProjectSection