"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = pathname.startsWith("/products") ? "Products" : "Overview";

  return (
    <header className="relative z-20 flex h-[68px] items-center justify-between border-b border-line bg-white px-4 sm:px-6 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="size-9 px-0 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          variant="ghost"
        >
          <Icon name={menuOpen ? "close" : "menu"} size={19} />
        </Button>
        <div className="min-w-0">
          <div className="hidden items-center gap-2 text-[11px] text-slate-400 sm:flex">
            <span>Workspace</span><Icon name="chevron" size={13} /><span className="text-slate-500">Catalog</span>
          </div>
          <h1 className="truncate text-sm font-semibold tracking-tight text-ink sm:mt-1">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-line px-2.5 py-1.5 text-[11px] text-slate-500 md:flex">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />Workspace active
        </div>
        <div className="flex items-center gap-2 border-l border-line pl-3 sm:pl-4">
          <span className="grid size-8 place-items-center rounded-full bg-[#e9e2d6] text-[11px] font-semibold text-[#6e5840]" aria-hidden="true">AS</span>
          <div className="hidden sm:block">
            <p className="text-xs font-medium leading-4 text-ink">Alex Morgan</p>
            <p className="text-[10px] leading-4 text-muted">Administrator</p>
          </div>
        </div>
      </div>
      <MobileNav open={menuOpen} onNavigate={() => setMenuOpen(false)} />
    </header>
  );
}
