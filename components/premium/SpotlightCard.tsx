"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: "gold" | "purple";
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "gold",
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const spotlightColors = {
    gold: "rgba(212, 175, 55, 0.4)",
    purple: "rgba(139, 92, 246, 0.4)",
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Spotlight Effect */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none -z-10"
          style={{
            width: "300px",
            height: "300px",
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            background: `radial-gradient(circle, ${spotlightColors[spotlightColor]} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content Container */}
      <div className="luxury-card relative z-10 h-full">
        {children}
      </div>

      {/* Border Glow na Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `2px solid ${spotlightColor === "gold" ? "#D4AF37" : "#8B5CF6"}`,
          opacity: 0,
        }}
        animate={{
          opacity: isHovering ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

