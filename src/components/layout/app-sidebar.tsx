"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { DashboardRoute } from "@/types/dashboardRoutes"
import { Role } from "@/constants/roles"
import { adminDashboardRoutes } from "@/routes/adminDashboardRoutes"
import { providerDashboardRoutes } from "@/routes/providerDashboardRoutes"
import { customerDashboardRoutes } from "@/routes/customerDashboardRoutes"
import Link from "next/link"
import CompanyLogo from "../common/companyLogo"
import { Separator } from "../ui/separator"
import { Home } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import LogoutButton from "./logoutButton"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"


export function AppSidebar({ role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {
  const currentRoute = usePathname()
  let routes: DashboardRoute[] = []
  switch (role) {
    case Role.ADMIN:
      routes = adminDashboardRoutes
      break;
    case Role.PROVIDER:
      routes = providerDashboardRoutes
      break;
    case Role.CUSTOMER:
      routes = customerDashboardRoutes
      break;
  }
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <CompanyLogo />
          </SidebarMenuItem>
          <Separator />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div className="mb-1">
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </div>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={currentRoute === item.url}>
                          <Link
                            href={item.url}
                            className="flex items-center gap-3"
                          >
                            {item.icon && <item.icon className={`h-4 w-4`} />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-5">
        <SidebarMenu>
          {/* Theme Toggle */}
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ModeToggle />
            </div>
          </SidebarMenuItem>

          <Separator />

          {/* Homepage Link */}
          <SidebarMenuItem>
            <Button
              asChild
              variant={"ghost"}
              className="w-full items-center justify-center"
            >
              <Link href="/" className="flex items-center gap-3">
                <Home className="h-4 w-4" />
                <span>Go to Homepage</span>
              </Link>
            </Button>
          </SidebarMenuItem>

          {/* Logout Button */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <LogoutButton className="w-full" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
