import Image from "next/image";

export default function ChatBubbleSystem({ content }: { content: string }) {
  return (
    <li className="flex gap-x-2 sm:gap-x-4">
      <Image
        priority
        src="/images/profile_yh.jpg"
        className="object-cover mx-2 rounded-full h-9 w-9"
        alt="Yi Hein"
        width={36}
        height={36}
      />

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
        <p className="mb-1.5 text-xs text-gray-800 dark:text-white">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </div>
      {/* End Card */}
    </li>
  );
}
