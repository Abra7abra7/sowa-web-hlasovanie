"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Sparkles, Circle } from "lucide-react";

interface VideoHeroProps {
  children: React.ReactNode;
}

export function VideoHero({ children }: VideoHeroProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; type: number }>>([]);

  useEffect(() => {
    // Generate 100+ particles pre luxusnejší vzhľad
    const newParticles = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      type: Math.floor(Math.random() * 3), // 3 typy partikúl
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight film-grain">
      {/* Animated Gradient Background - Bohatší */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-midnight to-gold/20 animate-gradient" />
        
        {/* Viacvrstvové animované gradienty */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, #8B5CF6 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Zlaté a purpurové aurory */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "radial-gradient(ellipse at top left, #D4AF37 0%, transparent 40%)",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: "radial-gradient(ellipse at bottom right, #8B5CF6 0%, transparent 40%)",
          }}
          animate={{
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Rotujúce Spotlight Lúče */}
      <motion.div
        className="absolute inset-0 spotlight-rays opacity-10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animované Svetelné Lúče v pozadí */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-purple-electric/20 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-transparent via-gold/15 to-transparent"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scaleY: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Floating Particles - 120+ luxusných partikúl */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => {
          const size = particle.type === 0 ? 2 : particle.type === 1 ? 3 : 1.5;
          const duration = 4 + Math.random() * 3;
          
          return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.5, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            >
              {particle.type === 0 ? (
                <Star className={`w-${size} h-${size} text-gold`} fill="currentColor" />
              ) : particle.type === 1 ? (
                <Sparkles className={`w-${size} h-${size} text-purple-electric`} />
              ) : (
                <Circle className={`w-${size} h-${size} text-gold/50`} fill="currentColor" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Ďalšie Svetelné Efekty - Pulsujúce oreoly */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(5,5,5,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container">
        {children}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
    </section>
  );
}

