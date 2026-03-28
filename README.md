<div align="center">
  <h1>👻 GhostSpend AI</h1>
  <p><strong>Enterprise Profit Recovery Platform · Powered by Groq LLM · Zero-Knowledge Architecture</strong></p>
  <br/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Groq-LLM-FF6C37?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel" />
</div>

---

## 🚀 What is GhostSpend AI?

Every enterprise leaks money silently — through zombie subscriptions, duplicate vendor contracts, missed SLA penalties, and cloud waste. **GhostSpend AI** is the world's first **Autonomous Cost-Recovery Platform** that hunts these hidden leaks using a 4-Agent LLM swarm and automatically claws the money back.

Upload your operations CSV → The AI decodes it in seconds → Savings manifest.

---

## 🧠 How It Works

```
1. INGEST  → Upload raw operational CSVs (AWS billing, SaaS usage, vendor SLAs)
2. SCRUB   → All PII is stripped locally in-browser before any AI processes it
3. HUNT    → 4 Groq-powered AI Agents cross-reference your data against market baselines
4. CLAWBACK → Sentinel auto-generates vendor deduction notices and cancellation letters
```

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **4-Agent AI Swarm** | Spend Intelligence, SLA Prevention, Resource Optimization, and FinOps agents run in parallel |
| 🔒 **Zero-Knowledge Vault** | All PII scrubbed locally — your data never leaves your browser |
| 📉 **OHLC Candlestick Charts** | Stock-market style financial variance visualization via Recharts |
| ✉️ **Sentinel Negotiation Mode** | Auto-generates legally-sound vendor penalty letters |
| 🐍 **Offline Local Auditor** | Export a downloadable Python script for air-gapped environments |
| ⚡ **Groq-Powered Speed** | Full enterprise audit in under 60 seconds via Llama-3 8B |

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Styled-Components (Glassmorphic Obsidian Dark theme)
- **Animations:** Framer Motion
- **Charts:** Recharts (Custom OHLC Candlestick Renderer)
- **AI Engine:** Groq API (`llama3-8b-8192` model)
- **Hosting:** Vercel

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Anand2k29/GS-Chotu.git
cd GS-Chotu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> 🔑 Get a free Groq API key at [console.groq.com](https://console.groq.com)

### 4. Run locally
```bash
npm run dev
```
Open **http://localhost:5173**

### 5. Build for production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add your environment variables (`VITE_GROQ_API_KEY`) in Vercel's dashboard
4. Deploy — it works out of the box

---

## 🔍 How the AI Works

**With Groq API Key set:**
- Passes the CSV content to `llama3-8b-8192` via the Groq API
- The model acts as a 4-agent orchestrator and returns a structured JSON audit
- KPI cards reflect real AI findings

**Without API Key (Demo mode):**
- Runs a high-fidelity local simulation engine
- Generates realistic 5-leak findings across all 4 agent categories
- Identical UI experience — great for demos

---

## 🗺️ Future Roadmap

- [ ] Multi-ERP Integration (SAP, Oracle NetSuite, QuickBooks)
- [ ] Predictive Leak Forecasting via LSTM time-series model
- [ ] Procurement Autopilot — autonomous vendor renegotiation
- [ ] Slack / WhatsApp / MS Teams anomaly alerts
- [ ] Blockchain immutable audit ledger
- [ ] GhostScore™ — industry benchmarking for financial hygiene

---

## 🧑‍💻 Project Structure

```
src/
├── components/
│   ├── animations/     # IntroScreen with particle effects
│   ├── charts/         # ObsidianAnalyticsChart (OHLC candlesticks)
│   ├── layout/         # Dashboard, Login, UploadView, SetupIndustry, SetupCompany
│   ├── tabs/           # AnalysisTab, SentinelTab
│   └── ui/             # PredictivePulse top bar animation
├── utils/
│   ├── aiCore.ts       # 4-Agent orchestration + Groq API client
│   ├── security.ts     # PII scrubbing + cryptographic hashing
│   └── exportScript.ts # Python offline auditor generator
└── App.tsx             # 4-step onboarding flow
```

---

