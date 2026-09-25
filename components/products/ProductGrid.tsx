import Badge from "@/components/ui/Badge";
import type { ProductListItem } from "@/types/product";

export default function ProductGrid({ products }: { products: ProductListItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:hidden">
      {products.map((product) => {
        const stockTone = product.stock === 0 ? "danger" : product.stock <= 10 ? "warning" : "neutral";
        const stockLabel = product.stock === 0 ? "Out of stock" : product.stock <= 10 ? `${product.stock} left` : `${product.stock} in stock`;
        return (
          <article key={product.id} className="overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-md">
            <div className="flex gap-3 p-3.5">
              <img src={product.thumbnail} alt="" loading="lazy" className="size-[68px] shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge>{product.category}</Badge>
                  <Badge tone={product.status === "active" ? "success" : "neutral"}>{product.status === "active" ? "Active" : "Draft"}</Badge>
                </div>
                <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-ink">{product.title}</h3>
                <p className="mt-1 text-xs text-muted">SKU-{String(product.id).padStart(4, "0")}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 px-3.5 py-3">
              <span className="text-sm font-semibold tabular-nums text-ink">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500"><span className="mr-1 text-amber-500">★</span>{product.rating.toFixed(1)}</span>
                <Badge tone={stockTone}>{stockLabel}</Badge>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
