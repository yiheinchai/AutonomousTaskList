import Image from "next/image";

export default function ChatBubbleSystem({ content }: { content: string }) {
  return (
    <li className="flex gap-x-2 sm:gap-x-4">
      <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-emerald-400">
        <span className="text-sm font-medium text-white leading-none">AI</span>
      </span>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
        <div className="mb-1.5 text-sm text-gray-800 dark:text-white whitespace-pre-wrap">
          {content}
        </div>
      </div>
      {/* End Card */}
    </li>
  );
}
