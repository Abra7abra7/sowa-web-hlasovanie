import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Ochrana osobných údajov</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Úvod</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Ochrana vašich osobných údajov je pre nás prioritou. Tento
                  dokument vysvetľuje, aké údaje zbierame, ako ich používame a
                  chránime v súlade s GDPR.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Aké údaje zbierame</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Kontaktné údaje:</strong> emailová adresa, telefónne číslo</li>
                  <li><strong>Technické údaje:</strong> IP adresa, typ zariadenia, prehliadač</li>
                  <li><strong>Údaje o hlasovaní:</strong> vaše hlasy v jednotlivých kategóriách</li>
                  <li><strong>Bezpečnostné údaje:</strong> fingerprint zariadenia pre ochranu proti podvodom</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Účel spracovania údajov</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Vaše údaje používame na:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Overenie vašej identity pri hlasovaní</li>
                  <li>Zabránenie manipulácii a podvodom</li>
                  <li>Zabezpečenie férovosti hlasovania</li>
                  <li>Technickú podporu a riešenie problémov</li>
                  <li>Zlepšenie našich služieb</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Zdieľanie údajov</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Vaše osobné údaje nezdieľame s tretími stranami, okrem:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Poskytovateľov služieb:</strong> Twilio (SMS), Resend
                    (email), Supabase (databáza) - len v nevyhnutnom rozsahu
                  </li>
                  <li>
                    <strong>Právne požiadavky:</strong> ak to vyžaduje zákon
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Uchovávanie údajov</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Vaše údaje uchováváme po dobu trvania ankety a 12 mesiacov po
                  jej skončení pre účely auditu a fraud detection. Potom sú
                  automaticky vymazané.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Vaše práva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Máte právo:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Na prístup k vašim osobným údajom</li>
                  <li>Na opravu nesprávnych údajov</li>
                  <li>Na vymazanie údajov (právo na zabudnutie)</li>
                  <li>Na obmedzenie spracovania</li>
                  <li>Na prenositeľnosť údajov</li>
                  <li>Namietať proti spracovaniu</li>
                  <li>Podať sťažnosť na dozorný orgán</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Bezpečnosť údajov</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Používame najmodernejšie bezpečnostné opatrenia:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>SSL/TLS šifrovanie</li>
                  <li>Bezpečné uloženie v databáze</li>
                  <li>Pravidelné bezpečnostné audity</li>
                  <li>Obmedzený prístup k údajom</li>
                  <li>Monitoring a detekcia hrozieb</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Používame len nevyhnutné cookies pre fungovanie stránky a
                  zabezpečenie. Nepoužívame marketingové ani reklamné cookies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Pre uplatnenie vašich práv alebo otázky ohľadom ochrany údajov:
                  <br />
                  <strong>Email:</strong> privacy@anketasowa.sk
                  <br />
                  <strong>Zodpovedná osoba:</strong> DPO SOWA Awards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Zmeny</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Tento dokument môže byť aktualizovaný. Posledná aktualizácia:
                  November 2025.
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

