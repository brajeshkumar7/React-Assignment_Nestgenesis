"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Loading from "@/components/ui/Loading";
import { useAuth } from "@/lib/auth/auth";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`); }, [ready, user, router, pathname]);
  if (!ready || !user) return <div className="auth-loading"><Loading label="Preparing your workspace" /></div>;
  return <div className="app-shell"><Sidebar /><div className="main-column"><Header /><main className="main-content">{children}</main></div></div>;
}
