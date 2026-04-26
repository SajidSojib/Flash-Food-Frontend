"use client";

import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createOrder } from "@/action/order.action";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function OrderNowButton() {
  const [open, setOpen] = React.useState(false);
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [deliveryInstructions, setDeliveryInstructions] = React.useState("");

  const handleOrder = async () => {
    if (!deliveryAddress.trim()) {
      toast.error("Delivery address is required");
      return;
    }

    const toastId = toast.loading("Ordering...");

    try {
      const res = await createOrder(deliveryAddress, deliveryInstructions);

      if (res.error) {
        toast.error(res.message || res.error.message, {
          id: toastId,
        });
      } else {
        toast.success("Ordered successfully", {
          id: toastId,
        });

        setDeliveryAddress("");
        setDeliveryInstructions("");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button>Order <span className="hidden sm:inline">Now</span></Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Address */}
          <div className="space-y-2">
            <Label>Delivery Address</Label>
            <Textarea
              className="bg-card"
              placeholder="Enter your address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label>Instructions (optional)</Label>
            <Textarea
              className="bg-card"
              placeholder="e.g. call before delivery"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleOrder}>Confirm Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
