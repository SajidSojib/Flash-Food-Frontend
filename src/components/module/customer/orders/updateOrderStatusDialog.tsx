"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { updateOrderStatus } from "@/action/order.action";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { Order } from "@/types/order";

interface UpdateOrderStatusDialogProps {
  order: Order;
  nextStatuses: Order["status"][];
}

const statusLabels: Record<Order["status"], string> = {
  PLACED: "Placed",
  PREPARING: "Preparing",
  DELIVERED: "Delivered",
  RECEIVED: "Received",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

const statusVariant: Record<
  Order["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  PLACED: "secondary",
  PREPARING: "secondary",
  DELIVERED: "default",
  RECEIVED: "default",
  CANCELLED: "destructive",
  REJECTED: "destructive",
};

export default function UpdateOrderStatusDialog({
  order,
  nextStatuses,
}: UpdateOrderStatusDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<Order["status"]>(nextStatuses[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!selectedStatus) return;

    const toastId = toast.loading("Updating order status...");

    setIsLoading(true);

    try {
      const res = await updateOrderStatus(
        order.id,
        selectedStatus
      );

      if (res?.error) {
        toast.error(
          res.message || res.error.message,
          { id: toastId }
        );
        return;
      }

      toast.success("Order status updated", {
        id: toastId,
      });

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update order status", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => event.preventDefault()}
          className="cursor-pointer"
        >
          <CheckCircle2 className="mr-3 h-4 w-4" />
          Update Status
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Order Status
          </DialogTitle>

          <DialogDescription>
            Change the status of order #
            {order.id.slice(0, 8).toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Current status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Current Status
              </p>

              <p className="mt-1 font-medium">
                {statusLabels[order.status]}
              </p>
            </div>

            <Badge variant={statusVariant[order.status]}>
              {statusLabels[order.status]}
            </Badge>
          </div>

          {/* Available statuses */}
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Change status to
            </p>

            {nextStatuses.map((status) => (
              <Button
                key={status}
                type="button"
                variant={
                  selectedStatus === status
                    ? "default"
                    : "outline"
                }
                className="w-full justify-between"
                onClick={() => setSelectedStatus(status)}
              >
                <span>
                  {statusLabels[status]}
                </span>

                {selectedStatus === status && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
              </Button>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleUpdate}
              disabled={!selectedStatus || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
