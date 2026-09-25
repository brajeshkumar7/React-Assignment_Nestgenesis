import { Icon } from "@/components/ui/Icon";
export default function EmptyState({ title = "No products found", text = "Try adjusting your search or filters." }: { title?: string; text?: string }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name="box" size={24} /></span><strong>{title}</strong><p>{text}</p></div>;
}
