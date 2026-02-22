"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Upload,
  Tag,
  DollarSign,
  UtensilsCrossed,
  FolderTree,
  X,
  Loader2,
  Camera,
  ChefHat,
  Package,
  Clock,
  Flame,
  Plus,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/inputField";
import { TextareaField } from "@/components/common/textareaField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const menuSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" })
    .max(5, { message: "Maximum 5 images allowed" })
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "Each image must be less than 5MB",
    })
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type,
          ),
        ),
      { message: "Only JPEG, PNG, and WebP images are allowed" },
    ),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),

  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Price must be a positive number",
    }),

  ingredients: z
    .array(z.string())
    .min(1, { message: "At least one ingredient is required" }),

  categories: z
    .array(z.string())
    .min(1, { message: "Please select at least one category" }),
});

// Available categories with better icons
const availableCategories = [
  {
    id: "appetizers",
    label: "Appetizers",
    icon: "🥟",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "main-course",
    label: "Main Course",
    icon: "🍖",
    color: "bg-red-100 text-red-700",
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "🍰",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "beverages",
    label: "Beverages",
    icon: "🥤",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "salads",
    label: "Salads",
    icon: "🥗",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "soups",
    label: "Soups",
    icon: "🥣",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "specials",
    label: "Today's Specials",
    icon: "⭐",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "breakfast",
    label: "Breakfast",
    icon: "🍳",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "lunch",
    label: "Lunch",
    icon: "🥪",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dinner",
    label: "Dinner",
    icon: "🍲",
    color: "bg-indigo-100 text-indigo-700",
  },
];

export default function AddMenuForm() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      images: [] as File[],
      name: "",
      description: "",
      price: "",
      ingredients: [] as string[],
      categories: [] as string[],
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding menu item...");
      setIsSubmitting(true);

      try {
        const menuData = {
          name: value.name,
          description: value.description,
          price: parseFloat(value.price),
          ingredients: value.ingredients,
          categories: value.categories,
          imageUrls: [] as string[],
        };

        // Upload images if they exist
        if (value.images && value.images.length > 0) {
          try {
            const imgUploadUrl = env.NEXT_PUBLIC_IMG_UPLOAD_URL;
            const uploadPromises = value.images.map(async (file) => {
              const formData = new FormData();
              formData.append("image", file);

              const res = await fetch(imgUploadUrl, {
                method: "POST",
                body: formData,
              });

              if (!res.ok) {
                throw new Error(`Image upload failed: ${res.status}`);
              }

              const result = await res.json();
              if (result.success && result.data?.display_url) {
                return result.data.display_url;
              } else {
                throw new Error(result.error?.message || "Image upload failed");
              }
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            menuData.imageUrls = uploadedUrls;
          } catch (imageError) {
            console.error("Image upload error:", imageError);
            toast.warning(
              "Some images failed to upload, continuing with uploaded ones",
              { id: toastId },
            );
          }
        }

        // Here you would send menuData to your API
        console.log("Menu data to save:", menuData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Menu item added successfully!", { id: toastId });

        // Reset form after successful submission
        form.reset();
        setImagePreviews([]);
        setSelectedCategories([]);
        setIngredientsList([]);
        setNewIngredient("");
      } catch (error) {
        console.error("Error adding menu item:", error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
          { id: toastId },
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    validators: {
      onSubmit: menuSchema,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const currentImages = form.state.values.images;
      const newImages = [...currentImages, ...files];
      form.setFieldValue("images", newImages);

      // Create preview URLs
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.state.values.images;
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setFieldValue("images", newImages);

    // Clean up preview URL
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      form.setFieldValue("categories", newSelection);
      return newSelection;
    });
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      const updatedIngredients = [...ingredientsList, newIngredient.trim()];
      setIngredientsList(updatedIngredients);
      form.setFieldValue("ingredients", updatedIngredients);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(updatedIngredients);
    form.setFieldValue("ingredients", updatedIngredients);
  };

  const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="border-none w-full shadow-lg max-w-3xl">
        <CardHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <ChefHat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Add New Menu Item</CardTitle>
              <CardDescription>
                Create a new menu item for your restaurant. Fill in all the
                details below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-0">
          <form
            id="menu-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Images Upload Field - Full Width */}
              <form.Field
                name="images"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-base font-semibold flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Menu Images
                      </FieldLabel>

                      {/* Image Previews Grid */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <div className="size-24 rounded-xl overflow-hidden border-2 border-border shadow-sm group-hover:shadow-md transition-all">
                                <Image
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  width={96}
                                  height={96}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}

                          {/* Upload Area */}
                          {imagePreviews.length < 5 && (
                            <div className="flex items-center gap-4">
                              <input
                                type="file"
                                id="images-upload"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleFileChange}
                                multiple
                                className="hidden"
                              />
                              <div
                                className="size-24 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary cursor-pointer group"
                                onClick={() =>
                                  document
                                    .getElementById("images-upload")
                                    ?.click()
                                }
                              >
                                <Upload className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium">
                                  Upload
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                          JPEG, PNG, or WebP. Max 5MB each. Up to 5 images.
                        </p>
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <Separator />

              {/* Name and Price - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Field */}
                <form.Field
                  name="name"
                  children={(field) => (
                    <InputField
                      field={field}
                      label="Item Name"
                      type="text"
                      placeholder="e.g., Margherita Pizza"
                      icon={
                        <ChefHat className="h-4 w-4 text-muted-foreground" />
                      }
                    />
                  )}
                />

                {/* Price Field */}
                <form.Field
                  name="price"
                  children={(field) => (
                    <InputField
                      field={field}
                      label="Price"
                      type="number"
                      step={0.1}
                      min={0}
                      placeholder="0.00"
                      icon={
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      }
                    />
                  )}
                />
              </div>

              {/* Description - Full Width */}
              <form.Field
                name="description"
                children={(field) => (
                  <TextareaField
                    field={field}
                    label="Description"
                    placeholder="Describe your menu item..."
                    icon={
                      <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                    }
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Ingredients Field */}
                <form.Field
                  name="ingredients"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Ingredients
                        </FieldLabel>

                        {/* Ingredients List Badges */}
                        {ingredientsList.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {ingredientsList.map((ingredient, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="gap-1 pr-1 bg-green-100 text-green-700 border-0"
                              >
                                <span>{ingredient}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 ml-1 hover:bg-transparent hover:scale-110 transition-transform"
                                  onClick={() => removeIngredient(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Add Ingredient Input */}
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              type="text"
                              placeholder="Add an ingredient..."
                              value={newIngredient}
                              onChange={(e) => setNewIngredient(e.target.value)}
                              onKeyDown={handleIngredientKeyPress}
                              className="pr-10"
                            />
                          </div>
                          <Button
                            type="button"
                            size={"sm"}
                            onClick={addIngredient}
                            disabled={!newIngredient.trim()}
                            className="gap-1"
                          >
                            <Plus className="h-4 w-4" />
                            Add
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                          Add ingredients one by one and press Enter or click
                          Add
                        </p>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                {/* Categories Multi-Select Field */}
                <form.Field
                  name="categories"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel className="flex items-center gap-2">
                          <FolderTree className="h-4 w-4" />
                          Categories
                        </FieldLabel>

                        {/* Selected Categories Badges */}
                        {selectedCategories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {selectedCategories.map((catId) => {
                              const category = availableCategories.find(
                                (c) => c.id === catId,
                              );
                              return (
                                <Badge
                                  key={catId}
                                  variant="secondary"
                                  className={`gap-1 pr-1 ${category?.color} border-0`}
                                >
                                  <span>{category?.icon}</span>
                                  <span>{category?.label}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 ml-1 hover:bg-transparent hover:scale-110 transition-transform"
                                    onClick={() => toggleCategory(catId)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              );
                            })}
                          </div>
                        )}

                        {/* Dropdown Select */}
                        <Select
                          value={
                            selectedCategories[selectedCategories.length - 1] ||
                            ""
                          }
                          onValueChange={(value) => {
                            if (value && !selectedCategories.includes(value)) {
                              toggleCategory(value);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Select categories..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCategories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center justify-between w-full gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">
                                      {category.icon}
                                    </span>
                                    <span>{category.label}</span>
                                  </div>
                                  {selectedCategories.includes(category.id) && (
                                    <span className="text-primary font-bold">
                                      ✓
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                          Select one or more categories for this menu item
                        </p>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="border-t bg-muted/5 px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              className="sm:flex-1"
              onClick={() => {
                form.reset();
                setImagePreviews([]);
                setSelectedCategories([]);
                setIngredientsList([]);
                setNewIngredient("");
              }}
            >
              Reset Form
            </Button>
            <Button
              form="menu-form"
              type="submit"
              className="sm:flex-1 bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Menu Item...
                </>
              ) : (
                <>
                  <ChefHat className="h-4 w-4 mr-2" />
                  Add Menu Item
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
