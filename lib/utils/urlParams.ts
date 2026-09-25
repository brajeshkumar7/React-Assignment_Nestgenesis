export function safePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function safePageSize(value: string | null) {
  const size = Number(value);
  return [10, 20, 50].includes(size) ? size : 10;
}

export function clampPage(page: number, total: number, pageSize: number) {
  return Math.min(page, Math.max(1, Math.ceil(total / pageSize)));
}
