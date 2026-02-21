// import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  EyeOff,
  FolderTree,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Category } from "@/types/category";
import { categoryServices } from "@/services/category.service";
import AddCategoryDialog from "@/components/module/admin/category/addCategoryDialog";
import PaginationControls from "@/components/common/pagination-controls";
import CategoriesTable from "@/components/module/admin/category/categoriesTable";
import CategorySearchFilter from "@/components/module/admin/category/categorySearchFilter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default async function ManageCategoriesPage({
  searchParams,
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

      {/* Search and Filter */}
      {/* <div className="flex items-center gap-4">
        <div className="relative flex-1 group max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-card-foreground group-hover:text-primary 
               peer-focus:text-primary transition-colors duration-200"
          />
          <Input
            placeholder="Search categories..."
            className="pl-10 bg-card text-card-foreground peer"
          />
        </div>
      </div> */}
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
