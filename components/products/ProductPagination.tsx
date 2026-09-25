import { PAGE_SIZE_OPTIONS } from "@/lib/constants";
export default function ProductPagination({ page, pageSize, total, onPage, onPageSize }: { page: number; pageSize: number; total: number; onPage: (page: number) => void; onPageSize: (size: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const start = total ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, total);
  const range = Array.from(new Set([1, Math.max(1, page - 1), page, Math.min(pages, page + 1), pages])).sort((a, b) => a - b);
  return <div className="pagination"><span className="range-label">Showing <b>{start}–{end}</b> of <b>{total}</b> products</span><div className="pagination-controls"><label className="page-size">Rows <select value={pageSize} onChange={(e) => onPageSize(Number(e.target.value))}>{PAGE_SIZE_OPTIONS.map((size) => <option key={size}>{size}</option>)}</select></label><button className="page-arrow" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button><div className="page-numbers">{range.map((item, index) => <span key={item}>{index > 0 && item - range[index - 1] > 1 && <i>…</i>}<button className={item === page ? "selected" : ""} onClick={() => onPage(item)}>{item}</button></span>)}</div><button className="page-arrow" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button></div></div>;
}
