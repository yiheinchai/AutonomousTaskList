import TableBodyRow from "@/app/components/TableBodyRow";
import TableBodyRowItem from "@/app/components/TableBodyRowItem";
import TaskList from "./TaskList";
import { tTask } from "../lib/types";
import Table from "@/app/components/Table";
import TableBody from "@/app/components/TableBody";
import Chip from "@/app/components/Chip";
import ButtonGroup from "@/app/components/ButtonGroup";
import Button from "@/app/components/Button";
import FlexEnd from "@/app/components/FlexEnd";
import { addDbSubtask } from "@/utils/database";
import { convertTaskToDbTask } from "../utils/utils";
import TaskActions from "./TaskActions";

export default function Task({ task }: { task: tTask }) {
  return (
    <>
      <TableBodyRow>
        <TableBodyRowItem>{task.name}</TableBodyRowItem>
        <TableBodyRowItem>
          <Chip name={task.status} />
        </TableBodyRowItem>
        <TableBodyRowItem>{task.assignee}</TableBodyRowItem>
        <TableBodyRowItem>
          <TaskActions task={task} />
        </TableBodyRowItem>
      </TableBodyRow>
      {task.subtasks.length > 0 && (
        <TableBodyRow>
          <TableBodyRowItem stretch>
            <TaskList tasks={task.subtasks} withHeader={false} />
          </TableBodyRowItem>
        </TableBodyRow>
      )}
    </>
  );
}
