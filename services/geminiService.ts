
import { GoogleGenAI, Type } from "@google/genai";
import { Book } from '../types';

export async function getPersonalizedRecommendations(
    userInterests: string,
    bookCatalog: Book[]
): Promise<number[]> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const bookListForPrompt = bookCatalog.map(book => 
        `ID: ${book.id}, Title: "${book.title}", Author: ${book.author}, Genre: ${book.genre}, Summary: ${book.summary}`
    ).join('\n');

    const prompt = `
        You are a highly knowledgeable and discerning bookseller at an elegant bookstore. 
        A customer has shared their interests with you. Your task is to recommend 3 books from the store's catalog that they would love.

        CUSTOMER INTERESTS:
        "${userInterests}"

        AVAILABLE BOOKS CATALOG:
        ${bookListForPrompt}

        Based on the customer's interests, carefully analyze the catalog and select exactly 3 books. Return your recommendations as a JSON object that strictly follows the provided schema. The JSON object should contain a single key "book_ids", which is an array of the integer IDs for your 3 recommended books. Do not recommend books that are not in the catalog. Do not include any other text or explanation in your response.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        book_ids: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.INTEGER,
                            },
                        },
                    },
                    required: ["book_ids"]
                },
            },
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);

        if (result && Array.isArray(result.book_ids)) {
            return result.book_ids as number[];
        } else {
            console.error("Invalid JSON structure received from API:", result);
            return [];
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch recommendations from Gemini API.");
    }
}
