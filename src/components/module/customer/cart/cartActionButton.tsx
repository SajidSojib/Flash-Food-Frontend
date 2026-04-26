"use client"

import { addToCart, clearMealFromCart, removeFromCart } from '@/action/cart.action';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

export default function CartActionButton({mealId, quantity}: {mealId: string, quantity: number}) {
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
         if (res.error) {
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
         if (res.error) {
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
    <div className="flex  items-center gap-1 sm:gap-2">
      <Button
        size="icon"
        variant="outline"
        className="scale-60 sm:scale-100"
        onClick={() => handleDecrease(mealId)}
      >
        <Minus />
      </Button>

      <span className="sm:w-6 text-center">{quantity}</span>

      <Button
        size="icon"
        variant="outline"
        className="scale-60 sm:scale-100"
        onClick={() => handleIncrease(mealId)}
      >
        <Plus />
      </Button>

      <Button
        className="sm:block hidden"
        size="sm"
        variant="destructive"
        onClick={() => handleRemove(mealId)}
      >
        Remove
      </Button>
      <Button
        className="sm:hidden"
        size="icon-sm"
        variant="destructive"
        onClick={() => handleRemove(mealId)}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
