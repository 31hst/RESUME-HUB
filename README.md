# CareerLens — AI Resume Analyzer & Career Advisor

> **"Your resume, decoded."**  
> An enterprise-grade ATS resume deconstruction and career strategy platform engineered with a cinematic, dark aesthetic. Benchmark your candidate profile against modern hiring algorithms, identify critical skill gaps, generate high-impact bullet rewrites, and execute a 90-day career roadmap.

---

## ⚡ Key Highlights & Value Proposition

- **In-Browser Document Parsing**: Uses `pdf.js` for PDF documents and `mammoth` for DOCX files. Document text is extracted entirely on the client side—**no resumes are stored on any database or persistent disk**.
- **Gemini AI Intelligence**: Evaluates candidates using Google Gemini (`gemini-2.5-flash` or `gemini-1.5-flash`) through a secure Netlify serverless function, keeping API credentials safely on the server side.
- **Strict Cinematic Design System**: Pure dark aesthetic built on `#000000`, deep burgundy `#830000`, primary crimson `#BC0202`, and glowing neon red `#FF0000` accents with subtle glassmorphism and fine grain.
- **Google X-Y-Z Bullet Rewriter**: Automatically refactors passive task lists into quantifiable accomplishment statements: *Accomplished [X] as measured by [Y] by doing [Z]*.
- **Tactical 90-Day Career Advisor**: Provides adjacent role pivots, a 30/60/90-day learning roadmap, recommended credentials, and real-world portfolio proof-of-concept project ideas.
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
| **Document Parsing** | `pdfjs-dist` (PDF in-browser), `mammoth` (DOCX in-browser) |
| **Export Engine** | `jspdf`, `html2canvas` |
| **Serverless Backend**| Netlify Functions (`netlify/functions/analyze.ts` & `.js`) |
| **AI LLM Engine** | Google Gemini API (`gemini-2.5-flash` with `gemini-1.5` fallback) |

---

## 🎨 Strict Color Palette & Design System

CareerLens strictly conforms to the specified dark cinematic palette:

- `#000000` — Main background, deepest base surfaces
- `#830000` — Deep surfaces, card borders, subtle grid lines, gradient starts
- `#BC0202` — Primary buttons, active states, chart fills
- `#FF0000` — Accent only: highlights, glows, key numbers, active focus states
- Neutral whites (`#FFFFFF`) & slate grays (`#CBD5E1`, `#94A3B8`, `#64748B`) for high-contrast, accessible typography.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd careerlens
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey):
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

*(Note: If you don't configure an API key right away, you can still test with the built-in **"See Sample Report"** and **"Load Sample Resume"** buttons, or enter an in-session key directly via the **"API Key"** button in the top navigation.)*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. The Vite dev server includes a built-in proxy middleware that routes `/api/analyze` calls directly to Gemini using your `.env` key.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Netlify

CareerLens is architected to be deployed directly onto **Netlify** with zero configuration headaches.

### Method 1: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Method 2: Git-Integrated Deployment (Netlify Dashboard)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In Netlify, click **"Add new site"** → **"Import an existing project"**.
3. Select your repository. Netlify automatically detects the configuration from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. Under **Site Configuration** → **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `GEMINI_MODEL`: `gemini-2.5-flash` (optional; defaults to `gemini-2.5-flash`).
5. Click **Deploy Site**.

All requests sent to `/api/analyze` will automatically be routed by Netlify's edge redirects to `/.netlify/functions/analyze`.

---

## 📂 Project Structure

```
├── .env.example                # Template for Gemini API credentials
├── netlify.toml                # Netlify build & serverless function redirects
├── package.json                # Dependencies and project scripts
├── tailwind.config.js          # Strict black & red color theme & typography
├── vite.config.ts              # Vite config with local dev server API middleware
├── netlify/
│   └── functions/
│       ├── analyze.ts          # Serverless TypeScript Gemini API handler
│       └── analyze.js          # Compiled/fallback serverless JavaScript handler
├── src/
│   ├── types/
│   │   └── index.ts            # Fixed structured schema interfaces
│   ├── utils/
│   │   ├── resumeParser.ts     # In-browser PDF & DOCX text extraction
│   │   ├── sampleData.ts       # Senior full-stack sample resume & demo analysis
│   │   └── exportPdf.ts        # Client-side multi-page PDF generation
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky glass navbar with logo, API key modal trigger
│   │   ├── Footer.tsx          # Cinematic dark footer with privacy disclaimer
│   │   ├── ApiKeyModal.tsx     # Optional in-session Gemini key configuration modal
│   │   ├── Landing/
│   │   │   ├── HeroSection.tsx # Bold headline, CTAs, animated score dashboard mock
│   │   │   ├── HowItWorks.tsx  # 3-step transparent workflow
│   │   │   └── FeaturesGrid.tsx# 6 senior-focused capability cards
│   │   ├── Analyzer/
│   │   │   ├── ResumeUpload.tsx# Drag-and-drop zone (PDF/DOCX) + Paste Text tab
│   │   │   └── AnalyzingModal.tsx # Multi-step progress animation
│   │   └── Dashboard/
│   │       ├── DashboardHeader.tsx # PDF download & "Analyze Another" actions
│   │       ├── ScoreGauge.tsx      # 0-100 animated radial gauge with status tier
│   │       ├── ScoreBreakdown.tsx  # 5 progress bars (ATS, Keywords, Metrics, etc.)
│   │       ├── StrengthsWeaknesses.tsx # Standout Strengths vs Critical Gaps
│   │       ├── SkillGapSection.tsx # Found vs Missing chips + Recharts Radar Chart
│   │       ├── SectionFeedback.tsx # Tabs for Summary, Experience, Projects, etc.
│   │       ├── BulletRewrites.tsx  # Before → After Google X-Y-Z rewrites + 1-click copy
│   │       ├── JobMatchSection.tsx # Match % and missing role-specific keywords
│   │       ├── CareerAdvisor.tsx   # 3 suggested roles, 30/60/90 roadmap, certs, projects
│   │       └── InterviewPrep.tsx   # 8 precision interview questions with coaching tips
│   ├── App.tsx                 # View state management & router
│   ├── index.css               # Glassmorphism, radial glows, red gradients, print rules
│   └── main.tsx                # React 18 DOM root
```

---

## 🔒 Privacy & Security

- **Client-Side Extraction**: Documents are parsed within the browser session via WebAssembly/JS (`pdf.js` and `mammoth`).
- **No Persistent Storage**: Extracted text is only sent in-memory to the analysis endpoint during your active session. It is never logged or written to disk.
- **Serverless Key Isolation**: In production, your `GEMINI_API_KEY` remains securely in Netlify's serverless environment and is never exposed in browser headers or network payloads.

---

## 📄 License

MIT © CareerLens. Built for senior engineers and ambitious professionals aiming to master technical recruiting.
