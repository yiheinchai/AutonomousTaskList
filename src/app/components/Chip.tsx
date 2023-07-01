const lightColors = {
  emerald: "bg-emerald-100/60 bg-emerald-500 text-emerald-500",
  sky: "bg-sky-100/60 bg-sky-500 text-sky-500",
  violet: "bg-violet-100/60 bg-violet-500 text-violet-500",
}; // For Tailwind CSS https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

export default function Chip({ name, color }: { name: string; color?: string }) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-${
        color || "emerald"
      }-100/60 dark:bg-gray-800`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-${color || "emerald"}-500`}></span>
      <h2 className={`text-sm font-normal text-${color || "emerald"}-500`}>{name}</h2>
    </div>
  );
}
