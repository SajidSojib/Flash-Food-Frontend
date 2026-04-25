"use client"
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  CalendarIcon,
  HashIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

export default function CategorySearchFilter() {
    const [search, setSearch] = React.useState("");
    const [sortByDate, setSortByDate] = React.useState("");
    const [sortByCount, setSortByCount] = React.useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const timeout = setTimeout(() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("page");
          params.set("search", search);
          params.set("createdOrder", sortByDate);
          params.set("mealOrder", sortByCount);
          router.push(`?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, sortByDate, sortByCount]);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="relative flex-1 group max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-card-foreground group-hover:text-primary 
               peer-focus:text-primary transition-colors duration-200"
        />
        <Input
          placeholder="Search categories..."
          className="pl-10 bg-card text-card-foreground peer"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sort by Date */}
      <div className="relative group max-w-sm">
        <Select onValueChange={(value) => setSortByDate(value)}>
          <SelectTrigger className="bg-card text-card-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 group-hover:text-primary" />
              <SelectValue placeholder="Sort by Date" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">
              <div className="flex items-center gap-2">
                <ArrowDownIcon className="h-4 w-4" />
                <span>Newest first</span>
              </div>
            </SelectItem>
            <SelectItem value="asc">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="h-4 w-4" />
                <span>Oldest first</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort by Item Count */}
      <div className="relative group max-w-sm">
        <Select onValueChange={(value) => setSortByCount(value)}>
          <SelectTrigger className="bg-card text-card-foreground">
            <div className="flex items-center gap-2">
              <HashIcon className="h-4 w-4 group-hover:text-primary" />
              <SelectValue placeholder="Sort by Item Count" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">
              <div className="flex items-center gap-2">
                <ArrowDownIcon className="h-4 w-4" />
                <span>Highest first</span>
              </div>
            </SelectItem>
            <SelectItem value="asc">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="h-4 w-4" />
                <span>Lowest first</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
