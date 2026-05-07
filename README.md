# Lakshya Nutrition

Premium sports nutrition headless e-commerce built with Next.js 15, React 19, Tailwind CSS v4, and GSAP.

## Tech Stack
- Frontend: Next.js 15 (App Router, React 19)
- Styling: Tailwind CSS v4
- Animation: GSAP 3.12+ (ScrollTrigger)
- State: Zustand (Client), React Query (Server)
- Commerce & APIs: Mocked (ready for Medusa v2 integration)
- Payments: Razorpay

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your testing Razorpay keys to `.env.local`.

3. Run the development server:
   ```bash
   npm run dev
   ```

## Development Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler checks

## Backend Mode
By default, the application runs using comprehensive mock data found in `src/lib/constants.ts`. To integrate the real Medusa v2 backend:
1. Ensure the Medusa backend is running.
2. Update the environment variables with the backend API URL.
3. Replace the mock data fetches in the frontend with the actual API calls.
