
export interface PaginationControlsProps {
  meta: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
  };
}