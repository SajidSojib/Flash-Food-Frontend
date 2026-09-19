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

                <TableCell>
                  {formatDate(order.createdAt)}
                </TableCell>

                <TableCell>
                  <Badge variant={statusVariant[order.status]}>
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
                      <DropdownMenuLabel>
                        Order Actions
                      </DropdownMenuLabel>

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