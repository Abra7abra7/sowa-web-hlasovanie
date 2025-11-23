"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CheckCircle2, Trophy, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { useVotingStore } from "@/lib/store/voting-store";
import { toast } from "@/components/ui/toaster";
import { GoldButton } from "@/components/premium/GoldButton";

export default function ConfirmationPage() {
  const router = useRouter();
  const { selections, userId, userEmail, fingerprint } = useVotingStore();
  const [loading, setLoading] = useState(false);

  if (selections.length === 0 || !userId) {
    router.push("/hlasovat");
    return null;
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          votes: selections,
          fingerprint: fingerprint || `fp_${Date.now()}`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast(result.error || "Chyba pri odosielaní hlasov", "error");
        return;
      }

      if (result.warnings && result.warnings.length > 0) {
        console.warn("Fraud warnings:", result.warnings);
      }

      toast("Vaše hlasy boli úspešne odoslané!", "success");
      router.push("/hlasovat/dakujeme");
    } catch (error) {
      console.error("Submit error:", error);
      toast("Nastala chyba. Skúste to prosím znova.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-midnight">
      <Header />

      <main className="flex-1 py-24">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-gold flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle2 className="w-10 h-10 text-midnight" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-gold-gradient font-serif">
                Skoro hotovo!
              </h1>
              <p className="text-xl text-gray-400">
                Skontrolujte si vaše výbery pred odoslaním
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="luxury-card border-gold/20">
              <CardHeader>
                <CardTitle className="text-2xl text-gold font-serif flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  Vaše hlasy
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Hlasujete v {selections.length} kategóriách
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {selections.map((selection, index) => (
                  <motion.div
                    key={selection.categoryId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 p-5 rounded-xl border border-gold/10 bg-midnight-light hover:border-gold/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Trophy className="w-6 h-6 text-midnight" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gold mb-1">{selection.categoryName}</h3>
                      <p className="text-gray-300">
                        {selection.nomineeName}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="luxury-card border-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-gold font-serif flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Kontaktné údaje
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Pre overenie vašej identity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-midnight-light">
                    <span className="text-gray-400">Email:</span>
                    <span className="font-medium text-white">{userEmail}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card border-gold/40 bg-gold/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-midnight" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold mb-2 text-gold text-base">Ochrana proti manipulácii</p>
                    <p className="text-gray-400 leading-relaxed">
                      Vaše hlasy sú chránené pokročilými bezpečnostnými mechanizmami.
                      Každý hlas je overený a monitorovaný pre zabezpečenie férovosti.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4">
              <GoldButton
                size="xl"
                icon={Sparkles}
                onClick={handleConfirm}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Odosielam..." : "Potvrdiť a odoslať hlasy"}
              </GoldButton>
            </div>

            <p className="text-xs text-center text-gray-500 pt-4">
              Potvrdením súhlasíte so{" "}
              <Link href="/podmienky" className="underline text-gold hover:text-gold-light">
                podmienkami používania
              </Link>{" "}
              a{" "}
              <Link href="/ochrana-udajov" className="underline text-gold hover:text-gold-light">
                spracovaním osobných údajov
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
