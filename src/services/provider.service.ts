import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const createProvider = async (data: any) => {
  const response = await fetch(`${API_URL}/providers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const providerServices = {
  createProvider
}