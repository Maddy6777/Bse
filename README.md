# Bharat Financial Exchange (BFX) - Web Portal

An institutional-grade Indian stock-exchange website inspired by the structure, speed, and depth of the Bombay Stock Exchange (BSE), featuring real-time equity quotes, SENSEX & sectoral indices, interactive technical charts, options chain, IPO tracking, daily Bhavcopy generator, and corporate announcements.

---

## 🚀 GitHub Actions Deployment Guide (GitHub Pages pe Deploy Kaise Karein)

Yeh project GitHub Actions aur GitHub Pages ke liye fully optimized hai. Jab bhi aap code GitHub par push karenge (`main` ya `master` branch par), GitHub Action automatically website build karke live kar dega.

### Step 1: GitHub Repository Settings mein Pages enable karein

1. Apne GitHub repository open karein.
2. Upar **Settings** tab par click karein.
3. Left sidebar mein **Pages** (Code and automation section ke andar) par click karein.
4. **Build and deployment** section ke andar:
   - **Source**: Dropdown se **`GitHub Actions`** select karein (Deploy from a branch mat chuniye, `GitHub Actions` chuniye).
5. Save ho jayega automatically.

---

### Step 2: Code push karein

Agar aapne abhi tak code push nahi kiya hai, to apne local terminal mein yeh commands run karein:

```bash
# 1. Initialize git (agar pehle se nahi hai)
git init

# 2. Files add karein
git add .

# 3. Commit karein
git commit -m "feat: BFX Indian Stock Exchange Portal with GitHub Actions CI/CD"

# 4. Main branch set karein
git branch -M main

# 5. Remote repository link karein (apna repo URL daalein)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push karein
git push -u origin main
```

---

### Step 3: Deployment Status Check Karein

1. GitHub repo mein **Actions** tab par jayein.
2. Aapko **Deploy BFX Stock Exchange to GitHub Pages** workflow run hota hua dikhega:
   - ✅ **Build & Test** (Dependencies install, Typecheck lint, Production build, SPA 404 routing)
   - ✅ **Deploy to GitHub Pages**
3. Complete hone ke baad aapko live URL mil jayega, jaise:
   `https://<your-username>.github.io/<your-repo-name>/`

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
