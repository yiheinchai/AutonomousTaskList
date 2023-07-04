"use client";

export default function Button({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: (e: any) => void;
}) {
  return (
    <button
      {...props}
      onClick={(e: any) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className="px-4 py-2 font-medium text-gray-600 transition-colors duration-200 sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
