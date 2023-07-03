import { getTask, getTasks } from "@/app/dashboard/task/db/methods";
import { convertDbTaskToTask } from "@/app/dashboard/task/utils/utils";
import { addDbSubtask, getDbTasks } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req);
  const reqBody = await req.json();

  const task = await getTask(reqBody.id);

  return NextResponse.json(task);
}

export async function GET() {
  const tasks = await getTasks();

  return NextResponse.json(tasks);
}
