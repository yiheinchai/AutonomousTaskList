import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full relative flex z-0">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto">{children}</div>
    </section>
  );
}
