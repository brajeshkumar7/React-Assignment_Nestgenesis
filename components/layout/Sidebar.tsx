"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const navigation = [
  { href: "/", label: "Overview", icon: "home" as const },
  { href: "/products", label: "Products", icon: "package" as const },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-white lg:flex">
      <Link href="/products" className="flex h-[72px] items-center gap-3 border-b border-line px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600" aria-label="Northstar workspace home">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-700 text-white">
          <Icon name="sparkles" size={17} />
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-ink">northstar<span className="text-brand-600">.</span></span>
      </Link>

      <div className="px-4 pt-7">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Workspace</p>
        <nav aria-label="Main navigation" className="mt-3 space-y-1">
          {navigation.map((item) => {
            const active = item.href === "/products" ? pathname.startsWith("/products") : pathname === item.href;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`group flex h-10 items-center gap-3 rounded-control px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${active ? "bg-brand-50 font-medium text-brand-800" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}
                href={item.href}
                key={item.href}
              >
                <Icon name={item.icon} size={17} className={active ? "text-brand-700" : "text-slate-400 group-hover:text-slate-600"} />
                {item.label}
                {item.href === "/products" ? <span className="ml-auto rounded bg-white px-1.5 py-0.5 text-[10px] text-slate-500">12</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-line p-4">
        <div className="flex items-center gap-3 rounded-control px-2 py-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e9e2d6] text-xs font-semibold text-[#6e5840]" aria-hidden="true">AS</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-medium text-ink">Atelier Studio</span>
            <span className="mt-0.5 block truncate text-[11px] text-muted">Workspace owner</span>
          </span>
          <Icon name="dots" size={17} className="text-slate-400" />
        </div>
        <Button className="mt-3 w-full justify-start" variant="ghost" size="sm" disabled title="Authentication is introduced in a later step">
          <Icon name="logout" size={16} /> Log out
        </Button>
      </div>
    </aside>
  );
}
