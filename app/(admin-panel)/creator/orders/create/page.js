import Searchbox from "@/app/(pages)/shop/_components/Searchbox";
import ReusableImage from "@/app/_components/ReusableImage";

import { getAllProducts } from "@/app/backend/queries/ProductQuery";

import ProductContainer from "./_compnents/ProductContainer";
import SelectedProducts from "./_compnents/SelectedProducts";
import mainPrice from "@/helpers/mainPrice";
import NoProductsFound from "@/app/sections/_components/NoProductsFound";
import OrderCreatorForm from "./_compnents/OrderCreatorForm";
import ShippingAddress from "./_compnents/ShippingAddress";
import ShippingOption from "./_compnents/ShippingOption";
import PaymentMethods from "./_compnents/PaymentMethods";
import OrderSummary from "./_compnents/OrderSummary";

export default async function OrderCreationPage({ searchParams }) {
  const param = await searchParams;

  const products = await getAllProducts(param?.query || "");

  return (
    <OrderCreatorForm>
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Products */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Select Products
              </h2>
              <Searchbox />

              {products.length > 0 ? (
                <div className="grid mt-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[650px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-600 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
                  {products.map((product) => (
                    <ProductContainer key={product._id} product={product}>
                      {/* Product Image */}
                      <div className="relative mb-3">
                        <ReusableImage
                          width={40}
                          height={40}
                          className="w-full"
                          imageClassName="w-full h-full object-cover rounded-lg bg-gray-800"
                          src={product.thumbnail}
                          alt={product.title || ""}
                        />

                        {product.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discount}% OFF
                          </div>
                        )}

                        <div
                          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded ${
                            product.stock === 0
                              ? "bg-red-900 text-red-200"
                              : product.stock < 10
                              ? "bg-yellow-900 text-yellow-200"
                              : "bg-green-900 text-green-200"
                          }`}
                        >
                          {product.stock === 0 ? "Out" : product.stock}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-white text-sm leading-tight overflow-hidden">
                          <span className="line-clamp-2">
                            {product.title || "Untitled"}
                          </span>
                        </h3>

                        <p className="text-gray-400 text-xs">
                          SKU: {product.sku || "N/A"}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          {product.discount > 0 ? (
                            <>
                              <span className="text-gray-500 text-sm line-through">
                                {mainPrice(product.price)}
                              </span>
                              <span className="text-green-400 font-bold">
                                {" "}
                                {mainPrice(
                                  product.price -
                                    (product.price * product.discount) / 100
                                )}
                              </span>
                            </>
                          ) : (
                            <span className="text-green-400 font-bold">
                              BDT {product.price}
                            </span>
                          )}
                        </div>

                        {/* Sizes */}
                      </div>
                    </ProductContainer>
                  ))}
                </div>
              ) : (
                <NoProductsFound />
              )}
            </div>

            {/* Selected Products Table */}
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-black px-6 py-3 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                  Selected Products
                </h2>
              </div>

              {/* Table Header */}
              <div className="bg-black px-6 py-3 border-b border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
                  <div className="col-span-1">Thumbnail</div>
                  <div className="col-span-4">Info</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-1">Size</div>
                  <div className="col-span-2">Total Price</div>
                </div>
              </div>

              {/* Table Body */}
              <SelectedProducts />
            </div>
          </div>

          {/* Order Form */}
          <div className="space-y-6">
            <ShippingAddress />

            {/* Shipping Options */}
            <ShippingOption />
            {/* Shipping Options */}
            <PaymentMethods />

            {/* Order Summary */}
            <OrderSummary />
          </div>
        </div>
      </div>
    </OrderCreatorForm>
  );
}
