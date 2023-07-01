// PRISMADB

import { PrismaClient } from "@prisma/client";
import { tDbTask, tTask } from "../app/dashboard/task/lib/types";
import { revalidatePath } from "next/cache";

export const prisma = new PrismaClient();

export async function getDbTasks(): Promise<tDbTask[]> {
  const tasks = await prisma.task.findMany();
  return tasks;
}

export async function addDbSubtask(parentId: number, taskName: string) {
  const createdTask = await prisma.task.create({
    data: {
      parentId,
      name: taskName,
    },
  });

  revalidatePath("/dashboard/task");
  return createdTask;
}
