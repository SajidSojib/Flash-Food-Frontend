"use server"

import { providerServices } from "@/services/provider.service";

export const createProvider = async (data: any) => {
    const res = await providerServices.createProvider(data);
    return res;
}
