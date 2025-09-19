import mainPrice from "@/helpers/mainPrice";
import Image from "next/image";
import DeleteCartButton from "./DeleteCartButton";

import EditCartButton from "./EditCartButton";
import ReusableImage from "@/app/_components/ReusableImage";

export default function CartItem({
  thumbnail,
  title,
  price,
  quantity,
  size,
  cartId,
  stock,
  productId,
  mode,
}) {
  const originalPrice = mainPrice(price);
  const totalPrice = mainPrice(price * quantity);

  return (
    <div className="grid mt-2 nav-border grid-cols-12 gap-4 shadow-lg p-2">
      <ReusableImage
        width={1200}
        height={720}
        className="col-span-12 md:col-span-1 w-full h-full "
        src={thumbnail}
        alt={title}
      />
      <div className="col-span-12 md:col-span-3 flex items-center ">
        <h1>{title}</h1>
      </div>
      <div
        className={`col-span-12 ${
          mode === "checkout" ? "md:col-span-3" : "md:col-span-2"
        } flex md:text-center md:justify-center  items-center `}
      >
        <span className="md:hidden "> Price :</span>
        <p className="text-gray-300 text-xs ml-2 md:text-center ">
          {" "}
          {originalPrice}
        </p>
      </div>
      <div className="col-span-12 md:col-span-1 md:text-center flex md:justify-center items-center">
        <span className="md:hidden"> Quantity :</span>
        <p className="text-gray-300 text-xs ml-2">{quantity}</p>
      </div>
      <div
        className={`col-span-12  md:text-center flex  md:justify-center  items-center ${
          mode === "checkout" ? "md:col-span-2" : "md:col-span-1"
        }`}
      >
        <span className="md:hidden"> Size :</span>
        <p className="text-gray-300 text-xs ml-2">{size}</p>
      </div>
      <div className="col-span-12 md:col-span-2 flex md:text-center  md:justify-center  items-center">
        <span className="md:hidden "> Total Price :</span>
        <p className="text-gray-300  ml-2 text-xs md:text-center ">
          {" "}
          {totalPrice}
        </p>
      </div>
      {mode === "checkout" || (
        <div
          className={`col-span-12  flex items-center gap-2 ${
            mode === "checkout" ? "md:col-span-2" : "md:col-span-1"
          }`}
        >
          <EditCartButton
            quantity={quantity}
            size={size}
            cartId={cartId}
            stock={stock}
            productId={productId}
          />
          <DeleteCartButton cartId={cartId} />
        </div>
      )}
    </div>
  );
}
