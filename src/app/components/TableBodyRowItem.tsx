export default function TableBodyRowItem({
  children,
  stretch,
}: {
  children: React.ReactNode;
  stretch?: boolean;
}) {
  return (
    <td
      colSpan={stretch ? 100 : undefined}
      className={`${
        !stretch ? "px-6 py-4" : "pl-6 py-1"
      } text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap`}
    >
      {children}
    </td>
  );
}
