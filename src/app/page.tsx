import Image from "next/image";
import TaskList from "./components/taskList";
import { PrismaClient } from "@prisma/client";
import Main from "./components/main";
import { convertToHierarchical } from "./utils/utils";
import { getTasks } from "./utils/prisma";

export default async function Home() {
  const tasks = await getTasks();
  const hierarchicalTasks = convertToHierarchical(tasks);
  return <Main tasks={hierarchicalTasks} />;
}
