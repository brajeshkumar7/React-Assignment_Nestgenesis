"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import { getProduct, updateProduct } from "@/lib/api/products";
import { readChanges, saveLocalProduct } from "@/lib/utils/localProducts";
import type { Product, ProductInput } from "@/types/product";
export default function EditProductPage() {
  const params = useParams<{ id: string }>(); const id = Number(params.id); const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null); const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [retry, setRetry] = useState(0);
  useEffect(() => { const controller = new AbortController(); let active = true; const changes = readChanges(); const local = changes.updated[id] || changes.added.find((item) => item.id === id); if (local) { setProduct(local); setLoading(false); return () => controller.abort(); } getProduct(id, controller.signal).then((data) => { if (active) setProduct(changes.updated[id] || data); }).catch((e: Error) => { if (active && e.name !== "CanceledError") setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; controller.abort(); }; }, [id, retry]);
  async function save(input: ProductInput) { if (!product || busy) return; setBusy(true); setError(""); try { const result = await updateProduct(id, input); const saved = saveLocalProduct(input, id, result); router.push(`/products/${saved.id}`); } catch (e) { setError(e instanceof Error ? e.message : "Could not update the product."); } finally { setBusy(false); } }
  if (loading) return <div className="detail-loading"><Loading label="Loading product" /></div>;
  if (error && !product) return <div className="error-panel detail-error"><b>We couldn’t load this product</b><p>{error}</p><Button variant="secondary" onClick={() => { setError(""); setLoading(true); setRetry((n) => n + 1); }}>Retry</Button></div>;
  return <div className="editor-page"><div className="detail-breadcrumb"><Link href="/products">Products</Link><span>/</span><Link href={`/products/${id}`}>{product?.title || "Product"}</Link><span>/</span><span>Edit</span></div><div className="editor-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> PRODUCT SETUP</div><h1>Edit product</h1><p>Keep your product details up to date.</p></div><div className="editor-step"><span>02</span> Edit details</div></div>{error && <div className="form-error page-error" role="alert">{error}</div>}{product && <ProductForm initial={product} busy={busy} onSave={save} />}</div>;
}
