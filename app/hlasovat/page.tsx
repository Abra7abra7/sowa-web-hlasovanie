"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { CategorySlide } from "@/components/wizard/CategorySlide";
import { GoldButton } from "@/components/premium/GoldButton";
import { Crown, Sparkles } from "lucide-react";
import { useVotingStore } from "@/lib/store/voting-store";
import { useSwipe } from "@/hooks/useSwipe";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Nominee {
  id: string;
  category_id: string;
  name: string;
  instagram: string | null;
  image_url: string | null;
}

export default function WizardVotingPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allNominees, setAllNominees] = useState<{[key: string]: Nominee[]}>({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [started, setStarted] = useState(false);

  const { selections, addSelection } = useVotingStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const categoriesRes = await fetch("/api/categories");
      const categoriesData = await categoriesRes.json();
      const cats = categoriesData.categories || [];
      setCategories(cats);

      // Fetch nominees for all categories
      const nomineesPromises = cats.map((cat: Category) =>
        fetch(`/api/nominees?categoryId=${cat.id}`).then(res => res.json())
      );
      const nomineesResults = await Promise.all(nomineesPromises);

      const nomineesMap: {[key: string]: Nominee[]} = {};
      cats.forEach((cat: Category, index: number) => {
        nomineesMap[cat.id] = nomineesResults[index].nominees || [];
      });
      setAllNominees(nomineesMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleSelectNominee = (categoryId: string, nomineeId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const nominee = allNominees[categoryId]?.find(n => n.id === nomineeId);

    if (category && nominee) {
      addSelection({
        categoryId: category.id,
        categoryName: category.name,
        nomineeId: nominee.id,
        nomineeName: nominee.name,
      });
    }
  };

  const handleContinue = () => {
    if (currentSlide < categories.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // All categories completed
      router.push("/hlasovat/verifikacia");
    }
  };

  const currentCategory = categories[currentSlide];
  const currentNominees = currentCategory ? allNominees[currentCategory.id] || [] : [];
  const selectedNominee = selections.find(s => s.categoryId === currentCategory?.id);

  // Swipe gestures for mobile
  useSwipe({
    onSwipeLeft: () => {
      // Swipe left = next slide
      if (selectedNominee && currentSlide < categories.length - 1) {
        handleContinue();
      }
    },
    onSwipeRight: () => {
      // Swipe right = previous slide
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    },
    threshold: 75,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Header />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gold text-lg font-medium">Načítavam anketu...</p>
        </motion.div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-midnight">
        <Header />
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-midnight to-gold/20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, #8B5CF6 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl gradient-gold mb-8 shadow-2xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Crown className="w-12 h-12 text-midnight" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gold-gradient font-serif">
                Pripravení hlasovať?
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                Vyberte svojich favoritov v {categories.length} kategóriách
              </p>

              <div className="space-y-4 mb-12">
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span>Gamifikovaný proces hlasovania</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span>Krok-za-krokom ako Instagram Stories</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span>Dokončíte za pár minút</span>
                </div>
              </div>

              <GoldButton size="xl" onClick={handleStart}>
                ZAČAŤ HLASOVAŤ
              </GoldButton>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Guard clause - don't render if no valid category
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Header />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gold text-lg font-medium">Načítavam kategórie...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight">
      <Header />
      <WizardContainer
        currentStep={currentSlide + 1}
        totalSteps={categories.length}
      >
        <AnimatePresence mode="wait">
          <CategorySlide
            key={currentCategory.id}
            category={currentCategory}
            nominees={currentNominees}
            selectedNomineeId={selectedNominee?.nomineeId || null}
            onSelectNominee={(nomineeId) => handleSelectNominee(currentCategory.id, nomineeId)}
            onContinue={handleContinue}
            canContinue={!!selectedNominee}
          />
        </AnimatePresence>
      </WizardContainer>
    </div>
  );
}
