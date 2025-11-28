import { auth } from "@/auth";
import CommonProviders from "./src/providers/CommonProviders";
import "./globals.css";
import siteSettings, { siteAddres } from "@/site-setting";

export const metadata = {
  // Basic SEO
  title:
    siteSettings?.siteTitle ||
    "Esvibes | Premium T-Shirts & Unique Apparel Designs",
  description:
    siteSettings?.siteDescription ||
    "Discover Esvibes' collection of premium T-shirts featuring unique, trendy designs. High-quality materials, comfortable fit, and original artwork. Free shipping on orders over $50. Shop now!",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  // Open Graph image
  image:
    siteSettings?.openGraph?.images?.[0]?.url ||
    "https://i.ibb.co.com/LtjVBLq/image.png",

  // Keywords for better discoverability
  keywords: siteSettings?.siteKeywords || [
    "premium t-shirts",
    "unique t-shirt designs",
  ],

  // Author and publisher info
  authors: siteSettings?.authors || [
    {
      name: "Md Shamim Mia",
      role: "CEO & Founder",
      brand: "Esvibes",
      description:
        "Full Stack Developer specializing in JavaScript and Next.js, founder of Esvibes, a premium t-shirt and stylish apparel brand.",
      email: "contact@esvibes.com",
    },
  ],
  creator: siteSettings?.creator || "Esvibes",
  publisher: siteSettings?.publisher || "Esvibes",

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
  openGraph: siteSettings?.openGraph,

  // App links for mobile

  // Additional metadata
  category: siteSettings?.siteCategory,
  classification: siteSettings?.classification,

  // Structured data hints
  other: siteSettings?.other,

  // Canonical URL
  alternates: {
    canonical: siteAddres,
    languages: {
      "en-US": siteAddres,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" }, // GOOGLE REQUIRED
      { url: "/icon-32x32.png", sizes: "32x32" },
      { url: "/icon-16x16.png", sizes: "16x16" },
      { url: "/favicon.ico", type: "image/x-icon" }, // For browsers
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
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
      </head>
      <body className="bg-[#000] text-white">
        <CommonProviders authenticatedUser={user?.user.id || null}>
          {children}
        </CommonProviders>
      </body>
    </html>
  );
}
