# Deployment Guide - SOWA Awards

## Predpoklady

- Supabase projekt
- Twilio účet a telefónne číslo
- Resend účet
- Upstash Redis databáza
- Vercel účet (alebo iný hosting)
- reCAPTCHA v3 kľúče

## Krok 1: Supabase Setup

1. Vytvorte nový projekt na [supabase.com](https://supabase.com)
2. Prejdite do SQL editora
3. Skopírujte a spustite SQL z `supabase/schema.sql`
4. Overte že všetky tabuľky boli vytvorené
5. Skopírujte Project URL a anon key z Settings > API

## Krok 2: External Services Setup

### Twilio (SMS verifikácia)
1. Registrujte sa na [twilio.com](https://twilio.com)
2. Kúpte telefónne číslo (preferovane Slovenské +421)
3. Získajte Account SID a Auth Token z konzoly
4. Nastavte Messaging service (voliteľné)

### Resend (Email)
1. Vytvorte účet na [resend.com](https://resend.com)
2. Vytvorte API kľúč
3. Overte vašu doménu (anketasowa.sk)
4. Nastavte DNS záznamy pre SPF/DKIM

### Upstash Redis
1. Vytvorte účet na [upstash.com](https://upstash.com)
2. Vytvorte novú Redis databázu (region: EU pre nižšiu latenciu)
3. Skopírujte REST URL a REST Token

### reCAPTCHA v3
1. Prejdite na [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Registrujte novú stránku s reCAPTCHA v3
3. Pridajte doménu (anketasowa.sk a localhost pre development)
4. Získajte Site Key a Secret Key

## Krok 3: Environment Variables

Vytvorte `.env.local` s nasledujúcimi premennými:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+421xxxxxxxxx

# Resend
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@anketasowa.sk

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxx
RECAPTCHA_SECRET_KEY=xxxxx

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# App Config
NEXT_PUBLIC_APP_URL=https://anketasowa.sk
NEXT_PUBLIC_VOTING_END_DATE=2025-12-31T23:59:59Z

# Admin
ADMIN_PASSWORD=silne-heslo-min-20-znakov
```

## Krok 4: Vercel Deployment

1. Push kód do GitHub repozitára
2. Importujte projekt do Vercel
3. Nastavte všetky environment variables v Vercel
4. Nastavte domén u (anketasowa.sk)
5. Deploy

### Vercel CLI (alternatíva)
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Krok 5: DNS Konfigurácia

### Pre Vercel:
```
A     @         76.76.21.21
CNAME www       cname.vercel-dns.com
```

### Pre Resend Email:
```
TXT   @         v=spf1 include:amazonses.com ~all
CNAME resend._domainkey  resend._domainkey.resend.com
CNAME resend1._domainkey resend1._domainkey.resend.com
CNAME resend2._domainkey resend2._domainkey.resend.com
```

## Krok 6: Cloudflare (DDoS ochrana)

1. Pridajte doménu do Cloudflare
2. Aktualizujte nameservery u registrátora
3. Aktivujte "Under Attack Mode" v prípade potreby
4. Nastavte Page Rules:
   - Cache Everything pre statické súbory
   - Rate limiting pre API endpointy

## Krok 7: Monitoring

### Vercel Analytics
- Automaticky aktivované pre Vercel projekty
- Real-time návštevnosť
- Performance metrics

### Sentry (voliteľné)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

## Krok 8: Testing

### Load Testing
```bash
# Nainštalujte artillery
npm install -g artillery

# Spustite load test
artillery quick --count 100 --num 1000 https://anketasowa.sk
```

### Security Audit
```bash
npm audit
npm audit fix
```

## Post-Deployment Checklist

- [ ] Všetky environment variables nastavené
- [ ] Supabase databáza je pripravená a naplnená
- [ ] Email verifikácia funguje
- [ ] SMS verifikácia funguje
- [ ] reCAPTCHA funguje
- [ ] Admin panel je prístupný (/admin)
- [ ] Rate limiting funguje
- [ ] Fraud detection loguje podozrivé aktivity
- [ ] SSL certifikát je aktívny
- [ ] DNS záznamy sú správne nastavené
- [ ] CDN je aktívna (Cloudflare/Vercel)
- [ ] Backup stratégia je nastavená
- [ ] Monitoring je aktívny

## Backup Strategy

### Supabase Databáza
1. Prejdite do Supabase Dashboard > Settings > Database
2. Nastavte automatické zálohy (included v paid plánoch)
3. Alebo manuálne:
```bash
# Export databázy
pg_dump -h db.xxxxx.supabase.co -U postgres database_name > backup.sql
```

## Scaling

Pre 1M+ používateľov:

1. **Vercel:** Pro plán alebo Enterprise
2. **Supabase:** Pro plán s viac connection pools
3. **Upstash Redis:** Scale plan
4. **Cloudflare:** Pro plán pre lepšiu DDoS protection

## Support & Monitoring

### Logs
```bash
# Vercel logs
vercel logs

# Real-time logs
vercel logs --follow
```

### Alerts
Nastavte alerty v:
- Vercel (deployment failures)
- Supabase (database errors)
- Upstash (Redis errors)
- Cloudflare (DDoS attacks)

## Troubleshooting

### Problem: SMS sa neodosielajú
- Overte Twilio kredit
- Skontrolujte telefónne číslo formát
- Overte Twilio Messaging Service

### Problem: Vysoká latencia
- Aktivujte Cloudflare CDN
- Optimalizujte databázové queries
- Pridajte indexy v Supabase

### Problem: Rate limiting nefunguje
- Overte Upstash Redis pripojenie
- Skontrolujte environment variables
- Testujte s curl/Postman

## Kontakt

Pre technickú podporu: tech@anketasowa.sk

