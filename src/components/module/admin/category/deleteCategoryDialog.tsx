"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  deleteCategory,
} from "@/action/category.action";
import { Category } from "@/types/category";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DeleteCategoryDialog({
  category,
}: {
  category: Category;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteCategory = async () => {
    const toastId = toast.loading("Deleting category...");
    try {
      const res = await deleteCategory(category.id);
      console.log(res);
      if (res.error) {
        toast.error(res.message || res.error.message, { id: toastId });
        return;
      }
      toast.success("Category deleted successfully", { id: toastId });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error(error);
    }
  };
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem className="text-red-500">
          <span className="flex items-center">
            <Trash2 className="mr-3 h-4 w-4" />
            Delete
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{category?.name}"? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
