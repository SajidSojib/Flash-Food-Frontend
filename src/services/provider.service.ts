import { env } from "@/env";
import { cookies } from "next/headers"

const API_URL = env.NEXT_PUBLIC_API_URL;

const createProvider = async (data: any) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/providers`, {
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


const getMyProviderProfile = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/providers/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};


export const providerServices = {
  createProvider,
  getMyProviderProfile
}