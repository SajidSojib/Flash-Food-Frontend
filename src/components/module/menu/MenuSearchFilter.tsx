"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category";
import { Filter, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MenuSearchFilter = ({ categories }: { categories: Category[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      params.delete("page");
      params.set("search", searchQuery);
      params.set("categories", selectedCategories.length > 0 ? selectedCategories.join(",") : categories.map((category) => category.slug).join(","));
      (sortBy && sortOrder) && params.set(sortBy, sortOrder);

      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, selectedCategories, sortBy, sortOrder]);
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="relative xl:col-span-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by dish name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="pl-10 w-full justify-start">
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : "Category"}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {categories.map((category) => {
                const checked = selectedCategories.includes(category.slug);

                return (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer"
                    onClick={() => {
                      if (checked) {
                        setSelectedCategories((prev) =>
                          prev.filter((c) => c !== category.slug),
                        );
                      } else {
                        setSelectedCategories((prev) => [
                          ...prev,
                          category.slug,
                        ]);
                      }
                    }}
                  >
                    <Checkbox className="border-primary" checked={checked} />
                    <span>
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </span>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sort By */}
        <div className="relative">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="cursor-pointer hover:border-primary">
              <SelectValue className="cursor-pointer" placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="priceOrder">
                Price
              </SelectItem>
              <SelectItem className="cursor-pointer" value="ratingOrder">
                Rating
              </SelectItem>
              <SelectItem className="cursor-pointer" value="popularityOrder">
                Popularity
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order  */}
        <div className="relative">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="cursor-pointer hover:border-primary">
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">High to Low</SelectItem>
              <SelectItem value="asc">Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery || selectedCategories.length || sortBy || sortOrder) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCategories.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategories.join(", ")}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => setSelectedCategories([])}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {sortBy && (
            <Badge variant="secondary" className="gap-1">
              Sort By: {sortBy.split("Order")[0].toUpperCase()}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => setSortBy("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {sortOrder && (
            <Badge variant="secondary" className="gap-1">
              Order: {sortOrder === "desc" ? "High to Low" : "Low to High"}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => setSortOrder("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuSearchFilter;
