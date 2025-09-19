import getSingleProductbyid from "@/app/backend/queries/getSingleProductbyid";
import Image from "next/image";

export default async function OrderItem({ item }) {
  const product = await getSingleProductbyid(item?.productId);

  return (
    <div className="flex -space-x-2">
      <Image
        width={32}
        height={32}
        src={product?.product?.thumbnail}
        alt={product?.product?.title}
        className="w-8 h-8 rounded-full border-2 border-gray-600 object-cover"
      />
    </div>
  );
}
