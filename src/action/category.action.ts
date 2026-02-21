"use server"

import { categoryServices } from "@/services/category.service";
import { updateTag } from "next/cache";

export const createCategory = async (data: { name: string, description?: string }) => {
    const res = await categoryServices.createCategory(data);
    updateTag("categories");
    return res;
};

export const upddateCategory = async (data: { id: string, name: string, description?: string }) => {
    const res = await categoryServices.updateCategory(data);
    updateTag("categories");
    return res;
};

export const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    updateTag("categories");
    return res;
};