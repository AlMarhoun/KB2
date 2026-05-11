/**
 * Centralized i18n strings for KB v2.
 * All UI text lives here — Arabic primary, English secondary.
 */

export type Lang = 'ar' | 'en';

export const T = {
  ar: {
    // Brand
    brand: 'حاسبة بورصة الكويت',
    brandShort: 'KB',
    tagline: 'بدقّة. بدون تعقيد.',

    // Navigation
    nav: {
      home: 'الرئيسيّة',
      exPrice: 'التفسيخ',
      dividend: 'التوزيعات',
      averageCost: 'متوسّط التكلفة',
      history: 'السجلّ',
      about: 'عن الموقع',
    },

    // Common
    common: {
      calculate: 'احسب',
      reset: 'مسح',
      copy: 'نسخ',
      copied: 'تمّ النسخ ✓',
      share: 'مشاركة',
      tryNow: 'جرّبها الآن',
      learnMore: 'اعرف أكثر',
      kd: 'د.ك',
      fils: 'فلس',
      shares: 'سهم',
      percent: '%',
      result: 'النتيجة',
      formula: 'الصيغة الحسابيّة',
      showFormula: 'شو الصيغة؟',
      enterDataFirst: 'أدخل البيانات واضغط احسب',
    },

    // Hero
    hero: {
      eyebrow: '🇰🇼 الأداة الأولى لمتداولي بورصة الكويت',
      title1: 'حاسبات بورصة الكويت',
      title2: 'بدقّة. بدون تعقيد.',
      subtitle: 'الحاسبات الأساسية مجانية بالكامل · مزايا إضافية للمشتركين',
      ctaPrimary: '⚡ ابدأ الآن',
      ctaSecondary: '📖 شرح الأدوات',
      stat1: '3',
      stat1Sub: 'أدوات احترافيّة',
      stat2: '+20,000',
      stat2Sub: 'استخدام من متداولي بورصة الكويت',
      stat3: '0 KD',
      stat3Sub: 'الأساسيّات مجّانيّة',
    },

    // Tool Cards (Bento)
    tools: {
      title: 'الأدوات',
      subtitle: 'كلّ أداة مصمّمة لحلّ مشكلة محدّدة. اضغط لتجرّب.',
      exPrice: {
        name: 'حاسبة التفسيخ',
        tagline: 'احسب السعر المعدّل بعد المنحة وتغيّرات رأس المال',
        feature1: '١٠٧ خطوة سعريّة',
        feature2: 'منحة + رأس مال + اكتتاب',
        feature3: 'رسم بيانيّ تفاعليّ',
      },
      dividend: {
        name: 'حاسبة التوزيعات',
        tagline: 'احسب توزيعك النقديّ + أسهم المنحة',
        feature1: 'نقد + أسهم منحة',
        feature2: 'مركز ما بعد التوزيع',
        feature3: 'بالفلس والدينار',
      },
      averageCost: {
        name: 'حاسبة متوسّط التكلفة',
        tagline: 'احسب متوسّطك الجديد بعد شراء إضافيّ',
        feature1: 'متوسّط معدّل دقيق',
        feature2: 'مقارنة قبل/بعد',
        feature3: 'نقطة التعادل',
      },
    },

    // Live Examples
    examples: {
      title: 'أمثلة سريعة',
      subtitle: 'حسابات شائعة لتجرّبها فوراً',
      try: 'جرّبها الآن',
    },

    // FAQ — practical, user-focused, written in Kuwaiti dialect
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        {
          q: 'متى أحتاج أستخدم حاسبة التفسيخ؟',
          a: 'إذا الشركة أعلنت منحة، أو اكتتاب (زيادة رأس المال)، أو تخفيض رأس المال. الحاسبة تعطيك السعر الجديد المتوقّع بعد الحدث، ونطاقاً كاملاً من الأسعار المحتملة.',
        },
        {
          q: 'شلون أعرف إذا قراري بالشراء راح ينزل متوسطي أو يرفعه؟',
          a: 'حطّ بياناتك في حاسبة متوسّط التكلفة، وراح تعرف مباشرة متوسّطك الجديد ونقطة التعادل قبل ما تشتري.',
        },
        {
          q: 'شنو الفرق بين التوزيعات النقديّة والمنحة؟',
          a: 'النقديّة: فلوس تدخل حسابك مباشرة. المنحة: زيادة في عدد أسهمك. حاسبة التوزيعات تجمع الاثنين وتعطيك الصورة الكاملة.',
        },
        {
          q: 'ليش لازم أفهم تأثير التفسيخ؟',
          a: 'لأنّ السعر الظاهري ينزل بعد الحدث، لكن القيمة الحقيقيّة لاستثمارك ممكن ما تتغيّر. فهم الفرق يحميك من قرارات متسرّعة.',
        },
        {
          q: 'هل أقدر أعتمد على الحاسبات لاتخاذ قرار استثماري؟',
          a: 'الحاسبات تعطيك أرقاماً دقيقة. لكن القرار النهائيّ لازم يكون مبنيّ على فهمك وتحليلك الشخصيّ، مو على الرقم وحده.',
        },
      ],
    },

    // About — full personal story
    about: {
      title: 'عن المطوّر',
      bio: 'مهندس + متداول كويتي.\nمن 2012 وأنا أحاول أفهم هالسوق… وكانت المعلومات صعبة جدًا، متفرّقة، ومكلفة.\n\nدفعت مبالغ على دورات، وجرّبت طرق كثيرة، بس عشان أوصل لصورة واضحة.\n\nمع الوقت، قدرت أجمع وأبسّط هالمفاهيم لنفسي… واليوم حطّيتها كلها بهالموقع عشان أختصر عليكم سنوات من التجربة، ووقت ضايع، وأخطاء ممكن تتكرّر.\n\nالهدف بسيط:\nأوفر لك أداة تساعدك تفهم وضعك بشكل أسرع… وتاخذ قرارك بثقة أكبر.',
      followMe: 'تابعني',
      lastUpdated: 'آخر تحديث',
    },

    // Footer
    footer: {
      copyright: '© 2026 KB · جميع الحقوق محفوظة',
      madeIn: 'صُنع في الكويت 🇰🇼',
      disclaimer: 'هذه الأدوات لأغراض تعليميّة وحسابيّة فقط، ولا تُعدّ توصية بالشراء أو البيع أو الاحتفاظ بأيّ ورقة ماليّة.',
    },

    // Unit toggle
    unit: {
      fils: 'فلس',
      dinar: 'دينار',
      label: 'وحدة الإدخال',
      helpFils: 'أدخل السعر بالفلس (مثال: 520 = 520 فلس)',
      helpDinar: 'أدخل السعر بالدينار (مثال: 0.520 = 520 فلس)',
    },

    // Portfolio teaser
    portfolio: {
      title: 'المحفظة الذكيّة',
      desc: 'تابع أسهمك · احسب أرباحك · جرّب قراراتك',
      cta: 'قريبًا',
      lockHint: 'ميزة قادمة للمشتركين',
    },

    // Beta
    beta: 'Beta',

    // Calculators
    calc: {
      ex: {
        title: 'حاسبة سعر التفسيخ',
        subtitle: 'احسب السعر المعدّل بعد التوزيعات والتغيّرات الرأسماليّة',
        typeLabel: 'نوع التفسيخ',
        typePlaceholder: 'اختر نوع التفسيخ',
        typeBonus: 'تفسيخ منحة',
        typeCI: 'تفسيخ زيادة رأس المال (اكتتاب)',
        typeCR: 'تفسيخ تخفيض رأس المال',
        typeAll: 'جميع الأنواع',
        closingPrice: 'سعر الإغلاق',
        bonus: 'نسبة المنحة',
        ci: 'نسبة زيادة رأس المال',
        cr: 'نسبة تخفيض رأس المال',
        sp: 'سعر الاكتتاب',
        adjustedPrice: 'السعر المعدّل',
        priceRange: 'نطاق الأسعار المحتملة (١٠٧ خطوة)',
        helpCP: 'سعر إغلاق السهم قبل التوزيعات',
        helpB: 'نسبة أسهم المنحة بالمئة (مثلاً: 5 لـ 5%)',
        helpCI: 'نسبة زيادة رأس المال بالمئة',
        helpCR: 'نسبة تخفيض رأس المال (قيمة موجبة)',
        helpSP: 'سعر الاكتتاب للسهم الجديد',
      },
      div: {
        title: 'حاسبة التوزيعات',
        subtitle: 'احسب توزيعك النقديّ وأسهم المنحة المستحقّة',
        sharesOwned: 'عدد الأسهم المملوكة',
        cashDiv: 'التوزيع النقديّ لكلّ سهم (فلس)',
        bonus: 'نسبة أسهم المنحة',
        totalCash: 'إجمالي النقد',
        bonusShares: 'أسهم المنحة',
        finalPosition: 'المركز النهائيّ',
        helpShares: 'عدد الأسهم اللي تملكها قبل التوزيع',
        helpCash: 'التوزيع النقديّ المُعلَن لكلّ سهم بالفلس',
        helpBonus: 'نسبة أسهم المنحة (مثلاً: 5 لـ 5%)',
      },
      avg: {
        title: 'حاسبة متوسّط التكلفة',
        subtitle: 'احسب متوسّط سعرك الجديد بعد شراء إضافيّ',
        currentQty: 'الكميّة الحاليّة',
        currentPrice: 'السعر الحاليّ المتوسّط',
        newQty: 'الكميّة المراد شراؤها',
        newPrice: 'سعر الشراء الجديد',
        newAverage: 'متوسّط السعر الجديد',
        totalShares: 'إجمالي الأسهم',
        totalCost: 'إجمالي التكلفة',
        priceChange: 'التغيير في المتوسّط',
        helpQty: 'الكميّة اللي تملكها حاليّاً من السهم',
        helpPrice: 'متوسّط سعر شرائك الحاليّ',
        helpNewQty: 'الكميّة الإضافيّة اللي تخطّط لشرائها',
        helpNewPrice: 'سعر السهم اللي ستشتري به الآن',
      },
    },

    // History
    history: {
      title: 'سجلّ الحسابات',
      empty: 'ما فيه حسابات سابقة. ابدأ احسب وراح تظهر هنا.',
      clear: 'مسح السجلّ',
      restore: 'استعادة',
      delete: 'حذف',
      ago: 'قبل',
      now: 'الآن',
      minute: 'دقيقة',
      minutes: 'دقائق',
      hour: 'ساعة',
      hours: 'ساعات',
      day: 'يوم',
      days: 'أيّام',
    },
  },

  en: {
    brand: 'Kuwait Bourse Calculator',
    brandShort: 'KB',
    tagline: 'Precise. Effortless.',

    nav: {
      home: 'Home',
      exPrice: 'Ex-Price',
      dividend: 'Dividend',
      averageCost: 'Avg Cost',
      history: 'History',
      about: 'About',
    },

    common: {
      calculate: 'Calculate',
      reset: 'Reset',
      copy: 'Copy',
      copied: 'Copied ✓',
      share: 'Share',
      tryNow: 'Try Now',
      learnMore: 'Learn More',
      kd: 'KD',
      fils: 'fils',
      shares: 'shares',
      percent: '%',
      result: 'Result',
      formula: 'Formula',
      showFormula: 'Show formula',
      enterDataFirst: 'Enter data and click calculate',
    },

    hero: {
      eyebrow: '🇰🇼 The #1 tool for Kuwait Stock Exchange traders',
      title1: 'Kuwait Bourse Calculators',
      title2: 'Precise. Effortless.',
      subtitle: 'Core calculators are 100% free · Extra features for subscribers',
      ctaPrimary: '⚡ Start Now',
      ctaSecondary: '📖 Tools Overview',
      stat1: '3',
      stat1Sub: 'Professional tools',
      stat2: '+20,000',
      stat2Sub: 'uses by Kuwait Bourse traders',
      stat3: '0 KD',
      stat3Sub: 'Core stays free',
    },

    tools: {
      title: 'Tools',
      subtitle: 'Each tool built to solve a specific problem. Click to try.',
      exPrice: {
        name: 'Ex-Price Calculator',
        tagline: 'Calculate adjusted price after bonus and capital changes',
        feature1: '107-step price range',
        feature2: 'Bonus + Capital + Subscription',
        feature3: 'Interactive chart',
      },
      dividend: {
        name: 'Dividend Calculator',
        tagline: 'Calculate cash dividend + bonus shares',
        feature1: 'Cash + Bonus shares',
        feature2: 'Post-distribution position',
        feature3: 'Fils & Dinar precision',
      },
      averageCost: {
        name: 'Average Cost Calculator',
        tagline: 'Calculate new average after additional purchase',
        feature1: 'Accurate weighted average',
        feature2: 'Before/after comparison',
        feature3: 'Break-even point',
      },
    },

    examples: {
      title: 'Quick Examples',
      subtitle: 'Common calculations to try right now',
      try: 'Try this',
    },

    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'When do I need the Ex-Price Calculator?',
          a: 'When the company announces a bonus, subscription (capital increase), or capital reduction. The calculator gives you the expected new price after the event, plus the full range of possible prices.',
        },
        {
          q: 'How do I know if my purchase will lower or raise my average?',
          a: 'Plug your data into the Average Cost Calculator and you\'ll instantly see your new average and break-even point — before you buy.',
        },
        {
          q: 'What\'s the difference between cash dividends and bonus shares?',
          a: 'Cash: money goes straight to your account. Bonus: more shares get added. The dividend calculator combines both and gives you the full picture.',
        },
        {
          q: 'Why is understanding ex-events important?',
          a: 'Because the displayed price drops after the event, but the real value of your holding may not change. Understanding the difference protects you from rushed decisions.',
        },
        {
          q: 'Can I rely on these calculators to make an investment decision?',
          a: 'The calculators give you precise numbers. But the final decision must be based on your own analysis and judgment — not the number alone.',
        },
      ],
    },

    about: {
      title: 'About the Developer',
      bio: 'Engineer + Kuwaiti trader.\nSince 2012 I\'ve been trying to understand this market — and the information was hard, scattered, and expensive.\n\nI paid for courses and tried many approaches just to reach a clear picture.\n\nOver time I managed to gather and simplify these concepts for myself, and today I\'ve put them all in this site to save you years of trial and error, wasted time, and avoidable mistakes.\n\nThe goal is simple:\nGive you a tool that helps you understand your situation faster, and make decisions with more confidence.',
      followMe: 'Follow me',
      lastUpdated: 'Last updated',
    },

    footer: {
      copyright: '© 2026 KB · All rights reserved',
      madeIn: 'Made in Kuwait 🇰🇼',
      disclaimer: 'These tools are for educational and computational purposes only, and do not constitute a recommendation to buy, sell, or hold any security.',
    },

    unit: {
      fils: 'Fils',
      dinar: 'Dinar',
      label: 'Input unit',
      helpFils: 'Enter price in fils (e.g. 520 = 520 fils)',
      helpDinar: 'Enter price in dinar (e.g. 0.520 = 520 fils)',
    },

    portfolio: {
      title: 'Smart Portfolio',
      desc: 'Track your stocks · Calculate your gains · Simulate decisions',
      cta: 'Coming Soon',
      lockHint: 'Subscriber feature coming soon',
    },

    beta: 'Beta',

    calc: {
      ex: {
        title: 'Ex-Price Calculator',
        subtitle: 'Calculate adjusted price after distributions and capital changes',
        typeLabel: 'Adjustment Type',
        typePlaceholder: 'Select adjustment type',
        typeBonus: 'Bonus Ex-Date',
        typeCI: 'Capital Increase (Subscription)',
        typeCR: 'Capital Reduction',
        typeAll: 'All Types Combined',
        closingPrice: 'Closing Price',
        bonus: 'Bonus %',
        ci: 'Capital Increase %',
        cr: 'Capital Reduction %',
        sp: 'Subscription Price',
        adjustedPrice: 'Adjusted Price',
        priceRange: 'Possible Price Range (107 steps)',
        helpCP: 'Closing price before distributions',
        helpB: 'Bonus share % (e.g. 5 for 5%)',
        helpCI: 'Capital increase percentage',
        helpCR: 'Capital reduction percentage (positive value)',
        helpSP: 'Subscription price per new share',
      },
      div: {
        title: 'Dividend Calculator',
        subtitle: 'Calculate cash dividend and bonus shares due',
        sharesOwned: 'Shares Owned',
        cashDiv: 'Cash Dividend per Share (fils)',
        bonus: 'Bonus Share %',
        totalCash: 'Total Cash',
        bonusShares: 'Bonus Shares',
        finalPosition: 'Final Position',
        helpShares: 'Number of shares you own before distribution',
        helpCash: 'Announced cash dividend per share in fils',
        helpBonus: 'Bonus share percentage (e.g. 5 for 5%)',
      },
      avg: {
        title: 'Average Cost Calculator',
        subtitle: 'Calculate your new average price after additional purchase',
        currentQty: 'Current Quantity',
        currentPrice: 'Current Average Price',
        newQty: 'Quantity to Buy',
        newPrice: 'New Purchase Price',
        newAverage: 'New Average Price',
        totalShares: 'Total Shares',
        totalCost: 'Total Cost',
        priceChange: 'Average Change',
        helpQty: 'Quantity you currently own of this stock',
        helpPrice: 'Your current average purchase price',
        helpNewQty: 'Additional quantity you plan to buy',
        helpNewPrice: 'Price at which you will buy now',
      },
    },

    history: {
      title: 'Calculation History',
      empty: 'No previous calculations yet. Start calculating and they\'ll show here.',
      clear: 'Clear history',
      restore: 'Restore',
      delete: 'Delete',
      ago: 'ago',
      now: 'just now',
      minute: 'min',
      minutes: 'mins',
      hour: 'hr',
      hours: 'hrs',
      day: 'day',
      days: 'days',
    },
  },
} as const;

export const useT = (lang: Lang) => T[lang];
