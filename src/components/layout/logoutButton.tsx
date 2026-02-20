"use client";

import React from "react";
import { Loader, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = ({ className }: { className?: string }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    const toastId = toast.loading("Logging you out...");
    setIsSubmitting(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // router.push("/login");
            router.refresh();
          },
        },
      });

      toast.success("Logged out successfully", { id: toastId });
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Button
      onClick={handleLogout}
      className={className + " rounded-full "}
      variant="default"
      size="sm"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      Log Out
    </Button>
  );
};

export default LogoutButton;
