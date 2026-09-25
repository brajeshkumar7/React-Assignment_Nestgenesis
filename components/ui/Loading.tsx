export default function Loading({ label = "Loading products" }: { label?: string }) {
  return <div className="loading-state" role="status"><span className="spinner" /><span>{label}</span></div>;
}
