export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">{children}</table>
    </div>
  );
}
