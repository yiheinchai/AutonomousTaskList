import Image from "next/image";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export default function UserInfo({ user }: { user: User }) {
  return (
    <div>
      <div className="relative h-10 w-10">
        <Image
          className="h-full w-full rounded-full object-cover object-center"
          src={user.avatar}
          alt=""
        />
        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
      </div>
      <div className="text-sm">
        <div className="font-medium text-gray-700">{user.name}</div>
        <div className="text-gray-400">{user.email}</div>
      </div>
    </div>
  );
}
