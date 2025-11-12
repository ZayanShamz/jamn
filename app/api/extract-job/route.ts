import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ExtractedJob } from "@/lib/types";

// Initialize OpenAI client with Gemini compatibility
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Uses shared ExtractedJob type from lib/types

const SYSTEM_PROMPT = `
You are an expert job data extractor. Extract key details from the job posting text provided by the user.
Return ONLY a valid JSON object with this exact structure (no markdown, no explanations, no code blocks):

{
  "job": {
    "job_title": "string",
    "company": "string",
    "location": "string",
    "work_arrangement": "Hybrid | Remote | On-site",
    "employment_type": "Full-time | Part-time |Internship | Contract",
    "job_description": "Brief summary (2–3 lines) of what the job is about",
    "responsibilities": "Short summary (bullet points or sentences, 3–5 lines max)",
    "requirements": "Short summary (bullet points or sentences, 3–5 lines max)",
    "salary": "₹15,00,000 - ₹25,00,000 a year | Not disclosed | etc."
  }
}


Rules:
- must keep the response concise and to the point and under 500 words.
-If a field is missing, use "Not specified".
-Keep text concise (no more than a few sentences per section).
-Summarize only key information, avoid copying the full job text.
-Clean extra whitespace or HTML tags.
-Employment type: infer from words like “remote,” “hybrid,” or “full-time.”
-Salary: preserve exact wording or say "Not disclosed".
-If the text isn’t a valid job posting, return:
{ "error": "Input text is not a job posting or lacks sufficient job-related information." }
`.trim();

export async function POST(request: NextRequest) {
  try {
    console.log("Received request for job extraction.");

    const text = await request.text();

    // if empty string gets passed - very unlikely from frontend but just in case
    if (!text.trim()) {
      return NextResponse.json(
        { error: "Empty or missing job description." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Extract job details from this posting:\n\n${text}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1024,
    });

    const rawContent = response.choices[0]?.message?.content?.trim();
    if (!rawContent) {
      throw new Error("Empty response from Gemini");
    }

    let jsonString = rawContent
      .replace(/```json/g, "") // Remove ```json
      .replace(/```/g, "") // Remove ```
      .replace(/^[\s\S]*?\{/, "{") // Remove text before first {
      .replace(/\}[^\}]*$/g, "}") // Remove text after last }
      .trim();

    let parsed: any;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      console.error("JSON parse failed on:", jsonString);
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw: rawContent },
        { status: 500 }
      );
    }

    if (typeof parsed !== "object" || parsed === null) {
      return NextResponse.json(
        { error: "AI returned non-object", raw: rawContent },
        { status: 500 }
      );
    }

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const job = {
      job_title: parsed.job?.job_title?.trim() || "Not specified",
      company: parsed.job?.company?.trim() || "Not specified",
      location: parsed.job?.location?.trim() || "Not specified",
      work_arrangement: parsed.job?.work_arrangement?.trim() || "Not specified",
      employment_type: parsed.job?.employment_type?.trim() || "Not specified",
      job_description: parsed.job?.job_description?.trim() || "Not specified",
      responsibilities: parsed.job?.responsibilities?.trim() || "Not specified",
      requirements: parsed.job?.requirements?.trim() || "Not specified",
      salary: parsed.job?.salary?.trim() || "Not specified",
    };

    console.log("Extracted job data:", job);

    return NextResponse.json({ job }, { status: 200 });
  } catch (error: any) {
    console.error("Gemini extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract job data", details: error.message },
      { status: 500 }
    );
  }
}
