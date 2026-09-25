export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Review = ProductReview;

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  images: string[];
  thumbnail: string;
};

export type ProductListItem = Pick<Product, "id" | "title" | "category" | "price" | "rating" | "stock" | "thumbnail"> & {
  status: "active" | "draft";
  updatedAt: string;
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductPage = ProductListResponse;

export type ProductInput = Pick<Product, "title" | "description" | "category" | "price" | "stock" | "thumbnail">;
