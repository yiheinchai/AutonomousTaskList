export default function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
      {children}
    </div>
  );
}
