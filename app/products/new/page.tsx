"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductForm from "@/components/products/ProductForm";
import { createProduct } from "@/lib/api/products";
import { saveLocalProduct } from "@/lib/utils/localProducts";
import type { ProductInput } from "@/types/product";
export default function NewProductPage() {
  const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const router = useRouter();
  async function save(input: ProductInput) { if (busy) return; setBusy(true); setError(""); try { const result = await createProduct(input); const local = saveLocalProduct(input, undefined, result); router.push(`/products/${local.id}`); } catch (e) { setError(e instanceof Error ? e.message : "Could not create the product."); } finally { setBusy(false); } }
  return <div className="editor-page"><div className="detail-breadcrumb"><Link href="/products">Products</Link><span>/</span><span>New product</span></div><div className="editor-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> PRODUCT SETUP</div><h1>Add a product</h1><p>Bring something new into your catalog.</p></div><div className="editor-step"><span>01</span> Product details</div></div>{error && <div className="form-error page-error" role="alert">{error}</div>}<ProductForm busy={busy} onSave={save} /></div>;
}
