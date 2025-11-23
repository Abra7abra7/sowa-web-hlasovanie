"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: "gold" | "purple" | "white";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export function ShimmerText({
  children,
  className = "",
  shimmerColor = "gold",
  as = "span",
}: ShimmerTextProps) {
  const Component = as;

  const shimmerGradients = {
    gold: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 215, 0, 0.8) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%)",
    purple: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, rgba(139, 92, 246, 0.8) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%)",
    white: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%)",
  };

  return (
    <Component className={`relative inline-block ${className}`}>
      {/* Základný text */}
      <span className="relative z-10">{children}</span>

      {/* Animovaný shimmer overlay */}
      <motion.span
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: shimmerGradients[shimmerColor],
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

