import { Icon } from "@/components/ui/Icon";
export default function ProductSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="search-box"><Icon name="search" size={18} /><input aria-label="Search products" placeholder="Search products..." value={value} onChange={(event) => onChange(event.target.value)} /><kbd>⌘ K</kbd></label>;
}
