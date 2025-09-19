// ShippingAddress.js
export default function ShippingAddress({ address = {}, user = {} }) {
  // Use address data first, fallback to user data
  const displayName = address.name || user.name || "Name not provided";
  const displayPhone = address.phone || user.phone || "Phone not provided";
  const displayAddress = address.address || "Address not provided";
  const displayCity = address.city || "City not provided";
  const displayDistrict = address.district || "";
  const displayPostalCode = address.postalCode || "";

  // Check if we have any meaningful address data
  const hasAddressData = address.name || address.address || user.name;

  if (!hasAddressData) {
    return (
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg  transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-white">Shipping Address</h3>
        <div className="text-gray-500 italic">
          Shipping address information is not available for this order.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg  transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 text-white">Shipping Address</h3>
      <div className="text-gray-300">
        <div className="font-medium">{displayName}</div>
        <div>{displayAddress}</div>
        <div>
          {[displayCity, displayDistrict, displayPostalCode]
            .filter(Boolean)
            .join(", ")}
        </div>
        <div className="mt-2">Phone: {displayPhone}</div>
      </div>
    </div>
  );
}
