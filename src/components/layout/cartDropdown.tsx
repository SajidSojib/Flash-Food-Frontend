import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { cartServices } from '@/services/cart.service';

const CartDropdown = async ({userId}: {userId: string}) => {
    const {data} = await cartServices.getMyCart();
    return (
      <div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full inline-flex relative"
          asChild
        >
          <Link href="/dashboard/cart">
            <ShoppingCart className="h-5 w-5" />
            {data && data?.cartItems?.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                {data?.cartItems?.length}
              </Badge>
            )}
          </Link>
        </Button>
      </div>
    );
};

export default CartDropdown;