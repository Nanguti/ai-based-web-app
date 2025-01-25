"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Code, Zap } from "lucide-react";

class Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 1000;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.vz = -Math.random() * 2;
  }

  update(canvas: HTMLCanvasElement) {
    this.z += this.vz;
    if (this.z < 1) this.z = 1000;

    this.x += this.vx * (1000 / this.z);
    this.y += this.vy * (1000 / this.z);

    if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
  }
}

const AboutSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const features = [
    {
      icon: Target,
      title: "Precision",
      description: "Delivering targeted solutions with unmatched accuracy",
      color: "text-teal-400",
    },
    {
      icon: Code,
      title: "Innovation",
      description: "Pushing boundaries of technological possibilities",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Speed",
      description: "Rapid development and deployment of intelligent systems",
      color: "text-purple-500",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    for (let i = 0; i < 150; i++) {
      particles.push(new Particle(canvas));
    }

    const drawConnections = () => {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const scale = Math.min(1, (120 - distance) / 120);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 * scale})`;
            ctx.lineWidth = scale;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas);
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-blue-950">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-blue-950/20 to-transparent"
        style={{ y: yBg }}
      />

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="mb-12 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 
            bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
          >
            About Our AI Solutions
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl text-center 
                border border-blue-900/30 hover:border-teal-500/50 transition-all 
                hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
              >
                <feature.icon
                  className={`mx-auto mb-4 ${feature.color}`}
                  size={48}
                />
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-blue-200/90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
