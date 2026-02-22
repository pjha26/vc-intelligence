import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();
        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // 1. Scrape the URL
        console.log(`Scraping ${url}...`);
        const fetchedData = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!fetchedData.ok) {
            throw new Error(`Failed to fetch URL: ${fetchedData.statusText}`);
        }

        const html = await fetchedData.text();
        const $ = cheerio.load(html);

        // Extract text chunks from meaningful tags
        $("script, style, nav, footer, iframe, noscript").remove();
        const mainText = $("body").text().replace(/\s+/g, ' ').trim().substring(0, 15000);

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are an expert VC analyst. Read the following website text and extract these fields exactly in valid JSON format. Respond ONLY with valid JSON, nothing else. Do not use markdown backticks around the JSON.
{
  "summary": "1-2 sentences summarizing the company",
  "whatTheyDo": ["3-6 bullet points of what they do"],
  "keywords": ["5-10 keywords identifying their market/tech"],
  "signals": ["2-4 derived signals inferred from the page like 'Enterprise focused', 'Hiring engineers', etc."]
}

Website Text:
${mainText}
`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const extractedText = result.text || "{}";
        let extractedData;
        try {
            extractedData = JSON.parse(extractedText);
        } catch (e) {
            const cleaned = extractedText.replace(/```json/g, "").replace(/```/g, "").trim();
            extractedData = JSON.parse(cleaned);
        }

        return NextResponse.json({
            ...extractedData,
            sources: [
                { url, timestamp: new Date().toISOString() }
            ]
        });
    } catch (error: any) {
        console.error("Enrichment error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
