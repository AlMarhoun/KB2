# Kuwait Bourse Calculator — Feature Reference
# حاسبة بورصة الكويت — مرجع الميزات

> **Version / الإصدار:** V2  
> **Last updated / آخر تحديث:** May 2026  
> **Repo / الريبو:** `github.com/AlMarhoun/KB`  
> **Live / الموقع:** `kb-almarhoun.vercel.app`

---

## Table of Contents / الفهرس

1. [Calculators / الحاسبات](#calculators)
2. [Unit System / نظام الوحدات](#unit-system)
3. [Results & Output / النتائج والمخرجات](#results--output)
4. [History / السجل](#history)
5. [Share & Copy / المشاركة والنسخ](#share--copy)
6. [Home Page / الصفحة الرئيسية](#home-page)
7. [UX & Design / التجربة والتصميم](#ux--design)
8. [Technical Decisions / القرارات التقنية](#technical-decisions)
9. [Security / الأمان](#security)
10. [Coming Soon / قريباً](#coming-soon)

---

## Calculators

### 1. Ex-Price Calculator / حاسبة سعر التفسيخ

**What it does / ماذا تفعل:**  
Calculates the adjusted opening price after a corporate action on Kuwait Bourse.  
تحسب السعر المعدّل للافتتاح بعد الحدث الرأسمالي في بورصة الكويت.

**Adjustment types / أنواع التفسيخ:**

| Type (EN) | النوع (AR) | Inputs required |
|-----------|-----------|-----------------|
| Bonus shares | تفسيخ منحة | Closing price, Bonus % |
| Capital increase (subscription) | تفسيخ زيادة رأس المال | Closing price, CI %, Subscription price |
| Capital reduction | تفسيخ تخفيض رأس المال | Closing price, CR % |
| All combined | جميع الأنواع معاً | All fields |

**Formula / الصيغة:**
```
Adjusted Price = (CP + CI × SP) / (1 + B + CI - CR)
```
- CP = Closing Price / سعر الإغلاق
- B  = Bonus % / نسبة المنحة
- CI = Capital Increase % / نسبة زيادة رأس المال
- CR = Capital Reduction % / نسبة تخفيض رأس المال
- SP = Subscription Price / سعر الاكتتاب

**Price Range Table / جدول نطاق الأسعار:**  
- 11 rows of "what-if" scenarios (closing price ± 5 fils, step = 1 fils)  
- المستخدم يشوف 11 سيناريو: ماذا لو أغلق السهم عند سعر مختلف بفرق فلس واحد
- Center row (actual closing) is highlighted in gold  
- الصف الأوسط (إغلاقه الحقيقي) مميّز باللون الذهبي

---

### 2. Dividend Calculator / حاسبة التوزيعات

**What it does / ماذا تفعل:**  
Calculates total cash received and bonus shares from a dividend announcement.  
تحسب إجمالي النقد المستحق وعدد أسهم المنحة من إعلان التوزيعات.

**Inputs / المدخلات:**
- Shares owned / عدد الأسهم المملوكة
- Cash dividend per share (fils or dinar toggle) / التوزيع النقدي لكل سهم (فلس أو دينار)
- Bonus share % / نسبة أسهم المنحة

**Outputs / المخرجات:**

| Output | Always in |
|--------|-----------|
| Total cash / إجمالي النقد | **KD (dinar) — always / دايماً دينار** |
| Bonus shares / أسهم المنحة | Count / عدد الأسهم |
| Final position / المركز النهائي | Total shares / إجمالي الأسهم |

> **Design decision / قرار تصميمي:** Input unit (fils/dinar) controls how you *enter* the per-share dividend. The total cash output is always in KD because large sums in fils produce unwieldy numbers (e.g. 12,000,000 fils instead of 12,000 KD).  
> وحدة الإدخال تتحكم في كيفية إدخال التوزيع لكل سهم فقط. النتيجة الإجمالية دايماً دينار لأن المبالغ الكبيرة بالفلس تعطي أرقام غير عملية.

**Formula / الصيغة:**
```
Total Cash KD  = (Shares × Fils per share) / 1000
Bonus Shares   = floor(Shares × Bonus%)
Final Position = Shares + Bonus Shares
```

---

### 3. Average Cost Calculator / حاسبة متوسط التكلفة

**What it does / ماذا تفعل:**  
Calculates the new weighted average price after an additional stock purchase.  
تحسب متوسط السعر الجديد بعد شراء إضافي.

**Inputs / المدخلات:**
- Current quantity + current average price / الكمية الحالية + السعر المتوسط الحالي
- New quantity + new purchase price / الكمية الجديدة + سعر الشراء الجديد

**Outputs / المخرجات:**

| Output | Unit |
|--------|------|
| New average price / متوسط السعر الجديد | Follows input unit toggle |
| Total shares / إجمالي الأسهم | Count |
| Total cost / إجمالي التكلفة | **Always KD / دايماً دينار** |
| Average change / التغيير في المتوسط | % (+ red if worse, green if better) |

> **Design decision / قرار تصميمي:** Total cost is always in KD regardless of unit toggle — same reasoning as dividends.  
> إجمالي التكلفة دايماً دينار — نفس سبب التوزيعات.

**Formula / الصيغة:**
```
New Average = ((Q1 × P1) + (Q2 × P2)) / (Q1 + Q2)
```

---

## Unit System

**Two modes / وضعان:**

| Mode | How to enter prices | Example |
|------|---------------------|---------|
| **Fils** (default) | Integer fils | 620 = 0.620 KD |
| **Dinar** | Decimal KD | 0.620 = 620 fils |

**Key behaviors / سلوكيات مهمة:**
- Global toggle — changing it converts all price fields live without losing the value  
  التبديل عالمي — تغيير الوحدة يحوّل قيم الحقول تلقائياً بدون فقدان البيانات
- Preference persisted in localStorage  
  التفضيل محفوظ في localStorage
- Synced across all calculators via custom event broadcast  
  متزامن بين كل الحاسبات عبر custom event
- Share links encode the unit (`u=fils` or `u=dinar`) so the recipient sees the same context  
  روابط المشاركة تحفظ الوحدة عشان المستقبل يشوف نفس السياق
- `1 KD = 1000 fils` — all internal math runs in KD  
  كل العمليات الداخلية تتم بالدينار

---

## Results & Output

**Count-up animation / أنيميشن الأرقام:**  
Main result animates from 0 to the computed value on every calculation.  
الرقم الرئيسي يعدّ من 0 للقيمة المحسوبة في كل حساب.

**Result card features / ميزات بطاقة النتيجة:**
- Main result (large, gold gradient)
- Secondary stats grid (bonus shares, final position, total cost, etc.)
- Formula disclosure — expandable, shows the actual equation used  
  إفصاح الصيغة — قابل للطي، يعرض المعادلة الفعلية المستخدمة
- Copy button — formatted multi-line text with all inputs + result  
  زر النسخ — نص منسّق متعدد الأسطر يحتوي على كل المدخلات والنتيجة
- Share button — native share on mobile, clipboard fallback on desktop  
  زر المشاركة — مشاركة أصلية على الموبايل، نسخ للرابط على الديسك توب
- Reset button — clears all fields  
  زر المسح — يمسح كل الحقول

**Glow animation / تأثير التوهج:**  
Radial glow pulse beneath the main number plays once on every new result.  
توهج شعاعي تحت الرقم الرئيسي يشتغل مرة واحدة عند كل نتيجة جديدة.

---

## History

**What's saved / ما يُحفظ:**  
Every calculation that hits the "Calculate" button is automatically saved.  
كل حساب يضغط فيه المستخدم "احسب" يُحفظ تلقائياً.

**Storage / التخزين:**
- localStorage — device only, nothing leaves the browser  
  localStorage فقط — لا يخرج شيء من المتصفح
- Max 50 entries (oldest dropped when full)  
  أقصى 50 مدخل (الأقدم يُحذف تلقائياً عند الامتلاء)

**History drawer features / ميزات درج السجل:**
- Opens from header icon / يفتح من أيقونة في الهيدر
- Relative timestamps ("just now", "5 mins ago") bilingual  
  توقيت نسبي ("الآن"، "قبل 5 دقائق") ثنائي اللغة
- Restore — click any entry to reload its inputs into the calculator  
  الاسترجاع — اضغط على أي مدخل لإعادة تحميل مدخلاته في الحاسبة
- Delete individual entry / حذف مدخل واحد
- Clear all / مسح الكل
- RTL/LTR slide animation — drawer slides from the correct side for the language  
  أنيميشن السحب من الاتجاه الصح حسب اللغة

**Data structure / هيكل البيانات:**
```typescript
{
  id:            string   // type-timestamp-random
  type:          'ex-price' | 'dividend' | 'average-cost'
  inputs:        Record<string, number | string>
  resultPreview: string  // short human-readable summary
  timestamp:     number  // unix ms
}
```

---

## Share & Copy

**Shareable URL / رابط قابل للمشاركة:**  
State is encoded directly in URL query params. Pasting the link opens the exact same calculation.  
الحالة مشفّرة في URL params. لصق الرابط يفتح نفس الحساب بنفس الأرقام.

```
https://kb-almarhoun.vercel.app/?type=dividend&shares=100%2C000&cash=12&b=8&u=fils
```

**Security on URL decode / الأمان عند فك التشفير:**
- Only whitelisted keys are decoded per calculator type  
  فقط الـ keys المعروفة لكل حاسبة تُقبل
- Values over 30 characters are silently dropped  
  القيم التي تتجاوز 30 حرفاً تُتجاهل
- Unknown keys are ignored entirely  
  الـ keys غير المعروفة تُتجاهل كلياً

**Copy text format / شكل نص النسخ (مثال — توزيعات):**
```
حساب التوزيعات:

عدد الأسهم: 100,000 سهم
التوزيع لكلّ سهم: 12 فلس
نسبة المنحة: 8%

إجمالي النقد: 1.200 د.ك
أسهم المنحة: +8,000 سهم
المركز النهائي: 108,000 سهم

تم النسخ من موقع https://kb-almarhoun.vercel.app/
```

---

## Home Page

**Sections (top to bottom) / الأقسام من الأعلى للأسفل:**

### Hero
- Eyebrow badge / شارة العنوان الفرعي
- Main headline + animated gradient subtitle  
  العنوان الرئيسي + عنوان فرعي بتدرج لوني متحرك
- Two CTAs: "Start Now" → ex-price, "Tools Overview" → scroll  
  زران: "ابدأ الآن" → التفسيخ، "شرح الأدوات" → تمرير للأسفل
- Stats row: 3 tools · +20,000 uses · 0 KD free  
  صف إحصائيات: 3 أدوات · +20,000 استخدام · الأساسيات مجانية

### Tools Bento / بطاقات الأدوات
- 3 clickable cards — each navigates directly to its calculator  
  3 بطاقات قابلة للنقر — كل واحدة تنقل للحاسبة مباشرة
- Each card shows: icon, name, tagline, 3 feature bullets, "Try Now" CTA  
  كل بطاقة تعرض: أيقونة، اسم، وصف، 3 ميزات، زر "جرّبها الآن"
- Hover: subtle lift animation  
  عند التحويم: أنيميشن رفع خفيف

### Portfolio Teaser / إعلان المحفظة القادمة
- Coming-soon card for the Smart Portfolio feature (subscriber)  
  بطاقة "قريباً" لميزة المحفظة الذكية (للمشتركين)
- CTA button is disabled with lock icon  
  زر الـ CTA معطّل مع أيقونة قفل
- Creates anticipation without committing to scope or timeline  
  يبني ترقّب بدون الالتزام بنطاق أو موعد محدد

### Live Examples / الأمثلة السريعة
- 3 clickable examples — one per calculator  
  3 أمثلة قابلة للنقر — واحد لكل حاسبة
- **Unit-aware:** examples display in the currently selected unit (fils or dinar)  
  **متوافقة مع الوحدة:** الأمثلة تعرض بالوحدة المختارة حالياً
- Clicking loads the inputs and auto-calculates  
  الضغط يحمّل المدخلات ويحسب تلقائياً
- Stored in canonical KD internally, converted for display  
  محفوظة داخلياً بالدينار الكويتي، تُحوّل للعرض

### FAQ / الأسئلة الشائعة
- 5 collapsible questions, written in Kuwaiti dialect  
  5 أسئلة قابلة للطي، مكتوبة باللهجة الكويتية
- Covers: when to use each calculator, decision-making, key concepts  
  تغطي: متى تستخدم كل حاسبة، اتخاذ القرار، المفاهيم الأساسية

### About / عن المطوّر
- Developer story + "why this was built"  
  قصة المطوّر + "ليش بنيت هذا"
- Links: Telegram + YouTube  
  روابط: تيليجرام + يوتيوب
- Legal disclaimer in footer  
  إخلاء مسؤولية قانوني في الفوتر

---

## UX & Design

### Bilingual (Arabic + English) / ثنائي اللغة
- Arabic is the primary language  
  العربية هي اللغة الأساسية
- Full RTL support — layout, animations, drawer slide direction all flip correctly  
  دعم كامل للـ RTL — التخطيط، الأنيميشن، واتجاه سحب الدرج كلها تنقلب صح
- Language preference persisted in localStorage  
  تفضيل اللغة محفوظ في localStorage
- `<html lang>` and `<html dir>` updated dynamically  
  `lang` و `dir` يتحدّثان تلقائياً في عنصر `html`

### Dark / Light Mode / الوضع المظلم / الفاتح
- Dark mode is the default (matches Kuwait Bourse trading environment)  
  الوضع المظلم هو الافتراضي
- System preference is respected on first visit  
  تفضيل النظام يُحترم عند الزيارة الأولى
- Both classes (`dark` and `light`) toggled on `<html>` for CSS custom property activation  
  كلا الـ classes تُطبَّق على `html` لتفعيل CSS variables الصحيحة
- All colors use CSS custom properties (not hardcoded Tailwind) so both modes are fully consistent  
  كل الألوان تستخدم CSS variables (مش Tailwind الثابت) عشان الوضعين متسقان

### Mobile-first / الهاتف أولاً
- Designed for mobile screens first, scales up to desktop  
  مصمم للهاتف أولاً، ثم يتسع للديسك توب
- Bottom navigation bar on mobile  
  شريط التنقل السفلي على الهاتف
- Haptic feedback on calculate / copy / reset (mobile only, silent on desktop)  
  ردود فعل اهتزازية عند الحساب والنسخ والمسح (هاتف فقط، صامتة على الديسك توب)
- `inputMode="decimal"` on all price inputs (triggers numeric keyboard on iOS/Android)  
  `inputMode="decimal"` على كل حقول الأسعار (يفتح لوحة الأرقام على iOS/Android)

### Animations / الحركات
- Framer Motion for all page transitions, card reveals, and result cards  
  Framer Motion لكل انتقالات الصفحة وظهور البطاقات وبطاقات النتائج
- `whileInView` — sections animate in as the user scrolls  
  `whileInView` — الأقسام تظهر عند التمرير إليها
- Count-up number animation on every result  
  أنيميشن عد تصاعدي على كل نتيجة
- Glow pulse once per calculation  
  نبضة توهج مرة واحدة لكل حساب

### Inputs / حقول الإدخال
- Live thousands-separator formatting (1000 → 1,000) while typing, cursor-safe  
  تنسيق الفواصل الألفية أثناء الكتابة بدون إزاحة المؤشر
- Help tooltips (💡) on every field with practical examples  
  تلميحات مساعدة (💡) على كل حقل مع أمثلة عملية
- `autoComplete="off"` — prevents browser autofill from polluting financial fields  
  يمنع الإكمال التلقائي للمتصفح من تعبئة حقول مالية بقيم خاطئة

### Notifications / الإشعارات
- Sonner toast library — "Copied ✓" on copy, error message on clipboard failure  
  مكتبة Sonner للإشعارات — "تمّ النسخ ✓" عند النسخ، رسالة خطأ عند الفشل

---

## Technical Decisions

### Math in canonical KD / العمليات بالدينار الكويتي
All internal math runs in KD (3 decimal places). Fils conversion happens only at display and input parsing. This avoids floating-point integer pitfalls.  
كل العمليات الداخلية تتم بالدينار (3 خانات عشرية). التحويل للفلس يحدث فقط عند العرض وتحليل الإدخال.

### No backend / بدون خادم
Zero server infrastructure. No database, no API, no user accounts.  
لا بنية تحتية، لا قاعدة بيانات، لا API، لا حسابات مستخدمين.

- All data in localStorage (device only)  
  كل البيانات في localStorage (الجهاز فقط)
- Privacy-first by design  
  الخصوصية أولاً بحكم التصميم
- Works offline after first load  
  يعمل بدون إنترنت بعد التحميل الأول

### Pure calculator functions / دوال حاسبة نقية
`src/lib/calculators.ts` contains all math — no React, no side effects. Easy to test and verify independently.  
كل العمليات الحسابية في ملف واحد بدون React أو آثار جانبية. سهل الاختبار والتحقق منه بشكل مستقل.

### URL State encoding / تشفير الحالة في الـ URL
Calculator state encodes into URL params on every calculation. Share the URL → recipient gets the exact same inputs and result. Enabled by `URLSearchParams` (no custom encoding).  
حالة الحاسبة تُشفَّر في URL params عند كل حساب. مشاركة الرابط = المستقبل يحصل على نفس المدخلات والنتيجة.

### Analytics / التحليلات
- Vercel Analytics — page views and navigation (zero config)  
  Vercel Analytics — مشاهدات الصفحة والتنقل (بدون إعداد)
- Vercel Speed Insights — Core Web Vitals (LCP, CLS, FID)  
  Vercel Speed Insights — مقاييس الأداء الأساسية

---

## Security

| Issue | Status | How it's handled |
|-------|--------|------------------|
| URL param injection (unknown keys) | ✅ Fixed | Whitelist per calc type — unknown keys dropped |
| URL param injection (oversized values) | ✅ Fixed | Max 30 chars per value — longer values dropped |
| localStorage JSON corruption | ✅ Fixed | `Array.isArray()` guard on every read |
| localStorage errors (private mode) | ✅ Fixed | try/catch on save, delete, and clear |
| XSS via React | ✅ Safe | React escapes all rendered values by default |
| Sensitive data in localStorage | ✅ Safe | Only stores financial input numbers and results |
| External calls | ✅ Safe | Vercel Analytics only — no API keys, no user data sent |
| Clipboard write | ✅ Safe | We write TO clipboard only (no read) |
| Native share API | ✅ Safe | Browser controls the share sheet entirely |

---

## Coming Soon

### Smart Portfolio / المحفظة الذكية
**Subscriber feature (planned) / ميزة مشتركين (مخططة)**

| Feature | الميزة |
|---------|--------|
| Add / edit / delete holdings | إضافة وتعديل وحذف الأسهم المملوكة |
| P&L calculation per holding | احتساب الربح والخسارة لكل سهم |
| Total portfolio value | القيمة الإجمالية للمحفظة |
| Simulate "what if I sell?" | محاكاة "ماذا لو بعت؟" |
| Integrate with dividend calculator | ربط مع حاسبة التوزيعات |

### Potential Phase 2 / مرحلة 2 المحتملة
- Payment via Tap Payments (GCC-native) / الدفع عبر Tap Payments
- Supabase backend for cloud sync / Supabase للمزامنة السحابية
- Push notifications for dividend season / إشعارات موسم التوزيعات
- Stock watchlist / قائمة متابعة الأسهم
- Price alerts / تنبيهات الأسعار

---

## What We Deliberately Did NOT Build
## ما قررنا عدم بناؤه بشكل مقصود

| Decision | Reason |
|----------|--------|
| No Radix UI / Shadcn | Full RTL control, zero bloat |
| No React Router | Single-page app, state-based navigation is cleaner |
| No Redux / Zustand | Component state is sufficient for current scope |
| No real-time prices | Would require paid API + backend; out of scope for V2 |
| No auth (yet) | Privacy-first; localStorage covers guest needs completely |
| No i18n library | Custom `translations.ts` is 100 lines — simpler than adding a dependency |

---

*This document reflects the codebase as of the last audit session.*  
*هذا المستند يعكس الكود كما هو في جلسة المراجعة الأخيرة.*
