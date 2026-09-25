"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function Sidebar() {
  const path = usePathname();
  return <aside className="sidebar">
    <Link href="/products" className="brand"><span className="brand-mark"><Icon name="box" size={21} /></span><span>atelier<span className="brand-dot">.</span><small>COMMERCE OS</small></span></Link>
    <div className="side-label">WORKSPACE</div>
    <Link href="/products" className={`nav-item ${path.startsWith("/products") ? "active" : ""}`}><Icon name="grid" /><span>Products</span><span className="nav-count">01</span></Link>
    <div className="sidebar-bottom"><div className="workspace-card"><span className="workspace-avatar">A</span><span><b>Atelier Studio</b><small>Free workspace</small></span><Icon name="down" size={15} /></div><div className="sidebar-version">PRODUCTS · 2025</div></div>
  </aside>;
}
