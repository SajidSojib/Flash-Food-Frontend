"use client";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/types/cartItem";
import { toast } from "sonner";
import { addToCart } from "@/action/cart.action";

const AddToCartButton = ({
  cartItems,
  id,
}: {
  cartItems: CartItem[];
  id: string;
}) => {
  const handleAddToCart = async () => {
    const toastId = toast.loading("Adding to cart...");
    try {
      const res = await addToCart(id);
      if(res.error) {
        toast.error(res.message || res.error.message, { id: toastId });
      } else {
        toast.success("Added to cart successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } 
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={handleAddToCart}
    >
      <ShoppingCart
        className={`h-5 w-5 ${
          cartItems?.find((cartItem: CartItem) => cartItem.mealId === id)
            ? "fill-primary"
            : ""
        }`}
      />
    </Button>
  );
};

export default AddToCartButton;
