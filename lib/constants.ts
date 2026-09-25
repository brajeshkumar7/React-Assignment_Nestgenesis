export const DUMMYJSON_BASE_URL = "https://dummyjson.com";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SORT_ORDER = "asc" as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export const SORT_OPTIONS = [
  { label: "Title", value: "title" },
  { label: "Price", value: "price" },
  { label: "Rating", value: "rating" },
] as const;
export type ProductSortOption = (typeof SORT_OPTIONS)[number]["value"];
