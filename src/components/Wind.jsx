import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Wind = ({ count = 15 }) => {
  const canvasRef = useRef(null);

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
      radius: Math.random() * 2.5 + 1.5, 
      vx: -(Math.random() * 0.5 + 0.5), 
      vy: Math.sin(Math.random() * Math.PI * 2) * 0.2, 
      opacity: Math.random() * 0.5 + 0.1, 
    }));

    const update = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy + Math.sin(particle.x * 0.005) * 0.1; 
        if (particle.x < -particle.radius * 2) {
          particle.x = canvas.width + Math.random() * 50;
          particle.y = Math.random() * canvas.height;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        context.fill(); 
        context.closePath();
      });
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('resize', resize);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}

export default Wind