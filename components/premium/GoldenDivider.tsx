"use client";

import { motion } from "framer-motion";

interface GoldenDividerProps {
  className?: string;
  animated?: boolean;
}

export function GoldenDivider({ className = "", animated = true }: GoldenDividerProps) {
  return (
    <div className={`relative flex items-center justify-center my-12 ${className}`}>
      {/* Hlavná čiara */}
      <motion.div
        className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-gold/30"
        initial={animated ? { scaleX: 0, opacity: 0 } : undefined}
        whileInView={animated ? { scaleX: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Centrálny ornament */}
      <motion.div
        className="relative px-6"
        initial={animated ? { scale: 0, opacity: 0 } : undefined}
        whileInView={animated ? { scale: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-gold text-sm">◆</span>
          <motion.div
            className="w-2 h-2 rounded-full gold-metallic shadow-luxury"
            animate={animated ? {
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            } : undefined}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-gold text-sm">◆</span>
        </div>

        {/* Glow efekt */}
        <div className="absolute inset-0 blur-xl bg-gold/30 -z-10" />
      </motion.div>

      {/* Pravá čiara */}
      <motion.div
        className="flex-1 h-[2px] bg-gradient-to-r from-gold/30 via-gold/60 to-transparent"
        initial={animated ? { scaleX: 0, opacity: 0 } : undefined}
        whileInView={animated ? { scaleX: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Jemné svetelné bodky */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold/40 blur-sm" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold/40 blur-sm" />
    </div>
  );
}

