import {
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { categoryServices } from "@/services/category.service";
import AddCategoryDialog from "@/components/module/admin/category/addCategoryDialog";
import PaginationControls from "@/components/common/pagination-controls";
import CategoriesTable from "@/components/module/admin/category/categoriesTable";
import CategorySearchFilter from "@/components/module/admin/category/categorySearchFilter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default async function ManageCategoriesPage({
  searchParams
}: {
  searchParams: Promise<{ search: string; page: string; limit: string, createdOrder?: string, mealOrder?: string }>;
}) {
    const { search, page, limit, createdOrder, mealOrder } = await searchParams;
  const { data } = await categoryServices.getAllCategories({
    page,
    limit,
    search,
    createdOrder,
    mealOrder,
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl text-center sm:text-left font-bold tracking-tight">
            Manage Categories
          </h1>
          <p className="text-muted-foreground text-md sm:text-base text-center sm:text-left">
            Create and manage food categories for your platform
          </p>
        </div>
        <div className="hidden sm:block">
          <AddCategoryDialog />
        </div>
      </div>

      <div className="hidden sm:block">
        <CategorySearchFilter />
      </div>
      <div className="flex items-center justify-between sm:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"xs"} variant="outline" className="sm:hidden bg-card">
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter Categories</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Categories</DialogTitle>
            </DialogHeader>
            <CategorySearchFilter />
          </DialogContent>
        </Dialog>

        <AddCategoryDialog size={"xs"} />
      </div>

      {/* Categories Table */}
      <CategoriesTable categories={data?.data || []} />

      {/* Pagination */}
      <PaginationControls
        meta={data?.meta || { page: 1, limit: 5, totalCount: 0, totalPages: 1 }}
      />
    </div>
  );
}
