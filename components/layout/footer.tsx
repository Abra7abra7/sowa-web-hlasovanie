"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, FileText, Mail, Instagram } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mt-auto"
    >
      {/* Zlatý accent border na vrchu */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Hlavný glass container */}
      <div className="glass-luxury border-t border-gold/20 relative overflow-hidden">
        {/* Shimmer efekt na pozadí */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(212, 175, 55, 0.1) 150%, transparent 200%)",
            ],
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="container py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* O projekte */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gold-gradient font-serif">
                SOWA AWARDS
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Prémiové ocenenia pre najlepších v branži. Hlasujte za svojich
                favoritov a staňte sa súčasťou tejto exkluzívnej udalosti.
              </p>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-500">Made with passion</span>
              </div>
            </div>

            {/* Dôležité odkazy */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                Informácie
              </h3>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/ochrana-udajov"
                  className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                >
                  <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Ochrana osobných údajov
                </Link>
                <Link
                  href="/podmienky"
                  className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                >
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Podmienky používania
                </Link>
              </nav>
            </div>

            {/* Kontakt */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                Kontakt
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:info@anketasowa.sk"
                  className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  info@anketasowa.sk
                </a>
                <a
                  href="https://instagram.com/sowa.awards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  @sowa.awards
                </a>
              </div>
            </div>
          </div>

          {/* Zlaté oddelenie */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} SOWA AWARDS. Všetky práva vyhradené.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Powered by</span>
              <span className="text-gold font-semibold">Excellence</span>
              <span className="text-gold">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dolný gradient efekt */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
    </motion.footer>
  );
}

