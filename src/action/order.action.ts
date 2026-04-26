"use server"

import { orderServices } from "@/services/order.service";
import { updateTag } from "next/cache";

export const createOrder = async (deliveryAddress: string, deliveryInstructions: string) => {
    const res = await orderServices.createOrder(deliveryAddress, deliveryInstructions);
    updateTag("orders");
    updateTag("meals");
    return res;
}
