import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface Params {
    search?: string;
    page?: string;
    limit?: string;
    createdOrder?: string;
    mealOrder?: string;
}
export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const getAllCategories = async (params?: Params, options?: ServiceOptions) => {
    const url = new URL(`${API_URL}/categories`);

    if(params){
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value as string);
        });
    }
    const config: RequestInit = {}
    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["categories"] }

    const res = await fetch(url.toString(), config);
    const result = await res.json();
    return result;
};

const createCategory = async (data: any) => {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

const updateCategory = async (data: { id: string, name: string, description?: string }) => {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/categories/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

const deleteCategory = async (id: string) => {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString()
        },
    });
    const result = await response.json();
    return result;
};


export const categoryServices = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}