"use client";

import {
  addToCart,
  clearMealFromCart,
  removeFromCart,
} from "@/action/cart.action";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function CartActionButton({
  mealId,
  quantity,
}: {
  mealId: string;
  quantity: number;
}) {
  const handleIncrease = async (id: string) => {
    const toastId = toast.loading("Adding to cart...");

    try {
      const res = await addToCart(id);

      if (res.error) {
        toast.error(res.message || res.error.message, { id: toastId });
      } else {
        toast.success("Added to cart successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDecrease = async (id: string) => {
    const toastId = toast.loading("Removing from cart...");

    try {
      const res = await removeFromCart(id);

      if (res.success === false) {
        toast.error(res.message || res.error.message, { id: toastId });
      } else {
        toast.success("Removed from cart successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleRemove = async (id: string) => {
    const toastId = toast.loading("Removing item from cart...");

    try {
      const res = await clearMealFromCart(id);

      if (res.success === false) {
        toast.error(res.message || res.error.message, { id: toastId });
      } else {
        toast.success("Item removed from cart successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <div className="flex items-center rounded-lg border bg-muted/40 p-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => handleDecrease(mealId)}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>

        <span className="w-7 text-center text-sm font-medium">{quantity}</span>

        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => handleIncrease(mealId)}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="hidden text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex"
        onClick={() => handleRemove(mealId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Button
        size="icon-sm"
        variant="ghost"
        className="sm:hidden text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => handleRemove(mealId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
