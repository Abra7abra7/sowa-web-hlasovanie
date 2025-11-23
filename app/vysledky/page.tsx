"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import Image from "next/image";

interface Result {
  nominee_id: string;
  nominee_name: string;
  nominee_image: string | null;
  nominee_instagram: string | null;
  vote_count: number;
  rank: number;
}

interface CategoryResults {
  category_id: string;
  category_name: string;
  category_slug: string;
  results: Result[];
}

export default function ResultsPage() {
  const [categoryResults, setCategoryResults] = useState<CategoryResults[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch("/api/results");
      const data = await response.json();
      setCategoryResults(data.categoryResults || []);
      setTotalVotes(data.totalVotes || 0);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Načítavam výsledky...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Priebežné výsledky
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Real-time štatistiky hlasovania
            </p>
            <div className="text-3xl font-bold gradient-purple bg-clip-text text-transparent">
              {totalVotes.toLocaleString("sk-SK")} hlasov
            </div>
          </motion.div>

          <div className="space-y-12">
            {categoryResults.map((category, catIndex) => (
              <motion.div
                key={category.category_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.category_name}</CardTitle>
                    <CardDescription>
                      Top {category.results.length} nominantov
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.results.map((result, index) => (
                        <motion.div
                          key={result.nominee_id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-lg border ${
                            result.rank === 1
                              ? "bg-primary/5 border-primary/20"
                              : "bg-card"
                          }`}
                        >
                          <div className="flex-shrink-0 w-12 text-center">
                            {getRankIcon(result.rank)}
                          </div>

                          {result.nominee_image && (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={result.nominee_image}
                                alt={result.nominee_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">
                              {result.nominee_name}
                            </h3>
                            {result.nominee_instagram && (
                              <p className="text-sm text-muted-foreground">
                                {result.nominee_instagram}
                              </p>
                            )}
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
                              {result.vote_count}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              hlasov
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {categoryResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Momentálne nie sú k dispozícii žiadne výsledky.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

