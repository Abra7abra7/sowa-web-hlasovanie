"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { NomineeCard } from "./NomineeCard";
import { GoldButton } from "@/components/premium/GoldButton";

interface Nominee {
  id: string;
  name: string;
  instagram?: string | null;
  image_url?: string | null;
}

interface CategorySlideProps {
  category: {
    id: string;
    name: string;
    description?: string | null;
  };
  nominees: Nominee[];
  selectedNomineeId: string | null;
  onSelectNominee: (nomineeId: string) => void;
  onContinue: () => void;
  canContinue: boolean;
}

export function CategorySlide({
  category,
  nominees,
  selectedNomineeId,
  onSelectNominee,
  onContinue,
  canContinue,
}: CategorySlideProps) {
  // Safety check
  if (!category) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <p className="text-gray-400">Kategória nenájdená...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen pt-32 pb-24"
    >
      <div className="container max-w-7xl">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-gold mb-6 shadow-2xl">
            <Trophy className="w-10 h-10 text-midnight" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-gold-gradient font-serif">
            {category.name}
          </h2>
          {category.description && (
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <p className="text-sm text-gold mt-4 font-medium">
            Kliknite na kartu a vyberte svojho favorita
          </p>
        </motion.div>

        {/* Nominees Grid - Mobile optimized */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12 pb-24 md:pb-12">
          {nominees.map((nominee, index) => (
            <NomineeCard
              key={nominee.id}
              id={nominee.id}
              name={nominee.name}
              handle={nominee.instagram?.replace("@", "")}
              imageUrl={nominee.image_url || undefined}
              isSelected={selectedNomineeId === nominee.id}
              onSelect={() => onSelectNominee(nominee.id)}
              index={index}
            />
          ))}
        </div>

        {/* Continue Button */}
        {canContinue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 glass-dark border-t border-gold/20 py-6"
          >
            <div className="container flex justify-center">
              <GoldButton size="xl" onClick={onContinue}>
                Pokračovať ďalej
              </GoldButton>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
