"use client";

import React, { useState } from "react";
import { FileText, FolderTree, Plus } from "lucide-react";
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
import { createCategory } from "@/action/category.action";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name can only contain letters and spaces",
    }),
  description: z.string(),   
})

export default function AddCategoryDialog({size="default"}: {size?: "icon" | "default" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined}) {
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
      const toastId = toast.loading("Creating new category...");
      try {
        const res = await createCategory(value);
        console.log(res);
        if(res.error) {
          toast.error(res.message || res.error.message, { id: toastId });
          return;
        }
        toast.success("Category created successfully", { id: toastId });
        setIsAddDialogOpen(false);
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
        console.error(error);
      }
    }
  });
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button size={size}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category for food items. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          id="add-category-form"
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
                    placeholder="e.g., Pizza, Burgers, Sushi"
                    icon={<FolderTree className="h-4 w-4" />}
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
                    placeholder="Brief description of the category"
                    icon={<FileText className="h-4 w-4" />}
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
          <Button type="submit" form="add-category-form">Save Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
