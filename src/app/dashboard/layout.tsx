import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <Sidebar />
      <div className="flex-1 ml-50">{children}</div>
    </section>
  );
}
