import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SOWA Awards - Anketa o najlepších influenceroch",
  description: "Hlasujte za najlepších influencerov na Slovensku v najrôznejších kategóriách. SOWA Awards 2025.",
  keywords: ["SOWA Awards", "influenceri", "hlasovanie", "anketa", "Slovensko"],
  authors: [{ name: "SOWA Awards" }],
  openGraph: {
    title: "SOWA Awards - Anketa o najlepších influenceroch",
    description: "Hlasujte za najlepších influencerov na Slovensku v najrôznejších kategóriách.",
    type: "website",
    locale: "sk_SK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth dark">
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
