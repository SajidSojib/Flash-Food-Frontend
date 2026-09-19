import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/order";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import UpdateOrderStatusDialog from "./updateOrderStatusDialog";
import ViewOrderDialog from "./viewOrderDialog";


interface OrdersTableProps {
  orders: Order[];
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

const statusFlow: Record<Order["status"], Order["status"][]> = {
  PLACED: ["PREPARING", "CANCELLED", "REJECTED"],
  PREPARING: ["DELIVERED", "CANCELLED", "REJECTED"],
  DELIVERED: ["RECEIVED"],
  RECEIVED: [],
  CANCELLED: [],
  REJECTED: [],
};

const badgeStyle: Record<Order["status"], string> = {
  PLACED:
    "border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",

  PREPARING:
    "border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-400",

  DELIVERED:
    "border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400",

  RECEIVED:
    "border-teal-200 bg-teal-100 text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-400",

  CANCELLED:
    "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400",

  REJECTED:
    "border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
};

function formatOrderId(id: string) {
  return `#${id.slice(0, 8).toUpperCase()}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table className="bg-card">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="py-8 text-center text-muted-foreground"
            >
              No orders found
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => {
            const nextStatuses = statusFlow[order.status];

            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm font-medium">
                  {formatOrderId(order.id)}
                </TableCell>

                <TableCell className="font-medium">
                  ${order.totalAmount.toFixed(2)}
                </TableCell>

                <TableCell>{formatDate(order.createdAt)}</TableCell>

                <TableCell>
                  <Badge className={badgeStyle[order.status]}>
                    {statusLabels[order.status]}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Order Actions</DropdownMenuLabel>

                      <ViewOrderDialog order={order} />

                      {nextStatuses.length > 0 && (
                        <>
                          <DropdownMenuSeparator />

                          <UpdateOrderStatusDialog
                            order={order}
                            nextStatuses={nextStatuses}
                          />
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}