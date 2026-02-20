import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Role } from "@/constants/roles";
import { userServices } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  provider,
  customer,
}: {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}) {
  const { data: session } = await userServices.getSessionServer();

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
        <header className="flex h-17 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="font-bold text-xl">
            {(session?.user?.role).charAt(0).toUpperCase() +
              (session?.user?.role).slice(1).toLowerCase()}{" "}
            <span className="text-primary">Dashboard</span>
          </h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {session?.user?.role === Role.ADMIN && admin}
          {session?.user?.role === Role.PROVIDER && provider}
          {session?.user?.role === Role.CUSTOMER && customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
