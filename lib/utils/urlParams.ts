import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/constants";

export function safePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : DEFAULT_PAGE;
}

export function safePageSize(value: string | null) {
  const size = Number(value);
  return PAGE_SIZE_OPTIONS.find((supportedSize) => supportedSize === size) ?? DEFAULT_PAGE_SIZE;
}

export function clampPage(page: number, total: number, pageSize: number) {
  return Math.min(page, Math.max(1, Math.ceil(total / pageSize)));
}
