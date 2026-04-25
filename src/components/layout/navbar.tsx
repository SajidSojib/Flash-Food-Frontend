import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/layout/nav-menu";
import { NavigationSheet } from "@/components/layout/navigation-sheet";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CompanyLogo from "../common/companyLogo";
import { userServices } from "@/services/user.service";
import LogoutButton from "./logoutButton";

const Navbar = async () => {
  const { data: session } = await userServices.getSessionServer();
  console.log(session);
  return (
    <nav className="fixed z-50 top-0 max-w-(--breakpoint-xl) mx-auto inset-x-4">
      <div className="glass mx-auto dark:glass-dark flex h-16 items-center justify-between px-5 rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-border/50 backdrop-blur-sm">
        {/* Logo */}
        <CompanyLogo classNames={"hidden sm:block"} />

        {/* Desktop Menu */}
        <NavMenu className="hidden lg:flex items-center gap-8" />

        <div className="flex items-center gap-3">
          {/* Cart Button with Badge */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full inline-flex relative"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Link>
          </Button>

          {/* Theme Toggle */}
          <div className="hidden lg:block">
            <ModeToggle />
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <LogoutButton />
            ) : (
              <>
                <Button
                  className="rounded-full"
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href="/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button className="rounded-full" size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
