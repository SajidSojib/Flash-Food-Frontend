"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/layout/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();

  const isActive = (href: string) => 
    pathname === href || pathname.startsWith(href + "/");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Browse Menu", href: "/menus" },
    { label: "All Restaurants", href: "/restaurants" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                href={item.href}
                data-active={isActive(item.href) ? "true" : undefined}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
