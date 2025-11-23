"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/premium/GoldButton";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Zlatý accent border na vrchu */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
      
      {/* Hlavný glass container */}
      <div className="glass-luxury border-b border-gold/20 relative overflow-hidden">
        {/* Shimmer efekt na pozadí */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(212, 175, 55, 0.1) 150%, transparent 200%)",
            ],
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Spotlight efekt */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
        
        <div className="container flex h-20 items-center justify-between relative z-10">
          <Link href="/" className="flex items-center space-x-3 group relative">
            {/* Logo s bohatými efektmi */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-xl gold-metallic-intense flex items-center justify-center shadow-luxury-intense relative overflow-hidden">
                {/* Animated crown */}
                <motion.div
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Crown className="w-7 h-7 text-midnight relative z-10" strokeWidth={2.5} />
                </motion.div>
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                
                {/* Sparkle effect */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
                  <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white rounded-full" />
                </motion.div>
              </div>
              
              {/* Logo glow */}
              <div className="absolute inset-0 rounded-xl blur-lg bg-gold/30 -z-10 group-hover:bg-gold/50 transition-colors" />
            </motion.div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gold-gradient font-serif leading-none tracking-tight text-shadow-luxury">
                SOWA
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
                  AWARDS
                </span>
                <span className="text-[10px] text-gold font-bold">2025</span>
              </div>
            </div>

            {/* Ornamental accent */}
            <div className="absolute -left-2 top-0 text-gold/20 text-[8px]">◆</div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {/* Zlaté oddelenie */}
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="text-sm font-bold text-gray-300 hover:text-gold transition-all relative group tracking-wide"
              >
                Domov
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-transparent transition-all group-hover:w-full" />
                <span className="absolute -top-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-transparent transition-all group-hover:w-full opacity-30" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/vysledky"
                className="text-sm font-bold text-gray-300 hover:text-gold transition-all relative group tracking-wide"
              >
                Výsledky
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-transparent transition-all group-hover:w-full" />
                <span className="absolute -top-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-transparent transition-all group-hover:w-full opacity-30" />
              </Link>
            </motion.div>

            {/* Zlaté oddelenie */}
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

            <Link href="/hlasovat">
              <GoldButton size="default">
                HLASOVAŤ
              </GoldButton>
            </Link>
          </nav>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gold/20 glass-luxury"
        >
          <nav className="container flex flex-col gap-4 py-6">
            <Link
              href="/"
              className="text-lg font-semibold text-gray-300 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Domov
            </Link>
            <Link
              href="/vysledky"
              className="text-lg font-semibold text-gray-300 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Výsledky
            </Link>
            <Link href="/hlasovat" onClick={() => setMobileMenuOpen(false)}>
              <GoldButton size="lg" className="w-full">
                HLASOVAŤ
              </GoldButton>
            </Link>
          </nav>
        </motion.div>
      )}

      {/* Dolný gradient efekt */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </motion.header>
  );
}
