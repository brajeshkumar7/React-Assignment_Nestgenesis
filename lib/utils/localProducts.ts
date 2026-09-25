import type { Product, ProductInput } from "@/types/product";

const KEY = "product-admin-local-changes";
export type LocalChanges = { added: Product[]; updated: Record<number, Product>; deleted: number[] };

function empty(): LocalChanges { return { added: [], updated: {}, deleted: [] }; }

export function readChanges(): LocalChanges {
  if (typeof window === "undefined") return empty();
  try { return { ...empty(), ...JSON.parse(window.localStorage.getItem(KEY) || "{}") } as LocalChanges; }
  catch { return empty(); }
}

function save(changes: LocalChanges) { window.localStorage.setItem(KEY, JSON.stringify(changes)); }

export function applyChanges(products: Product[], changes: LocalChanges) {
  const hidden = new Set(changes.deleted);
  const base = products.filter((product) => !hidden.has(product.id)).map((product) => changes.updated[product.id] || product);
  const visible = new Set(base.map((product) => product.id));
  return [...base, ...changes.added.filter((product) => !hidden.has(product.id) && !visible.has(product.id))];
}

export function saveLocalProduct(input: ProductInput, id?: number, apiProduct?: Product) {
  const changes = readChanges();
  const product: Product = { ...apiProduct, ...input, id: id ?? Date.now(), images: [input.thumbnail], thumbnail: input.thumbnail, rating: apiProduct?.rating ?? 0, reviews: apiProduct?.reviews ?? [] };
  changes.deleted = changes.deleted.filter((deletedId) => deletedId !== product.id);
  if (id) changes.updated[id] = product;
  else changes.added.unshift(product);
  save(changes);
  return product;
}

export function removeLocalProduct(id: number) {
  const changes = readChanges();
  changes.added = changes.added.filter((product) => product.id !== id);
  delete changes.updated[id];
  if (id < 1000000000000) changes.deleted = Array.from(new Set([...changes.deleted, id]));
  save(changes);
}
