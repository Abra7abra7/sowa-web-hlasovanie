"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Shield } from "lucide-react";
import Link from "next/link";
import { useVotingStore } from "@/lib/store/voting-store";
import { toast } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const verificationSchema = z.object({
  email: z.string().email("Neplatná emailová adresa"),
  phone: z.string().min(9, "Neplatné telefónne číslo"),
});

type VerificationForm = z.infer<typeof verificationSchema>;

export default function VerificationPage() {
  const router = useRouter();
  const { selections, userEmail, userPhone, setUserInfo, setUserId } = useVotingStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"info" | "verify">("info");
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [tempUserId, setTempUserId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      email: userEmail || "",
      phone: userPhone || "",
    },
  });

  if (selections.length === 0) {
    router.push("/hlasovat");
    return null;
  }

  const onSubmitInfo = async (data: VerificationForm) => {
    setLoading(true);
    try {
      // Get fingerprint (simplified version, in production use FingerprintJS)
      const fingerprint = `fp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone,
          fingerprint,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast(result.error || "Chyba pri registrácii", "error");
        return;
      }

      setUserInfo(data.email, data.phone);
      setTempUserId(result.userId);
      
      if (result.alreadyVerified) {
        // User already verified, skip verification
        setUserId(result.userId);
        router.push("/hlasovat/potvrdenie");
      } else {
        toast("Overovanie kódy boli odoslané na váš email a telefón", "success");
        setStep("verify");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast("Nastala chyba. Skúste to prosím znova.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitVerify = async () => {
    if (!emailCode || !smsCode || !tempUserId) {
      toast("Vyplňte prosím oba kódy", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: tempUserId,
          emailCode,
          smsCode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast(result.error || "Neplatné overovanie kódy", "error");
        return;
      }

      setUserId(tempUserId);
      toast("Overenie bolo úspešné!", "success");
      router.push("/hlasovat/potvrdenie");
    } catch (error) {
      console.error("Verification error:", error);
      toast("Nastala chyba. Skúste to prosím znova.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (type: "email" | "sms") => {
    if (!tempUserId) return;

    try {
      const response = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: tempUserId,
          type,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast(result.message, "success");
      } else {
        toast(result.error, "error");
      }
    } catch (error) {
      console.error("Resend error:", error);
      toast("Nastala chyba pri opätovnom odoslaní", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-midnight">
      <Header />

      <main className="flex-1 py-24">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-gold flex items-center justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-8 h-8 text-midnight" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-gold-gradient font-serif">
                Overenie identity
              </h1>
              <p className="text-xl text-gray-400">
                Pre dokončenie hlasovania potrebujeme overiť vašu identitu
              </p>
            </motion.div>
          </div>

          {step === "info" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="luxury-card border-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-gold font-serif">
                    <Shield className="h-6 w-6" />
                    Vaše kontaktné údaje
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Odošleme vám overovače kódy na email a telefón
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmitInfo)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        <Mail className="inline h-4 w-4 mr-2 text-gold" />
                        Emailová adresa
                      </label>
                      <Input
                        type="email"
                        placeholder="vas@email.sk"
                        {...register("email")}
                        disabled={loading}
                        className="bg-midnight-light border-gold/20 text-white focus:border-gold"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        <Phone className="inline h-4 w-4 mr-2 text-gold" />
                        Telefónne číslo
                      </label>
                      <Input
                        type="tel"
                        placeholder="+421 900 123 456"
                        {...register("phone")}
                        disabled={loading}
                        className="bg-midnight-light border-gold/20 text-white focus:border-gold"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Formát: +421 alebo 0
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-gold text-midnight font-bold text-lg py-6"
                      disabled={loading}
                    >
                      {loading ? "Odosielam..." : "Odoslať overovače kódy"}
                    </Button>

                    <div className="text-sm text-gray-400 text-center flex items-center justify-center gap-2">
                      <Shield className="h-4 w-4 text-gold" />
                      Vaše údaje sú chránené a používané len pre overenie hlasovania
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-6">
                <Card className="luxury-card border-gold/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-gold font-serif">
                      <Mail className="h-5 w-5" />
                      Email kód
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Zadajte 6-miestny kód z emailu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ""))}
                      className="text-center text-3xl tracking-widest bg-midnight-light border-gold/20 text-gold font-bold"
                      disabled={loading}
                    />
                    <Button
                      variant="link"
                      className="w-full mt-2 text-gold hover:text-gold-light"
                      onClick={() => handleResend("email")}
                      type="button"
                    >
                      Poslať znova
                    </Button>
                  </CardContent>
                </Card>

                <Card className="luxury-card border-gold/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-gold font-serif">
                      <Phone className="h-5 w-5" />
                      SMS kód
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Zadajte 6-miestny kód zo SMS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ""))}
                      className="text-center text-3xl tracking-widest bg-midnight-light border-gold/20 text-gold font-bold"
                      disabled={loading}
                    />
                    <Button
                      variant="link"
                      className="w-full mt-2 text-gold hover:text-gold-light"
                      onClick={() => handleResend("sms")}
                      type="button"
                    >
                      Poslať znova
                    </Button>
                  </CardContent>
                </Card>

                <Button
                  className="w-full gradient-gold text-midnight font-bold text-lg py-6"
                  onClick={onSubmitVerify}
                  disabled={loading || emailCode.length !== 6 || smsCode.length !== 6}
                >
                  {loading ? "Overujem..." : "Overiť a pokračovať"}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-gold"
                  onClick={() => setStep("info")}
                  disabled={loading}
                >
                  Zmeniť email/telefón
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

    </div>
  );
}

