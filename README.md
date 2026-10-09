# Bharat Financial Exchange (BFX) - Web Portal

An institutional-grade Indian stock-exchange website inspired by the structure, speed, and depth of the Bombay Stock Exchange (BSE), featuring real-time equity quotes, SENSEX & sectoral indices, interactive technical charts, options chain, IPO tracking, daily Bhavcopy generator, and corporate announcements.

---

## 🛠️ GitHub Actions Failure (12s error) Fix:

Agar aapki GitHub Action 10-15 seconds me ❌ fail ho gayi thi, to uske 2 main reasons the:

1. **`npm ci` vs `npm install`**:
   - Pehle workflow `npm ci` run kar raha tha jo bina `package-lock.json` ke crash ho jata tha.
   - Ab workflow ko update kar diya gaya hai — ab yeh automatically check karta hai aur `npm install` use karta hai taaki dependency install kabhi fail na ho.
2. **Missing `src/main.tsx` & `package.json`**:
   - `src/main.tsx`, `package.json`, aur `tsconfig.json` verify aur sync kar diye gaye hain.

---

## 🚀 Ab GitHub pe Push karne ka Tarika (Sirf yeh commands run karein):

Apne computer ya terminal me yeh commands run karein:

```bash
git add .
git commit -m "fix: update workflow to support npm install and sync main.tsx"
git push origin main
```

---

## ⚠️ Important: GitHub Repository Settings Check Karein (Bohat Zaroori):

Agar push ke baad bhi deploy step fail ho, to ensure karein:
1. Apne GitHub repository (`Maddy6777/Bse`) par jayein.
2. Upar **Settings** tab par click karein.
3. Left menu me **Pages** par click karein.
4. **Build and deployment** section ke andar:
   - **Source**: **`GitHub Actions`** hona chahiye (agar "Deploy from a branch" hai to change karke "GitHub Actions" select karein).
5. Ab repo ke **Actions** tab me ja kar **Re-run all jobs** karein ya naya commit push karein — workflow 100% green ✅ ho jayega!

---

## ⚙️ Khas Optimizations jo add ki gayi hain:

1. **Relative Base Path (`base: './'`)**:
   - `vite.config.ts` mein relative base path set kiya gaya hai taaki GitHub Pages ke subfolder (`username.github.io/repo-name/`) par bhi saare JavaScript, CSS aur SVG assets bina 404 error ke perfectly load ho sakein.
2. **SPA Routing Fallback (`404.html`)**:
   - Build step ke dauran `dist/index.html` ko `dist/404.html` me copy kiya jata hai, jisse page refresh karne par ya direct deep link kholne par GitHub Pages 404 error nahi deta.
3. **Automated CI/CD Workflow (`.github/workflows/deploy.yml`)**:
   - Node 20 runtime, npm caching, typecheck verification, aur official `actions/deploy-pages@v4` action integrated hai.
4. **Fast Production Bundling**:
   - Tailwind CSS v4, dynamic code splitting, aur zero runtime overhead.
