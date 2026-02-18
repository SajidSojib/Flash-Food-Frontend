import * as React from "react"

import {
  Sidebar,
  SidebarContent,
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


export function AppSidebar({ role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {
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
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link
                            href={item.url}
                            className="flex items-center gap-3"
                          >
                            {item.icon && (
                              <item.icon
                                className={`h-4 w-4`}
                              />
                            )}
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
    </Sidebar>
  );
}
