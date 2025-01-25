"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Globe, Users, Award } from "lucide-react";

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

const AchievementsSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const achievements = [
    {
      icon: TrendingUp,
      value: "500%",
      label: "Growth Rate",
      color: "text-teal-400",
      gradient: "from-teal-400 to-green-500",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Global Clients",
      color: "text-blue-500",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: Users,
      value: "250K",
      label: "Active Users",
      color: "text-purple-500",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      value: "12",
      label: "Industry Awards",
      color: "text-yellow-500",
      gradient: "from-yellow-500 to-orange-500",
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
        <div className="text-center max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="mb-16 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 
            bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
          >
            Our Achievements
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
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
                <achievement.icon
                  className={`mx-auto mb-4 ${achievement.color}`}
                  size={48}
                />
                <h3
                  className={`text-4xl font-bold mb-2 bg-gradient-to-r ${achievement.gradient} 
                  bg-clip-text text-transparent`}
                >
                  {achievement.value}
                </h3>
                <p className="text-blue-200/90">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
