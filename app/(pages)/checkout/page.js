import CheckoutPage from "./_components/CheckoutPage";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className=" text-center">
        <h1 className="text-3xl font-bold ">Checkout</h1>
      </div>
      {/* Main Grid */}
      <CheckoutPage />
    </div>

  )
}
