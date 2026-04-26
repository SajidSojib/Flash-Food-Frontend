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
  mealImages: string[];
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
      <Card className="p-6 text-center space-y-4">
        <p className="text-muted-foreground">Your cart is empty</p>
        <Link href="/menus"><Button>Browse Food</Button></Link>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <CardContent className="space-y-4 p-0">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-1 sm:gap-4">
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={item.mealImages[0]}
                  alt={item.mealName}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover"
                />

                <div>
                  <h2 className="font-medium text-xs sm:text-base">{item.mealName}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    ৳ {item.price}
                  </p>
                </div>
              </div>

              {/* Right */}
              <CartActionButton mealId={item.mealId} quantity={item.quantity} />
            </div>
            <Separator />
          </div>
        ))}

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>৳ {totalAmount}</span>
        </div>

        <div className="flex justify-between gap-4 mt-3">
          <Button
            variant="outline"
          >
            <Link href="/menus">Browse <span className="hidden sm:inline">More</span></Link>
          </Button>

          <OrderNowButton />
        </div>
      </CardContent>
    </Card>
  );
}
