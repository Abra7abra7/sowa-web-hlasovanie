"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

interface NomineeCardProps {
  id: string;
  name: string;
  handle?: string;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function NomineeCard({
  id,
  name,
  handle,
  imageUrl,
  isSelected,
  onSelect,
  index,
}: NomineeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden touch-manipulation
        ${isSelected ? "selected-gold" : "luxury-card"}
        group min-h-[280px] md:min-h-[320px]
      `}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-midnight-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center">
              <span className="text-4xl font-black text-midnight">
                {name.charAt(0)}
              </span>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full gradient-gold flex items-center justify-center shadow-2xl"
          >
            <Check className="w-7 h-7 text-midnight" strokeWidth={3} />
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 font-serif ${isSelected ? "text-gold" : "text-white"}`}>
          {name}
        </h3>
        {handle && (
          <p className="text-sm text-gray-400 font-medium">
            @{handle}
          </p>
        )}
      </div>

      {/* Glow effect on selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(212, 175, 55, 0.3)",
              "0 0 40px rgba(212, 175, 55, 0.5)",
              "0 0 20px rgba(212, 175, 55, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
