// Usage: Provide a list of string of column names, if you want an empty column for actions, put an empty string

export default function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((columnName, index) => {
          return (
            <th scope="col" key={index} className="px-6 py-4 font-medium text-gray-900">
              {columnName}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
