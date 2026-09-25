"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilters from "@/components/products/ProductFilters";
import ProductTable from "@/components/products/ProductTable";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import DeleteProductModal from "@/components/products/DeleteProductModal";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getCategories, getProducts, deleteProduct } from "@/lib/api/products";
import { applyChanges, readChanges, removeLocalProduct } from "@/lib/utils/localProducts";
import { clampPage, safePage, safePageSize } from "@/lib/utils/urlParams";
import type { Product } from "@/types/product";

type Query = { page: number; pageSize: number; q: string; category: string; sort: string; order: string };
function readQuery(): Query {
  const params = new URLSearchParams(window.location.search);
  return { page: safePage(params.get("page")), pageSize: safePageSize(params.get("limit")), q: params.get("q") || "", category: params.get("category") || "", sort: ["title", "price", "rating"].includes(params.get("sort") || "") ? params.get("sort")! : "", order: params.get("order") === "desc" ? "desc" : "asc" };
}
function setUrl(query: Query, replace = false) {
  const params = new URLSearchParams();
  if (query.page > 1) params.set("page", String(query.page));
  if (query.pageSize !== 10) params.set("limit", String(query.pageSize));
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (query.order !== "asc") params.set("order", query.order);
  const url = `/products${params.size ? `?${params.toString()}` : ""}`;
  window.history[replace ? "replaceState" : "pushState"]({}, "", url);
}

export default function ProductsPage() {
  const router = useRouter();
  const [query, setQuery] = useState<Query>({ page: 1, pageSize: 10, q: "", category: "", sort: "", order: "asc" });
  const [draft, setDraft] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Array<{ slug: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const initial = readQuery(); setQuery(initial); setDraft(initial.q);
    const onPop = () => { const next = readQuery(); setQuery(next); setDraft(next.q); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = { ...query, q: draft.trim(), category: draft.trim() ? "" : query.category, page: 1 };
      if (next.q !== query.q || next.category !== query.category) { setQuery(next); setUrl(next); }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [draft]);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal).then(setCategories).catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true); setError("");
    getProducts({ limit: query.pageSize, skip: (query.page - 1) * query.pageSize, q: query.q, category: query.category, sortBy: query.sort || undefined, order: query.order, signal: controller.signal })
      .then((result) => {
        if (!active) return;
        const changes = readChanges();
        const merged = applyChanges(result.products, changes).filter((item) => !query.q || `${item.title} ${item.description}`.toLowerCase().includes(query.q.toLowerCase()));
        if (query.page === 1) {
          const additions = changes.added.filter((item) => !query.q || `${item.title} ${item.description}`.toLowerCase().includes(query.q.toLowerCase()));
          setProducts([...additions.filter((item) => !merged.some((product) => product.id === item.id)), ...merged]);
        } else setProducts(merged);
        const adjustedTotal = Math.max(0, result.total + changes.added.length - changes.deleted.length);
        setTotal(adjustedTotal);
        const validPage = clampPage(query.page, adjustedTotal, query.pageSize);
        if (validPage !== query.page) { const next = { ...query, page: validPage }; setQuery(next); setUrl(next, true); }
      })
      .catch((e: Error) => { if (active && e.name !== "CanceledError" && e.name !== "AbortError") setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [query.page, query.pageSize, query.q, query.category, query.sort, query.order, reload]);

  const change = useCallback((patch: Partial<Query>) => {
    const next = { ...query, ...patch };
    setQuery(next); setUrl(next);
  }, [query]);

  async function confirmDelete() {
    if (!deleting || deleteBusy) return;
    setDeleteBusy(true); setDeleteError("");
    try { await deleteProduct(deleting.id); removeLocalProduct(deleting.id); setDeleting(null); setReload((n) => n + 1); }
    catch (e) { setDeleteError(e instanceof Error ? e.message : "Could not delete this product."); }
    finally { setDeleteBusy(false); }
  }

  const categoryLabel = useMemo(() => categories.find((item) => item.slug === query.category)?.name, [categories, query.category]);
  return <div className="catalog-page">
    <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> CATALOG / INVENTORY</div><h1>Products <span>{total}</span></h1><p>Keep your catalog organized and ready to grow.</p></div><Link href="/products/new" className="button button-primary add-product"><Icon name="plus" size={17} /> Add product</Link></div>
    <section className="catalog-panel"><div className="catalog-toolbar"><ProductSearch value={draft} onChange={(value) => { setDraft(value); }} /><ProductFilters category={query.category} categories={categories} sort={query.sort} order={query.order} onCategory={(category) => { const next = { ...query, category, q: "", page: 1 }; setDraft(""); setQuery(next); setUrl(next); }} onSort={(sort) => change({ sort, page: 1 })} onOrder={(order) => change({ order, page: 1 })} /></div>
      {(query.q || query.category) && <div className="active-filter">Showing {query.q ? <>results for <b>“{query.q}”</b></> : <>category <b>{categoryLabel || query.category}</b></>}<button onClick={() => { const next = { ...query, q: "", category: "", page: 1 }; setDraft(""); setQuery(next); setUrl(next); }}>Clear filters <Icon name="close" size={14} /></button></div>}
      {error ? <div className="error-panel"><span className="error-mark">!</span><b>We couldn’t load your catalog</b><p>{error}</p><Button variant="secondary" onClick={() => setReload((n) => n + 1)}>Retry</Button></div> : loading ? <Loading /> : products.length ? <><ProductTable products={products} onDelete={setDeleting} /><ProductGrid products={products} onDelete={setDeleting} /><ProductPagination page={query.page} pageSize={query.pageSize} total={total} onPage={(page) => change({ page })} onPageSize={(pageSize) => change({ pageSize, page: 1 })} /></> : <EmptyState title={query.q || query.category ? "No matching products" : "Your catalog is empty"} text={query.q || query.category ? "Try a different search or clear your filters." : "Add your first product to get started."} />}
    </section><div className="catalog-footnote"><span><span className="status-dot" /> Catalog synced just now</span><span>Data provided by DummyJSON</span></div>
    <DeleteProductModal product={deleting} busy={deleteBusy} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />
    {deleteError && <div className="toast-error" role="alert">{deleteError}<button onClick={() => setDeleteError("")}>×</button></div>}
  </div>;
}
