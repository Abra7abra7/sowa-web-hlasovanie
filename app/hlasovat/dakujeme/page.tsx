"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2, Share2, Trophy, Home, Sparkles, Crown } from "lucide-react";
import { useVotingStore } from "@/lib/store/voting-store";
import { fireConfetti } from "@/components/premium/ConfettiEffect";
import { GoldButton } from "@/components/premium/GoldButton";

export default function ThankYouPage() {
  const { reset } = useVotingStore();

  useEffect(() => {
    // Fire premium confetti
    fireConfetti();

    // Keep firing confetti for celebration
    const interval = setInterval(() => {
      fireConfetti();
    }, 3000);

    // Reset voting store after successful vote
    const timer = setTimeout(() => {
      reset();
      clearInterval(interval);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [reset]);

  const handleShare = async () => {
    const shareData = {
      title: "SOWA Awards 2025",
      text: "Práve som hlasoval v SOWA Awards! Podpor svojich obľúbených influencerov aj ty!",
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback - copy link
      navigator.clipboard.writeText(window.location.origin);
      alert("Link bol skopírovaný do schránky!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-midnight relative overflow-hidden">
      <Header />

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <main className="flex-1 py-24 relative z-10">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              className="relative mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-32 h-32 mx-auto rounded-full gradient-gold flex items-center justify-center shadow-2xl relative"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(212, 175, 55, 0.4)",
                    "0 0 80px rgba(212, 175, 55, 0.6)",
                    "0 0 40px rgba(212, 175, 55, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 className="w-16 h-16 text-midnight" strokeWidth={3} />
                
                {/* Sparkles around icon */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: [0, Math.cos((i / 8) * Math.PI * 2) * 80],
                      y: [0, Math.sin((i / 8) * Math.PI * 2) * 80],
                      opacity: [1, 0],
                      scale: [0, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-gold" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-black mb-6 text-gold-gradient font-serif"
            >
              Úžasné!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-gray-300 mb-12"
            >
              Váš hlas bol úspešne započítaný! 🎉
            </motion.p>

            {/* Success Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="luxury-card border-gold/20 mb-8">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    {[
                      "Hlasy boli odoslané a overené",
                      "Fraud detection kontrola prebehla úspešne",
                      "Vaše hlasy sú teraz súčasťou výsledkov",
                    ].map((text, index) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-midnight" strokeWidth={3} />
                        </div>
                        <p className="text-left text-lg text-gray-300">{text}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            >
              <Link href="/">
                <GoldButton size="lg" icon={Home} className="w-full">
                  Domov
                </GoldButton>
              </Link>
              <Link href="/vysledky">
                <GoldButton size="lg" icon={Trophy} variant="outline" className="w-full">
                  Výsledky
                </GoldButton>
              </Link>
              <GoldButton size="lg" icon={Share2} variant="outline" onClick={handleShare} className="w-full">
                Zdieľať
              </GoldButton>
            </motion.div>

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Card className="luxury-card border-gold/40 bg-gold/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0">
                      <Crown className="h-6 w-6 text-midnight" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gold text-xl mb-2 font-serif">Čo ďalej?</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Výsledky budú zverejnené po skončení hlasovania. Sledujte našu
                        stránku a sociálne siete pre aktualizácie o víťazoch SOWA Awards 2025!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
