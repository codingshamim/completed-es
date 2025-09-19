import Link from "next/link";
import Logo from "./Logo";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-6 py-12 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Branding */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-sm mt-4 leading-relaxed text-gray-400">
              Bringing you good vibes, quality content, and meaningful
              experiences that matter.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm flex items-center">
                <span className="text-gray-500 mr-2">
                  <Mail size={18} />
                </span>
                contact@esvibes.com
              </p>
              <p className="text-sm flex items-center">
                <span className="text-gray-500 mr-2">
                  <Phone size={18} />
                </span>
                +880 1816628413
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                aria-label="Twitter"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                aria-label="Instagram"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                aria-label="LinkedIn"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white font-bold  tracking-wide logo-es">
                ES VIBES
              </div>
              <p className="text-sm text-gray-400">
                &copy; 2024 All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
