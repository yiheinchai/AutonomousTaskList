// Usage: Provide a list of string of column names, if you want an empty column for actions, put an empty string

export default function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((columnName, index) => {
          return (
            <th
              scope="col"
              key={columnName}
              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              {columnName}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
