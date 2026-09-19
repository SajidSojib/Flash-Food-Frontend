export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "DELIVERED"
  | "RECEIVED"
  | "CANCELLED"
  | "REJECTED";

export interface OrderItem {
  id: string;
  orderId: string;
  mealId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  providerId: string;
  totalAmount: number;
  deliveryAddress: string;
  deliveryInstructions: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
