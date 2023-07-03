import { convertDbTaskToTask } from "@/app/dashboard/task/utils/utils";
import { addDbSubtask, getDbTasks } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  const tasks = await getDbTasks();
  const hierarchicalTasks = convertDbTaskToTask(tasks);

  return NextResponse.json(hierarchicalTasks);
}

export async function POST(req: NextRequest) {
  console.log(req);
  const reqBody = await req.json();

  // console.log(task);

  // if (!task || !task.name || !task.parentId) {
  //   return NextResponse.error();
  // }

  // const response = await addDbSubtask(task.parentId, task.name);

  return NextResponse.json(reqBody);
}
