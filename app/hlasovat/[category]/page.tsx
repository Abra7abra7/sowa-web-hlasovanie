"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Instagram, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useVotingStore } from "@/lib/store/voting-store";

interface Nominee {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  instagram: string | null;
  image_url: string | null;
  video_url: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export default function CategoryVotingPage() {
  const params = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [filteredNominees, setFilteredNominees] = useState<Nominee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);

  const { addSelection, selections } = useVotingStore();

  useEffect(() => {
    if (params.category) {
      fetchCategoryAndNominees(params.category as string);
    }
  }, [params.category]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredNominees(
        nominees.filter((nominee) =>
          nominee.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredNominees(nominees);
    }
  }, [searchQuery, nominees]);

  const fetchCategoryAndNominees = async (slug: string) => {
    try {
      // Fetch all categories to find the current one
      const categoriesResponse = await fetch("/api/categories");
      const categoriesData = await categoriesResponse.json();
      const currentCategory = categoriesData.categories?.find(
        (cat: Category) => cat.slug === slug
      );

      if (!currentCategory) {
        router.push("/hlasovat");
        return;
      }

      setCategory(currentCategory);

      // Check if already voted in this category
      const existingVote = selections.find(
        (s) => s.categoryId === currentCategory.id
      );
      if (existingVote) {
        setSelectedNominee(existingVote.nomineeId);
      }

      // Fetch nominees
      const nomineesResponse = await fetch(
        `/api/nominees?categoryId=${currentCategory.id}`
      );
      const nomineesData = await nomineesResponse.json();
      setNominees(nomineesData.nominees || []);
      setFilteredNominees(nomineesData.nominees || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (nominee: Nominee) => {
    if (!category) return;

    setSelectedNominee(nominee.id);
    addSelection({
      categoryId: category.id,
      categoryName: category.name,
      nomineeId: nominee.id,
      nomineeName: nominee.name,
    });
  };

  const handleContinue = () => {
    if (selectedNominee) {
      router.push("/hlasovat/verifikacia");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Načítavam nominantov...</p>
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
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/hlasovat">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Späť na kategórie
              </Link>
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {category?.name}
              </h1>
              {category?.description && (
                <p className="text-lg text-muted-foreground">
                  {category.description}
                </p>
              )}
            </motion.div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Hľadať nominanta..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Nominees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredNominees.map((nominee, index) => (
              <motion.div
                key={nominee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`h-full hover-lift cursor-pointer transition-all ${
                    selectedNominee === nominee.id
                      ? "ring-2 ring-primary shadow-lg"
                      : ""
                  }`}
                  onClick={() => handleVote(nominee)}
                >
                  {nominee.image_url && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={nominee.image_url}
                        alt={nominee.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{nominee.name}</span>
                      {selectedNominee === nominee.id && (
                        <span className="text-primary text-sm">✓ Vybrané</span>
                      )}
                    </CardTitle>
                    {nominee.description && (
                      <CardDescription className="line-clamp-2">
                        {nominee.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {nominee.instagram && (
                      <a
                        href={`https://instagram.com/${nominee.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram className="h-4 w-4" />
                        {nominee.instagram}
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredNominees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Nenašli sa žiadni nominanti pre váš vyhľadávací dotaz."
                  : "V tejto kategórii momentálne nie sú žiadni nominanti."}
              </p>
            </div>
          )}

          {/* Continue Button */}
          {selectedNominee && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t"
            >
              <div className="container max-w-6xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Vybraných: {selections.length} kategórií
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" asChild>
                      <Link href="/hlasovat">Vybrať ďalšie</Link>
                    </Button>
                    <Button
                      size="lg"
                      className="gradient-purple"
                      onClick={handleContinue}
                    >
                      Pokračovať na overenie
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

