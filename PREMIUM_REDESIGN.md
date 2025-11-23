# SOWA Awards - Premium Dark Mode Redesign ✨

## Prehľad

Kompletný redesign platformy SOWA Awards s luxusným dark mode dizajnom inšpirovaným prestížnymi udalosťami ako Oscar a Grammy. Implementuje gamifikované hlasovanie s wizard flow, zlaté akcenty a prémiové vizuálne efekty.

---

## 🎨 Design System

### Farby

- **Deep Midnight**: `#050505` - Primárne pozadie
- **SOWA Gold**: `#D4AF37` - Hlavný zlatý akcent
- **Gold Gradient**: `linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)`
- **Electric Purple**: `#8B5CF6` - Glow efekty a sekundárny akcent
- **Off-White**: `#F3F4F6` - Svetlý text

### Typografia

- **Nadpisy**: Playfair Display (serifové, luxusné)
- **Text**: Inter (moderný sans-serif)
- Implementované cez Google Fonts s display="swap" pre optimálny výkon

### Vizuálne Elementy

✨ **Glow Efekty**: Electric Purple svetelné efekty
🏆 **Zlaté Bordery**: Pre vybrané položky a víťazov
⚡ **Smooth Transitions**: Plynulé animácie všade
💫 **Micro-interactions**: Interaktívne hover stavy

---

## 🏠 Homepage Redesign

### Hero Sekcia

- **Animovaný Gradient Background**: Dynamické svetelné efekty s particles
- **Plávajúce Particles**: 50+ animovaných hviezd a sparkles
- **Spotlight Effect**: Radiálny gradient pre fokus
- **Veľké CTA Tlačidlá**: Zlaté gradient tlačidlá s shine efektom
- **Countdown Timer**: Elegantné odpočítavanie do konca hlasovania
- **Stats Cards**: Premium karty s glow efektmi

### Komponenty

```
components/premium/
├── VideoHero.tsx       - Animovaná hero sekcia s particles
├── GoldButton.tsx      - Premium CTA tlačidlo s hover efektami
└── GlowCard.tsx        - Luxusná karta so svetelnými efektami
```

---

## 🎮 Wizard Flow Hlasovanie

### Koncept

Instagram Stories-style krok-za-krokom proces:
- Jedna kategória = jeden slide
- Swipe gestures na mobile
- Progress bar na vrchu
- Smooth transitions medzi slides

### Flow

1. **Intro Screen**: Úvodná obrazovka s animáciami
2. **Kategórie (Slides)**: Každá kategória má vlastný slide
3. **Nominee Cards**: Veľké karty s fotkami (400x400px)
4. **Progress Bar**: Zlatá progress čiara (Krok X/10)
5. **Verifikácia**: Premium dark mode formuláre
6. **Potvrdenie**: Prehľad výberov
7. **Confetti**: Celebration po odoslaní

### Komponenty

```
components/wizard/
├── WizardContainer.tsx  - Main wrapper s progress bar
├── CategorySlide.tsx    - Slide pre jednu kategóriu
├── NomineeCard.tsx      - Klikateľná karta s fotkou
└── ProgressBar.tsx      - Zlatý progress indikátor
```

---

## ✨ Animations & Effects

### Framer Motion Animácie

- **Slide Transitions**: Horizontálny swipe medzi slides
- **Card Hover**: Scale + glow efekt
- **Selection**: Zlatý border animation s pulse
- **Confetti**: Premium celebration po submite
- **Progress**: Smooth fill animation
- **Hero**: Particles floating, gradient rotation

### Confetti Effect

```typescript
components/premium/ConfettiEffect.tsx
- fireConfetti() - Manuálne spustenie
- ConfettiEffect - Auto trigger komponent
- Zlaté a fialové konfety
- Multi-directional burst
```

### Glow Effects

- Gold glow na vybraných kartách
- Purple glow na hover
- Pulsating shadows na icons
- Shimmer effect na buttons

---

## 📱 Mobile Optimization

### Swipe Gestures

```typescript
hooks/useSwipe.ts
- Swipe left: Ďalší slide
- Swipe right: Predchádzajúci slide
- Threshold: 75px
- Touch-friendly
```

### Touch Targets

- Min. veľkosť: 44x44px (iOS/Android štandard)
- `touch-manipulation` class
- Väčšie spacing na mobile
- Font-size 16px pre prevencia zoom
- `-webkit-tap-highlight-color` pre visual feedback

### Responsive Grid

- Mobile: 1 column
- Small (475px+): 2 columns
- Medium (768px+): 3 columns
- Large (1024px+): 4 columns

---

## 🎯 Key Features

### Gamifikácia

✨ **Progress Tracking**: Vizuálny progress bar
🏆 **Visual Feedback**: Zlaté borders na výberoch
🎉 **Confetti Celebration**: Po úspešnom submite
⚡ **Smooth Transitions**: Plynulé animácie
💫 **Micro-interactions**: Hover, tap, swipe effects

### Premium Touch

🌟 **Gold Akcenty**: Všade prítomná zlatá farba
🎬 **Animated Background**: Gradient + particles
✨ **Glow Effects**: Svetelné efekty na kartách
🎨 **Luxury Fonts**: Playfair Display + Inter
💎 **Dark Mode First**: Optimalizované pre OLED

### Mobile First

📱 **App-like Experience**: Native feel
👆 **Swipe Gestures**: Prirodzené ovládanie
🎯 **Large Touch Targets**: 44px minimum
⚡ **Fast Loading**: Optimalizované obrázky
🎨 **OLED Optimized**: True black (#050505)

---

## 📁 Súborová Štruktúra

```
app/
├── page.tsx                      # Premium homepage
├── hlasovat/
│   ├── page.tsx                 # Wizard flow
│   ├── verifikacia/page.tsx     # Dark mode forms
│   ├── potvrdenie/page.tsx      # Review page
│   └── dakujeme/page.tsx        # Thank you + confetti

components/
├── premium/
│   ├── VideoHero.tsx            # Animated hero
│   ├── GoldButton.tsx           # Premium CTA
│   ├── GlowCard.tsx            # Stat cards
│   └── ConfettiEffect.tsx      # Celebration
├── wizard/
│   ├── WizardContainer.tsx     # Main wrapper
│   ├── CategorySlide.tsx       # Category screen
│   ├── NomineeCard.tsx         # Nominee card
│   └── ProgressBar.tsx         # Progress indicator
└── layout/
    └── header.tsx              # Premium header

hooks/
└── useSwipe.ts                 # Swipe gesture hook

app/
├── globals.css                 # Premium styles
└── layout.tsx                  # Google Fonts setup

tailwind.config.ts              # Extended theme
```

---

## 🎨 CSS Utilities

### Premium Classes

```css
/* Gradients */
.gradient-gold
.gradient-gold-shimmer
.gradient-electric
.gradient-dark
.gradient-midnight

/* Text */
.text-gold
.text-gold-gradient

/* Borders */
.border-gold
.border-gold-glow

/* Backgrounds */
.bg-midnight
.bg-midnight-light

/* Effects */
.glass-dark
.glass-gold
.luxury-card
.selected-gold
.hover-lift
.hover-gold
.hover-glow
.glow-gold
.glow-purple

/* Animations */
.animate-gradient
.animate-shimmer
```

---

## 🚀 Performance

### Optimalizácie

- **Google Fonts**: `display: "swap"` pre FOIT prevencia
- **Framer Motion**: Lazy loading animácií
- **Images**: Next.js Image optimization
- **CSS**: Tailwind purge unused styles
- **Particles**: RequestAnimationFrame
- **Confetti**: Canvas-based, hardware accelerated

### Load Times

- Homepage: < 2s
- Wizard: < 1s transition
- Mobile: Optimalizované pre 3G

---

## 📊 Success Metrics

🎯 **Conversion Rate**: Cieľ > 40%
⚡ **Load Time**: < 2s
📱 **Mobile Usage**: Očakávané > 70%
🎉 **Completion Rate**: Cieľ > 80%
⭐ **User Satisfaction**: Vysoká (gamifikácia)

---

## 🎭 Brand Identity

### Oscar/Grammy Vibe

- **Luxusné Fonty**: Playfair Display serifový
- **Zlaté Akcenty**: Prestíž a exkluzivita
- **Dark Mode**: Elegancia a sofistikovanosť
- **Smooth Animations**: Premium feel
- **Confetti**: Celebration moment

### Tone

- Prestížne
- Exkluzívne
- Moderne
- Zábavné (gamifikácia)
- Profesionálne

---

## 🔧 Development

### Technologies

- **Next.js 15**: App Router, React 19
- **Framer Motion**: Animácie
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety
- **Canvas Confetti**: Celebration effects

### Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

---

## ✅ Implemented Features

### Phase 1: Design System ✓
- [x] Premium Dark Mode colors
- [x] Google Fonts (Playfair + Inter)
- [x] Gold gradient utilities
- [x] Glow effects

### Phase 2: Homepage ✓
- [x] Video/gradient hero
- [x] Gold CTA buttons
- [x] Dark cards
- [x] Premium footer

### Phase 3: Wizard Flow ✓
- [x] Wizard container
- [x] Slide navigation
- [x] Nominee cards
- [x] Progress bar
- [x] Animations

### Phase 4: Polish ✓
- [x] Confetti effect
- [x] Micro-interactions
- [x] Loading states
- [x] Mobile optimization

---

## 🎓 Best Practices

### Accessibility

- Touch targets: min 44px
- Color contrast: WCAG AA compliant
- Focus states: Visible
- Semantic HTML: Proper structure

### UX

- Immediate feedback na kliknutia
- Clear progress indication
- Error states s helpful messages
- Success celebration (confetti)

### Performance

- Lazy load images
- Optimize fonts
- Minimize re-renders
- Hardware acceleration pre animácie

---

## 🌟 Highlights

1. **Gamifikované Hlasovanie**: Instagram Stories-style wizard flow
2. **Premium Vizuál**: Oscar/Grammy luxusný dizajn
3. **Mobile First**: Swipe gestures a touch-optimized
4. **Confetti Celebration**: Satisfying completion moment
5. **Dark Mode**: True black OLED optimization

---

## 📞 Support

Pre otázky ohľadom implementácie kontaktujte development team.

**Build with 💛 and ✨ for SOWA Awards 2025**

