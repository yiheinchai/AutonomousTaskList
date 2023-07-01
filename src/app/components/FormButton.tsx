export default function FormButton({
  children,
  action,
  metadata,
}: {
  children: React.ReactNode;
  action: (formData: FormData) => void;
  metadata?: { [key: string]: string | number };
}) {
  return (
    <form action={action}>
      <button className="px-4 py-2 font-medium text-gray-600 transition-colors duration-200 sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
        {children}
        {metadata != null &&
          Object.entries(metadata).map(([key, value]) => {
            return <input type="hidden" key={key + value} name={key} value={value}></input>;
          })}
      </button>
    </form>
  );
}
