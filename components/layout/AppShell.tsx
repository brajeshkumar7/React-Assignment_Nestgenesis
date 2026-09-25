import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar />
      <div className="min-h-screen lg:pl-60">
        <Header />
        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}
