import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const THEMES = {
  teal: {
    bg: 'linear-gradient(70deg, #127475 0%, #178788 12%, #1da0a1 25%, #178788 50%, #127475 100%)',
    baseColor: '#127475',
    hueBase: 175,
    hueRange: 15,
    shadow: 'rgba(200, 255, 245, 0.5)',
    showRays: true 
  },
  forest: {
    bg: 'linear-gradient(70deg, #0f2a1d 0%, #18402d 12%, #235c41 25%, #18402d 50%, #0f2a1d 100%)',
    baseColor: '#0f2a1d',
    hueBase: 125,
    hueRange: 20,
    shadow: 'rgba(100, 220, 140, 0.4)',
    showRays: true 
  },
  night: {
    bg: 'linear-gradient(70deg, #0a0e17 0%, #121824 12%, #1a2332 25%, #121824 50%, #0a0e17 100%)',
    baseColor: '#0a0e17',
    hueBase: 210,
    hueRange: 20,
    shadow: 'rgba(120, 160, 255, 0.4)',
    showRays: false 
  }
}

const Light = ({ theme = 'teal' }) => {
  const canvasRef = useRef(null)
  const activeTheme = THEMES[theme] || THEMES.teal

  useEffect(() => {
    // If the theme has showRays false skip all ray rendering.
    if (!activeTheme.showRays) {
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    class Ray {
      constructor() {
        this.angle = (70 * Math.PI) / 180 
        this.init()
      }

      init() {
        this.velocity = 0.15 - Math.random() * 0.3 
        this.rayLength = height * 0.6 + Math.random() * (height * 0.6) 
        this.startPosition = {
          x: Math.random() * (width * 0.7 + 100) - 100,
          y: -50, 
        }
        this.end = {
          x: this.startPosition.x + this.rayLength * Math.cos(this.angle),
          y: this.startPosition.y + this.rayLength * Math.sin(this.angle),
        }
        this.timeToLive = 150 + Math.random() * 200 
        this.life = 0
        this.width = 1 + Math.random() * 3 
        this.hue = activeTheme.hueBase + Math.random() * activeTheme.hueRange
      }

      color() {
        const alpha = Math.abs(((this.life + this.timeToLive / 2) % this.timeToLive) - this.timeToLive / 2) * 0.0008
        const gradient = context.createLinearGradient(this.startPosition.x, this.startPosition.y, this.end.x, this.end.y)

        gradient.addColorStop(0, `hsla(${this.hue}, 60%, 80%, ${alpha * 1.5})`)
        gradient.addColorStop(1, `hsla(${this.hue}, 40%, 20%, 0)`) 
        return gradient
      }

      update() {
        if (this.life > this.timeToLive) {
          this.init()
        }
        this.life++
        this.startPosition.x += this.velocity
        this.end.x += this.velocity
      }

      draw() {
        context.beginPath()
        context.strokeStyle = this.color()
        context.lineWidth = this.width
        context.moveTo(this.startPosition.x, this.startPosition.y)
        context.lineTo(this.end.x, this.end.y)
        context.stroke()
        context.closePath()
      }
    }

    const rays = []
    for (let i = 0; i < 10; i++) {
      rays.push(new Ray())
    }

    const render = () => {
      context.clearRect(0, 0, width, height)
      context.shadowBlur = 15
      context.shadowColor = activeTheme.shadow
      context.globalCompositeOperation = 'lighter'

      for (let i = 0; i < rays.length; i++) {
        rays[i].update()
        rays[i].draw()
      }
    }

    gsap.ticker.add(render)

    return () => {
      gsap.ticker.remove(render)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme]) 

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: activeTheme.baseColor }}
    >
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{ background: activeTheme.bg }}
      />
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
          activeTheme.showRays ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default Light