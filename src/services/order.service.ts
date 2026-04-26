import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const createOrder = async (
  deliveryAddress: string,
  deliveryInstructions: string,
) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ deliveryAddress, deliveryInstructions }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

export const orderServices = {
  createOrder,
};
