import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  PlusCircle,
  User,
} from "lucide-react";
import { DashboardRoute } from "@/types/dashboardRoutes";

export const providerDashboardRoutes: DashboardRoute[] = [
  {
    title: "Provider Dashboard",
    url: "/provider-dashboard",
    items: [
      {
        title: "Overview",
        url: "/provider-dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "All Orders",
        url: "/provider-dashboard/my-orders",
        icon: ShoppingBag,
      },
      {
        title: "Manage Menus",
        url: "/provider-dashboard/menus",
        icon: Utensils,
      },
      {
        title: "Add Menu",
        url: "/provider-dashboard/add-menu",
        icon: PlusCircle,
      },
      {
        title: "Profile",
        url: "/provider-dashboard/profile",
        icon: User,
      },
    ],
  },
];
