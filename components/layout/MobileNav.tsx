"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function MobileNav({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Overview", icon: "home" as const },
    { href: "/products", label: "Products", icon: "package" as const },
  ];

  return (
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className={`absolute inset-x-0 top-full z-40 border-b border-line bg-white px-4 py-3 shadow-lg lg:hidden ${open ? "block" : "hidden"}`}>
      {links.map((link) => {
        const active = link.href === "/products" ? pathname.startsWith("/products") : pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 items-center gap-3 rounded-control px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${active ? "bg-brand-50 font-medium text-brand-800" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <Icon name={link.icon} size={17} />{link.label}
          </Link>
        );
      })}
      <div className="mt-3 border-t border-line pt-3">
        <button type="button" disabled className="flex h-10 w-full items-center gap-3 rounded-control px-3 text-sm text-slate-400 disabled:cursor-not-allowed">
          <Icon name="logout" size={16} />Log out
          <span className="ml-auto text-[10px]">Coming soon</span>
        </button>
      </div>
    </nav>
  );
}
