"use client";

import { motion } from "framer-motion";
import { LucideIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface GlowCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "gold" | "purple";
  delay?: number;
}

export function GlowCard({ title, value, icon: Icon, color = "gold", delay = 0 }: GlowCardProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const glowColor = color === "gold" 
    ? "rgba(212, 175, 55, 0.4)" 
    : "rgba(139, 92, 246, 0.4)";

  const borderColor = color === "gold"
    ? "#D4AF37"
    : "#8B5CF6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative group rounded-3xl overflow-hidden"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-transparent via-current to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ 
          color: borderColor,
          background: `linear-gradient(135deg, transparent 0%, ${borderColor}80 50%, transparent 100%)`,
          backgroundSize: '200% 200%',
          animation: 'border-shimmer 3s ease-in-out infinite'
        }}
      />

      {/* Main Card */}
      <div className="relative glass-luxury-gold rounded-3xl p-8 shadow-luxury-intense">
        {/* Multi-Layer Glow Effects */}
        <div 
          className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 60%)`,
          }}
        />
        <div 
          className="absolute inset-0 rounded-3xl blur-3xl opacity-30 pulse-glow-gold"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${glowColor}, transparent 50%)`,
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                delay: particle.delay,
              }}
            >
              <Sparkles className={`w-2 h-2 ${color === "gold" ? "text-gold" : "text-purple-electric"}`} />
            </motion.div>
          ))}
        </div>

        {/* Spotlight Effect */}
        <div className="absolute inset-0 rounded-3xl spotlight-effect opacity-30" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-luxury relative ${
                color === "gold" ? "gold-metallic-intense" : "gradient-electric"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.25 }}
            >
              <Icon className="w-8 h-8 text-midnight relative z-10" strokeWidth={2.5} />
              {/* Icon Inner Glow */}
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          <motion.div
            className={`text-6xl md:text-7xl font-black mb-3 font-serif text-shadow-luxury ${
              color === "gold" ? "text-gold-gradient" : "bg-gradient-to-r from-purple-electric to-purple-500 bg-clip-text text-transparent"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.div>

          <div className="text-sm font-bold uppercase tracking-widest text-gray-300 relative">
            {title}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-transparent group-hover:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Corner Accents */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
          style={{
            background: color === "gold" ? "#D4AF37" : "#8B5CF6",
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
          style={{
            background: color === "gold" ? "#FFD700" : "#A78BFA",
          }}
        />

        {/* Ornamental Corner */}
        <div className="absolute top-4 left-4 text-gold/30 text-xs">◆</div>
        <div className="absolute bottom-4 right-4 text-gold/30 text-xs">◆</div>
      </div>
    </motion.div>
  );
}
