# VC Intelligence Interface

A premium interface for discovering Venture Capital intelligence and viewing enriched startup company profiles.

## Project Assignment Overview
This project is a modern, high-density Web Application built with **Next.js, TypeScript, and Tailwind CSS**, serving as a proprietary discovery dashboard for Venture Capitalists. Fulfilling the core assignment requirements, it features a robust **Companies Directory** with real-time dynamic filtering (by industry, stage, and location) and a responsive, high-contrast dark Radiant UI. 

Users can drill down into dynamic **Company Profile pages**, where a live **AI Enrichment Endpoint** (`/api/enrich`) utilizes the Google Gemini API to automatically generate executive summaries and extract key platform signals. To satisfy the data persistence requirements without a database, the platform leverages `localStorage` to power fully functional **"My Lists"** and **"Saved Searches"** features. Finally, the application integrates a floating **AI Intelligence ChatBot** powered by the Vercel AI SDK and Gemini 2.0 Flash; this bot uses Retrieval-Augmented Generation (RAG) directly on the startup dataset to answer investor questions and analyze market trends in real-time.

## System Architecture

```mermaid
graph TD
    %% Styling
    classDef frontend fill:#334155,stroke:#94a3b8,color:#fff,stroke-width:2px,rx:10px
    classDef backend fill:#1e1b4b,stroke:#8b5cf6,color:#fff,stroke-width:2px,rx:10px
    classDef storage fill:#064e3b,stroke:#34d399,color:#fff,stroke-width:2px,rx:10px
    classDef external fill:#7c2d12,stroke:#fdba74,color:#fff,stroke-width:2px,rx:10px
    classDef ai fill:#4c1d95,stroke:#c084fc,color:#fff,stroke-width:2px,rx:10px

    subgraph NextJS_Frontend["Frontend UI (Next.js 14 App Router)"]
        A[Landing Page Dashboard]:::frontend
        B[Companies Directory & Filters]:::frontend
        C[Company Profile & Insights]:::frontend
        D[AI ChatBot Widget]:::frontend
        
        A <--> B
        B <--> C
    end

    subgraph State_Data["Data & Persistence"]
        E[(Browser Local Storage)]:::storage
        F[mock-companies.json Database]:::storage
    end

    subgraph NextJS_Backend["Backend Server (Next.js Route Handlers)"]
        G[/api/chat <br/> Vercel AI SDK]:::backend
        H[/api/enrich <br/> Web Scraper]:::backend
    end

    subgraph External_Services["External Services"]
        I[Google Gemini API <br/> gemini-2.0-flash]:::ai
        J[External Company Websites]:::external
    end

    %% Wiring it together
    B -.->|Fetches Startup Data| F
    C <-->|Saves 'My Lists'| E
    B <-->|Saves 'Saved Searches'| E
    
    D <-->|User Prompts & Streams| G
    G -.->|Injects RAG Context| F
    G <-->|Model Inference| I
    
    C <-->|Triggers Auto-Enrichment| H
    H -.->|Scrapes Raw HTML| J
    H <-->|Structure & Summarize| I
```

## Features Built
- **Discover Companies** (`/companies`): Search and filter a directory of mock companies.
- **Save Searches** (`/saved`): Re-run past queries.
- **Lists** (`/lists`): Create private lists and export data as JSON or CSV.
- **Live Enrichment** (`/api/enrich`): Enter a company's URL to fetch AI-extracted summaries, insights, keywords, and signals directly from their most recent live web page.

## Technologies Used
- Next.js 14 / React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Cheerio (for text scraping)
- Google Gemini API (`@google/genai`) for LLM structuring

## Setup & Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open standard browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)
This Next.js app is pre-configured and optimized to be deployed to Vercel out of the box.

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Configure the `GEMINI_API_KEY` under Environment Variables in the Vercel project settings.
4. Deploy!

### Notes on Live Scraping
The /api/enrich endpoint operates strictly on the server side to protect your API keys. It performs basic extraction of website bodies, scrubs unwanted tokens, and prompts an LLM to generate the `whatTheyDo`, `summary`, `keywords`, and `signals` parameters reliably.
