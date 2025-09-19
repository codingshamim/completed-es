import Link from "next/link";

export default function PaymentMethods({ orderTransactionId }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* bKash */}
      <Link
        href={`/validate-payment?transaction=${orderTransactionId}&method=bkash`}
        className="flex flex-col items-center justify-center bg-pink-900/20 border border-pink-500/30 text-pink-300 rounded-lg p-4 hover:bg-pink-900/40 transition"
      >
        <svg
          width={80}
          height={80}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    ".bkash-path{fill:none;stroke:#e2136e;stroke-linecap:round;stroke-linejoin:round;}",
                }}
              />
            </defs>
            <path
              className="bkash-path"
              d="M22.9814,8.6317s-4.1632,14.704-3.8089,14.704,16.4755,2.923,16.4755,2.923Z"
            />
            <polyline
              className="bkash-path"
              points="22.981 8.632 6.329 6.152 19.172 23.336 21.387 33.522 35.648 26.259 39.368 17.445 30.393 18.946"
            />
            <polyline
              className="bkash-path"
              points="37.929 20.855 43 20.855 39.368 17.445"
            />
            <polyline
              className="bkash-path"
              points="21.387 33.522 21.741 35.427 13.725 41.848 19.172 23.336"
            />
            <polyline
              className="bkash-path"
              points="35.648 26.259 35.117 29.138 22.848 32.778"
            />
            <polyline
              className="bkash-path"
              points="8.455 8.997 5 8.997 16.044 19.15"
            />
          </g>
        </svg>

        <span className="mt-2 font-medium">bKash</span>
      </Link>

      {/* Nagad */}
      <Link
        href={`/validate-payment?transaction=${orderTransactionId}&method=nagad`}
        className="flex flex-col items-center justify-center bg-orange-900/20 border border-orange-500/30 text-orange-300 rounded-lg p-4 hover:bg-orange-900/40 transition"
      >
        <svg
          viewBox="0 0 48 48"
          width={80}
          height={80}
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    ".nagad-path{fill:none;stroke:#f97316;stroke-linecap:round;stroke-linejoin:round;}",
                }}
              />
            </defs>
            <path
              className="nagad-path"
              d="M18.8808,6.3975A19.3468,19.3468,0,1,0,42.3963,19.3847"
            />
            <path
              className="nagad-path"
              d="M14.9194,25.893C14.8584,21.68,17.4842,13.8021,26.4,9.955L22.7968,3.5432C17.4231,6.169,10.2174,15.2066,14.9194,25.893Z"
            />
            <path
              className="nagad-path"
              d="M22.136,12.4087a16.7784,16.7784,0,0,0-2.9215,8.8424c1.8394-3.7912,7.7259-9.6477,17.4192-9.0767l-.3362-7.347A17.9936,17.9936,0,0,0,25.6848,8.683"
            />
            <path
              className="nagad-path"
              d="M34.4651,12.1527A16.506,16.506,0,0,0,23.896,20.28c3.3473-2.56,11.238-5.1453,19.64-.2781l3.0022-6.7141a17.7464,17.7464,0,0,0-9.9239-1.5322"
            />
            <path
              className="nagad-path"
              d="M13.4377,20.0692a11.6039,11.6039,0,1,0,19.0467-2.7711"
            />
          </g>
        </svg>

        <span className="mt-2 font-medium">Nagad</span>
      </Link>

      {/* Rocket */}
      <Link
        href={`/validate-payment?transaction=${orderTransactionId}&method=rocket`}
        className="flex flex-col items-center justify-center bg-purple-900/20 border border-purple-500/30 text-purple-300 rounded-lg p-4 hover:bg-purple-900/40 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={80}
          height={80}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send-icon lucide-send"
        >
          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
          <path d="m21.854 2.147-10.94 10.939" />
        </svg>

        <span className="mt-2 font-medium">Rocket</span>
      </Link>
    </div>
  );
}
