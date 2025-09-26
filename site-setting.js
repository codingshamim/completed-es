export const siteAddres =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const siteSettings = {
  siteName: "ES Vibes",
  siteUrl: siteAddres,
  siteTitle: "Esvibes | Premium T-Shirts & Unique Apparel Designs",
  siteDescription:
    "Discover Esvibes' collection of premium T-shirts featuring unique, trendy designs. High-quality materials, comfortable fit, and original artwork. Free shipping on orders over $50. Shop now! ",
  siteKeywords: [
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
      brand: "Esvibes",
      description:
        "Full Stack Developer specializing in JavaScript and Next.js, founder of Esvibes, a premium t-shirt and stylish apparel brand.",
      email: "contact@esvibes.com",
      website: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      social: {
        facebook: "https://www.facebook.com/mdshamimmia07",
      },
    },
  ],
  creator: "Esvibes",
  publisher: "Esvibes",

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
  pages: [
    {
      websitePages: [
        { title: "Home", url: "/", description: "Esvibes Home Page" },
        {
          title: "Cart",
          url: "/cart",
          description: "Your Shopping Cart",
        },
        { title: "Checkout", url: "/checkout", description: "Checkout Page" },
        { title: "Contact", url: "/contact", description: "Contact Us Page" },
        {
          title: "forgot-password",
          url: "/forgot-password",
          description: "Forgot Password Page",
        },
        {
          title: "Goodbye",
          url: "/goodbye",
          description: "Account Deletion Confirmation Page",
        },
        {
          title: "Login",
          url: "/login",
          description: "User Login Page",
        },
        {
          title: "Order Success",
          url: "/order-success",
          description: "Order Success Confirmation Page",
        },
        {
          title: "Register",
          url: "/register",
          description: "User Registration Page",
        },
        {
          title: "Shop",
          url: "/shop",
          description: "Shop All Products Page",
        },
        {
          title: "Terms and Conditions",
          url: "/terms",
          description: "Terms and Conditions Page",
        },
        {
          title: "Tshirt page",
          url: "/tshirt/[slug]",
          description: "Individual Tshirt Product Page",
        },
        {
          title: "Privacy Policy",
          url: "/privacy",
          description: "Privacy Policy Page",
        },
        {
          title: "Validatate your payment",
          url: "/validate-payment",
          description: "Validate Payment Page",
        },
      ],
    },
  ],
};

export default siteSettings;
