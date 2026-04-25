export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    meals: number;
  }
}

export interface CategoryParams {
  search?: string;
  page?: string;
  limit?: string;
  isAvailable?: boolean;
  ratingOrder?: "asc" | "desc";
  priceOrder?: "asc" | "desc";
  popularityOrder?: "asc" | "desc";
}
