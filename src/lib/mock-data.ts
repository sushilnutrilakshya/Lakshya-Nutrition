import type { Product } from "@/types/product";

// ── Blog thumbnails — editorial Unsplash images ─────────────────
const BLOG_ASSETS = {
  blogScience:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=85&auto=format&fit=crop",
  blogTraining: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&q=85&auto=format&fit=crop",
  blogRecovery: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85&auto=format&fit=crop",
};

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Arjun Sharma",
    role: "Competitive Bodybuilder",
    city: "Mumbai",
    rating: 5,
    text: "Fusion Nutrition's Advance Whey is hands down the cleanest protein I've used. 26g protein, zero bloating, and the Mawa Kulfi flavour is absolutely next level. Gains have been consistent for 6 months straight.",
    avatar: "AS",
    product: "Advance Whey Protein",
  },
  {
    id: "2",
    name: "Priya Nair",
    role: "CrossFit Athlete",
    city: "Bangalore",
    rating: 5,
    text: "Bull Power Pre-Workout is absolutely insane. The focus it gives me during WODs is unlike anything I've tried. No crash, no jitters — just pure sustained energy. I go with the Pinago flavour every time.",
    avatar: "PN",
    product: "Bull Power Pre-Workout",
  },
  {
    id: "3",
    name: "Rohan Mehta",
    role: "Marathon Runner",
    city: "Delhi",
    rating: 5,
    text: "Started using the Recovery EAA+BCAA during my long runs. Recovery is dramatically faster and I'm hitting PRs consistently. The Kimachee flavour is something else — genuinely refreshing mid-run.",
    avatar: "RM",
    product: "Recovery EAA+BCAA+Glutamine",
  },
  {
    id: "4",
    name: "Kavya Reddy",
    role: "Yoga & Strength Coach",
    city: "Hyderabad",
    rating: 5,
    text: "The Essential Multi Vitamin Pro has been a game changer for my energy levels and immunity. I recommend it to every single one of my clients. The ingredient profile is clean and transparent.",
    avatar: "KR",
    product: "Essential Multi Vitamin Pro",
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Powerlifter",
    city: "Chandigarh",
    rating: 5,
    text: "Silent Power Pre-Workout is deceptively strong. The Watermelon flavour is clean and the pump it delivers mid-session is incredible. No anxiety, no crash. This brand knows their stuff.",
    avatar: "VS",
    product: "Silent Power Pre-Workout",
  },
];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "The Science Behind Whey Protein Isolate vs Concentrate",
    slug: "whey-isolate-vs-concentrate",
    excerpt: "Understand the key differences in protein content, digestion speed, and ideal use cases for both forms of whey.",
    category: "Nutrition Science",
    readTime: "5 min",
    date: "2024-12-15",
    imageUrl: BLOG_ASSETS.blogScience,
  },
  {
    id: "2",
    title: "Optimizing Your Pre-Workout Timing for Maximum Performance",
    slug: "pre-workout-timing-guide",
    excerpt: "Timing your pre-workout correctly can mean the difference between a good session and a great one. Here's the science.",
    category: "Training",
    readTime: "4 min",
    date: "2024-12-08",
    imageUrl: BLOG_ASSETS.blogTraining,
  },
  {
    id: "3",
    title: "Post-Workout Nutrition: The Anabolic Window",
    slug: "anabolic-window-explained",
    excerpt: "The post-workout 'anabolic window' is often misunderstood. Here's what the latest research actually says.",
    category: "Recovery",
    readTime: "6 min",
    date: "2024-11-30",
    imageUrl: BLOG_ASSETS.blogRecovery,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  // ── 1. Advance Whey Protein ──────────────────────────────────
  {
    id: "prod_1",
    title: "Advance Whey Protein",
    slug: "advance-whey-protein",
    description:
      "Fusion Nutrition's flagship whey protein — engineered for real, lean muscle building. Delivers 26g of high-quality protein per scoop with 7g BCAAs and 13.5g EAAs. Zero added sugar. Ultra-fast absorption with CaHMB for optimized recovery. Available in two incredible Indian-inspired flavours: Mawa Kulfi and Coffee.",
    shortDescription: "26g Protein • 7g BCAAs • 13.5g EAAs • Zero Added Sugar • 60 Servings",
    images: [
      { id: "img_1a", url: "/images/products/advance-whey-mawa-kulfi.jpg",          alt: "Advance Whey Protein — Mawa Kulfi Flavour 2KG", width: 800, height: 800 },
      { id: "img_1b", url: "/images/products/advance-whey-coffee.jpg",              alt: "Advance Whey Protein — Coffee Flavour 2KG",     width: 800, height: 800 },
      { id: "img_1c", url: "/images/products/advance-whey-coffee-promo.jpg",        alt: "Advance Whey — What You Get In Each Scoop",     width: 800, height: 800 },
      { id: "img_1d", url: "/images/products/advance-whey-mawa-kulfi-lifestyle.jpg",alt: "Advance Whey Protein — Mawa Kulfi Lifestyle",   width: 800, height: 800 },
      { id: "img_1e", url: "/images/products/advance-whey-both.jpg",                alt: "Advance Whey Protein — Both Flavours",          width: 800, height: 800 },
    ],
    variants: [
      { id: "var_1a", title: "2kg — Mawa Kulfi", sku: "FN-AWP-MK-2", price: 8499, compareAtPrice: 10999, inventory: 48, weight: "2kg", flavor: "Mawa Kulfi" },
      { id: "var_1b", title: "2kg — Coffee",     sku: "FN-AWP-CF-2", price: 8499, compareAtPrice: 10999, inventory: 35, weight: "2kg", flavor: "Coffee"     },
    ],
    category: { id: "cat_1", name: "Protein", slug: "protein" },
    tags: ["protein", "whey", "advance", "bestseller", "muscle-building"],
    rating: 4.9,
    reviewCount: 1847,
    isBestseller: true,
    ingredients: [
      "Whey Protein Concentrate",
      "Calcium Beta-Hydroxy-Beta-Methylbutyrate (CaHMB)",
      "Natural Flavours",
      "Sucralose",
      "Sunflower Lecithin",
    ],
    servingSize: "33.3g",
    servingsPerContainer: 60,
    nutritionFacts: {
      "Energy":            "121 kcal",
      "Protein":           "26g",
      "BCAAs":             "7g",
      "EAAs":              "13.5g",
      "Carbohydrates":     "6g",
      "Added Sugar":       "0g",
      "Total Fat":         "2.5g",
    },
  },

  // ── 2. Bull Power Pre-Workout ────────────────────────────────
  {
    id: "prod_2",
    title: "Bull Power Pre-Workout",
    slug: "bull-power-pre-workout",
    description:
      "Unleash unparalleled energy with Bull Power — Fusion Nutrition's high-stimulation pre-workout. Formulated with 36 EAA, 36 BCAA, and 36 Glutamine per serving for shirt-splitting pumps, enhanced focus, and lean muscle strength. The bull doesn't stop — neither should you.",
    shortDescription: "36g EAA • 36g BCAA • 36g Glutamine • Extreme Pump • Magnify Power",
    images: [
      { id: "img_2a", url: "/images/products/bull-power-single.jpg", alt: "Bull Power Pre-Workout — Single Tub Pinago Flavour", width: 800, height: 800 },
      { id: "img_2b", url: "/images/products/bull-power-range.jpg",  alt: "Bull Power Pre-Workout — Full Range 3 Flavours",    width: 800, height: 800 },
    ],
    variants: [
      { id: "var_2a", title: "250g — Pinago",    sku: "FN-BP-PIN-250", price: 8499, compareAtPrice: 10999, inventory: 62, weight: "250g",  flavor: "Pinago"    },
      { id: "var_2b", title: "250g — ColaFruity",sku: "FN-BP-COL-250", price: 8499, compareAtPrice: 10999, inventory: 44, weight: "250g",  flavor: "ColaFruity" },
      { id: "var_2c", title: "375g — Kimachee",  sku: "FN-BP-KIM-375", price: 8499, compareAtPrice: 10999, inventory: 28, weight: "375g",  flavor: "Kimachee"  },
    ],
    category: { id: "cat_2", name: "Pre-Workout", slug: "pre-workout" },
    tags: ["pre-workout", "energy", "pump", "bull-power", "focus"],
    rating: 4.9,
    reviewCount: 1124,
    isNew: true,
    nutritionFacts: {
      "EAA per Serving":      "36g",
      "BCAA per Serving":     "36g",
      "Glutamine per Serving":"36g",
      "Net Weight":           "250g / 375g",
      "Servings":             "30",
    },
  },

  // ── 3. Recovery EAA+BCAA+Glutamine ──────────────────────────
  {
    id: "prod_3",
    title: "Recovery EAA+BCAA+Glutamine",
    slug: "recovery-eaa-bcaa-glutamine",
    description:
      "The perfect intra-post workout formula. Fusion Nutrition's Recovery combines 36 EAAs, 36 BCAAs, and 36 Glutamine to support muscle preservation, eliminate fatigue, and accelerate repair. Three exotic fruit flavours crafted for Indian palates — ColaFruity, Pinago, and Kimachee.",
    shortDescription: "36 EAA + 36 BCAA + 36 Glutamine • Perfect Intra-Post Workout • 250g",
    images: [
      { id: "img_3a", url: "/images/products/recovery-colafruity.jpg", alt: "Recovery EAA+BCAA+Glutamine — ColaFruity Flavour 250g", width: 800, height: 800 },
      { id: "img_3b", url: "/images/products/recovery-pinago.jpg",     alt: "Recovery EAA+BCAA+Glutamine — Pinago Flavour 250g",     width: 800, height: 800 },
      { id: "img_3c", url: "/images/products/recovery-kimachee.jpg",   alt: "Recovery EAA+BCAA+Glutamine — Kimachee Flavour 250g",   width: 800, height: 800 },
    ],
    variants: [
      { id: "var_3a", title: "250g — ColaFruity", sku: "FN-REC-COL-250", price: 8499, compareAtPrice: 10999, inventory: 55, weight: "250g", flavor: "ColaFruity" },
      { id: "var_3b", title: "250g — Pinago",      sku: "FN-REC-PIN-250", price: 8499, compareAtPrice: 10999, inventory: 40, weight: "250g", flavor: "Pinago"     },
      { id: "var_3c", title: "250g — Kimachee",    sku: "FN-REC-KIM-250", price: 8499, compareAtPrice: 10999, inventory: 33, weight: "250g", flavor: "Kimachee"   },
    ],
    category: { id: "cat_4", name: "Amino Acids", slug: "amino-acids" },
    tags: ["eaa", "bcaa", "glutamine", "recovery", "intra-workout"],
    rating: 4.8,
    reviewCount: 892,
    isBestseller: true,
    nutritionFacts: {
      "EAA per Serving":      "36g",
      "BCAA per Serving":     "36g",
      "Glutamine per Serving":"36g",
      "Net Weight":           "250g",
      "Servings":             "36",
    },
  },

  // ── 4. Angry Fat Burn ────────────────────────────────────────
  {
    id: "prod_4",
    title: "Angry Fat Burn",
    slug: "angry-fat-burn",
    description:
      "Wake up. It's time to take action. Angry Fat Burn is Fusion Nutrition's most potent thermogenic formula — engineered to convert fat into energy and boost your metabolism. Loaded with L-Carnitine L-Tartrate, Beta-Alanine, Garcinia Cambogia, Alpinia Galanga, L-Taurine, and L-Arginine. Your energy. Your edge.",
    shortDescription: "L-Carnitine 3000mg • Beta-Alanine 3600mg • Thermogenic Fat Burner • 30 Servings",
    images: [
      { id: "img_4a", url: "/images/products/angry-fat-burn-promo.jpg",      alt: "Angry Fat Burn — Start Burn Today Promo",              width: 800, height: 800 },
      { id: "img_4b", url: "/images/products/angry-fat-burn-lifestyle.jpg",  alt: "Angry Fat Burn — Lifestyle with Male Athlete",         width: 800, height: 800 },
      { id: "img_4c", url: "/images/products/angry-fat-burn-ingredients.jpg",alt: "Angry Fat Burn — Full Ingredient Breakdown",           width: 800, height: 800 },
    ],
    variants: [
      { id: "var_4a", title: "450g — Watermelon", sku: "FN-AFB-WAT-450", price: 8499, compareAtPrice: 10999, inventory: 71, weight: "450g", flavor: "Watermelon" },
    ],
    category: { id: "cat_6", name: "Fat Burners", slug: "fat-burners" },
    tags: ["fat-burner", "thermogenic", "energy", "weight-loss", "angry"],
    rating: 4.8,
    reviewCount: 764,
    isNew: true,
    ingredients: [
      "L-Carnitine L-Tartrate — 3000mg",
      "Beta-Alanine — 3600mg",
      "Garcinia Cambogia — 300mg",
      "Alpinia Galanga — 240mg",
      "L-Taurine — 960mg",
      "L-Arginine — 960mg",
    ],
    servingSize: "15g",
    servingsPerContainer: 30,
    nutritionFacts: {
      "L-Carnitine L-Tartrate": "3000mg",
      "Beta-Alanine":           "3600mg",
      "Garcinia Cambogia":       "300mg",
      "Alpinia Galanga":         "240mg",
      "L-Taurine":              "960mg",
      "L-Arginine":             "960mg",
    },
  },

  // ── 5. High Whey Protein ─────────────────────────────────────
  {
    id: "prod_5",
    title: "High Whey Protein",
    slug: "high-whey-protein",
    description:
      "Build lean muscle, improve recovery, and enhance strength & performance with High Whey Protein. Fusion Nutrition's classic whey delivers 24g of premium protein per serving with 6.5g BCAAs, zero added sugar, and no bloating or lumps. Available in Chocolate and Black Currant — both engineered for superior taste and absorption.",
    shortDescription: "24g Protein • 6.5g BCAAs • Zero Added Sugar • No Bloating • 60 Servings",
    images: [
      { id: "img_5a", url: "/images/products/high-whey-chocolate.jpg",   alt: "High Whey Protein — Chocolate Flavour 2KG",     width: 800, height: 800 },
      { id: "img_5b", url: "/images/products/high-whey-blackcurrant.jpg",alt: "High Whey Protein — Black Currant Flavour 2KG", width: 800, height: 800 },
    ],
    variants: [
      { id: "var_5a", title: "2kg — Chocolate",    sku: "FN-HWP-CHO-2", price: 8499, compareAtPrice: 10999, inventory: 58, weight: "2kg", flavor: "Chocolate"    },
      { id: "var_5b", title: "2kg — Black Currant", sku: "FN-HWP-BLK-2", price: 8499, compareAtPrice: 10999, inventory: 42, weight: "2kg", flavor: "Black Currant" },
    ],
    category: { id: "cat_1", name: "Protein", slug: "protein" },
    tags: ["protein", "whey", "muscle", "recovery", "strength"],
    rating: 4.7,
    reviewCount: 1356,
    isBestseller: true,
    nutritionFacts: {
      "Protein per Serving": "24g",
      "BCAAs":              "6.5g",
      "Added Sugar":        "0g",
      "Net Weight":         "2KG",
      "Servings":           "60",
    },
  },

  // ── 6. Silent Power Pre-Workout ──────────────────────────────
  {
    id: "prod_6",
    title: "Silent Power Pre-Workout",
    slug: "silent-power-pre-workout",
    description:
      "Strike in silence. Surge in power. Silent Power is Fusion Nutrition's stealth pre-workout — a precision-dosed formula built for athletes who want extreme focus, clean energy, and explosive output without the harsh stimulant crash. Watermelon Flavour. 30 Servings.",
    shortDescription: "Extreme Focus • Clean Energy • No Crash • Watermelon Flavour • 180g",
    images: [
      { id: "img_6a", url: "/images/products/silent-power-preworkout.jpg", alt: "Silent Power Pre-Workout — Ninja Edition Watermelon Flavour", width: 800, height: 800 },
    ],
    variants: [
      { id: "var_6a", title: "180g — Watermelon", sku: "FN-SP-WAT-180", price: 8499, compareAtPrice: 10999, inventory: 37, weight: "180g", flavor: "Watermelon" },
    ],
    category: { id: "cat_2", name: "Pre-Workout", slug: "pre-workout" },
    tags: ["pre-workout", "focus", "energy", "silent-power", "clean"],
    rating: 4.8,
    reviewCount: 548,
    isNew: true,
    servingSize: "6g",
    servingsPerContainer: 30,
    nutritionFacts: {
      "Net Weight": "180g",
      "Servings":   "30",
      "Flavour":    "Watermelon",
    },
  },

  // ── 7. Essential Multi Vitamin Pro ───────────────────────────
  {
    id: "prod_7",
    title: "Essential Multi Vitamin Pro",
    slug: "essential-multi-vitamin-pro",
    description:
      "Complete micronutrient coverage for peak athletic performance. Essential Multi Vitamin Pro packs every critical vitamin and mineral — A, B1, B2, B3, B5, B6, B9, B12, C, D, E, K — into one powerful daily tablet. Boosts energy, builds immunity, maintains bone & joint strength, and helps manage stress. 60 Tablets.",
    shortDescription: "Complete Multi-Vitamin • Boosts Energy • Builds Immunity • Manages Stress • 60 Tablets",
    images: [
      { id: "img_7a", url: "/images/products/multivitamin-pro-promo.jpg",     alt: "Essential Multi Vitamin Pro — Full Benefits Promo",    width: 800, height: 800 },
      { id: "img_7b", url: "/images/products/multivitamin-pro-lifestyle.jpg", alt: "Essential Multi Vitamin Pro — Lifestyle with Dumbbells", width: 800, height: 800 },
    ],
    variants: [
      { id: "var_7a", title: "60 Tablets", sku: "FN-MVP-TAB-60", price: 8499, compareAtPrice: 10999, inventory: 110, weight: "60 tabs" },
    ],
    category: { id: "cat_5", name: "Vitamins & Minerals", slug: "vitamins-minerals" },
    tags: ["multivitamin", "immunity", "energy", "bone-health", "essential"],
    rating: 4.6,
    reviewCount: 412,
    nutritionFacts: {
      "Vitamin A":   "Included",
      "Vitamin B12": "Included",
      "Vitamin C":   "Included",
      "Vitamin D":   "Included",
      "Vitamin E":   "Included",
      "Vitamin K":   "Included",
      "Servings":    "60 Tablets",
    },
  },
];
