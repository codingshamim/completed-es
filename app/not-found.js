/* eslint-disable react/no-unescaped-entities */
// pages/404.js (for Pages Router) or app/not-found.js (for App Router)
"use client";
import React from "react";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>404 - Page Not Found | ESVIBES</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          {/* Large 404 Text */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-white leading-none tracking-tight">
              404
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
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

            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors min-w-[140px]"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Additional Actions */}
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

          {/* Popular Links */}
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
              <Link
                href="/contact"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                href="/support"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Support
              </Link>
              <Link
                href="/blog"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Brand Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">
              © 2024 ESVIBES. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Optional: Add this for better SEO and error tracking
export async function getStaticProps() {
  return {
    props: {
      statusCode: 404,
    },
  };
}
