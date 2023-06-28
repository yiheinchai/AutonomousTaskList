import { Button } from "@nextui-org/react";
import { Card, Text } from "@nextui-org/react";
import { TaskList, TaskType } from "./taskList";

export default function Task({ props }: { props: TaskType }) {
  if (!props) return null;
  return (
    <>
      <Card isHoverable variant="bordered" css={{ padding: "$2" }}>
        <div className="flex flex-row justify-between p-1 items-center">
          <Text size="$sm">{props.name}</Text>
          <Button.Group css={{ margin: "$0" }} size="xs" flat>
            <Button>Add</Button>
            <Button>Auto</Button>
            <Button>Delete</Button>
            <Button>Execute</Button>
          </Button.Group>
        </div>
      </Card>
    </>
  );
}
