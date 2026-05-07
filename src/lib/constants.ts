/** Site-wide constants */
export const SITE_NAME = "Lakshya Nutrition";
export const SITE_DOMAIN = "lakshyanutrition.in";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_TAGLINE = "Fuel Your Ambition. Conquer Every Goal.";
export const SITE_DESCRIPTION =
  "Lakshya Nutrition — Premium sports supplements engineered for peak performance. Whey protein, pre-workouts, recovery supplements & more. 100% authentic, lab-tested quality.";

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Stacks", href: "/products?category=stacks" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const WHATSAPP_NUMBER = "+919876543210";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SUPPLEMENT_STACKS = [
  {
    id: "pre-workout",
    label: "Pre-Workout",
    emoji: "⚡",
    tagline: "Ignite Every Rep",
    description:
      "Maximum energy, razor-sharp focus, and skin-splitting pumps. Our pre-workout stack is engineered to turn every session into a breakthrough.",
    features: ["Caffeine + L-Theanine Synergy", "Beta-Alanine Buffer", "Nitric Oxide Amplifier", "Nootropic Focus Blend"],
    color: "#ff6b35",
    products: ["bull-power-pre-workout", "silent-power-pre-workout", "angry-fat-burn"],
  },
  {
    id: "workout",
    label: "During Workout",
    emoji: "🔥",
    tagline: "Sustain the Intensity",
    description:
      "Maintain peak performance through every set. Our intra-workout formulas keep electrolytes balanced and muscles fueled from warm-up to cooldown.",
    features: ["Essential Amino Acids (EAAs)", "Hydration Electrolytes", "Cluster Dextrin Energy", "BCAAs 2:1:1 Ratio"],
    color: "#00e676",
    products: ["recovery-eaa-bcaa-glutamine", "bull-power-pre-workout"],
  },
  {
    id: "recovery",
    label: "Recovery",
    emoji: "🌙",
    tagline: "Rebuild. Stronger.",
    description:
      "Growth happens at rest. Our recovery stack accelerates muscle protein synthesis, reduces soreness, and maximises adaptation between sessions.",
    features: ["High-Quality Whey Protein", "EAA+BCAA+Glutamine", "Multi Vitamin Pro", "Complete Recovery Formula"],
    color: "#7b61ff",
    products: ["advance-whey-protein", "high-whey-protein", "recovery-eaa-bcaa-glutamine", "essential-multi-vitamin-pro"],
  },
] as const;

export const PRODUCT_CATEGORIES = [
  { id: "cat_1", name: "Protein",            slug: "protein",           count: 2 },
  { id: "cat_2", name: "Pre-Workout",         slug: "pre-workout",       count: 2 },
  { id: "cat_4", name: "Amino Acids",         slug: "amino-acids",       count: 1 },
  { id: "cat_5", name: "Vitamins & Minerals", slug: "vitamins-minerals",  count: 1 },
  { id: "cat_6", name: "Fat Burners",         slug: "fat-burners",        count: 1 },
];

export const SHIPPING_THRESHOLD = 999;
export const GST_RATE = 0.18;
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
