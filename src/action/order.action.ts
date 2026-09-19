"use server"

import { OrderStatus } from "@/constants/orderStatus";
import { orderServices } from "@/services/order.service";
import { updateTag } from "next/cache";

export const createOrder = async (deliveryAddress: string, deliveryInstructions: string, totalAmount: number) => {
    const res = await orderServices.createOrder(deliveryAddress, deliveryInstructions, totalAmount);
    updateTag("orders");
    updateTag("meals");
    updateTag("cart");
    return res;
}

export const updateOrderStatus = async (orderId: string, status: keyof typeof OrderStatus) => {
    const res = await orderServices.updateOrderStatus(orderId, status);
    updateTag("orders");
    return res;
}
