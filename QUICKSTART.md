# SOWA Awards - Quick Start Guide

## Rýchle spustenie (Development)

### 1. Inštalácia
```bash
npm install
```

### 2. Konfigurácia Environment Variables

Skopírujte `.env.local.example` do `.env.local`:
```bash
cp .env.local.example .env.local
```

Pre development môžete použiť tieto testovacie hodnoty (už sú nastavené):
- reCAPTCHA používa testovacie kľúče Google
- Email a SMS sa len logujú do konzoly
- Redis nie je potrebný pre základné testovanie

### 3. Supabase Setup

1. Vytvorte Supabase projekt na https://supabase.com
2. Spustite SQL z `supabase/schema.sql` v SQL editore
3. Nahraďte v `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 4. Spustite development server

```bash
npm run dev
```

Aplikácia bude dostupná na http://localhost:3000

## Testovanie funkcií

### Hlasovanie
1. Prejdite na http://localhost:3000
2. Kliknite na "Začať hlasovať"
3. Vyberte kategóriu a nominanta
4. Proces verifikácie (v dev mode sa kódy vypisujú do konzoly)

### Admin Panel
1. Prejdite na http://localhost:3000/admin
2. Prihláste sa heslom: `admin123` (nastavené v `.env.local`)
3. Dashboard ukáže štatistiky

## Štruktúra projektu

```
anketasowa/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── hlasovat/                # Hlasovací proces
│   │   ├── page.tsx            # Výber kategórie
│   │   ├── [category]/         # Výber nominanta
│   │   ├── verifikacia/        # Email/SMS verifikácia
│   │   ├── potvrdenie/         # Potvrdenie hlasov
│   │   └── dakujeme/           # Ďakovná stránka
│   ├── vysledky/               # Verejné výsledky
│   ├── admin/                  # Admin panel
│   │   ├── page.tsx           # Dashboard
│   │   ├── fraud-detection/   # Detekcia podvodov
│   │   └── vysledky/          # Detailné výsledky
│   └── api/                    # API routes
│       ├── auth/              # Registrácia, verifikácia
│       ├── vote/              # Odoslanie hlasov
│       ├── categories/        # Načítanie kategórií
│       ├── nominees/          # Načítanie nominantov
│       └── results/           # Výsledky
├── components/                 # React komponenty
│   ├── layout/                # Header, Footer
│   └── ui/                    # UI komponenty (Button, Card, ...)
├── lib/                       # Utility funkcie
│   ├── supabase/             # Supabase klienti
│   ├── fraud-detection/      # Fraud detection logika
│   ├── rate-limit/           # Rate limiting
│   ├── email/                # Email služby
│   ├── sms/                  # SMS služby
│   ├── store/                # Zustand store
│   └── utils.ts              # Pomocné funkcie
├── types/                     # TypeScript typy
├── supabase/                  # Supabase SQL schémy
└── public/                    # Statické súbory
```

## Hlavné funkcie

### 1. Multi-step hlasovací proces
- Výber kategórie → Výber nominanta → Verifikácia → Potvrdenie → Ďakovanie
- Real-time validácia
- Progress tracking
- Responsívny dizajn

### 2. Dvojfaktorová verifikácia
- Email verifikácia (6-miestny kód)
- SMS verifikácia (6-miestny kód)
- 5 minút expirácia
- Možnosť resend

### 3. Anti-fraud systém
- IP clustering detection
- Device fingerprinting
- Pattern analysis
- Rate limiting
- Disposable email detection
- Automatic fraud logging

### 4. Admin Panel
- Real-time dashboard
- Fraud detection monitoring
- Detailné výsledky s percentami
- Bezpečné prihlásenie

### 5. Bezpečnosť
- SSL/TLS šifrovanie
- Content Security Policy
- XSS ochrana
- CSRF protection
- SQL injection prevention
- Rate limiting na všetkých endpointoch

## Development Tips

### Hot Reload
Turbopack je aktivovaný, takže zmeny sú okamžite viditeľné.

### Debugging
```bash
# Konzola v Next.js
console.log() sa zobrazí v termináli (server-side) alebo browseri (client-side)

# Supabase logs
Prejdite do Supabase Dashboard > Logs
```

### Testing bez SMS/Email
V development mode sa verifikačné kódy vypisujú do konzoly:
```
Email that would be sent: { to: 'test@test.sk', subject: '...', html: '...' }
SMS that would be sent: { to: '+421900123456', message: '...' }
```

### Pridanie nominantov
Manuálne cez Supabase Dashboard alebo vytvorte admin CRUD stránky.

## Production Checklist

Pred nasadením do produkcie:

- [ ] Nastavte všetky environment variables
- [ ] Zmeňte `ADMIN_PASSWORD` na silné heslo
- [ ] Aktivujte Twilio pre SMS
- [ ] Aktivujte Resend pre email
- [ ] Nastavte Upstash Redis
- [ ] Nastavte reCAPTCHA v3 produkčné kľúče
- [ ] Overte Supabase RLS policies
- [ ] Testujte fraud detection
- [ ] Nastavte monitoring
- [ ] Zálohujte databázu

## Troubleshooting

### Problem: Port 3000 je obsadený
```bash
# Použite iný port
npm run dev -- -p 3001
```

### Problem: TypeScript chyby
```bash
# Skontrolujte typy
npm run type-check
```

### Problem: Supabase connection error
- Overte URL a API kľúče v `.env.local`
- Skontrolujte či Supabase projekt beží
- Overte RLS policies

### Problem: Build errors
```bash
# Vyčistite cache a rebuildbuildnite
rm -rf .next
npm run build
```

## Podpora

- **Dokumentácia:** README.md, DEPLOYMENT.md
- **Issues:** GitHub Issues
- **Email:** support@anketasowa.sk

## Licencia

Všetky práva vyhradené © 2025 SOWA Awards

