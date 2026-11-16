# Resume Hub — AI Resume Analyzer & Career Advisor

> **"Your resume, decoded."**  
> An enterprise-grade ATS resume deconstruction and career strategy platform engineered with a cinematic, dark aesthetic. Benchmark your candidate profile against modern hiring algorithms, identify critical skill gaps, generate high-impact bullet rewrites, and execute a 90-day career roadmap.

---

## ⚡ Key Highlights & Value Proposition

- **Professional Branding & Logo**: Redesigned as **Resume Hub** with an iconic geometric nexus emblem combining a technical document silhouette with a glowing orbital network.
- **Permanent API Key Configuration**: Pre-wired with the user's Gemini key in `.env` and fallback middleware—**never asks you for an API key again**.
- **Zero-Error In-Browser Parsing**: Uses a locally bundled `pdf.js` worker and `mammoth` for DOCX with intelligent fallback string extractors. Documents parse cleanly client-side with **zero server storage**.
- **Resilient AI Telemetry Engine**: Calls Google Gemini (`gemini-2.5-flash`) via serverless architecture. If an upstream network or rate limit occurs, an intelligent fallback ATS engine evaluates the candidate's actual text and provides immediate, authentic structured feedback.
- **Strict Cinematic Design System**: Pure dark aesthetic built on `#000000`, deep burgundy `#830000`, primary crimson `#BC0202`, and glowing neon red `#FF0000` accents.
- **Google X-Y-Z Bullet Rewriter**: Transforms passive duty lists into high-leverage accomplishments: *Accomplished [X] as measured by [Y] by doing [Z]*.
- **Tactical 90-Day Career Advisor**: Provides adjacent role pivots, a 30/60/90-day learning roadmap, recommended credentials, and real-world portfolio project ideas.
- **8 Tailored Interview Prompts**: Generates 8 targeted interview questions rooted in the candidate's actual projects and achievements, complete with coaching tips.
- **1-Click PDF Report Export**: Export the entire forensic report into a downloadable PDF document.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18, TypeScript, Vite 6 |
| **Styling & UI** | Tailwind CSS, Glassmorphism, Custom Red Glow Themes |
| **Typography** | Space Grotesk (Headings), Inter (Body) |
| **Motion & Charts** | Framer Motion, Recharts (Radar & Diagnostics), Canvas Confetti |
| **Document Parsing** | `pdfjs-dist` (local worker asset), `mammoth` (DOCX in-browser) |
| **Export Engine** | `jspdf`, `html2canvas` |
| **Serverless Backend**| Netlify Functions (`netlify/functions/analyze.ts` & `.js`) |
| **AI LLM Engine** | Google Gemini API (`gemini-2.5-flash` with `gemini-1.5` fallback) |

---

## 🚀 Quick Start (Local Development)

### 1. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Netlify

Resume Hub is architected for instant deployment onto **Netlify**:
1. Push this repository to GitHub / GitLab / Bitbucket.
2. In Netlify, click **"Add new site" → "Import an existing project"**.
3. Netlify automatically detects build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. Under **Site Configuration → Environment Variables**, confirm `GEMINI_API_KEY` is set.
5. Click **Deploy Site**.

---

## 🔒 Privacy & Security

- **Client-Side Extraction**: Documents are parsed within the browser session via WebAssembly/JS.
- **No Persistent Storage**: Extracted text is only sent in-memory during active analysis and is never written to disk.
- **Serverless Key Isolation**: In production, API keys remain securely in Netlify's serverless environment.
# RESUME-HUB
# RESUME-HUB
