"use server"

import { cartServices } from "@/services/cart.service"
import { updateTag } from "next/cache";


export const addToCart = async (mealId: string) => {
    const res = await cartServices.addToCart({ mealId });
    updateTag("cart");
    return res;
}

export const removeFromCart = async (mealId: string) => {
    const res = await cartServices.removeFromCart({ mealId });
    updateTag("cart");
    return res;
}

export const getMyCart = async () => {
    const res = await cartServices.getMyCart();
    return res;
}

export const clearMealFromCart = async (mealId: string) => {
    const res = await cartServices.clearMealFromCart(mealId);
    updateTag("cart");
    return res;
}