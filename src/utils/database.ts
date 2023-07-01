// PRISMADB

import { PrismaClient } from "@prisma/client";
import { tDbTask, tTask } from "../app/dashboard/task/lib/types";
import { revalidatePath } from "next/cache";

export const prisma = new PrismaClient();

export async function getDbTasks(): Promise<tDbTask[]> {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
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

export async function addManyDbTask(parentId: number, taskNames: string[]) {
  const createdTasks = await prisma.task.createMany({
    data: taskNames.map((taskName) => ({
      parentId,
      name: taskName,
    })),
  });
  revalidatePath("/dashboard/task");
  return createdTasks;
}

export async function deleteDbTask(id: number) {
  const deletedSubtasks = await prisma.task.deleteMany({
    where: {
      parentId: id,
    },
  });
  console.log("deleted subtasks", deletedSubtasks);

  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  });

  console.log("deleted task", deletedTask);

  revalidatePath("/dashboard/task");
  return deletedTask;
}

export async function updateDbTask(id: number, newName: string) {
  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      name: newName,
    },
  });

  revalidatePath("/dashboard/task");
  return updatedTask;
}
