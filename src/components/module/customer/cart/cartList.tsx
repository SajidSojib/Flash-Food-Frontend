import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartActionButton from "./cartActionButton";
import Link from "next/link";
import OrderNowButton from "@/components/common/orderNowButton";

type CartItem = {
  id: string;
  mealId: string;
  mealName: string;
  mealImage: string;
  price: number;
  quantity: number;
};

export default function CartList({
  cartItems,
  totalAmount,
}: {
  cartItems: CartItem[];
  totalAmount: number;
}) {
  if (cartItems.length === 0) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="rounded-full bg-muted p-4">
            <span className="text-2xl">🛒</span>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add some delicious food to get started.
            </p>
          </div>

          <Button asChild>
            <Link href="/menus">Browse Food</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-4xl overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="border-b px-4 py-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl gradient-text  font-bold">Your Cart</h1>
          <p className="text-sm text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {/* Items */}
        <div className="divide-y">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6"
            >
              {/* Food info */}
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <img
                  src={item.mealImage}
                  alt={item.mealName}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover sm:h-18 sm:w-18"
                />

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-medium sm:text-base">
                    {item.mealName}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    ৳ {item.price}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <CartActionButton mealId={item.mealId} quantity={item.quantity} />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold">৳ {totalAmount}</span>
          </div>

          {/* <Separator className="my-4" /> */}

          <div className="flex justify-between mt-6 gap-3">
            <Button variant="outline" asChild>
              <Link href="/menus">
                Browse <span className="hidden sm:inline">&nbsp;More</span>
              </Link>
            </Button>

            <OrderNowButton totalAmount={totalAmount} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
