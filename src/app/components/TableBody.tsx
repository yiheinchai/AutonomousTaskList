export default function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      {children}
    </tbody>
  );
}
