import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AutoTask",
  description: "LLM powered task management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
