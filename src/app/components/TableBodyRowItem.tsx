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
      className={`${!stretch && "px-6 py-4"} whitespace-nowrap text-sm text-gray-500`}
    >
      {children}
    </td>
  );
}
