"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="fixed top-20 left-0 right-0 z-40">
      <div className="container">
        <div className="flex items-center gap-4 py-4">
          <span className="text-sm font-semibold text-gold">
            Krok {current} z {total}
          </span>
          <div className="flex-1 h-2 bg-midnight-light rounded-full overflow-hidden border border-gold/20">
            <motion.div
              className="h-full gradient-gold-shimmer"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-medium text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}
