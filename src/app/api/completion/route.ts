import { call_gpt_with_stream } from "@/external_api/openai";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  if (reqBody.prompt == null) return;

  const stream = await call_gpt_with_stream(reqBody.prompt, reqBody?.chat_history);

  return new Response(stream, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "no-cache",
    },
  });
}
