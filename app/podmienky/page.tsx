import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Podmienky používania</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Všeobecné ustanovenia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Tieto podmienky používania upravujú pravidlá účasti v ankete
                  SOWA Awards. Účasťou v ankete súhlasíte s týmito podmienkami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Pravidlá hlasovania</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Každý účastník môže hlasovať len raz v každej kategórii
                  </li>
                  <li>
                    Hlasovanie vyžaduje overenie emailovej adresy a telefónneho čísla
                  </li>
                  <li>
                    Akékoľvek pokusy o manipuláciu s hlasovaním sú zakázané
                  </li>
                  <li>
                    Organizátor si vyhradzuje právo zrušiť hlasy, ktoré porušujú pravidlá
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Ochrana proti manipulácii</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Používame pokročilé bezpečnostné mechanizmy na zabezpečenie
                  férovosti hlasovania:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dvojfaktorová verifikácia (email + SMS)</li>
                  <li>Detekcia a blokovanie botov</li>
                  <li>Monitoring IP adries a zariadení</li>
                  <li>Automatická detekcia podozrivých vzorcorov</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Zodpovednosť</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Organizátor nie je zodpovedný za technické problémy, ktoré môžu
                  ovplyvniť vašu schopnosť hlasovať. Výsledky ankety sú konečné
                  a nezáväzné.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Zmeny podmienok</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Organizátor si vyhradzuje právo kedykoľvek zmeniť tieto podmienky.
                  Zmeny nadobúdajú účinnosť ich zverejnením na tejto stránke.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  V prípade otázok alebo problémov nás kontaktujte na:
                  <br />
                  <strong>Email:</strong> support@anketasowa.sk
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

