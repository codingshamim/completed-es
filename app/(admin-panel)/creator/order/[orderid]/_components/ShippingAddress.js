import { Home, LocationEdit, Phone } from "lucide-react";

export default function ShippingAddress({ address }) {
  return (
    <div className="rounded-lg border border-gray-800 w-full">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-800">
        <h3 className="text-lg md:text-xl bangla-font font-semibold text-white flex items-center">
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-green-600 flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              className="text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
              <path d="m9 10 2 2 4-4" />
            </svg>
          </span>
          ডেলিভারি ঠিকানা
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-6">
        <div className="rounded-lg p-4 md:p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {address?.name?.charAt(0) || "U"}
            </div>

            {/* Details */}
            <div className="flex-1 w-full break-words">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-2">
                {address?.name || "Unknown User"}
              </h4>

              {/* Phone */}
              <p className="text-gray-300 mb-3 flex items-center gap-2 break-words">
                <Phone width={18} height={18} />
                {address?.phone || "Not Provided"}
              </p>

              {/* Address */}
              <div className="space-y-2">
                <p className="text-gray-300 flex items-start gap-2 break-words">
                  <Home width={18} height={18} />
                  {address?.address || "No address provided"}
                </p>

                {/* City / District */}
                <p className="text-gray-300 flex items-start gap-2 break-words">
                  <LocationEdit width={18} height={18} />
                  {address?.city || "Unknown City"},{" "}
                  {address?.district || "Unknown District"} -{" "}
                  {address?.postalCode || "Unknown postal code"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
