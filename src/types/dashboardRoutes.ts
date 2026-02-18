import { LucideIcon } from "lucide-react";

export interface DashboardRoute {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}
