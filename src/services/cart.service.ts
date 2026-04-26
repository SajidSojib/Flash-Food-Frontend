import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getMyCart = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const addToCart = async (data: { mealId: string }) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const removeFromCart = async (data: { mealId: string }) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const clearMealFromCart = async (mealId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ mealId }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

export const cartServices = {
  getMyCart,
  addToCart,
  removeFromCart,
  clearMealFromCart,
};
