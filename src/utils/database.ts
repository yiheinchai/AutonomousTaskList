// PRISMADB

import { PrismaClient } from "@prisma/client";
import { tTask } from "../app/dashboard/task/lib/types";

export const prisma = new PrismaClient();

export async function getTasks() {
  return prisma.task.findMany();
}

export async function addDBSubtask(parentTask: tTask, taskName: string) {
  return prisma.task.create({
    data: {
      parentId: parentTask.id,
      name: taskName,
    },
  });
}
