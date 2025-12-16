/* eslint-disable react/no-unescaped-entities */
// app/privacy-policy/page.js
import React from "react";
import SectionHeader from "../(profile)/_components/SectionHeader";

export const metadata = {
  title: "ES FITT | Privacy Policy",
  description: "Privacy Policy for ES FITT - Premium T-shirt Store",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white !mt-12">
      {/* Header */}
      <SectionHeader title={"Privacy Policy"}>
        Your privacy matters to us at ES FITT
      </SectionHeader>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="space-y-12">
          {/* Introduction */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">Introduction</h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-6 text-lg pl-8">
              <p className="border-l-2 border-gray-600 pl-6">
                Welcome to ES FITT . We are committed to protecting your
                personal information and your right to privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or make purchases
                from us.
              </p>
              <p className="border-l-2 border-gray-600 pl-6">
                By using our website and services, you consent to the practices
                described in this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">
                Information We Collect
              </h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-8 pl-8">
              <div className="bg-gray-900/30 p-6 rounded-xl border-l-4 border-white">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Personal Information
                </h3>
                <p className="mb-4 text-lg">
                  We may collect the following personal information:
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-base">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Name and contact information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Billing and shipping addresses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Payment information (secured)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Order history and preferences</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Account credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/30 p-6 rounded-xl border-l-4 border-gray-400">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Non-Personal Information
                </h3>
                <ul className="grid md:grid-cols-2 gap-3 text-base">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Browser type and version</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Device information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>IP address and location</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Website usage patterns</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Cookies and tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">
                How We Use Your Information
              </h2>
            </div>
            <div className="text-gray-300 leading-relaxed pl-8">
              <p className="mb-6 text-lg border-l-2 border-gray-600 pl-6">
                We use your information for the following purposes:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Process and fulfill your orders",
                  "Communicate about orders and account",
                  "Provide customer support",
                  "Send promotional communications",
                  "Improve our website and services",
                  "Prevent fraud and ensure security",
                  "Comply with legal obligations",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/20 p-4 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-base">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">
                Information Sharing and Disclosure
              </h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-6 pl-8">
              <p className="text-lg border-l-2 border-gray-600 pl-6">
                We may share your information in the following circumstances:
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Service Providers",
                    desc: "Payment processors, shipping companies, and other third-party services",
                  },
                  {
                    title: "Legal Requirements",
                    desc: "When required by law or to protect our rights",
                  },
                  {
                    title: "Business Transfers",
                    desc: "In case of merger, acquisition, or sale of assets",
                  },
                  {
                    title: "With Your Consent",
                    desc: "When you explicitly agree to share your information",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/30 p-5 rounded-xl border-l-4 border-gray-400 hover:border-white transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-white rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <strong className="text-white text-lg">
                          {item.title}:
                        </strong>
                        <span className="ml-2">{item.desc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">Data Security</h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-6 pl-8">
              <p className="text-lg border-l-2 border-gray-600 pl-6">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. These measures include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "SSL encryption for data transmission",
                  "Secure payment processing",
                  "Regular security assessments",
                  "Limited access to personal information",
                  "Employee training on data protection",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/20 p-4 rounded-lg border border-gray-700/30 hover:border-white/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-base">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">
                Cookies and Tracking Technologies
              </h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-6 pl-8">
              <p className="text-lg border-l-2 border-gray-600 pl-6">
                We use cookies and similar technologies to enhance your browsing
                experience, analyze website traffic, and personalize content.
                You can control cookie settings through your browser.
              </p>
              <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-6 rounded-2xl border border-gray-600/50">
                <h4 className="font-semibold text-white mb-4 text-xl">
                  Types of cookies we use:
                </h4>
                <div className="space-y-3">
                  {[
                    "Essential cookies for website functionality",
                    "Analytics cookies to understand user behavior",
                    "Marketing cookies for personalized advertising",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">Your Rights</h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-6 pl-8">
              <p className="text-lg border-l-2 border-gray-600 pl-6">
                You have the following rights regarding your personal
                information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Access",
                    desc: "Request copies of your personal information",
                  },
                  {
                    title: "Rectification",
                    desc: "Correct inaccurate or incomplete information",
                  },
                  {
                    title: "Erasure",
                    desc: "Request deletion of your personal information",
                  },
                  {
                    title: "Portability",
                    desc: "Transfer your data to another service",
                  },
                  {
                    title: "Objection",
                    desc: "Object to processing of your information",
                  },
                  {
                    title: "Restriction",
                    desc: "Limit how we use your information",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/30 p-5 rounded-xl border-l-4 border-gray-400 hover:border-white transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-white rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <strong className="text-white text-lg">
                          {item.title}:
                        </strong>
                        <span className="ml-2">{item.desc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-600/50">
                <p className="text-lg">
                  To exercise these rights, please contact us at{" "}
                  <a
                    href="mailto:privacy@esvibes.com"
                    className="text-white hover:text-gray-300 font-semibold underline decoration-2 underline-offset-4 transition-colors"
                  >
                    privacy@esvibes.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">
                Third-Party Links
              </h2>
            </div>
            <div className="text-gray-300 leading-relaxed pl-8">
              <p className="text-lg border-l-2 border-gray-600 pl-6">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                external sites. We encourage you to review their privacy
                policies before providing any personal information.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">
                Updates to This Policy
              </h2>
            </div>
            <div className="text-gray-300 leading-relaxed pl-8">
              <p className="text-lg border-l-2 border-gray-600 pl-6">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. Your continued
                use of our services after changes constitutes acceptance of the
                updated policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-white"></div>
              <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-6 pl-8">
              <p className="mb-6 text-lg border-l-2 border-gray-600 pl-6">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className=" p-8 rounded-2xl border-2 border-white/20">
                <h4 className="font-bold text-white mb-6 text-2xl">ES FITT</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Email:</strong>
                      <span className="ml-2">privacy@esvibes.com</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Address:</strong>
                      <span className="ml-2">
                        Tongi Bazar, Gazipur - 1710, Bangladesh
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Phone:</strong>
                      <span className="ml-2">+880-XXX-XXXXXX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
