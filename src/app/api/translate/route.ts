import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const STYLES: Record<string, string> = {
  casual:
    "Rewrite in very casual, relaxed everyday English. Use contractions, filler words, and a laid-back tone like texting a friend.",
  genz: "Rewrite in Gen Z internet slang. Use terms like 'no cap', 'fr fr', 'lowkey', 'slay', 'based', 'bussin', 'bet', etc. Keep it natural, not forced.",
  bro: "Rewrite like a stereotypical bro/dude. Heavy use of 'bro', 'dude', 'like', 'literally', 'no way'. Over-the-top casual energy.",
  street:
    "Rewrite in street/hip-hop slang style. Use slang like 'yo', 'fam', 'deadass', 'aight', 'whip'. Keep it authentic, not a caricature.",
  british:
    "Rewrite in casual British English slang. Use terms like 'mate', 'innit', 'proper', 'rubbish', 'cheeky', 'bloke'. Sound like a Londoner at the pub.",
  southern:
    "Rewrite in Southern US dialect. Use 'y'all', 'fixin to', 'reckon', 'bless your heart'. Warm and folksy tone.",
};

export async function POST(req: NextRequest) {
  try {
    const { text, style } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: "Text must be under 1000 characters" },
        { status: 400 }
      );
    }

    const stylePrompt = STYLES[style] || STYLES.casual;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a slang translator. ${stylePrompt} Only output the rewritten text — no explanations, no quotes, no preamble.`,
        },
        { role: "user", content: text },
      ],
      max_tokens: 300,
      temperature: 0.9,
    });

    const result = response.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: "Translation failed. Please try again." },
      { status: 500 }
    );
  }
}
