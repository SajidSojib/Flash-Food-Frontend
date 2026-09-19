"use client";

import { Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
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

import { Order } from "@/types/order";

interface ViewOrderDialogProps {
  order: Order;
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

export default function ViewOrderDialog({
  order,
}: ViewOrderDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => event.preventDefault()}
          className="cursor-pointer"
        >
          <Eye className="mr-3 h-4 w-4" />
          View Details
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Details
          </DialogTitle>

          <DialogDescription>
            Order #{order.id.slice(0, 8).toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order summary */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <Badge variant={statusVariant[order.status]}>
                {statusLabels[order.status]}
              </Badge>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Total
              </p>

              <p className="text-xl font-semibold">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Delivery information */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 font-semibold">
              Delivery Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Address
                </p>

                <p className="mt-1 font-medium">
                  {order.deliveryAddress || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Instructions
                </p>

                <p className="mt-1 font-medium">
                  {order.deliveryInstructions || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Order items */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 font-semibold">
              Items
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">
                      Meal #{item.mealId.slice(0, 8)}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Created
              </p>

              <p className="mt-1 font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Last Updated
              </p>

              <p className="mt-1 font-medium">
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
