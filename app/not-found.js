/* eslint-disable react/no-unescaped-entities */
// app/not-found.js
import { Home, Search, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | ESVIBES",
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Large 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold leading-none tracking-tight">
            404
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors min-w-[140px]"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Additional Actions - Only show if these routes exist */}
        {/* Uncomment these if you have these routes in your app
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/60">
          <Link
            href="/search"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search our site</span>
          </Link>

          <div className="hidden sm:block w-px h-4 bg-white/20"></div>

          <Link
            href="/contact"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Contact support</span>
          </Link>
        </div>
        */}

        {/* Popular Links - Only include routes that actually exist in your app */}
        {/* Uncomment and modify based on your actual routes
        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wide">
            Popular Pages
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              About Us
            </Link>
          </div>
        </div>
        */}

        {/* Brand Footer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            © 2024 ESVIBES. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
