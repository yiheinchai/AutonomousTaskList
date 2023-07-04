import { generateGPTSubtasks } from "@/app/dashboard/task/db/methods";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  const createdSubtasks = await generateGPTSubtasks(reqBody);

  return NextResponse.json(createdSubtasks);
}
