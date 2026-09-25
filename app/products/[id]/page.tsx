"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import { getProduct } from "@/lib/api/products";
import { readChanges } from "@/lib/utils/localProducts";
import type { Product } from "@/types/product";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); let active = true;
    if (!Number.isInteger(id) || id < 1) { setNotFound(true); setLoading(false); return; }
    setLoading(true); setError(""); setNotFound(false);
    const changes = readChanges();
    const local = changes.deleted.includes(id) ? null : changes.updated[id] || changes.added.find((item) => item.id === id);
    if (local) { setProduct(local); setLoading(false); return () => controller.abort(); }
    getProduct(id, controller.signal).then((data) => { if (active) setProduct(changes.updated[id] || data); }).catch((e: Error) => { if (!active || e.name === "CanceledError" || e.name === "AbortError") return; if (e.message.toLowerCase().includes("not found")) setNotFound(true); else setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [id, retry]);
  if (loading) return <div className="detail-loading"><Loading label="Loading product" /></div>;
  if (notFound || !product && !error) return <div className="not-found"><div className="not-found-code">404</div><span className="eyebrow">PRODUCT NOT FOUND</span><h1>Looks like this one<br />got away.</h1><p>The product may have been removed, or the link may be incorrect.</p><Link className="button button-primary" href="/products">Back to products</Link></div>;
  if (error) return <div className="error-panel detail-error"><b>We couldn’t load this product</b><p>{error}</p><Button variant="secondary" onClick={() => setRetry((n) => n + 1)}>Retry</Button><Link href="/products" className="back-to-list">Back to products</Link></div>;
  return <div className="product-detail-page"><div className="detail-breadcrumb"><Link href="/products">Products</Link><span>/</span><span>{product?.title}</span></div>{product && <ProductDetails product={product} />}</div>;
}
