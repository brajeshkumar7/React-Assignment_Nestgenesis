"use client";

import type { Product } from "@/types/product";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
export default function DeleteProductModal({ product, busy, onCancel, onConfirm }: { product: Product | null; busy: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!product) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}><section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><button className="modal-close" onClick={onCancel} aria-label="Close"><Icon name="close" /></button><span className="delete-icon"><Icon name="trash" size={20} /></span><h2 id="delete-title">Delete this product?</h2><p><b>{product.title}</b> will be removed from your catalog. This action can’t be undone.</p><div className="modal-actions"><Button variant="secondary" onClick={onCancel}>Keep product</Button><Button variant="danger" disabled={busy} onClick={onConfirm}>{busy ? "Deleting…" : "Delete product"}</Button></div></section></div>;
}
