"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LuxuryBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "gold" | "purple" | "white";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function LuxuryBadge({
  icon: Icon,
  children,
  variant = "gold",
  size = "md",
  animated = true,
  className = "",
}: LuxuryBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantClasses = {
    gold: "glass-luxury-gold border-gold/30 text-gold",
    purple: "glass-luxury border-purple-electric/30 text-purple-electric",
    white: "glass-luxury border-white/20 text-white",
  };

  const glowColors = {
    gold: "rgba(212, 175, 55, 0.3)",
    purple: "rgba(139, 92, 246, 0.3)",
    white: "rgba(255, 255, 255, 0.2)",
  };

  return (
    <motion.div
      className={`inline-flex items-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-full font-bold tracking-wider uppercase relative overflow-hidden ${className}`}
      initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
      whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animovaný gradient pozadie */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={animated ? {
          background: [
            `linear-gradient(90deg, transparent 0%, ${glowColors[variant]} 50%, transparent 100%)`,
            `linear-gradient(90deg, transparent 100%, ${glowColors[variant]} 150%, transparent 200%)`,
          ],
          backgroundPosition: ["0% 0%", "200% 0%"],
        } : undefined}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-full blur-lg -z-10 opacity-50"
        style={{
          background: glowColors[variant],
        }}
      />

      {/* Obsah */}
      <div className="relative z-10 flex items-center gap-inherit">
        {Icon && (
          <motion.div
            animate={animated ? {
              rotate: [0, 5, -5, 0],
            } : undefined}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-4 h-4" strokeWidth={2.5} />
          </motion.div>
        )}
        <span className="font-serif">{children}</span>
      </div>

      {/* Svetelný shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      {/* Ornamentálne rohy */}
      <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-current opacity-30 rounded-tl-full" />
      <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-current opacity-30 rounded-tr-full" />
      <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-current opacity-30 rounded-bl-full" />
      <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-current opacity-30 rounded-br-full" />
    </motion.div>
  );
}

