import Button from "./Button";
export default function FormButtonInput({
  children,
  action,
  metadata,
  inputFields,
}: {
  children: React.ReactNode;
  action: (formData: FormData) => void;
  metadata?: { [key: string]: string | number };
  inputFields?: { [key: string]: string | number }[];
}) {
  return (
    <div className="group overflow-visible">
      <Button>{children}</Button>
      <div className="relative">
        <form
          className="invisible absolute group-hover:visible hover:delay-300 pt-2 -ml-20"
          action={action}
        >
          <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 lg:flex-col dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            {inputFields != null &&
              inputFields.map(({ ...props }, index) => {
                return (
                  <input
                    type="text"
                    className="px-6 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                    key={index}
                    {...props}
                  ></input>
                );
              })}
            {metadata != null &&
              Object.entries(metadata).map(([key, value]) => {
                return <input type="hidden" key={key + value} name={key} value={value}></input>;
              })}
            <input type="submit" hidden />
          </div>
        </form>
      </div>
    </div>
  );
}
