import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const WIND_THEMES = {
  teal: {
    color: '255, 255, 255',
    minRadius: 1.5,
    maxRadius: 4.0,
    speedX: -0.6,
    speedY: 0.2,
    opacityFactor: 0.5,
    twinkle: false,
  },
  forest: {
    color: '180, 230, 200',
    minRadius: 2.0,
    maxRadius: 5.0,
    speedX: -0.4,
    speedY: 0.4,
    opacityFactor: 0.4,
    twinkle: false,
  },
  night: {
    color: '253, 224, 71',
    minRadius: 1.0,
    maxRadius: 3.0,
    speedX: 0,
    speedY: 0,
    opacityFactor: 0.8,
    twinkle: true,
  }
}

const Particles = ({ theme = 'teal', count = 15 }) => {
  const canvasRef = useRef(null);
  const [renderedTheme, setRenderedTheme] = useState(theme);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (theme !== renderedTheme) {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setRenderedTheme(theme);
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [theme, renderedTheme]);

  const currentTheme = WIND_THEMES[renderedTheme] || WIND_THEMES.teal;

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (currentTheme.maxRadius - currentTheme.minRadius) + currentTheme.minRadius, 
      vx: (Math.random() * 0.5 + 0.5) * currentTheme.speedX, 
      vy: Math.sin(Math.random() * Math.PI * 2) * currentTheme.speedY, 
      opacity: (Math.random() * 0.5 + 0.1) * currentTheme.opacityFactor, 
      baseOpacity: (Math.random() * 0.5 + 0.3) * currentTheme.opacityFactor,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      twinkleAngle: Math.random() * Math.PI * 2,
    }));

    const update = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        if (currentTheme.speedX !== 0 || currentTheme.speedY !== 0) {
          particle.x += particle.vx;
          particle.y += particle.vy + Math.sin(particle.x * 0.005) * 0.1; 
          if (particle.x < -particle.radius * 2) {
            particle.x = canvas.width + Math.random() * 50;
            particle.y = Math.random() * canvas.height;
          }
        }

        let currentOpacity = particle.opacity;
        if (currentTheme.twinkle) {
          particle.twinkleAngle += particle.twinkleSpeed;
          currentOpacity = particle.baseOpacity * (0.6 + 0.4 * Math.sin(particle.twinkleAngle));
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${currentTheme.color}, ${currentOpacity})`;
        context.fill(); 
        context.closePath();
      });
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('resize', resize);
    };
  }, [renderedTheme, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 h-full w-full transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

export default Particles