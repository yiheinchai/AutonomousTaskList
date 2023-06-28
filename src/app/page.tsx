import Image from "next/image";
import TaskList from "./components/taskList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTasks() {
  return prisma.task.findMany();
}

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <div className="w-full px-8">
        <h1>TaskList</h1>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
