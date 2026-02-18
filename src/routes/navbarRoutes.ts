import { NavbarRoute } from "@/types/navbarRoutes";

export const navRoutesBeforeLogin: NavbarRoute[] = [
  { label: "Home", href: "/" },
  { label: "Browse Menu", href: "/menus" },
  { label: "All Restaurants", href: "/restaurants" },
];

export const navRoutesAfterLogin: NavbarRoute[] = [
  { label: "Home", href: "/" },
  { label: "Browse Menu", href: "/menus" },
  { label: "All Restaurants", href: "/restaurants" },
  { label: "Dashboard", href: "/dashboard" },
];