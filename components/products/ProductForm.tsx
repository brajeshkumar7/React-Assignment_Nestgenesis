"use client";

import { FormEvent, useState } from "react";
import type { Product, ProductInput } from "@/types/product";
import Button from "@/components/ui/Button";
type Props = { initial?: Product; busy: boolean; onSave: (value: ProductInput) => Promise<void> };
export default function ProductForm({ initial, busy, onSave }: Props) {
  const [values, setValues] = useState<ProductInput>({ title: initial?.title || "", description: initial?.description || "", category: initial?.category || "beauty", price: initial?.price ?? 0, stock: initial?.stock ?? 0, thumbnail: initial?.thumbnail || "" });
  const [error, setError] = useState("");
  function change(field: keyof ProductInput, value: string) { setValues((current) => ({ ...current, [field]: field === "price" || field === "stock" ? Number(value) : value })); }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!values.title.trim() || !values.description.trim() || !values.category.trim() || values.price < 0 || values.stock < 0 || !Number.isFinite(values.price) || !Number.isFinite(values.stock)) { setError("Add a title, description and category, then enter valid non-negative price and stock values."); return; }
    setError(""); await onSave({ ...values, title: values.title.trim(), description: values.description.trim(), category: values.category.trim(), thumbnail: values.thumbnail.trim() || "https://placehold.co/600x600/f1eee9/8a8175?text=Product" });
  }
  return <form className="product-form" onSubmit={submit}>
    <div className="form-section"><div className="form-section-heading"><span>01</span><div><b>Product information</b><small>Give your product a clear name and description.</small></div></div><label>Product name<input value={values.title} onChange={(e) => change("title", e.target.value)} placeholder="e.g. Ceramic pour-over set" required maxLength={100} /></label><label>Description<textarea value={values.description} onChange={(e) => change("description", e.target.value)} placeholder="Tell customers what makes it special..." rows={5} required maxLength={1200} /></label><div className="form-two"><label>Category<input value={values.category} onChange={(e) => change("category", e.target.value)} placeholder="e.g. home-decor" required /></label><label>Image URL<input value={values.thumbnail} onChange={(e) => change("thumbnail", e.target.value)} placeholder="https://..." type="url" /></label></div></div>
    <div className="form-section"><div className="form-section-heading"><span>02</span><div><b>Pricing & inventory</b><small>Set a price and track what’s available.</small></div></div><div className="form-two"><label>Price <span className="field-suffix">USD</span><div className="input-prefix"><span>$</span><input type="number" min="0" step="0.01" value={values.price} onChange={(e) => change("price", e.target.value)} required /></div></label><label>Available stock<input type="number" min="0" step="1" value={values.stock} onChange={(e) => change("stock", e.target.value)} required /></label></div></div>
    {error && <div className="form-error" role="alert">{error}</div>}<div className="form-actions"><Button type="button" variant="secondary" onClick={() => history.back()}>Cancel</Button><Button type="submit" disabled={busy}>{busy ? "Saving…" : initial ? "Save changes" : "Create product"}</Button></div>
  </form>;
}
