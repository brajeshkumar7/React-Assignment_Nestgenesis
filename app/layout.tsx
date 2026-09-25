import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Admin Dashboard",
  description: "Product Admin Dashboard project foundation.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><AuthProvider>{children}</AuthProvider></body></html>;
}
