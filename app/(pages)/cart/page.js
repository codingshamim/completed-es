import AnimationContainer from "@/app/components/AnimationContainer";
import CartHeader from "./_components/CartHeader";
import CartItem from "./_components/CartItem";
import OrderSummary from "./_components/OrderSummary";
import getCartById from "@/app/backend/queries/getCartById";
import Link from "next/link";
export const metadata = {
  title: "Esvibes - Cart",
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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Shopping Cart
              </h1>
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2">
                <svg
                  className="size-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0v6a2 2 0 11-4 0v-6m6 0a2 2 0 11-4 0"
                  />
                </svg>
                <span className="text-white font-medium">
                  {carts?.length} {carts?.length === 1 ? "Item" : "Items"} in
                  Cart
                </span>
              </div>
            </div>
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
                    stock={cartItem?.stock}
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
