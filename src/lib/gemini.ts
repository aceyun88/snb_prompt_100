import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

export async function improvePrompt(userPrompt: string): Promise<string> {
  const systemInstruction = `당신은 프롬프트 엔지니어링 전문가입니다.
사용자가 입력한 단순한 프롬프트를 전문가 수준의 구조화된 프롬프트로 개선해주세요.
다음 요소를 포함하여 구체적이고 명확하게 재작성하세요:
1. 역할 부여 (Persona)
2. 명확한 컨텍스트 및 목표 (Context & Objective)
3. 구체적인 지시사항 및 제약조건 (Instructions & Constraints)
4. 출력 형식 (Output Format)

반드시 개선된 프롬프트 텍스트만 출력하고, 다른 설명이나 인사말은 포함하지 마세요.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("프롬프트를 개선하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}
