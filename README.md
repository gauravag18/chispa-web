⚡ Chispa – Your AI Go-To-Market Strategy Companion

Chispa is an AI-powered business companion that helps founders instantly generate go-to-market (GTM) strategies, validate ideas, analyze markets, and shape winning startup directions.

Give Chispa your startup idea → Get a full GTM plan with positioning, channels, competition, and action steps.

🔗 Repository: https://github.com/gauravag18/chispa-web

📑 Table of Contents

Overview

Technologies

Packages & Libraries Used

Directory Structure

Setup

Environment Variables

Running the App

Features

License

🌐 Overview

Chispa assists founders, students, and entrepreneurs by generating:

🚀 Go-to-market strategies

🎯 Target customer segments

📈 Marketing & distribution channels

🧠 Competitive insights

💡 Business model suggestions

🛠️ Execution roadmaps

Chispa is your AI business partner — helping you go from idea → strategy → execution.

💻 Technologies
Category	Technologies
Frontend	Next.js, React, TypeScript
Styling	TailwindCSS
Backend	Next.js API Routes
AI	OpenAI API
State	Zustand / Context API (if applicable)
Deployment	Vercel
📦 Packages & Libraries Used
Package / Library	Purpose
Next.js	Core framework for frontend + backend routes
TypeScript	Static typing for reliability
TailwindCSS	Utility-first styling
OpenAI API	AI strategy generation
Axios / Fetch	API calls
Zustand / Context	State management
Lucide-React	Icons
Prettier / ESLint	Code formatting & linting
📁 Directory Structure

A clean structure for clarity:

chispa-web/
│
├── app/                     # Next.js App Router
│   ├── page.tsx             # Home page
│   ├── api/
│   │   └── generate/route.ts# AI GTM Strategy API
│   ├── components/          # Reusable UI components
│   └── styles/              # Global styles
│
├── public/                  # Static assets
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .env.local.example

⚙️ Setup
1. Clone the repository
git clone https://github.com/gauravag18/chispa-web.git
cd chispa-web

2. Install dependencies
npm install

🔐 Environment Variables

Create a .env.local file in the project root:

OPENAI_API_KEY=your_openai_api_key


No authentication (user login) is used in this project.

▶️ Running the App
Start the development server
npm run dev


Then visit:

👉 http://localhost:3000/

🎯 Features
Feature	Description
AI-Powered GTM Strategy	Generates detailed go-to-market strategies tailored to your startup idea.
Audience Segmentation	Identifies primary, secondary, and niche customer profiles.
Marketing Channels	Suggests digital, organic, and paid marketing pathways.
Competitive Insights	Evaluates competitive landscape and your differentiation.
Value Proposition Builder	Creates positioning, messaging, and USP statements.
Execution Roadmap	Step-wise plan for validating and launching your idea.
Clean UI	Simple, modern, responsive UI using TailwindCSS.
No Auth Required	Start using instantly — no login needed.
📜 License

This project is licensed under the MIT License.
See the LICENSE file for details.
