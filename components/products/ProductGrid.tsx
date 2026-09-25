import Link from "next/link";
import type { Product } from "@/types/product";
import { Icon } from "@/components/ui/Icon";
export default function ProductGrid({ products, onDelete }: { products: Product[]; onDelete: (product: Product) => void }) {
  return <div className="product-grid">{products.map((product) => <article className="product-card" key={product.id}><Link href={`/products/${product.id}`} className="product-card-image"><img src={product.thumbnail} alt={product.title} /><span className="card-category">{product.category.replaceAll("-", " ")}</span></Link><div className="product-card-body"><Link href={`/products/${product.id}`}><strong>{product.title}</strong></Link><div className="product-card-meta"><span>${product.price.toFixed(2)}</span><span>★ {product.rating.toFixed(1)}</span></div><div className="product-card-bottom"><span className={product.stock < 20 ? "low-stock" : ""}>{product.stock} in stock</span><button onClick={() => onDelete(product)} aria-label={`Delete ${product.title}`}><Icon name="trash" size={15} /></button></div></div></article>)}</div>;
}
