import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are an AI assistant helping prepare a structured set of questions for a job interview.

Job Role: ${role}
Experience Level: ${level}
Technology Stack: ${techstack}
Focus: ${type} (behavioral or technical)
Number of Questions: ${amount}

Please generate a concise list of high-quality interview questions aligned with the role, level, and technologies mentioned. The questions should be strictly focused on the indicated type.

Important:
- Return only the questions in a valid JSON array format like: ["Question 1", "Question 2", "Question 3"]
- Avoid any special characters such as "/", "*", etc., as the questions will be read by a voice assistant.
- Do not include any additional commentary or explanation—only the question strings inside the array.

Thank you.`,
    });

    // Clean any markdown code fences (like ```json ... ```) before parsing
    const cleanQuestions = questions
      .trim()
      .replace(/^```json/, '')
      .replace(/^```/, '')      // In case no "json" label, just ```
      .replace(/```$/, '')
      .trim();

    const parsedQuestions = JSON.parse(cleanQuestions);

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
