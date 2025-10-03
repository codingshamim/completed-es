// app/terms-and-conditions/page.js
/* eslint-disable react/no-unescaped-entities */

export const metadata = {
  title: "Esvibes - Terms & Conditions",
  description: "Terms and Conditions for Esvibes - Premium T-shirt Store",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Last Updated */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <p className="text-white font-semibold">
              Last updated:{" "}
              <span className="text-gray-300">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>

          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                Welcome to ES VIBES! These Terms and Conditions ("Terms") govern
                your use of our website and services. By accessing or using our
                website, you agree to be bound by these Terms.
              </p>
              <div className="bg-gray-900 p-6 rounded-lg">
                <p className="text-white">
                  <strong>Important:</strong> If you do not agree with any part
                  of these terms, you may not access the service.
                </p>
              </div>
            </div>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Definitions</h2>
            <div className="text-gray-300 text-lg leading-relaxed">
              <ul className="space-y-3">
                <li>
                  <strong className="text-white">"Company"</strong> refers to ES
                  VIBES
                </li>
                <li>
                  <strong className="text-white">"Service"</strong> refers to
                  the website and e-commerce platform
                </li>
                <li>
                  <strong className="text-white">"User"</strong> refers to
                  anyone who accesses or uses our service
                </li>
                <li>
                  <strong className="text-white">"Products"</strong> refers to
                  t-shirts and merchandise sold through our platform
                </li>
                <li>
                  <strong className="text-white">"Content"</strong> refers to
                  text, images, videos, and other materials on our website
                </li>
              </ul>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Acceptance of Terms
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed">
              <p>
                By accessing and using ES VIBES, you accept and agree to be
                bound by the terms and provision of this agreement.
                Additionally, when using this website's particular services, you
                shall be subject to any posted guidelines or rules applicable to
                such services.
              </p>
            </div>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Use of Website
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Permitted Use
                </h3>
                <p className="mb-4">You may use our website for:</p>
                <ul className="space-y-2">
                  <li>• Browsing and purchasing products</li>
                  <li>• Creating and managing your account</li>
                  <li>• Communicating with customer service</li>
                  <li>• Accessing product information and reviews</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Prohibited Use
                </h3>
                <p className="mb-4">You agree not to:</p>
                <ul className="space-y-2">
                  <li>• Use the website for any unlawful purpose</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Upload malicious code or viruses</li>
                  <li>• Harvest or collect user information</li>
                  <li>• Interfere with website functionality</li>
                  <li>• Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Account Registration
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                To access certain features, you may need to create an account.
                When creating an account, you agree to:
              </p>
              <ul className="space-y-2">
                <li>• Provide accurate and complete information</li>
                <li>• Keep your login credentials secure</li>
                <li>• Update your information as necessary</li>
                <li>• Be responsible for all activities under your account</li>
                <li>• Notify us immediately of any unauthorized use</li>
              </ul>
              <div className="bg-gray-900 p-6 rounded-lg">
                <p className="text-white">
                  <strong>Note:</strong> You must be at least 18 years old to
                  create an account or have parental consent.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Pricing */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Products and Pricing
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Product Information
                </h3>
                <ul className="space-y-2">
                  <li>
                    • We strive to provide accurate product descriptions and
                    images
                  </li>
                  <li>• Colors may vary slightly due to monitor settings</li>
                  <li>
                    • Product availability is subject to change without notice
                  </li>
                  <li>
                    • We reserve the right to discontinue products at any time
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Pricing
                </h3>
                <ul className="space-y-2">
                  <li>• All prices are listed in Bangladeshi Taka (BDT)</li>
                  <li>• Prices are subject to change without prior notice</li>
                  <li>• Promotional offers have terms and conditions</li>
                  <li>• Shipping charges are additional unless specified</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Orders and Payments */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Orders and Payments
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Order Process
                </h3>
                <ul className="space-y-2">
                  <li>• Orders are subject to acceptance and availability</li>
                  <li>
                    • We reserve the right to cancel orders for any reason
                  </li>
                  <li>• Order confirmations will be sent via email</li>
                  <li>• Processing time is 1-3 business days</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Payment Methods
                </h3>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <p className="mb-4 text-white font-semibold">
                    We accept the following payment methods:
                  </p>
                  <ul className="space-y-2">
                    <li>• Cash on Delivery (COD)</li>
                    <li>• bKash Mobile Banking</li>
                    <li>• Nagad Mobile Banking</li>
                    <li>• Bank Transfer</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Shipping and Delivery
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <ul className="space-y-2">
                <li>• Delivery within Dhaka: 1-2 business days</li>
                <li>• Delivery outside Dhaka: 3-5 business days</li>
                <li>• Shipping charges apply based on location</li>
                <li>
                  • We are not responsible for delays due to unforeseen
                  circumstances
                </li>
                <li>• Address accuracy is the customer's responsibility</li>
              </ul>
              <div className="bg-gray-900 p-6 rounded-lg">
                <p className="text-white">
                  <strong>Free Shipping:</strong> Available for orders above BDT
                  1000 within Dhaka
                </p>
              </div>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Returns and Refunds
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Return Policy
                </h3>
                <ul className="space-y-2">
                  <li>• Returns accepted within 7 days of delivery</li>
                  <li>• Items must be unused and in original condition</li>
                  <li>• Original packaging and tags must be intact</li>
                  <li>• Customer responsible for return shipping costs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Refund Process
                </h3>
                <ul className="space-y-2">
                  <li>• Refunds processed within 7-10 business days</li>
                  <li>• Refunds issued to original payment method</li>
                  <li>• Shipping charges are non-refundable</li>
                  <li>• Damaged or defective items eligible for full refund</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Intellectual Property
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                All content on this website, including designs, logos, text,
                graphics, and images, is the property of ES VIBES and is
                protected by copyright and trademark laws.
              </p>
              <ul className="space-y-2">
                <li>
                  • You may not reproduce, distribute, or modify our content
                </li>
                <li>• Product designs are original or licensed</li>
                <li>• ES VIBES logo and branding are registered trademarks</li>
                <li>• Unauthorized use may result in legal action</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Limitation of Liability
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                ES VIBES shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages resulting from
                your use of our website or products.
              </p>
              <div className="bg-gray-900 p-6 rounded-lg">
                <p className="text-white">
                  <strong>Maximum Liability:</strong> Our total liability shall
                  not exceed the amount you paid for the specific product or
                  service.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Privacy</h2>
            <div className="text-gray-300 text-lg leading-relaxed">
              <p>
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the website, to
                understand our practices regarding the collection and use of
                your personal information.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Modifications
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                We reserve the right to modify these Terms and Conditions at any
                time. Changes will be effective immediately upon posting on the
                website. Your continued use of our services constitutes
                acceptance of the modified terms.
              </p>
              <div className="bg-gray-900 p-6 rounded-lg">
                <p className="text-white">
                  <strong>Notification:</strong> Significant changes will be
                  communicated via email or website notification.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Governing Law
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed">
              <p>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of Bangladesh. Any disputes arising
                under these terms shall be subject to the exclusive jurisdiction
                of the courts of Bangladesh.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <div className="text-gray-300 text-lg leading-relaxed">
              <p className="mb-6">
                If you have any questions about these Terms and Conditions,
                please contact us:
              </p>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h4 className="font-semibold text-white mb-4 text-xl">
                  ES VIBES
                </h4>
                <div className="space-y-3">
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

          {/* Agreement */}
          <section>
            <div className="bg-gray-900 p-8 rounded-lg border-2 border-white/20">
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
