import api from "@/lib/api/axios";
import type { Product, ProductInput, ProductPage } from "@/types/product";

type ListOptions = { limit: number; skip: number; q?: string; category?: string; sortBy?: string; order?: string; signal?: AbortSignal };

export async function getProducts(options: ListOptions) {
  const { limit, skip, q, category, sortBy, order, signal } = options;
  const params: Record<string, string | number> = { limit, skip };
  if (q) params.q = q;
  if (sortBy) { params.sortBy = sortBy; params.order = order || "asc"; }
  const path = q ? "/products/search" : category ? `/products/category/${encodeURIComponent(category)}` : "/products";
  const { data } = await api.get<ProductPage>(path, { params, signal });
  return data;
}

export async function getCategories(signal?: AbortSignal) {
  const { data } = await api.get<Array<{ slug: string; name: string; url: string }>>("/products/categories", { signal });
  return data;
}

export async function getProduct(id: number, signal?: AbortSignal) {
  const { data } = await api.get<Product>(`/products/${id}`, { signal });
  return data;
}

export async function createProduct(input: ProductInput) {
  const { data } = await api.post<Product>("/products/add", input);
  return data;
}

export async function updateProduct(id: number, input: ProductInput) {
  const { data } = await api.put<Product>(`/products/${id}`, input);
  return data;
}

export async function deleteProduct(id: number) {
  const { data } = await api.delete<Product>(`/products/${id}`);
  return data;
}
