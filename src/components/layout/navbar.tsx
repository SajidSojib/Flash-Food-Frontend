import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { NavMenu } from "@/components/layout/nav-menu";
import { NavigationSheet } from "@/components/layout/navigation-sheet";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-6 inset-x-4 h-16 bg-background border max-w-(--breakpoint-xl) mx-auto rounded-full">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            className="hidden rounded-full sm:inline-flex"
            variant="outline"
            asChild
          >
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button className="rounded-full">
            <Link href={"/signup"}>Sign Up</Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <ModeToggle />
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
