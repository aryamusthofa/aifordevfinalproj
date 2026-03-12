import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.MODEL || "gemini-3-flash-preview"});
async function test() {
    try {
        const result = await model.generateContent("Halo!");
        console.log(result.response.text());
    } catch(e) {
        console.error("ERROR TESTING GEMINI:");
        console.error(e);
    }
}
test();
