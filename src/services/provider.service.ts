import { env } from "@/env";
import { cookies } from "next/headers"

const API_URL = env.NEXT_PUBLIC_API_URL;

const createProvider = async (data: any) => {
  const cookieStore = await cookies();
  const response = await fetch(`${API_URL}/providers`, {
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


const getMyProviderProfile = async () => {
  const cookieStore = await cookies();
  const response = await fetch(`${API_URL}/providers/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString()
    },
  });
  const result = await response.json();
  return result;
};


export const providerServices = {
  createProvider,
  getMyProviderProfile
}