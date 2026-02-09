import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/layout/sheet";
import { Logo } from "@/components/layout/logo";
import { NavMenu } from "@/components/layout/nav-menu";
import Link from "next/link";
import { userServices } from "@/services/user.service";
import LogoutButton from "./logoutButton";

export const NavigationSheet = async () => {
  const { data: session } = await userServices.getSessionServer();
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button className="rounded-full" size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Logo />
        <NavMenu className="mt-6 [&>div]:h-full" orientation="vertical" />
        {session ? (
          <div className="md:hidden">
            <LogoutButton></LogoutButton>
          </div>
        ) : (
          <>
            <Button
              asChild
              variant="outline"
              className="md:hidden rounded-full"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button className="md:hidden rounded-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
