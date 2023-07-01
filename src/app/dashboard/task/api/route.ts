import { addDbSubtask, getDbTasks } from "@/utils/database";
import { convertDbTaskToTask } from "../utils/utils";
import { NextRequest, NextResponse } from "next/server";
import { tDbTask } from "../lib/types";

export const revalidate = 60;

export async function GET() {
  const tasks = await getDbTasks();
  const hierarchicalTasks = convertDbTaskToTask(tasks);

  return NextResponse.json(hierarchicalTasks);
}

export async function POST(req: NextRequest) {
  const task = await req.json();

  if (!task || !task.name || !task.parentId) {
    return NextResponse.error();
  }

  const response = await addDbSubtask(task.parentId, task.name);

  return NextResponse.json(response);
}
