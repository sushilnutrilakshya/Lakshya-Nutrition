# Lakshya Nutrition — Project Overview

> A plain-English breakdown of everything this website is built on, what it does, and how it works. No jargon.

> **Governing Architecture:** All development on this project is governed by `.kiro/steering/architecture.md` — the master system directive that defines layout laws, tech constraints, design rules, and engineering workflow. Any AI tool or developer working on this codebase must load that file first.

---

## What Is This?

Lakshya Nutrition is a **premium sports supplement e-commerce website** built for the Indian market. It lets customers browse products, add them to a cart, and pay — either online via UPI/cards or cash on delivery. The site is designed to feel like a high-end brand (think Nike or Optimum Nutrition) with smooth animations, a dark/light theme, and a fast, app-like experience on both mobile and desktop.

---

## Quick Reference — Every Tool Used

| Category | Tool / Framework | What It Does in Plain English |
|----------|-----------------|-------------------------------|
| **Web Framework** | Next.js 15 | The engine. Handles pages, routing, and server-side rendering. |
| **UI Library** | React 19 | Makes the site interactive — buttons, drawers, dropdowns, all of it. |
| **Language** | TypeScript 5.6 | JavaScript with strict rules. Catches mistakes before the code runs. |
| **Design Framework** | Tailwind CSS v4 | Utility-first styling. Write styles directly in the HTML, no separate CSS files needed. |
| **CSS Variables** | Custom Properties | Powers the dark/light theme — one set of color tokens for the whole site. |
| **Animation Library** | GSAP 3.12 | Industry-standard animation engine. Scroll effects, entrance animations, parallax. |
| **Animation Plugin** | GSAP ScrollTrigger | Ties animations to scroll position — things animate as you scroll down. |
| **Cart / State** | Zustand 5 | Manages the shopping cart. Persists across page refreshes via browser storage. |
| **Server Data** | TanStack React Query 5 | Fetches and caches data from the server efficiently. |
| **Forms** | React Hook Form 7 | Handles form inputs, validation, and submission in the checkout flow. |
| **Validation** | Zod 3 | Defines rules for form data — e.g. "phone must be 10 digits". |
| **Payments** | Razorpay | India's leading payment gateway. UPI, cards, net banking, wallets. |
| **Commerce Backend** | Medusa v2 SDK | Headless commerce platform (like Shopify but self-hosted). Ready to connect. |
| **Database ORM** | Drizzle ORM | Type-safe database toolkit for PostgreSQL. Configured, not yet active. |
| **Database** | PostgreSQL | The database that will store orders, customers, and products. |
| **PWA** | Serwist / Serwist Next | Makes the site installable on phones like a native app. Enables offline support. |
| **Error Tracking** | Sentry 10 | Automatically captures and reports errors on the live site. |
| **Icons** | Lucide React | Clean, consistent icon set used throughout the UI. |
| **Class Merging** | clsx + tailwind-merge | Safely combines Tailwind classes without conflicts. |
| **Font** | Outfit + Inter (Google Fonts) | Outfit is the primary brand font. Inter is the fallback. |

---

## Pages on the Website

| Page | What It Does |
|------|-------------|
| **Home** `/` | The main landing page. Has a hero section, product slider, supplement stacks, testimonials, blog previews, and a call-to-action. |
| **Products** `/products` | A full catalog of all supplements. You can search, filter by category, and sort by price or rating. |
| **Product Detail** `/products/[name]` | Individual product page with images, variants (size/flavor), nutrition facts, ingredients, and an add-to-cart button. |
| **Cart** `/cart` | Shows everything in your cart with quantities, prices, and a checkout button. |
| **Checkout** `/checkout` | A two-panel page — left side has an inspirational quote, right side has the delivery address form and payment method selection. |
| **About** `/about` | The brand story, mission, and core values. |
| **Blog** `/blog` | A list of nutrition science articles. |
| **Blog Post** `/blog/[article]` | Individual article page. |
| **Contact** `/contact` | Contact form, WhatsApp link, email, and location. |
| **Privacy Policy** `/privacy` | Legal privacy information. |
| **Terms of Service** `/terms` | Legal terms. |
| **404 Page** | A custom "Lost Your Way?" page when someone visits a URL that doesn't exist. |
| **Error Page** | A custom page shown if something crashes on the site. |

---

## The Tech Stack — In Plain English

### The Framework: **Next.js 15**
Think of this as the engine of the website. It handles routing (which URL shows which page), server-side rendering (pages load fast because content is prepared before it reaches your browser), and the overall structure of the app. It's built by Vercel and is one of the most popular ways to build modern websites.

### The Language: **TypeScript**
The entire codebase is written in TypeScript, which is JavaScript with strict rules. It catches mistakes before the code runs — like a spell-checker but for code logic.

### The UI Library: **React 19**
React is what makes the website interactive. Every button, dropdown, cart drawer, and animation is a React "component" — a reusable building block. React 19 is the latest version with improved performance.

### Styling: **Tailwind CSS v4**
Instead of writing separate style files, Tailwind lets you style things directly in the HTML using short class names like `flex`, `text-center`, `rounded-xl`. Version 4 is the newest and fastest version. The site also uses CSS custom properties (variables) for the color theme so dark/light mode works seamlessly.

### Animations: **GSAP (GreenSock Animation Platform)**
GSAP is the industry standard for high-performance web animations. It powers the hero section scroll effects, the floating ingredient emojis, the product image entrance animations, and the letter-by-letter title reveal. It's the same tool used by award-winning agency websites.

### Cart & State: **Zustand**
Zustand manages the shopping cart. It remembers what's in your cart even if you refresh the page (saved to browser storage). It handles adding items, removing items, updating quantities, applying coupons, and calculating totals including GST and shipping.

### Data Fetching: **TanStack React Query**
Used for fetching and caching data from the server. Currently configured and ready but the site uses mock data while the backend is being set up.

### Forms & Validation: **React Hook Form + Zod**
The checkout form uses React Hook Form for handling inputs efficiently, and Zod for validation rules — things like "phone number must be 10 digits starting with 6-9" or "pincode must be exactly 6 digits". Errors show up instantly as you type.

### Payments: **Razorpay**
The primary payment gateway for India. Supports UPI, credit/debit cards, net banking, and wallets. The site also supports Cash on Delivery (COD) as an alternative. Razorpay's checkout popup is loaded dynamically only when needed.

### Backend-Ready Commerce: **Medusa v2**
Medusa is an open-source headless commerce platform (like Shopify but self-hosted). The SDK is installed and configured, ready to connect to a Medusa backend for real product data, inventory, and order management. Currently the site uses mock data.

### Database: **PostgreSQL + Drizzle ORM**
A PostgreSQL database connection is configured using Drizzle ORM (a modern, type-safe database toolkit). Ready to store orders, customers, and product data once the backend is live.

### PWA (Progressive Web App): **Serwist**
The site can be installed on a phone like a native app. Serwist handles the service worker — a background script that enables offline support and faster repeat visits.

### Error Tracking: **Sentry**
Sentry automatically captures and reports any errors that happen on the live site. If something breaks for a user, the development team gets notified with full details of what went wrong.

### Icons: **Lucide React**
A clean, consistent icon library used throughout the site — shopping bag, menu, star ratings, shields, arrows, etc.

---

## How the Cart Works

1. You click "Add to Cart" on any product
2. Zustand (the cart manager) adds the item to a list stored in your browser
3. The cart drawer slides open from the right showing your items
4. Totals are calculated automatically: subtotal + ₹99 shipping (free above ₹999) + 18% GST
5. You can update quantities, remove items, or apply a coupon code
6. Everything persists if you close and reopen the browser

---

## How Checkout Works

1. You fill in your delivery address (name, phone, email, address, city, state, pincode)
2. You choose a payment method: Razorpay (online) or Cash on Delivery
3. For Razorpay: the site creates an order on the server, then opens Razorpay's secure payment popup
4. For COD: the order is recorded directly and you pay when it arrives
5. On success, the cart is cleared and you see an order confirmation with your order ID

---

## The Design System

The site has a carefully built design system with:

- **Brand color**: `#7FE85A` — a vibrant green used for buttons, accents, and highlights
- **Gold accent**: `#f5b800` — used for star ratings and secondary highlights
- **Dark mode**: Deep navy/black backgrounds (`#080c1a`) with light text
- **Light mode**: Clean off-white backgrounds (`#f5f6f8`) with dark text
- **Typography**: "Outfit" as the primary font (modern, geometric) with "Inter" as fallback
- **Spacing**: Consistent section padding that scales with screen size using CSS `clamp()`
- **Centering**: All content lives in centered containers with a max-width of 1152px and generous side padding — backgrounds extend full-width, content stays centered

---

## The Animations

- **Hero section**: The word "LAKSHYA" appears as a giant faded background title with each letter animating in. The product image floats in with a spring effect. Floating emojis (🌿⚡💧🔥) drift around the screen.
- **Scroll trigger**: As you scroll down the hero, the product image scales up and the background title fades — creating a parallax depth effect.
- **Product slider**: A circular carousel showing products with blur and scale effects on non-active slides. Auto-rotates every 3.5 seconds, pauses on hover.
- **Marquee strips**: Two infinite scrolling text strips — one with trust badges (green background), one with brand words in outlined text.
- **Tab transitions**: The supplement stacks section fades and slides between tabs smoothly.
- **Card hover**: Product cards lift up 6px with a green glow shadow on hover.

---

## SEO & Discoverability

- Every page has proper `<title>` and `<meta description>` tags
- Structured data (JSON-LD) is embedded for Google to understand the site as an e-commerce store — including Organization, WebSite, Product, BreadcrumbList, and BlogPosting schemas
- Open Graph tags for social media sharing (Facebook, WhatsApp previews)
- Twitter card tags
- Canonical URLs to avoid duplicate content
- The site is configured for Indian English (`en-IN` locale)

---

## Security

- All API routes validate incoming data with Zod before processing
- Security headers are set on every page: no iframe embedding, no content-type sniffing, strict transport security
- Razorpay secret key is server-side only — never exposed to the browser
- Camera, microphone, and geolocation permissions are blocked by default

---

## Folder Structure (Simplified)

```
lakshya-nutrition/
├── src/
│   ├── app/                  ← All pages and API routes
│   │   ├── (marketing)/      ← Homepage, About, Blog, Contact
│   │   ├── (shop)/           ← Products catalog and detail pages
│   │   ├── (legal)/          ← Privacy and Terms pages
│   │   ├── cart/             ← Cart page
│   │   ├── checkout/         ← Checkout page
│   │   └── api/              ← Server-side order creation endpoints
│   ├── components/
│   │   ├── animations/       ← Hero, Marquee, Slider, Tabs
│   │   ├── commerce/         ← Product card, Cart drawer, Variant selector
│   │   ├── layout/           ← Header and Footer
│   │   └── ui/               ← Theme toggle button
│   ├── lib/
│   │   ├── cart-store.ts     ← Shopping cart logic
│   │   ├── constants.ts      ← Site name, nav links, product categories
│   │   ├── mock-data.ts      ← Placeholder products, testimonials, blog posts
│   │   └── utils.ts          ← Helper functions (price formatting, etc.)
│   └── types/
│       ├── product.ts        ← Product data structure definitions
│       └── cart.ts           ← Cart data structure definitions
├── public/                   ← Images, icons, PWA manifest
└── Project.md                ← This file
```

---

## What's Live vs What's Pending

### ✅ Fully Working
- Complete product catalog with search, filter, and sort
- Product detail pages with variant selection
- Shopping cart with persistent storage
- Checkout flow with Razorpay and COD
- Dark/light theme toggle
- All animations and scroll effects
- Blog, About, Contact, Legal pages
- PWA installable on mobile
- Error tracking with Sentry
- SEO metadata and structured data

### 🔄 Ready but Using Mock Data
- Product catalog (real data will come from Medusa backend)
- Blog posts (real content to be added)
- Contact form (needs a backend email handler)

### 📋 Planned for Future
- User accounts and order history
- Email and WhatsApp order confirmations
- Real-time inventory management
- Admin dashboard
- Wishlist functionality
- Product reviews submission
- Analytics dashboard

---

*Last updated: May 2026*
