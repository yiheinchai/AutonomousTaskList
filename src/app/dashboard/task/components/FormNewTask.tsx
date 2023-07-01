import { addDbSubtask } from "@/utils/database";

export default function FormNewTask({ parentId }: { parentId: number }) {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const taskName = formData.get("name");
    if (!taskName) return;
    await addDbSubtask(parentId, String(taskName));
  };
  return (
    <div className="relative">
      <form
        className="invisible absolute group-hover:visible hover:delay-300 p-2"
        action={handleSubmit}
      >
        <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
            type="text"
            name="name"
            placeholder="Enter new task name"
            aria-label="Enter new task name"
          />
          <input type="hidden" name="parentId" value={parentId}></input>
          <input type="submit" hidden />
        </div>
      </form>
    </div>
  );
}
