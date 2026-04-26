import CartList from "@/components/module/customer/cart/cartList";
import { cartServices } from "@/services/cart.service";

const CartPage = async () => {
  const { data } = await cartServices.getMyCart();

  return (
    <div className="p-6">
      <CartList
        cartItems={data?.cartItems || []}
        totalAmount={data?.totalAmount || 0}
      />
    </div>
  );
};

export default CartPage;
