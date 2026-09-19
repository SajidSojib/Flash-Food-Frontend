// components/module/customer/orders/OrderSearchFilter.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CalendarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  Filter,
  RefreshCw,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrderSearchFilter() {
  const [search, setSearch] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [sortByAmount, setSortByAmount] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync with URL params on mount
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setSortByDate(searchParams.get("sortByDate") || "");
    setSortByAmount(searchParams.get("sortByAmount") || "");
    setStatusFilter(searchParams.get("status") || "");
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) params.set("search", search);
      else params.delete("search");

      if (sortByDate) params.set("sortByDate", sortByDate);
      else params.delete("sortByDate");

      if (sortByAmount) params.set("sortByAmount", sortByAmount);
      else params.delete("sortByAmount");

      if (statusFilter) params.set("status", statusFilter);
      else params.delete("status");

      params.delete("page");
      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, sortByDate, sortByAmount, statusFilter]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 group max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary 
               peer-focus:text-primary transition-colors duration-200"
        />
        <Input
          placeholder="Search orders by ID..."
          className="pl-10 bg-card text-foreground peer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sort by Date */}
      <div className="relative group max-w-sm">
        <Select value={sortByDate} onValueChange={setSortByDate}>
          <SelectTrigger className="bg-card text-foreground">
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

      {/* Sort by Amount */}
      <div className="relative group max-w-sm">
        <Select value={sortByAmount} onValueChange={setSortByAmount}>
          <SelectTrigger className="bg-card text-foreground">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 group-hover:text-primary" />
              <SelectValue placeholder="Sort by Amount" />
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

      {/* Status Filter */}
      <div className="relative group max-w-sm">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-card text-foreground">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 group-hover:text-primary" />
              <SelectValue placeholder="Filter by Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PLACED">Placed</SelectItem>
            <SelectItem value="PREPARING">Preparing</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="RECEIVED">Received</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

