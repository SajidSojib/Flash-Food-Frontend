import { env } from "@/env";
import { providerServices } from "./provider.service";
import { cookies } from "next/headers";
import { ServiceOptions } from "./category.service";
import { CategoryParams } from "@/types/category";

const API_URL = env.API_URL;

const createMenu = async (data: {
  images: string[];
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  categories: string[];
}) => {
  try {
    const cookieStore = await cookies();
    const { data: provider } = await providerServices.getMyProviderProfile();
    const response = await fetch(`${API_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ providerId: provider.id, ...data }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const getAllMenus = async (
  params?: CategoryParams,
  options?: ServiceOptions,
) => {
  try {
    const url = new URL(`${API_URL}/meals`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value as string);
      });
    }
    const config: RequestInit = {};
    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["meals"] };

    const res = await fetch(url.toString(), config);
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

const getMenuById = async (id: string) => {
  try {
    const url = new URL(`${API_URL}/meals/${id}`);
    const res = await fetch(url.toString());
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

export const menuServices = {
  createMenu,
  getAllMenus,
  getMenuById,
};
