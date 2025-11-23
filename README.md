# SOWA Awards - Anketa platformy

Profesionálna platforma pre hlasovanie o najlepších influenceroch na Slovensku s pokročilou ochranou proti manipulácii a podporou pre vysokú návštevnosť.

## Funkcie

- ✅ Multi-step hlasovací proces
- ✅ Dvojfaktorová verifikácia (Email + SMS)
- ✅ Anti-fraud systém s viacvrstvovou ochranou
- ✅ Rate limiting a ochrana proti DDoS
- ✅ Browser fingerprinting
- ✅ Real-time štatistiky
- ✅ Admin panel pre správu
- ✅ Škálovateľná architektúra pre 1M+ používateľov
- ✅ Responzívny moderný dizajn

## Technológie

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Edge Functions
- **Databáza**: Supabase (PostgreSQL)
- **Auth**: Email/SMS verifikácia, reCAPTCHA v3
- **Rate Limiting**: Upstash Redis
- **Email**: Resend
- **SMS**: Twilio
- **Hosting**: Vercel
- **Security**: Multi-layer fraud detection

## Začíname

### Predpoklady

- Node.js 18+
- npm alebo yarn
- Supabase projekt
- Twilio účet (pre SMS)
- Resend účet (pre email)
- Upstash Redis (pre rate limiting)

### Inštalácia

1. Klonujte repozitár:
```bash
git clone https://github.com/your-repo/anketasowa.git
cd anketasowa
```

2. Nainštalujte závislosti:
```bash
npm install
```

3. Skopírujte `.env.local.example` do `.env.local` a vyplňte premenné:
```bash
cp .env.local.example .env.local
```

4. Nastavte Supabase databázu:
   - Vytvorte nový Supabase projekt
   - Spustite SQL z `supabase/schema.sql` v SQL editore
   - Skopírujte URL a anon key do `.env.local`

5. Spustite vývojový server:
```bash
npm run dev
```

6. Otvorte [http://localhost:3000](http://localhost:3000)

## Konfigurácia služieb

### Supabase

1. Vytvorte projekt na [supabase.com](https://supabase.com)
2. Spustite SQL schému z `supabase/schema.sql`
3. Nastavte RLS policies podľa potreby

### Twilio (SMS)

1. Vytvorte účet na [twilio.com](https://twilio.com)
2. Kúpte telefónne číslo
3. Získajte Account SID a Auth Token

### Resend (Email)

1. Vytvorte účet na [resend.com](https://resend.com)
2. Vytvorte API kľúč
3. Overte vašu doménu

### Upstash Redis

1. Vytvorte účet na [upstash.com](https://upstash.com)
2. Vytvorte Redis databázu
3. Získajte REST URL a token

### reCAPTCHA v3

1. Registrujte stránku na [google.com/recaptcha](https://www.google.com/recaptcha)
2. Vyberte reCAPTCHA v3
3. Získajte Site Key a Secret Key

## Vývoj

```bash
# Spustiť dev server
npm run dev

# Build pre produkciu
npm run build

# Spustiť produkčný server
npm start

# Lint
npm run lint
```

## Deployment

### Vercel

1. Push do GitHub repozitára
2. Importujte projekt do Vercel
3. Nastavte environment variables
4. Deploy!

## Bezpečnosť

- Multi-layer anti-fraud systém
- Rate limiting na všetkých endpointoch
- Email a SMS verifikácia
- Browser fingerprinting
- IP tracking a analýza
- Detekcia disposable emailov
- Pattern analysis pre podozrivé správanie

## Licencia

Všetky práva vyhradené © 2025 SOWA Awards

## Podpora

Pre otázky a podporu kontaktujte: support@anketasowa.sk
