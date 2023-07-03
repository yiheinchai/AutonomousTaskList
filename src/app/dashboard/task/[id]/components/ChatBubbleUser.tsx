import Image from "next/image";

export default function ChatBubbleUser({ content }: { content: string }) {
  return (
    <li className="max-w-2xl ml-auto flex justify-end gap-x-2 sm:gap-x-4">
      <div className="grow text-end space-y-3">
        {/* {/* Card */}
        <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-white">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </p>
        </div>
        {/* {/* End Card */}
      </div>

      <Image
        priority
        src="/images/profile_yh.jpg"
        className="object-cover mx-2 rounded-full h-9 w-9"
        alt="Yi Hein"
        width={36}
        height={36}
      />
    </li>
  );
}
