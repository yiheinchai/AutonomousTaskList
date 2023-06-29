export default function Chip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
      {name}
    </span>
  );
}
