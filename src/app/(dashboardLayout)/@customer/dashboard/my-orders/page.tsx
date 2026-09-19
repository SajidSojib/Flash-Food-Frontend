import { Metadata } from "next";
import { orderServices } from "@/services/order.service";
import { userServices } from "@/services/user.service";
import { OrderStats } from "@/components/module/customer/orders/orderStats";
import OrdersTable from "@/components/module/customer/orders/orderTable";
import PaginationControls from "@/components/common/pagination-controls";

export const metadata: Metadata = {
  title: "My Orders | Dashboard",
  description: "Track and manage your orders",
};

export default async function MyOrders() {
  const {data:session} = await userServices.getSessionServer();
  const { data: orderData } = await orderServices.getAllOrders({page: "1", limit: "10", userId: session?.user?.id}, {revalidate: 60});
  console.log({orderData, session});

  return (
    <div className="min-h-screen">
      <div className="space-y-6 p-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl text-center sm:text-left font-bold tracking-tight gradient-text">
                My Orders
              </h1>
              <p className="text-muted-foreground text-md sm:text-base text-center sm:text-left">
                Track and manage all your orders in one place
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <OrderStats orders={orderData.data} />

        {/* Orders List */}
        <OrdersTable orders={orderData.data}/>

        {orderData.data.length > 0 && <PaginationControls meta={orderData.meta} />}
      </div>
    </div>
  );
}