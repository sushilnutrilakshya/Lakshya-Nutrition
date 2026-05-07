# Lakshya Nutrition — Active Engineering Friction Points

This document outlines the **active problems** I am currently facing while finalizing the Centered Island architecture. These are the "blockers" or friction points making the resolution difficult.

## 1. Port Collision & Process Persistence
- **The Issue**: There are multiple `npm run dev` processes hanging in the background (Ports 3000, 3001, 3002). 
- **The Friction**: This creates "Port Drift" where my verification tools (the browser subagent) might be looking at a stale version of the site on port 3000 while my fixes are live on port 3002. It makes "final confirmation" extremely unreliable.

## 2. Browser Subagent Desync
- **The Issue**: My internal browser tool occasionally reports "success" based on DOM elements, but the actual rendered screenshot shows the UI is still broken.
- **The Friction**: I cannot fully trust the "automated" verification and have to manually audit every single screenshot pixel-by-pixel, which significantly slows down the iteration loop.

## 3. Tailwind v4 Cache & Hot Reload Lag
- **The Issue**: Tailwind v4 (Alpha/Beta) occasionally fails to hot-reload structural changes when multiple deep-nested components are changed simultaneously.
- **The Friction**: I might apply a correct fix, see it "fail" in the browser because the CSS didn't recompile, and then try an *incorrect* fix, leading to a "hallucination loop" where I'm chasing ghost bugs.

## 4. Mobile vs. Desktop Conflict
- **The Issue**: The "Centered Island" requires `flex-col items-center` on the parent, which works great for Desktop but often breaks the responsive "Full Width" requirement for mobile.
- **The Friction**: Every time I fix the Desktop centering, I have to re-verify that the Mobile Navbar and Cart Drawer haven't shrunk or shifted to the middle with unwanted side-margins.

## 5. Third-Party Component Constraints (Medusa/Lucide)
- **The Issue**: Some components (like the Cart Drawer or Product Sliders) have hardcoded inline styles or internal constraints that ignore the new `.ln-container` class.
- **The Friction**: I am having to go into "surgical mode" to override these deep-nested styles without breaking the core functionality of the e-commerce SDK.

## 6. Build Noise
- **The Issue**: There are several existing ESLint and TypeScript errors in the codebase unrelated to my current task.
- **The Friction**: These errors flood the terminal output, making it difficult to spot "real" CSS/Build failures and causing the dev server to exit prematurely with Error Code 1.

---
> [!WARNING]
> These issues are creating a high "tax" on every change. Until the process persistence (Issue #1) is resolved, visual verification remains the biggest bottleneck.
