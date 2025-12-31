import Link from "next/link";

import CartItem from "../../cart/_components/CartItem";
import CartHeader from "../../cart/_components/CartHeader";
import getCartById from "@/app/backend/queries/getCartById";
import mainPrice from "@/helpers/mainPrice";
import ShippingOption from "./ShippingOption";
import GrandTotal from "./GrandTotal";

import DeliveryOption from "./DeliveryOption";

import CheckoutSubmitter from "./CheckoutSubmitter";
import VoucherInput from "./VoucherInput";
import CheckoutButton from "./CheckoutButton";
import SectionHeader from "../../(profile)/_components/SectionHeader";
import { getBuyProductById } from "@/app/actions/buynow.action";
import minusDiscount from "@/helpers/minusDiscount";
import NoCartItem from "../../cart/_components/NoCartItem";

export default async function CheckoutPage({
  isBuyNow,
  productId,
  size,
  quantity,
  isPublicbuy,
}) {
  let carts = [];

  const cart = await getCartById();
  const product = await getBuyProductById(productId);
  carts = isBuyNow
    ? [
        {
          productId: product,
          price: minusDiscount(product?.price, product?.discount),
          quantity,
          size,
        },
      ]
    : cart;

  let totalPrice = carts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      {carts.length > 0 && carts ? (
        <>
          {" "}
          <SectionHeader title="Checkout">
            {carts.length} Item in Checkout
          </SectionHeader>
          <CartHeader mode="checkout" />
          <div className="mt-6">
            {carts.length > 0 &&
              carts &&
              carts.map((cartItem, index) => (
                <CartItem
                  mode="checkout"
                  productId={cartItem?.productId}
                  cartId={cartItem?._id}
                  size={cartItem?.size}
                  title={cartItem?.productId?.title}
                  stock={cartItem?.stock}
                  thumbnail={cartItem?.productId?.thumbnail}
                  price={cartItem?.price}
                  quantity={cartItem?.quantity}
                  key={index}
                />
              ))}
          </div>
        </>
      ) : (
        <NoCartItem />
      )}

      {carts.length > 0 && (
        <CheckoutSubmitter
          publicBuy={isPublicbuy}
          totalPrice={totalPrice}
          cartItems={carts}
        >
          {/* Shipping Option */}
          <ShippingOption />
          {/* Delivery Option */}
          <DeliveryOption />
          {/* Summary */}
          <div className="border border-gray-700 mt-4 p-6 bg-black h-fit">
            <h2 className="text-xl font-semibold mb-6 bangla-font">
              অর্ডার বিস্তারিত
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="bangla-font">
                  সর্বমোট ({carts?.length} আইটেম)
                </span>
                <span>{mainPrice(totalPrice)}</span>
              </div>

              {/* Voucher Input */}
              <VoucherInput totalPrice={totalPrice} />
              <hr className="my-4 border-gray-700" />
              <GrandTotal totalPrice={totalPrice} />
              <CheckoutButton totalItems={carts.length} />
            </div>
          </div>
        </CheckoutSubmitter>
      )}
    </div>
  );
}
