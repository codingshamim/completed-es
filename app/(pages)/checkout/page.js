import CheckoutPage from "./_components/CheckoutPage";
export const metadata = {
  title: "Esvibes - Checkout",
};
export default async function page({ searchParams }) {
  const param = (await searchParams) || null;
  const productId = param?.product || "";
  const size = param?.size || "";
  const quantity = parseInt(param?.quantity) || 1;
  const isBuyNow = productId && size && quantity ? true : false;

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <CheckoutPage
        isBuyNow={isBuyNow}
        productId={productId}
        size={size}
        quantity={quantity}
      />
    </div>
  );
}
