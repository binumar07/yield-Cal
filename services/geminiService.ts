import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAgronomicAdvice = async (
  vegetable: string,
  farmSize: number,
  projectedKg: number,
  projectedBags: number
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment to use the AI Agronomist.";
  }

  try {
    const prompt = `
      Act as an expert agronomist.
      I am planning to grow '${vegetable}' on a farm size of ${farmSize} units.
      Based on my calculations, the estimated maximum yield is ${projectedKg.toFixed(2)} kg, which equates to approximately ${projectedBags.toFixed(1)} bags.
      
      Please provide:
      1. A brief validation of whether this yield seems realistic for standard farming practices (assuming the unit is roughly equivalent to a standard plot, or highlighting if it seems high/low).
      2. Three critical farming tips specific to maximizing quality for ${vegetable}.
      3. Potential risks (pests or weather) associated with this crop.
      
      Format the response in clear Markdown with headers. Keep it concise (under 300 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response on simple queries
      }
    });

    return response.text || "No advice could be generated at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to the AI Agronomist. Please try again later.";
  }
};
