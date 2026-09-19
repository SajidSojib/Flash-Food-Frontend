// components/module/customer/orders/OrderDialogs.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  XCircle,
  Clock,
  Package,
  ShoppingBag,
  ChevronDown,
  RefreshCw,
  Ban,
  CheckCheck,
  CheckCircle2,
} from "lucide-react";

interface OrderDialogsProps {
  selectedOrder: any;
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (value: boolean) => void;
  isStatusDialogOpen: boolean;
  setIsStatusDialogOpen: (value: boolean) => void;
  newStatus: string;
  setNewStatus: (value: string) => void;
  isLoading: boolean;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export function OrderDialogs({
  selectedOrder,
  isViewDialogOpen,
  setIsViewDialogOpen,
  isStatusDialogOpen,
  setIsStatusDialogOpen,
  newStatus,
  setNewStatus,
  isLoading,
  onStatusChange,
}: OrderDialogsProps) {
  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> =
      {
        PLACED: {
          label: "Placed",
          color:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
          icon: Clock,
        },
        PREPARING: {
          label: "Preparing",
          color:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
          icon: Package,
        },
        DELIVERED: {
          label: "Delivered",
          color:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
          icon: CheckCircle2,
        },
        RECEIVED: {
          label: "Received",
          color:
            "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800",
          icon: CheckCheck,
        },
        CANCELLED: {
          label: "Cancelled",
          color:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
          icon: XCircle,
        },
        REJECTED: {
          label: "Rejected",
          color:
            "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
          icon: Ban,
        },
      };
    return configs[status] || configs.PLACED;
  };

  const getNextStatuses = (currentStatus: string) => {
    const statusFlow: Record<string, string[]> = {
      PLACED: ["PREPARING", "CANCELLED", "REJECTED"],
      PREPARING: ["DELIVERED", "CANCELLED", "REJECTED"],
      DELIVERED: ["RECEIVED"],
      RECEIVED: [],
      CANCELLED: [],
      REJECTED: [],
    };
    return statusFlow[currentStatus] || [];
  };

  const getStatusBadge = (status: string) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`gap-1.5 px-3 py-1 ${config.color}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <>
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Order Details
            </DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id?.slice(0, 8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Status & Info */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedOrder.status)}
                  <span className="text-sm text-muted-foreground">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-lg font-bold text-primary">
                  ${selectedOrder.totalAmount?.toFixed(2) || "0.00"}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Delivery Address
                  </p>
                  <p className="font-medium mt-1">
                    {selectedOrder.deliveryAddress || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Delivery Instructions
                  </p>
                  <p className="font-medium mt-1">
                    {selectedOrder.deliveryInstructions || "N/A"}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of order #
              {selectedOrder?.id?.slice(0, 8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Current Status
                  </span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Change to:
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {getNextStatuses(selectedOrder.status).map((status) => {
                  const config = getStatusConfig(status);
                  const Icon = config.icon;
                  return (
                    <Button
                      key={status}
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-4 px-4 hover:border-ring hover:bg-accent/20 dark:hover:bg-accent/10"
                      onClick={() => setNewStatus(status)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium capitalize">
                        {status.replace("_", " ").toLowerCase()}
                      </span>
                      {newStatus === status && (
                        <CheckCircle2 className="h-4 w-4 text-success ml-auto" />
                      )}
                    </Button>
                  );
                })}
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsStatusDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => onStatusChange(selectedOrder.id, newStatus)}
                  disabled={!newStatus || isLoading}
                  className="bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
