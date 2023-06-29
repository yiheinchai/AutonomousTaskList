export default function TableBodyRow({ children }: { children: React.ReactNode }) {
  return <tr className="dark:hover:dark:bg-gray-800 hover:bg-gray-50 ">{children}</tr>;
}
