"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: LucideIcon;
  size?: "default" | "sm" | "lg" | "xl";
  variant?: "solid" | "outline";
  asChild?: boolean;
  href?: string;
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ children, icon: Icon, size = "lg", variant = "solid", className = "", ...props }, ref) => {
    const baseStyles = variant === "solid"
      ? "gold-metallic-intense text-midnight font-black shadow-luxury-intense hover:shadow-luxury-intense border-2 border-gold-light/80"
      : "bg-transparent border-2 border-gold text-gold hover:bg-gold/10 shadow-luxury";

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block touch-manipulation relative"
      >
        {/* Glow Halo Effect */}
        {variant === "solid" && (
          <motion.div
            className="absolute inset-0 rounded-lg blur-xl opacity-50 group-hover:opacity-80"
            style={{
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <Button
          ref={ref}
          size={size}
          className={`${baseStyles} relative overflow-hidden group transition-all duration-300 min-h-[48px] rounded-xl depth-3d ${className}`}
          style={{
            transform: "perspective(1000px) translateZ(0)",
            transformStyle: "preserve-3d",
          }}
          {...props}
        >
          {/* 3D Inner Shadow */}
          {variant === "solid" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none rounded-xl" />
              <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </>
          )}

          {/* Animated Sweep Effect */}
          {variant === "solid" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Spotlight Rays */}
          <div className="absolute inset-0 spotlight-rays opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2 font-serif tracking-wide text-shadow-sm">
            {Icon && (
              <motion.span
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="w-5 h-5" strokeWidth={3} />
              </motion.span>
            )}
            {children}
          </span>

          {/* Hover Pulse Effect */}
          {variant === "solid" && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
              }}
            />
          )}

          {/* Bottom Edge Highlight */}
          {variant === "solid" && (
            <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          )}

          {/* Corner Accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/30 rounded-tl-lg" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/30 rounded-tr-lg" />
        </Button>

        {/* Outer Glow Ring on Hover */}
        <motion.div
          className="absolute inset-[-4px] rounded-xl border-2 border-gold/0 pointer-events-none"
          whileHover={{
            borderColor: "rgba(212, 175, 55, 0.5)",
            boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    );
  }
);

GoldButton.displayName = "GoldButton";
