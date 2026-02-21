"use client";

import React, { useState } from "react";
import { Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/common/inputField";
import { TextareaField } from "@/components/common/textareaField";
import { createCategory, upddateCategory } from "@/action/category.action";
import { Category } from "@/types/category";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name can only contain letters and spaces",
    }),
  description: z.string(),
});

export default function EditCategoryDialog({
  category,
}: {
  category: Category;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Editing category...");
      try {
        const res = await upddateCategory({
          id: category.id,
          name: value.name,
          description: value.description,
        });
        console.log(res);
        if (res.error) {
          toast.error(res.message || res.error.message, { id: toastId });
          return;
        }
        toast.success("Category updated successfully", { id: toastId });
        setIsAddDialogOpen(false);
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
        console.error(error);
      }
    },
  });
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem asChild>
          <span className="flex items-center">
            <Edit className="mr-3 h-4 w-4" />
            Edit
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update category information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          id="edit-category-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                return (
                  <InputField
                    field={field}
                    label="Category Name"
                    type="text"
                    placeholder={category.name}
                    icon={<Plus className="h-4 w-4" />}
                    className="bg-card"
                  />
                );
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                return (
                  <TextareaField
                    className="bg-card"
                    field={field}
                    label="Description"
                    placeholder={category.description}
                    icon={<Plus className="h-4 w-4" />}
                    rows={4}
                  />
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="edit-category-form">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
