import { OrderStatus } from "@/constants/orderStatus";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface Params {
  search?: string;
  page?: string;
  limit?: string;
  userId?: string;
  status?: keyof typeof OrderStatus;
  providerId?: string;
}
export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const getAllOrders = async (params?: Params, options?: ServiceOptions) => {
  try {
    const url = new URL(`${API_URL}/orders`);
    const cookieStore = await cookies();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value as string);
      });
    }
    const config: RequestInit = {};
    config.headers = {
      Cookie: cookieStore.toString(),
    };

    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["orders"] };

    const res = await fetch(url.toString(), config);
    const result = await res.json();
    console.log(result)
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const createOrder = async (
  deliveryAddress: string,
  deliveryInstructions: string,
  totalAmount: number
) => {
  try {    
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ deliveryAddress, deliveryInstructions, totalAmount }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const updateOrderStatus = async (orderId: string, status: keyof typeof OrderStatus) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
}

export const orderServices = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
};
