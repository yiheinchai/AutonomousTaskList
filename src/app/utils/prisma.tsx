// PRISMADB

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getTasks() {
  return prisma.task.findMany();
}

export async function addDBSubtask(parentTask: HierarchicalTask, taskName: string) {
  return prisma.task.create({
    data: {
      parentId: parentTask.id,
      name: taskName,
    },
  });
}
