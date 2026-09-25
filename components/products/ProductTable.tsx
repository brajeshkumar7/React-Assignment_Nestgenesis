import Badge from "@/components/ui/Badge";
import type { ProductListItem } from "@/types/product";

function stockStatus(stock: number) {
  if (stock === 0) return { label: "Out of stock", tone: "danger" as const };
  if (stock <= 10) return { label: "Low stock", tone: "warning" as const };
  return { label: `${stock} in stock`, tone: "neutral" as const };
}

export default function ProductTable({ products }: { products: ProductListItem[] }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">Products in the catalog</caption>
        <thead>
          <tr className="border-y border-line bg-slate-50/70 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            <th className="px-5 py-3.5 font-semibold">Product</th>
            <th className="px-4 py-3.5 font-semibold">Category</th>
            <th className="px-4 py-3.5 font-semibold">Status</th>
            <th className="px-4 py-3.5 font-semibold">Price</th>
            <th className="px-4 py-3.5 font-semibold">Inventory</th>
            <th className="px-4 py-3.5 text-right font-semibold">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => {
            const stock = stockStatus(product.stock);
            return (
              <tr key={product.id} className="transition-colors hover:bg-slate-50/70">
                <td className="px-5 py-3.5">
                  <div className="flex min-w-56 items-center gap-3">
                    <img className="size-11 rounded-lg border border-slate-100 bg-slate-50 object-cover" src={product.thumbnail} alt="" loading="lazy" />
                    <span className="min-w-0">
                      <span className="block max-w-64 truncate text-sm font-medium text-ink">{product.title}</span>
                      <span className="mt-1 block text-[11px] text-slate-400">SKU-{String(product.id).padStart(4, "0")}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5"><Badge>{product.category}</Badge></td>
                <td className="px-4 py-3.5"><Badge tone={product.status === "active" ? "success" : "neutral"}><span className={`size-1.5 rounded-full ${product.status === "active" ? "bg-emerald-600" : "bg-slate-400"}`} />{product.status === "active" ? "Active" : "Draft"}</Badge></td>
                <td className="px-4 py-3.5 text-sm font-medium tabular-nums text-ink">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3.5"><Badge tone={stock.tone}>{stock.label}</Badge></td>
                <td className="px-4 py-3.5 text-right text-sm tabular-nums text-slate-600"><span className="mr-1 text-amber-500">★</span>{product.rating.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
