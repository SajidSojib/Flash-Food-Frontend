"use client";

import React from 'react';
import { LogOut } from "lucide-react";
import { Button } from '../ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutButton = () => {
    const router = useRouter();
    const handleLogout = async () => {
        const toastId = toast.loading("Logging you out...");
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
        } catch (err) {
          toast.error("Something went wrong", { id: toastId });
        }
      };
    return (
      <Button onClick={handleLogout} className="rounded-full" variant="default" size="sm">
          <LogOut className="h-4 w-4" />
          Log Out
      </Button>
    );
};

export default LogoutButton;