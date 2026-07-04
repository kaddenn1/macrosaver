23:28:36.468 Running build in Washington, D.C., USA (East) – iad1
23:28:36.468 Build machine configuration: 2 cores, 8 GB
23:28:36.602 Cloning github.com/kaddenn1/macrosaver (Branch: main, Commit: 32f18e2)
23:28:37.834 Cloning completed: 1.231s
23:28:38.028 Restored build cache from previous deployment (98R676wVAg9KPFE9ivFwJbtUmhnA)
23:28:38.383 Running "vercel build"
23:28:38.425 Vercel CLI 54.19.0
23:28:38.966 Running "install" command: `npm install`...
23:28:41.979 
23:28:41.981 up to date, audited 363 packages in 3s
23:28:41.982 
23:28:41.983 146 packages are looking for funding
23:28:41.983   run `npm fund` for details
23:28:42.025 
23:28:42.025 2 moderate severity vulnerabilities
23:28:42.026 
23:28:42.026 To address all issues (including breaking changes), run:
23:28:42.027   npm audit fix --force
23:28:42.027 
23:28:42.028 Run `npm audit` for details.
23:28:42.088 Detected Next.js version: 16.2.9
23:28:42.088 Running "npm run build"
23:28:42.256 
23:28:42.257 > macrosaver@0.1.0 build
23:28:42.257 > next build
23:28:42.258 
23:28:43.334   Applying modifyConfig from Vercel
23:28:43.359 ▲ Next.js 16.2.9 (Turbopack)
23:28:43.361 
23:28:43.406   Creating an optimized production build ...
23:28:50.345 ✓ Compiled successfully in 6.4s
23:28:50.354   Running TypeScript ...
23:28:54.570 Failed to type check.
23:28:54.571 
23:28:54.571 ./data/products.ts:11:5
23:28:54.572 Type error: Property 'servingSize' is missing in type '{ proteinGrams: number; }' but required in type 'NutritionFacts'.
23:28:54.572 
23:28:54.572    9 |     imagePlaceholder: "", 
23:28:54.572   10 |     servings: 30,
23:28:54.572 > 11 |     nutrition: {
23:28:54.572      |     ^
23:28:54.572   12 |       proteinGrams: 20
23:28:54.573   13 |       // Removed the redundant servingsPerContainer here!
23:28:54.573   14 |     },
23:28:54.620 Next.js build worker exited with code: 1 and signal: null
23:28:54.688 Error: Command "npm run build" exited with 1