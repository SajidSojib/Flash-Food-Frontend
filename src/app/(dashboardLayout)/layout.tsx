import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Role } from "@/constants/roles"
import { userServices } from "@/services/user.service"

export default async function DashboardLayout({
    admin,
    provider,
    customer
}: {
    admin: React.ReactNode
    provider: React.ReactNode
    customer: React.ReactNode
}) {
    const {data: session} = await userServices.getSessionServer()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar role={session?.user?.role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* {session?.user?.role === Role.ADMIN && admin} */}
          {/* {session?.user?.role === Role.PROVIDER && provider} */}
          {session?.user?.role === Role.CUSTOMER && customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
