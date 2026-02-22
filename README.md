# VC Intelligence Interface

A premium interface for discovering Venture Capital intelligence and viewing enriched startup company profiles.

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
