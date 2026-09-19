// "use client";

import { Card, CardContent } from "@/components/ui/card";
import { OrderStatus } from "@/constants/orderStatus";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Ban,
  CheckCheck,
} from "lucide-react";

interface OrderStatsProps {
  orders: any[];
}

export function OrderStats({ orders }: OrderStatsProps) {
  const stats = {
    total: orders?.length || 0,
    placed:
      orders?.filter((o: any) => o.status === OrderStatus.PLACED).length || 0,
    preparing:
      orders?.filter((o: any) => o.status === OrderStatus.PREPARING).length ||
      0,
    delivered:
      orders?.filter((o: any) => o.status === OrderStatus.DELIVERED).length ||
      0,
    received:
      orders?.filter((o: any) => o.status === OrderStatus.RECEIVED).length || 0,
    cancelled:
      orders?.filter((o: any) => o.status === OrderStatus.CANCELLED).length ||
      0,
    rejected:
      orders?.filter((o: any) => o.status === OrderStatus.REJECTED).length || 0,
  };

  const statCards = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Placed",
      value: stats.placed,
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "Preparing",
      value: stats.preparing,
      icon: Package,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Delivered",
      value: stats.delivered,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Received",
      value: stats.received,
      icon: CheckCheck,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      textColor: "text-teal-600 dark:text-teal-400",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: Ban,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      textColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass ${
            index === 0
              ? "col-span-2 md:col-span-3 lg:col-span-1"
              : "col-span-1"
          }`}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <div className={`p-2 rounded-full ${stat.bgColor} mb-2`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
