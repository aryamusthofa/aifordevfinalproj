import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON and CORS policies
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

// Initialize Google Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Configure the AI Persona and Parameters
const config = {
    temperature: 0.8,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
    systemInstruction: `You are an AI assistant for a brand named "0waste".
You act as an empathetic customer service representative.
Always respond in Indonesian.
Use a modern, minimalist tone, and be helpful but concise.
"0waste" is a food waste management startup that partners with restaurants and hotels to rescue high-quality, untouched surplus food and sell it at discounted prices.
Our brand colors are represented by a sleek dark blue (#40407a) and minimalist elements. Keep this modern brand identity in mind.
Your main responsibilities:
1. Explain what 0waste does concisely when asked.
2. Educate users about food waste if they inquire.
3. Help users find discounted food near them or guide them on how to place an order (delivery/pickup).
4. If asked about something unrelated to food, sustainability, or 0waste's services, politely redirect the conversation back to how 0waste can help them save money and the planet.`,
};

// API Endpoint to handle chat
app.post('/api/chat', async (req, res) => {
    try {
        const { conversation } = req.body;

        if (!conversation || !Array.isArray(conversation)) {
            return res.status(400).json({ error: 'Conversation must be a valid array' });
        }

        const model = genAI.getGenerativeModel({
            model: process.env.MODEL || "gemini-3-flash-preview",
            systemInstruction: config.systemInstruction,
        });

        // The newest message
        const lastMessage = conversation[conversation.length - 1].parts[0].text;
        
        // The previous history to load context
        const history = conversation.slice(0, -1).map(item => ({
            role: item.role,
            parts: item.parts
        }));

        const chat = model.startChat({
            history: history,
            generationConfig: {
                temperature: config.temperature,
                topP: config.topP,
                topK: config.topK,
                maxOutputTokens: config.maxOutputTokens,
            }
        });

        const result = await chat.sendMessage(lastMessage);
        const responseText = result.response.text();

        return res.status(200).json({ result: responseText });
    } catch (error) {
        console.error("AI Generation Error: ", error);
        return res.status(500).json({ error: 'Terjadi kesalahan saat menghubungi API AI' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});