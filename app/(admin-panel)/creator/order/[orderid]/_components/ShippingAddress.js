export default function ShippingAddress({ address }) {
  return (
    <div className=" rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800 ">
        <h3 className="text-xl bangla-font font-semibold text-white flex items-center">
          <span className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bookmark-check-icon lucide-bookmark-check"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
              <path d="m9 10 2 2 4-4" />
            </svg>
          </span>
          ডেলিভারি ঠিকানা
        </h3>
      </div>
      <div className="p-6">
        <div className="rounded-lg p-6 border border-gray-700">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {address?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-white mb-2">
                {address?.name || "Unknown User"}
              </h4>
              <p className="text-gray-300 mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone-icon lucide-phone"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
                {address?.phone || 0}
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-house-icon lucide-house"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  {address?.address || "No address provided"}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin-house-icon lucide-map-pin-house"
                  >
                    <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                    <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                    <path d="M18 22v-3" />
                    <circle cx={10} cy={10} r={3} />
                  </svg>
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
