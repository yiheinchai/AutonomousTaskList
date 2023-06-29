import Table from "@/app/components/Table";
import TableBody from "@/app/components/TableBody";
import TableHead from "@/app/components/TableHead";
import Task from "./Task";
import { tTask } from "../lib/types";

export default function TaskList({
  withHeader = true,
  tasks,
}: {
  withHeader?: boolean;
  tasks: tTask[];
}) {
  return (
    <Table>
      {withHeader && <TableHead columns={["Name", "Status", "Assignee", ""]} />}
      <TableBody>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  );
}
