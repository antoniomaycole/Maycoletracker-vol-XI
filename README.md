# MAYCOLETracker™ Vol XI

## 🚀 Modules Activated
This module is ready for deployment and development.

### 📦 Install Dependencies
To make this app functional, run:
```bash
npm install
npm run dev run 'npm'

### 🪢 Final Git Commands

```bash
git add README.md
git commit -m "docs: resolved HEAD conflict and merged icon button logic into README"
git push origin main

  # MaycoleTracker vol XI

  This is a code bundle for MaycoleTracker vol XI. For support and licensing please contact MaycoleTechnology at support@maycoletechnology.com. The original project is available at https://www.figma.com/design/DXTQSHiAguJ8K8Wpa3hDMp/MaycoleTracker-vol-XI. DEPLOYMENT-MILESTONE-VOL-XI.md

  ## Deploying to your custom domain (maycoletechnology.com)

  1. Ensure this repository is pushed to GitHub under `antoniomaycole/MaycoleTracker-vol-XI` (or your org). The repository root already contains a `CNAME` with `maycoletechnology.com`.

  2. Enable GitHub Pages in the repository settings:
    - Settings → Pages → Build and deployment → Deploy from a branch
    - Branch: `gh-pages`, Folder: `/` (the workflow will publish to `gh-pages` branch)

  3. Configure DNS for `maycoletechnology.com` at your registrar:
    - Create an A record for the root (@) pointing to GitHub Pages IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
    - Add a CNAME record for `www` pointing to `your-github-username.github.io` (or the repository pages hostname)

  4. Commit and push `main` — the GitHub Action `Deploy to GitHub Pages` will build and publish the site to the `gh-pages` branch (see `.github/workflows/deploy-gh-pages.yml`).

  5. After the first successful deployment, GitHub Pages will serve `maycoletechnology.com` using the `CNAME` file in the repository. DNS propagation can take up to 24 hours; you can check with `dig maycoletechnology.com`.

  Alternative: If you prefer Vercel/Netlify, deploy the project there and point your domain to the provider using their DNS instructions (CNAME/ALIAS records). Vercel is often easiest for Vite apps.

  ## Environment & reproducible builds

  This repo uses a lockfile (`package-lock.json`) to guarantee deterministic installs. Use the following recommended steps when preparing releases or CI runs:

  - Install in CI or local exactly with:
  ```bash
  npm ci --no-audit --no-fund
  ```

  - Use `.env` for secret values in development. A `.env.example` is included with the expected variables:
    - VITE_INVENTORY_API_URL
    - VITE_INVENTORY_API_TOKEN

  ## Docker (recommended for uniform deployments)

  Build and run the container locally:
  ```bash
  docker build -t maycoletracker:latest .
  docker run -e INVENTORY_API_URL=https://api.example.com -e INVENTORY_API_TOKEN=xxx -p 3000:3000 maycoletracker:latest
  # Visit http://localhost:3000
  ```

  The included `Dockerfile` is multi-stage: it builds the frontend (Vite) and then serves `dist/` from the Node `api_server.js` runtime.

- Location: Root of MaycoleTracker-vol-XI or inside /docs/
- Benefits:
  - Timestamped via commit history
  - Teachable for future contributors
  - Can be kept private if repo is private

✅ Option B: Inside Your README.md
- Add a section like:
  `markdown

Deployment Milestone — Vol XI
  - Logic verified in /src
  - Icon button and bonded modules confirmed
  - ES6+ imports preserved across 4x volumes
  - Recovery sprint archived (Vol X)
  - UI/UX logic intact (Vol KJ)
  - Ready for Vercel deployment and .com redirect
  - Timestamped under the MAYCOLE Method™: precision, patience, legacy
  `

✅ Option C: Private Founder Log
- Create a private Notion, Obsidian, or markdown vault
- Store all deployment logs, audit trails, and recovery sprints
- This becomes your founder-grade journal—no one sees it unless you choose

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
