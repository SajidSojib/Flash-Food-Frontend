"use server"

import { menuServices } from "@/services/menu.service"

export const createMenu = async (data: {
  images: string[];
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  categories: string[];
}) => {
  const res = await menuServices.createMenu(data);
  return res;
};