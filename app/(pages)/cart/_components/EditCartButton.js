"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function EditCartButton({
  productId,
  quantity,
  size,
  cartId,
  stock,
}) {
  const { common, setCommon } = useCommonState();
  const handleEdit = () => {
    setCommon({
      ...common,
      buyModal: true,
      productId: productId,
      mode: "update",
      quantity: quantity,
      size: size,
      cartId: cartId,
      stock,
    });
  };
  return (
    <button onClick={handleEdit} className="btn">
      Edit
    </button>
  );
}
