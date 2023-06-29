import TaskList from "./components/TaskList";

export default function Page() {
  return (
    <TaskList
      withHeader
      tasks={[
        {
          id: 1,
          name: "do this shit",
          assignee: "myself",
          status: "TO DO",
          subtasks: [
            {
              id: 2,
              name: "do this shit2a",
              assignee: "myself",
              status: "TO DO",

              subtasks: [
                { id: 3, status: "TO DO", name: "do this shit3", assignee: "myself", subtasks: [] },
              ],
            },
            {
              id: 4,
              name: "do this shit2b",
              assignee: "myself",
              status: "TO DO",
              subtasks: [
                { id: 5, status: "TO DO", name: "do this shit3", assignee: "myself", subtasks: [] },
              ],
            },
          ],
        },
        {
          id: 6,
          name: "boo this shit",
          assignee: "myself",
          status: "TO DO",
          subtasks: [
            { id: 7, status: "TO DO", name: "boo this shit2", assignee: "myself", subtasks: [] },
          ],
        },
      ]}
    />
  );
}
