export default function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-gray-100 border-t border-gray-100">{children}</tbody>;
}
