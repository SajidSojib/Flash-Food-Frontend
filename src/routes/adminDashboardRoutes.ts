import { LayoutDashboard, Store, Users, Tags } from "lucide-react";
import { DashboardRoute } from "@/types/dashboardRoutes";

export const adminDashboardRoutes: DashboardRoute[] = [
  {
    title: "Admin Dashboard",
    url: "/admin-dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "All Providers",
        url: "/admin-dashboard/providers",
        icon: Store,
      },
      {
        title: "All Customers",
        url: "/admin-dashboard/customers",
        icon: Users,
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/categories",
        icon: Tags,
      },
    ],
  },
];
