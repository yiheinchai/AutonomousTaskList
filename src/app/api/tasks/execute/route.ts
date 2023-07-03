import { executeGPTTask } from "@/app/dashboard/task/db/methods";
import { tTask } from "@/app/dashboard/task/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody: tTask = await req.json();

  const updatedTask = await executeGPTTask(reqBody);

  return NextResponse.json(updatedTask);
}
