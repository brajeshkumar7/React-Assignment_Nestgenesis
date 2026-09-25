"use client";

import { useAuth } from "@/lib/auth/auth";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function Header() {
  const { user, logout } = useAuth();
  return <header className="topbar"><div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><b>Products</b></div><div className="topbar-actions"><span className="status-pill"><span className="status-dot" /> All systems normal</span><div className="user-menu"><span className="user-avatar">{user?.firstName?.[0] || "E"}</span><span className="user-label">{user?.firstName || "Emily"} {user?.lastName || "Stone"}</span><Button variant="ghost" className="logout-button" onClick={logout} aria-label="Log out" title="Log out"><Icon name="logout" size={17} /></Button></div></div></header>;
}
