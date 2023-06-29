import { Button } from "@nextui-org/react";
import { Card, Text } from "@nextui-org/react";
import { HierarchicalTask } from "../page";
import TaskList from "./taskList";
import { generateSubtasks } from "../utils/openai_api";

export default function Task(props: { task: HierarchicalTask }) {
  if (!props) return null;
  return (
    <>
      <Card isHoverable variant="bordered" css={{ padding: "$2" }}>
        <div className="flex flex-row justify-between p-1 items-center">
          <Text size="$sm">{props.task.name}</Text>
          <Button.Group css={{ margin: "$0" }} size="xs" flat>
            <Button>Add</Button>
            <Button
              onPress={async () => {
                console.log("generating subtasks...");
                const subtasks = await generateSubtasks(props.task.name);
                console.log(subtasks);
              }}
            >
              Auto
            </Button>
            <Button>Delete</Button>
            <Button>Execute</Button>
          </Button.Group>
        </div>
      </Card>
      {props.task.subtasks.length > 0 && (
        <div className="ml-6">
          <TaskList tasks={props.task.subtasks} />
        </div>
      )}
    </>
  );
}
