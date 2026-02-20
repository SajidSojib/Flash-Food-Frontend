import { env } from "@/env";

const API_URL = env.API_URL;

const getAllCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    const result = await response.json();
    return result;
};


export const categoryServices = {
    getAllCategories
}