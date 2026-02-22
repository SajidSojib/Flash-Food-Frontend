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
import { navRoutesAfterLogin, navRoutesBeforeLogin } from "@/routes/navbarRoutes";
import { authClient } from "@/lib/auth-client";
import { NavbarRoute } from "@/types/navbarRoutes";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();
  const {data: session} = authClient.useSession()

  const isActive = (href: string) => 
    pathname === href || pathname.startsWith(href + "/");

  let navItems: NavbarRoute[] = []

  if(session) {
    navItems = navRoutesAfterLogin
  }else {
    navItems = navRoutesBeforeLogin
  }

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
