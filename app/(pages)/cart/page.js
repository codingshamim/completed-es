import AnimationContainer from "@/app/components/AnimationContainer";
import CartHeader from "./_components/CartHeader";
import CartItem from "./_components/CartItem";
import OrderSummary from "./_components/OrderSummary";
import getCartById from "@/app/backend/queries/getCartById";
import Link from "next/link";
import SectionHeader from "../(profile)/_components/SectionHeader";
import NoCartItem from "./_components/NoCartItem";
export const metadata = {
  title: "ES FITT | My Cart",
};
export default async function page() {
  const carts = await getCartById();

  let totalPrice = carts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <AnimationContainer>
      <section className="min-h-screen py-[50px]">
        {carts.length > 0 && carts ? (
          <>
            {" "}
            <SectionHeader title="আপনার কার্ট">
              {carts.length}টি আইটেম আপনার কার্টে
            </SectionHeader>
            <CartHeader />
            <div className="mt-4">
              {carts.length > 0 &&
                carts &&
                carts.map((cartItem) => (
                  <CartItem
                    productId={cartItem?.productId}
                    cartId={cartItem?._id}
                    size={cartItem?.size}
                    title={cartItem?.productId?.title}
                    stock={
                      cartItem?.productId?.sizes?.find(
                        (f) => f.size === cartItem.size
                      )?.stock
                    }
                    thumbnail={cartItem?.productId?.thumbnail}
                    price={cartItem?.price}
                    quantity={cartItem?.quantity}
                    key={cartItem?._id}
                  />
                ))}
            </div>
            <OrderSummary
              carts={carts}
              total={totalPrice}
              items={carts.length}
            />
          </>
        ) : (
          <NoCartItem />
        )}
      </section>
    </AnimationContainer>
  );
}
