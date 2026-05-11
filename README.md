# 🇰🇼 Kuwait Bourse Calculator · V2

> أدوات احترافيّة لمتداولي بورصة الكويت — مجّانيّة بالكامل، ثنائيّة اللغة، بدون تسجيل.

**Live:** https://kb-almarhoun.vercel.app

---

## ⚡ ما الجديد في V2؟

### 🎨 Brand & Design
- **هويّة بصريّة موحّدة** — Design Tokens (`src/index.css`) بدل الـ inline classes
- **لوغو محسّن** — اللوغو الأصليّ + إطار احترافيّ + ring + shadow
- **Dark/Light Mode محسّن** — backgrounds مع radial glows، glass morphism حقيقيّ
- **Typography System** — Cairo (AR), Inter (EN), JetBrains Mono (للأرقام مع `tabular-nums`)

### 🏠 HomePage جديدة بالكامل
- **Hero قويّ** — eyebrow badge + bilingual headline + CTA double + 3 stats
- **Bento Grid** للأدوات الثلاث — كلّ أداة بلون مميّز ثابت في كلّ المنصّة
- **Live Examples** — 3 أمثلة جاهزة، اضغط واحد وتفتح الحاسبة بالـ inputs
- **FAQ Collapsible** — 5 أسئلة شائعة بـ animation
- **About Section** — bio + Telegram + YouTube

### 🧮 تجربة الحاسبات
- **Smart Inputs** — حقول مع validation، help tooltips، unit display، focus animation
- **Result Reveal Moment** — البطاقة تظهر بـ scale-up + النتيجة تـ count up من 0 + ضوء ذهبيّ يومض
- **Histogram Chart** — الـ 107-step price range كـ bar chart تفاعليّ مع `recharts`
- **Secondary Stats** — الأرقام الثانويّة بألوان دلاليّة (أخضر/أحمر/ذهبيّ)
- **Show Formula** — زرّ يكشف الصيغة الحسابيّة + القيم المُدخلة

### 💾 Save & History
- **localStorage History** — كلّ حسبة تنحفظ تلقائيّاً (آخر 50 حسبة)
- **History Drawer** — pull-out sidebar من اليسار/اليمين (RTL-aware)
- **Restore** — اضغط استعادة فتح الحاسبة بنفس البيانات
- **Privacy First** — كلّ شي على جهازك، صفر يُرسَل للسيرفر

### 🔗 Shareable URLs
- كلّ حسبة لها رابط فريد: `?type=ex-price&cp=0.620&b=5`
- المستخدم يشارك الرابط في الواتساب → الناس يفتحونه بنفس الحسبة
- Native Web Share API + clipboard fallback

### 📱 Mobile-First
- **Bottom Tab Bar** على الموبايل — Home / Ex-Price / Dividend / Avg Cost
- **Desktop Top Nav** — gradient pill للنشط
- **Sticky Header** مع backdrop blur
- **Safe-area-inset** للـ iPhone notch + home indicator
- **Haptic Feedback** على الضغط (vibrate API)

### 🌐 PWA
- **Installable** على الموبايل (Add to Home Screen)
- **manifest.json** كامل مع icons (inline SVG، بدون ملفات)
- **theme-color** متغيّر حسب الـ mode

### 📊 Analytics & SEO
- **Microsoft Clarity** (`why6ym61oy`) — heatmaps + session recordings + AI insights
- **Vercel Analytics + Speed Insights** — visitors + Core Web Vitals
- **Open Graph + Twitter Cards** — معاينة احترافيّة في الواتساب
- **JSON-LD Schema** — `WebApplication` للـ SEO الذكيّ
- **Bilingual SEO** — meta description بالعربيّ والإنجليزيّ

### ✨ Micro-interactions
- **Framer Motion** كلّ شي — fade-in-up، stagger، spring drawer، scale-up reveal
- **Hover Effects** — translate Y، gradient shifts، glow shadows
- **Button Press** — scale(.97) للـ tactile feedback
- **Reduced Motion** — يحترم `prefers-reduced-motion`

### 🌍 Trust Signals
- **About Section** — اسم المطوّر + bio
- **Telegram + YouTube** links
- **Last Updated Badge** + version
- **Disclaimer** واضح في الفوتر
- **Show Formula** لكلّ نتيجة — شفافيّة كاملة

---

## 🏗 البنية التقنيّة

```
Kuwait Bourse Calculator V2/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── assets/
│   │   └── logo.png           # Original brand logo (preserved)
│   ├── components/
│   │   ├── calculators/       # 3 calculator screens
│   │   │   ├── ExPriceCalculator.tsx
│   │   │   ├── DividendCalculator.tsx
│   │   │   └── AverageCostCalculator.tsx
│   │   ├── home/
│   │   │   └── HomePage.tsx   # Hero + Bento + Examples + FAQ + About
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNav.tsx  # Desktop nav + Mobile tabs
│   │   │   └── Footer.tsx
│   │   ├── shared/
│   │   │   ├── SmartInput.tsx       # Input with help tooltip + unit
│   │   │   ├── ResultCard.tsx       # Animated reveal with formula
│   │   │   ├── CountUpNumber.tsx    # Animated count-up with easeOut
│   │   │   ├── PriceRangeChart.tsx  # 107-step histogram (recharts)
│   │   │   └── HistoryDrawer.tsx    # Side drawer with localStorage
│   │   └── ui/
│   │       └── Logo.tsx
│   ├── lib/
│   │   ├── translations.ts    # Centralized i18n (AR + EN)
│   │   ├── calculators.ts     # Pure math (no React)
│   │   ├── storage.ts         # localStorage history + theme/lang
│   │   ├── url-state.ts       # Shareable link encoder/decoder
│   │   └── utils.ts           # cn() + relative time + share + haptic
│   ├── App.tsx                # Root + state management
│   ├── main.tsx               # ReactDOM bootstrap
│   ├── index.css              # Design tokens + base styles + components
│   └── vite-env.d.ts
├── index.html                 # SEO + OG + JSON-LD + Clarity + PWA
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 البدء السريع

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل تطوير
npm run dev          # http://localhost:5173

# 3. بناء للإنتاج
npm run build

# 4. معاينة بناء الإنتاج
npm run preview
```

---

## 🧪 الـ Stack

| التصنيف | التقنية |
|---|---|
| **Framework** | React 18 + Vite 6 |
| **Language** | TypeScript 5.5 |
| **Styling** | Tailwind CSS 3.4 + CSS Variables (Design Tokens) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion 11 |
| **Charts** | Recharts 2.15 |
| **Notifications** | Sonner |
| **Analytics** | Vercel Analytics + Speed Insights + Microsoft Clarity |
| **Hosting** | Vercel |

---

## 🎨 Design Tokens

كلّ القيم البصريّة موحّدة في `src/index.css`:

```css
:root {
  --brand-primary: #0A84FF;    /* Apple Blue */
  --brand-accent: #FFB703;     /* Kuwait Gold */
  --brand-success: #22C55E;
  --brand-danger: #EF4444;
  /* ... */
}

html.dark { /* dark mode overrides */ }
```

---

## 🌐 i18n

كلّ النصوص في `src/lib/translations.ts` بشكل مركزيّ:

```typescript
import { useT } from './lib/translations';
const t = useT(language); // language: 'ar' | 'en'
```

لإضافة نصّ جديد، عدّل في القاموس فقط — يظهر تلقائيّاً في كلّ مكان يستخدمه.

---

## 🧮 Calculator Math

كلّ الحسابات في `src/lib/calculators.ts` — pure functions، بدون React. سهلة الاختبار والتحديث.

```typescript
import { calcExPrice } from './lib/calculators';
const result = calcExPrice({
  closingPrice: 0.620,
  bonusPercent: 5,
});
// → { adjustedPrice: 0.590, priceRange: [...], formula: '...' }
```

---

## 🔗 Shareable URLs

```
https://kb-almarhoun.vercel.app/?type=ex-price&cp=0.620&b=5
```

يفتح الموقع → ينتقل لحاسبة Ex-Price → يعبّئ المدخلات → يحسب تلقائيّاً.

---

## 👤 المطوّر

**Mohammad AlMarhoun**
- 📱 Telegram: [@Eng_AlMarhoun](https://t.me/Eng_AlMarhoun)
- ▶️ YouTube: [@mohammadalmarhoun](https://youtube.com/@mohammadalmarhoun)

---

## 📜 ترخيص

مجّانيّ بالكامل · بدون إعلانات · صنع في الكويت 🇰🇼

⚠️ **تنبيه:** هذه الحاسبات لأغراض تعليميّة. استشر مستشاراً ماليّاً قبل أيّ قرار استثماريّ.
