export default function TableBodyRowItem({
  children,
  stretch,
  widthPercentage,
  isText,
}: {
  children: React.ReactNode;
  stretch?: boolean;
  widthPercentage?: number;
  isText?: boolean;
}) {
  return (
    <td
      colSpan={stretch ? 100 : undefined}
      className={`${
        !stretch ? "px-6 py-4" : "pl-6 py-1"
      } text-sm text-gray-500 dark:text-gray-300 max-w-0 ${
        isText ? "truncate" : ""
      } overflow-visible`}
      style={widthPercentage ? { width: `${widthPercentage}%` } : undefined}
    >
      {children}
    </td>
  );
}
