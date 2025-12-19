import AnimationContainer from "@/app/components/AnimationContainer";
import CartHeader from "./_components/CartHeader";
import CartItem from "./_components/CartItem";
import OrderSummary from "./_components/OrderSummary";
import getCartById from "@/app/backend/queries/getCartById";
import Link from "next/link";
import SectionHeader from "../(profile)/_components/SectionHeader";
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
          <div className="flex justify-center items-center flex-col gap-4 min-h-[50vh]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-frown"
            >
              <circle cx={12} cy={12} r={10} />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line x1={9} x2="9.01" y1={9} y2={9} />
              <line x1={15} x2="15.01" y1={9} y2={9} />
            </svg>
            <p>Your shopping cart is currently empty.</p>
            <div className="flex gap-2 items-center">
              {" "}
              <Link href="/" className="btn">
                Go To Home
              </Link>
              <Link href="/shop" className="variable-btn nav-border">
                Go To Shop
              </Link>
            </div>
          </div>
        )}
      </section>
    </AnimationContainer>
  );
}
