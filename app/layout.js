import { auth } from "@/auth";
import CommonProviders from "./src/providers/CommonProviders";
import "./globals.css";

export const metadata = {
  // Basic SEO
  title:
    "Esvibes - Premium T-Shirts with Unique Designs | Shop Stylish Apparel",
  description:
    "Discover Esvibes' collection of premium T-shirts featuring unique, trendy designs. High-quality materials, comfortable fit, and original artwork. Free shipping on orders over $50. Shop now!",

  // Keywords for better discoverability
  keywords: [
    "premium t-shirts",
    "unique t-shirt designs",
    "stylish apparel",
    "comfortable t-shirts",
    "trendy clothing",
    "original artwork shirts",
    "quality fashion",
    "casual wear",
    "graphic tees",
    "custom designs",
  ],

  // Author and publisher info
  authors: [{ name: "Esvibes Team" }],
  creator: "Esvibes",
  publisher: "Esvibes",

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://esvibes.com",
    title: "Esvibes - Premium T-Shirts with Unique Designs",
    description:
      "Discover premium T-shirts with unique designs at Esvibes. High-quality materials, comfortable fit, and original artwork. Shop stylish apparel now!",
    siteName: "Esvibes",
    images: [
      {
        url: "https://i.ibb.co.com/LtjVBLq/image.png",
        width: 1200,
        height: 600,
        alt: "Esvibes - Premium T-Shirts Collection",
        type: "image/png",
      },
      {
        url: "https://esvibes.com/og-square.jpg", // Add a square image for better compatibility
        width: 600,
        height: 600,
        alt: "Esvibes Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@esvibes", // Replace with your actual Twitter handle
    creator: "@esvibes",
    title: "Esvibes - Premium T-Shirts with Unique Designs",
    description:
      "Discover premium T-shirts with unique designs. High-quality materials, comfortable fit, and original artwork. Shop now!",
    images: ["https://i.ibb.co.com/LtjVBLq/image.png"],
  },

  // Verification tags (add your actual verification codes)
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["your@email.com", "https://esvibes.com"],
    },
  },

  // App links for mobile
  appLinks: {
    web: {
      url: "https://esvibes.com",
    },
  },

  // Additional metadata
  category: "E-commerce",
  classification: "Fashion & Apparel",

  // Structured data hints
  other: {
    "business:contact_data:street_address": "Your Street Address",
    "business:contact_data:locality": "Your City",
    "business:contact_data:region": "Your State",
    "business:contact_data:postal_code": "Your ZIP",
    "business:contact_data:country_name": "Your Country",
  },

  // Canonical URL
  alternates: {
    canonical: "https://esvibes.com",
    languages: {
      "en-US": "https://esvibes.com",
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Additional meta tags
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({ children }) {
  const user = await auth();
  return (
    <html lang="en">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "Esvibes",
              description:
                "Premium T-shirts with unique designs, high-quality materials and comfortable fit.",
              url: "https://esvibes.com",
              logo: "https://esvibes.com/logo.png",
              image: "https://i.ibb.co.com/LtjVBLq/image.png",
              sameAs: [
                "https://facebook.com/esvibes",
                "https://instagram.com/esvibes",
                "https://twitter.com/esvibes",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "Your City",
                addressRegion: "Your State",
                postalCode: "Your ZIP",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-XXX-XXX-XXXX",
                contactType: "Customer Service",
                availableLanguage: "English",
              },
              paymentAccepted: "Credit Card, PayPal, Apple Pay, Google Pay",
              priceRange: "$",
              openingHours: "Mo-Su 00:00-23:59",
            }),
          }}
        />
      </head>
      <body className="bg-[#000] text-white">
        <CommonProviders authenticatedUser={user?.user.id || null}>
          {children}
        </CommonProviders>
      </body>
    </html>
  );
}
