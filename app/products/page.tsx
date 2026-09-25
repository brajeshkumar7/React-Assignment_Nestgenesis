"use client";

import { useEffect, useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import PageContainer from "@/components/ui/PageContainer";
import Select from "@/components/ui/Select";
import Skeleton from "@/components/ui/Skeleton";
import ProductGrid from "@/components/products/ProductGrid";
import ProductTable from "@/components/products/ProductTable";
import { Icon } from "@/components/ui/Icon";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/constants";
import type { ProductListItem } from "@/types/product";

const products: ProductListItem[] = [
  { id: 101, title: "Arc Table Lamp", category: "Lighting", status: "active", price: 148, stock: 24, rating: 4.9, updatedAt: "Today" , thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 102, title: "Everyday Notebook Set", category: "Stationery", status: "active", price: 32, stock: 86, rating: 4.7, updatedAt: "Today", thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 103, title: "Form Lounge Chair", category: "Furniture", status: "active", price: 429, stock: 8, rating: 4.8, updatedAt: "Yesterday", thumbnail: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 104, title: "Studio Wireless Speaker", category: "Electronics", status: "draft", price: 189, stock: 18, rating: 4.6, updatedAt: "Yesterday", thumbnail: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 105, title: "Market Canvas Tote", category: "Accessories", status: "active", price: 58, stock: 0, rating: 4.5, updatedAt: "Sep 18", thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 106, title: "Sculpted Ceramic Vase", category: "Home decor", status: "active", price: 76, stock: 31, rating: 4.9, updatedAt: "Sep 18", thumbnail: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 107, title: "Quiet Hours Wall Clock", category: "Home decor", status: "active", price: 94, stock: 16, rating: 4.4, updatedAt: "Sep 17", thumbnail: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 108, title: "Soft Form Throw", category: "Textiles", status: "draft", price: 112, stock: 7, rating: 4.6, updatedAt: "Sep 17", thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 109, title: "Ripple Glass Carafe", category: "Kitchen", status: "active", price: 44, stock: 52, rating: 4.8, updatedAt: "Sep 16", thumbnail: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 110, title: "Daily Carry Backpack", category: "Accessories", status: "active", price: 128, stock: 14, rating: 4.7, updatedAt: "Sep 15", thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 111, title: "Linework Desk Organizer", category: "Stationery", status: "active", price: 39, stock: 43, rating: 4.3, updatedAt: "Sep 14", thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=160&h=160&q=80" },
  { id: 112, title: "Pebble Portable Light", category: "Lighting", status: "active", price: 64, stock: 27, rating: 4.8, updatedAt: "Sep 13", thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=160&h=160&q=80" },
];

const categoryOptions = ["All categories", ...Array.from(new Set(products.map((product) => product.category)))].map((category) => ({
  label: category,
  value: category === "All categories" ? "all" : category,
}));
const sortOptions = [
  { label: "Recently updated", value: "updated" },
  { label: "Title A–Z", value: "title" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Top rated", value: "rating" },
];
const pageSizeOptions = PAGE_SIZE_OPTIONS.map((size) => ({ label: String(size), value: String(size) }));

function ProductLoading() {
  return (
    <>
      <div className="hidden md:block">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="flex h-[72px] items-center gap-5 border-b border-slate-100 px-5">
            <Skeleton className="size-11 shrink-0 rounded-lg" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="ml-auto h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-28 rounded-xl" />)}
      </div>
      <div className="sr-only" role="status" aria-live="polite">Loading products</div>
    </>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("updated");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesQuery = !query || `${product.title} ${product.category}`.toLowerCase().includes(query);
      const matchesCategory = category === "all" || product.category === category;
      return matchesQuery && matchesCategory;
    });
    return result.sort((first, second) => {
      if (sort === "title") return first.title.localeCompare(second.title);
      if (sort === "price-asc") return first.price - second.price;
      if (sort === "price-desc") return second.price - first.price;
      if (sort === "rating") return second.rating - first.rating;
      return first.id - second.id;
    });
  }, [search, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const start = filteredProducts.length ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, filteredProducts.length);

  function updateSearch(value: string) { setSearch(value); setPage(1); }
  function updateCategory(value: string) { setCategory(value); setPage(1); }
  function updateSort(value: string) { setSort(value); setPage(1); }
  function updatePageSize(value: string) { setPageSize(Number(value)); setPage(1); }

  return (
    <PageContainer>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-7 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-700">Catalog</p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink">Products</h2>
            <Badge className="rounded-full px-2.5 py-1.5">{products.length} products</Badge>
          </div>
          <p className="mt-2 text-sm text-muted">Manage and review your product catalog.</p>
        </div>
        <Button disabled title="Product creation is introduced in a later step" className="w-full sm:w-auto">
          <Icon name="plus" size={16} />Add product
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:p-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-sm">
            <Input
              label="Search products"
              leading={<Icon name="search" size={16} />}
              placeholder="Search by product or category"
              type="search"
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(160px,1fr)_minmax(190px,1fr)] lg:w-[440px]">
            <Select label="Category" value={category} onChange={(event) => updateCategory(event.target.value)} options={categoryOptions} />
            <Select label="Sort by" value={sort} onChange={(event) => updateSort(event.target.value)} options={sortOptions} />
          </div>
        </div>

        {loading ? <ProductLoading /> : visibleProducts.length ? <>
          <ProductTable products={visibleProducts} />
          <ProductGrid products={visibleProducts} />
        </> : <EmptyState title="No products match your search" text="Try another product name or choose a different category." action={<Button variant="outline" size="sm" onClick={() => { setSearch(""); setCategory("all"); }}>Clear filters</Button>} />}

        <div className="flex flex-col gap-3 border-t border-line bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs text-muted" aria-live="polite">Showing <span className="font-medium text-slate-700">{start}–{end}</span> of <span className="font-medium text-slate-700">{filteredProducts.length}</span> products</p>
          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-xs text-muted">Rows</span>
              <Select id="page-size" label="Rows per page" labelClassName="sr-only" className="h-9 min-w-16 text-xs" value={String(pageSize)} onChange={(event) => updatePageSize(event.target.value)} options={pageSizeOptions} />
            </div>
            <nav aria-label="Product pages" className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-9 px-2.5" disabled={page <= 1 || loading} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Previous page">
                <Icon name="arrowLeft" size={15} /><span className="hidden sm:inline">Previous</span>
              </Button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <Button key={pageNumber} variant={pageNumber === page ? "secondary" : "ghost"} size="sm" className="size-9 px-0 tabular-nums" aria-current={pageNumber === page ? "page" : undefined} disabled={loading} onClick={() => setPage(pageNumber)}>{pageNumber}</Button>
              ))}
              <Button variant="outline" size="sm" className="h-9 px-2.5" disabled={page >= pageCount || loading} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} aria-label="Next page">
                <span className="hidden sm:inline">Next</span><Icon name="arrowRight" size={15} />
              </Button>
            </nav>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between px-1 text-[11px] text-slate-400">
        <span>Catalog preview · static sample data</span>
        <span className="hidden sm:inline">Updated moments ago</span>
      </div>
    </PageContainer>
  );
}
