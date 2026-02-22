import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, type CoreMessage } from 'ai';
import mockCompanies from '@/data/mock-companies.json';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    // Simple Context Injection RAG for the mock startup dataset
    const systemContext = `
You are the Drishti Intelligence Engine, an elite AI assistant for Venture Capitalists. 
Your tone is professional, sharp, and highly analytical. 
You are embedded in a VC discovery platform called Acme Capital Intelligence (or Drishti).
You help investors discover startups, analyze market trends, and navigate the global and Indian startup ecosystems.

IMPORTANT RULES:
1. Here is the exact data in our proprietary directory. If the user asks about startups we track, answer ONLY using this data:
${JSON.stringify(mockCompanies, null, 2)}
2. If the user asks a general market query, use your general knowledge, but try to tie it back to startups in our directory if relevant.
3. Keep your answers relatively concise as they are being displayed in a small ChatBot widget. Use markdown formatting (links, bold) where appropriate.
4. Do not answer questions completely unrelated to startups, business, technology, or venture capital.
`;

    const result = streamText({
        model: google('gemini-2.0-flash'), // Using the latest recommended model for general chat
        system: systemContext,
        messages,
    });

    return result.toDataStreamResponse();
}
