"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Trophy, Users, Shield, Timer, Star, Sparkles, Award, Zap, Crown } from "lucide-react";
import { VideoHero } from "@/components/premium/VideoHero";
import { GoldButton } from "@/components/premium/GoldButton";
import { GlowCard } from "@/components/premium/GlowCard";
import { GoldenDivider } from "@/components/premium/GoldenDivider";
import { LuxuryBadge } from "@/components/premium/LuxuryBadge";
import { ShimmerText } from "@/components/premium/ShimmerText";

export default function HomePage() {
  const [voteCount, setVoteCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const targetCount = 12543;
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setVoteCount(targetCount);
        clearInterval(interval);
      } else {
        setVoteCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const endDate = new Date(
      process.env.NEXT_PUBLIC_VOTING_END_DATE || "2025-12-31T23:59:59Z"
    );

    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("Hlasovanie skončilo");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Maximálna bezpečnosť",
      description: "Multi-vrstvová ochrana proti manipulácii s pokročilými technológiami",
    },
    {
      icon: Trophy,
      title: "Férové výsledky",
      description: "Transparentné real-time štatistiky s ochranou proti botom",
    },
    {
      icon: Zap,
      title: "Rýchly proces",
      description: "Intuitívne hlasovanie dokončíte za pár minút",
    },
    {
      icon: Crown,
      title: "Prémiová udalosť",
      description: "Najväčšia anketa pre influencerov na Slovensku",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-midnight">
      <Header />

      <main className="flex-1">
        {/* Premium Hero Section */}
        <VideoHero>
          <div className="text-center max-w-5xl mx-auto px-4 relative">
            {/* Ornamentálne dekorácie okolo obsahu */}
            <div className="absolute top-0 left-0 text-gold/20 text-2xl">◆</div>
            <div className="absolute top-0 right-0 text-gold/20 text-2xl">◆</div>
            
            {/* Luxusný Badge s novým komponentom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <LuxuryBadge icon={Crown} variant="gold" size="lg">
                PRÉMIOVÁ MEDIÁLNA UDALOSŤ 2025
              </LuxuryBadge>
            </motion.div>

            {/* Horný ornamentálny oddeľovač */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-gold/50" />
              <Star className="w-4 h-4 text-gold" fill="currentColor" />
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-gold/50" />
            </motion.div>

            {/* Main Title s Shimmer efektom */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight font-serif relative"
            >
              {/* Zlaté svetelné lúče za textom */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent blur-xl" />
              </div>
              
              <span className="text-white text-shadow-luxury relative">SOWA</span>
              <br />
              <ShimmerText 
                as="span" 
                className="text-gold-gradient inline-block text-shadow-luxury"
                shimmerColor="gold"
              >
                AWARDS
              </ShimmerText>
            </motion.h1>

            {/* Dolný ornamentálny oddeľovač */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-gold/60 to-gold/30" />
              <Sparkles className="w-3 h-3 text-gold" />
              <div className="h-[1px] w-2 bg-gold/50" />
              <Sparkles className="w-3 h-3 text-gold" />
              <div className="h-[2px] w-20 bg-gradient-to-l from-transparent via-gold/60 to-gold/30" />
            </motion.div>

            {/* Subtitle s elegantnejším formátovaním */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-12 relative"
            >
              <p className="text-2xl md:text-3xl text-gray-300 font-light italic relative">
                <span className="text-gold/60 text-3xl absolute -left-4 top-0">"</span>
                Oslavujeme najlepších influencerov Slovenska
                <span className="text-gold/60 text-3xl absolute -right-4 bottom-0">"</span>
              </p>
            </motion.div>

            {/* Ornamentálne rohové dekorácie */}
            <div className="absolute bottom-20 left-4 text-gold/10 text-lg">◆</div>
            <div className="absolute bottom-20 right-4 text-gold/10 text-lg">◆</div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link href="/hlasovat">
                <GoldButton icon={Zap} size="xl">
                  HLASOVAŤ TERAZ
                </GoldButton>
              </Link>
              <Link href="/vysledky">
                <GoldButton variant="outline" icon={Trophy} size="xl">
                  Zobraziť výsledky
                </GoldButton>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <GlowCard
                title="Odovzdaných hlasov"
                value={voteCount.toLocaleString("sk-SK")}
                icon={Award}
                color="gold"
                delay={0.8}
              />
              <GlowCard
                title="Do konca hlasovania"
                value={timeRemaining}
                icon={Timer}
                color="purple"
                delay={0.9}
              />
            </div>
          </div>
        </VideoHero>

        {/* Features Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light to-midnight" />
          
          <div className="container relative z-10">
            {/* Elegantný Golden Divider */}
            <GoldenDivider className="mb-16" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <LuxuryBadge icon={Sparkles} variant="gold" size="md" className="mb-8">
                Prečo sme výnimoční
              </LuxuryBadge>
              
              <h2 className="text-5xl md:text-6xl font-black mb-6 font-serif">
                <ShimmerText as="span" shimmerColor="gold" className="text-gold-gradient">
                  Oscar pre influencerov
                </ShimmerText>
              </h2>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Najväčšia a najprestížnejšia anketa s maximálnou ochranou a férovosťou
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="luxury-card h-full p-8"
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mb-6 shadow-lg shadow-gold/30"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.25 }}
                  >
                    <feature.icon className="w-8 h-8 text-midnight" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gold font-serif">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-midnight to-gold/20" />
            {/* Animated lights */}
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-electric/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 2,
              }}
            />
          </div>

          <div className="container relative z-10">
            <GoldenDivider className="mb-16" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="relative inline-block mb-8"
              >
                <Trophy className="w-24 h-24 mx-auto text-gold drop-shadow-2xl relative z-10" />
                {/* Glow efekt okolo trofeje */}
                <div className="absolute inset-0 blur-2xl bg-gold/40 -z-10" />
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black mb-8 text-white font-serif text-shadow-luxury">
                Pripravení hlasovať?
              </h2>
              
              <p className="text-2xl text-gray-300 mb-12 font-light max-w-2xl mx-auto italic relative">
                <span className="text-gold/40 text-2xl absolute -left-6 top-0">"</span>
                Staňte sa súčasťou najväčšej ankety roka a podporte svojich obľúbených influencerov
                <span className="text-gold/40 text-2xl absolute -right-6 bottom-0">"</span>
              </p>

              <Link href="/hlasovat">
                <GoldButton icon={Sparkles} size="xl">
                  ZAČAŤ HLASOVAŤ
                </GoldButton>
              </Link>
            </motion.div>

            <GoldenDivider className="mt-16" />
          </div>
        </section>
      </main>
    </div>
  );
}
