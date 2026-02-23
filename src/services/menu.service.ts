import { env } from "@/env";
import { providerServices } from "./provider.service";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const createMenu = async (data: {
  images: string[];
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  categories: string[];
}) => {
  const cookieStore = await cookies();  
  const { data: provider } = await providerServices.getMyProviderProfile();
  const response = await fetch(`${API_URL}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString()
    },
    body: JSON.stringify({providerId: provider.id, ...data}),
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const menuServices = {
  createMenu,
};
