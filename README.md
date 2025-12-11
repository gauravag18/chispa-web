# ⚡ Chispa – Your AI Go-To-Market Strategy Companion

Chispa is an AI-powered business companion that helps founders instantly generate go-to-market (GTM) strategies, validate ideas, analyze markets, and shape winning startup directions.

Give Chispa your startup idea → Get a full GTM plan with positioning, channels, competition, and action steps.

🔗 **Repository:** https://github.com/gauravag18/chispa-web

## 📑 Table of Contents
- [Overview](#-overview)
- [Technologies](#-technologies)
- [Packages & Libraries Used](#-packages--libraries-used)
- [Directory Structure](#-directory-structure)
- [Setup](#️-setup)
- [Features](#-features)
- [License](#-license)

## 🌐 Overview
Chispa assists founders, students, and entrepreneurs by generating:

- 🚀 Go-to-market strategies  
- 🎯 Target customer segments  
- 📈 Marketing & distribution channels  
- 🧠 Competitive insights  
- 💡 Business model suggestions  
- 🛠️ Execution roadmaps  

**Chispa is your AI business partner — helping you go from idea → strategy → execution.**

## 💻 Technologies

| Category   | Technologies                     |
|------------|----------------------------------|
| Frontend   | Next.js, React, TypeScript       |
| Styling    | TailwindCSS                      |
| Backend    | Next.js API Routes               |
| AI         | Gemini API                       |
| Deployment | Vercel                           |

## 📦 Packages & Libraries Used

| Package / Library | Purpose                                   |
|-------------------|-------------------------------------------|
| **Next.js**       | Core framework for frontend + backend     |
| **TypeScript**    | Static typing for reliability             |
| **TailwindCSS**   | Utility-first styling                     |
| **OpenAI API**    | AI model integration for GTM generation   |
| **Axios / Fetch** | API calls                                 |
| **Lucide-React**  | Icons                                     |

## 📁 Directory Structure

chispa-web/
│
├── app/ # Next.js App Router
│ ├── page.tsx # Home page
│ ├── api/
│ │ └── generate/route.ts # AI GTM Strategy API endpoint
│ ├── components/ # Reusable UI components
│ └── styles/ # Global styles
│
├── public/ # Static assets
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .env.local.example

## ⚙️ Setup

### Clone the repository, install and run the app

git clone https://github.com/gauravag18/chispa-web.git
cd chispa-web
npm install
npm run dev

🎯 Features
Feature	Description
AI-Powered GTM Strategy	Generates detailed go-to-market strategies tailored to your idea.
Audience Segmentation	Identifies primary, secondary, and niche customer groups.
Marketing Channels	Suggests organic, digital, and paid marketing pathways.
Competitive Insights	Evaluates competitors and highlights differentiation.
Value Proposition Builder	Creates positioning, messaging, and USP statements.
Execution Roadmap	Step-by-step validation and launch plan.
Clean UI	Modern, responsive interface with TailwindCSS.
No Auth Required	Start instantly — no signup/login.

📜 License

This project is licensed under the MIT License.
See the LICENSE file for details.
