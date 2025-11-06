// app/terms-and-conditions/page.js
/* eslint-disable react/no-unescaped-entities */

import SectionHeader from "../(profile)/_components/SectionHeader";

export const metadata = {
  title: "Esvibes - Terms & Conditions",
  description: "Terms and Conditions for ES VIBES - Premium T-shirt Store",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <SectionHeader title={"Terms and Conditions"}>
          Terms and Conditions for ES VIBES
        </SectionHeader>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Introduction
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Welcome to ES VIBES! These Terms and Conditions ("Terms")
                  govern your use of our website and services. By accessing or
                  using our website, you agree to be bound by these Terms.
                </p>
                <p>
                  By using our website and services, you consent to the
                  practices described in this Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          {/* Definitions Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Definitions
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      <strong className="text-white">"Company"</strong> refers
                      to ES VIBES
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      <strong className="text-white">"Service"</strong> refers
                      to the website and e-commerce platform
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      <strong className="text-white">"User"</strong> refers to
                      anyone who accesses or uses our service
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      <strong className="text-white">"Products"</strong> refers
                      to t-shirts and merchandise sold through our platform
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      <strong className="text-white">"Content"</strong> refers
                      to text, images, videos, and other materials on our
                      website
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use of Website Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Use of Website
            </h2>

            <div className="space-y-6">
              {/* Permitted Use */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Permitted Use
                </h3>
                <p className="text-gray-300 mb-4">
                  You may use our website for:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Browsing and purchasing products</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Creating and managing your account</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Communicating with customer service</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Accessing product information and reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prohibited Use */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Prohibited Use
                </h3>
                <p className="text-gray-300 mb-4">You agree not to:</p>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Use the website for any unlawful purpose</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Attempt to gain unauthorized access to our systems</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Upload malicious code or viruses</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Harvest or collect user information</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Interfere with website functionality</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Violate any applicable laws or regulations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Account Registration Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Account Registration
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                To access certain features, you may need to create an account.
                When creating an account, you agree to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300 mb-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Provide accurate and complete information</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Keep your login credentials secure</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Update your information as necessary</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Be responsible for all activities under your account</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Notify us immediately of any unauthorized use</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/50 border border-gray-700 rounded p-4">
                <p className="text-white">
                  <strong>Note:</strong> You must be at least 18 years old to
                  create an account or have parental consent.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Pricing Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Products and Pricing
            </h2>
            <div className="space-y-6">
              {/* Product Information */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Product Information
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      We strive to provide accurate product descriptions and
                      images
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Colors may vary slightly due to monitor settings</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      Product availability is subject to change without notice
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>
                      We reserve the right to discontinue products at any time
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Pricing
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>All prices are listed in Bangladeshi Taka (BDT)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Prices are subject to change without prior notice</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Promotional offers have terms and conditions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Shipping charges are additional unless specified</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Orders and Payments Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Orders and Payments
            </h2>
            <div className="space-y-6">
              {/* Order Process */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Order Process
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Orders are subject to acceptance and availability</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>We reserve the right to cancel orders for any reason</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Order confirmations will be sent via email</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Processing time is 1-3 business days</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Payment Methods
                </h3>
                <p className="text-white mb-4">
                  We accept the following payment methods:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Cash on Delivery (COD)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>bKash Mobile Banking</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Nagad Mobile Banking</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white text-xl">•</span>
                      <p>Bank Transfer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping and Delivery Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Shipping and Delivery
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="space-y-2 text-gray-300 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>Delivery within Dhaka: 1-2 business days</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>Delivery outside Dhaka: 3-5 business days</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>Shipping charges apply based on location</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>
                    We are not responsible for delays due to unforeseen
                    circumstances
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>Address accuracy is the customer's responsibility</p>
                </div>
              </div>
              <div className="bg-black/50 border border-gray-700 rounded p-4">
                <p className="text-white">
                  <strong>Free Shipping:</strong> Available for orders above BDT
                  1000 within Dhaka
                </p>
              </div>
            </div>
          </section>

          {/* Returns and Refunds Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Returns and Refunds
            </h2>
            <div className="space-y-6">
              {/* Return Policy */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Return Policy
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Returns accepted within 7 days of delivery</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Items must be unused and in original condition</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Original packaging and tags must be intact</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Customer responsible for return shipping costs</p>
                  </div>
                </div>
              </div>

              {/* Refund Process */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Refund Process
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Refunds processed within 7-10 business days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Refunds issued to original payment method</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Shipping charges are non-refundable</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <p>Damaged or defective items eligible for full refund</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Intellectual Property
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                All content on this website, including designs, logos, text,
                graphics, and images, is the property of ES VIBES and is
                protected by copyright and trademark laws.
              </p>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>
                    You may not reproduce, distribute, or modify our content
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>Product designs are original or licensed</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>ES VIBES logo and branding are registered trademarks</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <p>Unauthorized use may result in legal action</p>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Limitation of Liability
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                ES VIBES shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages resulting from
                your use of our website or products.
              </p>
              <div className="bg-black/50 border border-gray-700 rounded p-4">
                <p className="text-white">
                  <strong>Maximum Liability:</strong> Our total liability shall
                  not exceed the amount you paid for the specific product or
                  service.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Privacy
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the website, to
                understand our practices regarding the collection and use of
                your personal information.
              </p>
            </div>
          </section>

          {/* Modifications Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Modifications
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                We reserve the right to modify these Terms and Conditions at any
                time. Changes will be effective immediately upon posting on the
                website. Your continued use of our services constitutes
                acceptance of the modified terms.
              </p>
              <div className="bg-black/50 border border-gray-700 rounded p-4">
                <p className="text-white">
                  <strong>Notification:</strong> Significant changes will be
                  communicated via email or website notification.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Governing Law
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300">
                These Terms and Conditions are governed by and construed in
                accordance with the laws of Bangladesh. Any disputes arising
                under these terms shall be subject to the exclusive jurisdiction
                of the courts of Bangladesh.
              </p>
            </div>
          </section>

          {/* Contact Information Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-white pl-4">
              Contact Us
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms and Conditions,
                please contact us:
              </p>
              <div className="bg-black/50 border border-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-4 text-xl">
                  ES VIBES
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">Email:</strong>{" "}
                    support@esvibes.com
                  </p>
                  <p>
                    <strong className="text-white">Address:</strong> Tongi
                    Bazar, Gazipur - 1710, Bangladesh
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong>{" "}
                    +880-XXX-XXXXXX
                  </p>
                  <p>
                    <strong className="text-white">Business Hours:</strong> 9:00
                    AM - 6:00 PM (Saturday - Thursday)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Agreement Acknowledgment Section */}
          <section>
            <div className="bg-gray-900/30 border-2 border-white/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Agreement Acknowledgment
              </h3>
              <p className="text-gray-300 text-lg">
                By using ES VIBES website and services, you acknowledge that you
                have read, understood, and agree to be bound by these Terms and
                Conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
