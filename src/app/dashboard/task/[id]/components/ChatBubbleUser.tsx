import Image from "next/image";

export default function ChatBubbleUser({ content }: { content: string }) {
  return (
    <li className="max-w-2xl ml-auto flex justify-end gap-x-2 sm:gap-x-4">
      <div className="grow text-end space-y-3">
        {/* {/* Card */}
        <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-sm">
          <p className="text-xs text-white">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </p>
        </div>
        {/* {/* End Card */}
      </div>

      <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
        <span className="text-sm font-medium text-white leading-none">YH</span>
      </span>
    </li>
  );
}
