export const siteAddres =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";

const siteSettings = {
  siteName: "ES FITT",
  siteUrl: siteAddres,
  siteTitle: "ES FITT | Crafted T-Shirts & Premium Apparel",
  siteDescription:
    "Explore ES FIT premium T-shirts with stylish, original designs. Made from high-quality materials for comfort, durability, and a perfect fit..",
  siteKeywords: [
    "ES FITT",
    "es fitt",

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
    "exclusive t-shirts",
    "fashionable streetwear",
    "high-quality cotton shirts",
    "modern graphic t-shirts",
    "limited edition apparel",
    "eco-friendly t-shirts",
    "luxury casual wear",
    "everyday wear t-shirts",
    "stylish outfits for men",
    "stylish outfits for women",
  ],
  authors: [
    {
      name: "Md Shamim Mia",
      role: "CEO & Founder",
      brand: "ES FITT",
      description:
        "Full Stack Developer specializing in JavaScript and Next.js, founder of ES FITT, a premium t-shirt and stylish apparel brand.",
      email: "contact@esfitt.com",
      website: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000",
      social: {
        facebook: "https://www.facebook.com/mdshamimmia07",
      },
    },
  ],
  creator: "ES FITT",
  publisher: "ES FITT",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://esfitt.com",
    title: "ES FITT - Crafted T-Shirts with Unique Designs",
    description:
      "Discover premium T-shirts with unique designs at ES FITT. High-quality materials, comfortable fit, and original artwork. Shop stylish apparel now!",
    siteName: "ES FITT",
    images: [
      {
        url: "/og/og.png",
        width: 1200,
        height: 600,
        alt: "ES FITT - Premium T-Shirts Collection",
        type: "image/png",
      },
      {
        url: "/og/og2.png", // Add a square image for better compatibility
        width: 600,
        height: 600,
        alt: "ES FITT Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@esfitt", // Replace with your actual Twitter handle
    creator: "@esfitt",
    title: "ES FITT - Crafted T-Shirts with Unique Designs",
    description:
      "Explore ES FIT premium T-shirts with stylish, original designs. Made from high-quality materials for comfort, durability, and a perfect fit.",
    images: ["https://i.ibb.co.com/LtjVBLq/image.png"],
  },

  // Verification tags (add your actual verification codes)
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["your@email.com", "https://esfitt.com"],
    },
  },
  siteCategory: "E-commerce",
  classification: "Fashion & Apparel",
  // Structured data hints
  other: {
    "business:contact_data:street_address": "Tongi Bazar, Gazipur - 1710",
    "business:contact_data:locality": "Tongi",
    "business:contact_data:region": "Gazipur",
    "business:contact_data:postal_code": "1710",
    "business:contact_data:country_name": "Bangladesh",
  },
};

export default siteSettings;
