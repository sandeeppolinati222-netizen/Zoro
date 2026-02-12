
import { GoogleGenAI, Type } from "@google/genai";
import { ConstructionReport, ProjectInput } from "../types";

export async function generateConstructionReport(input: ProjectInput): Promise<ConstructionReport> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const prompt = `
    Act as a senior construction project manager and consultant. 
    Generate a comprehensive construction project report based on the following details:
    Project Name: ${input.name}
    Project Type: ${input.type}
    Size: ${input.size}
    Planned Budget: ${input.budget}
    Location: ${input.location}
    Description: ${input.description}

    The report must be professional, structured, and realistic. 
    Make sure to provide granular cost estimations, logical timelines, 
    and insightful sustainability suggestions. 
    Remind the user that all estimates are approximate.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectOverview: { type: Type.STRING },
          totalEstimatedCost: { type: Type.NUMBER },
          totalDurationWeeks: { type: Type.NUMBER },
          phases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                durationWeeks: { type: Type.NUMBER },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["name", "description", "durationWeeks", "tasks"]
            }
          },
          materials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                category: { type: Type.STRING },
                estimatedQuantity: { type: Type.STRING },
                unit: { type: Type.STRING },
                estimatedCost: { type: Type.NUMBER }
              },
              required: ["item", "category", "estimatedQuantity", "unit", "estimatedCost"]
            }
          },
          costs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                estimatedAmount: { type: Type.NUMBER },
                notes: { type: Type.STRING }
              },
              required: ["category", "estimatedAmount", "notes"]
            }
          },
          timeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phaseName: { type: Type.STRING },
                startWeek: { type: Type.NUMBER },
                endWeek: { type: Type.NUMBER }
              },
              required: ["phaseName", "startWeek", "endWeek"]
            }
          },
          risks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                risk: { type: Type.STRING },
                severity: { type: Type.STRING },
                mitigation: { type: Type.STRING }
              },
              required: ["risk", "severity", "mitigation"]
            }
          },
          sustainability: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                feature: { type: Type.STRING },
                benefit: { type: Type.STRING },
                score: { type: Type.NUMBER }
              },
              required: ["feature", "benefit", "score"]
            }
          },
          optimizations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                suggestion: { type: Type.STRING },
                impact: { type: Type.STRING },
                difficulty: { type: Type.STRING }
              },
              required: ["suggestion", "impact", "difficulty"]
            }
          }
        },
        required: ["projectOverview", "totalEstimatedCost", "totalDurationWeeks", "phases", "materials", "costs", "timeline", "risks", "sustainability", "optimizations"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate valid project data. Please try again.");
  }
}
