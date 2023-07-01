// PRISMADB

import { PrismaClient } from "@prisma/client";
import { tDbTask, tTaskCreationForm, tTaskUpdateForm } from "../app/dashboard/task/lib/types";
import { revalidatePath } from "next/cache";

export const prisma = new PrismaClient();

export async function getDbTasks(): Promise<tDbTask[]> {
  const tasks = (await prisma.task.findMany({
    orderBy: {
      id: "asc",
    },
  })) as unknown as tDbTask[];
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

export async function addManyDbTask(tasks: tTaskCreationForm[]) {
  const createdTasks = await prisma.task.createMany({
    data: tasks.map((task) => {
      return {
        parentId: task.parentId,
        name: task.name,
        chat_history: task.chat_history,
      };
    }),
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

export async function updateDbTask({ id, ...newValues }: tTaskUpdateForm) {
  // if (newValues.status && Object.entries(Status).includes(newValues.status)) {
  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      ...(newValues as any),
      // TODO: Fix poor typing conventions
    },
  });

  revalidatePath("/dashboard/task");
  return updatedTask;
}
