import { LayoutDashboard, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { DashboardRoute } from "@/types/dashboardRoutes";

export const customerDashboardRoutes: DashboardRoute[] = [
  {
    title: "Customer Dashboard",
    url: "/dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "My Orders",
        url: "/dashboard/my-orders",
        icon: ShoppingBag,
      },
      {
        title: "Cart",
        url: "/dashboard/cart",
        icon: ShoppingCart,
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        icon: User,
      },
    ],
  },
];
