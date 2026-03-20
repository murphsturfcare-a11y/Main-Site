import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata(
  "Privacy Policy",
  "Read the Murphy's Turf privacy policy. Learn how we collect, use, and protect your personal information.",
  "/privacy-policy"
);

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-500">
        Last updated: January 1, 2026
      </p>

      <div className="space-y-8 text-gray-700 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-gray-900 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6">
        <section>
          <h2>Introduction</h2>
          <p>
            Murphy&apos;s Turf (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website at murphysturf.com, use our services, or interact with us in
            any way.
          </p>
          <p>
            By accessing or using our website and services, you agree to this
            Privacy Policy. If you do not agree with the terms of this policy,
            please do not access our website or use our services.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>

          <h3>Personal Information You Provide</h3>
          <p>
            When you fill out a contact form, request a quote, or schedule a
            service, we may collect:
          </p>
          <ul>
            <li>Name (first and last)</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Physical address and service location</li>
            <li>Details about your lawn care needs</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>
            When you visit our website, we automatically collect certain
            information, including:
          </p>
          <ul>
            <li>IP address and approximate geographic location</li>
            <li>Browser type, version, and language preferences</li>
            <li>Device type, operating system, and screen resolution</li>
            <li>Pages visited, time spent on each page, and navigation paths</li>
            <li>Referring website or search terms used to find us</li>
            <li>Date and time of your visit</li>
          </ul>
        </section>

        <section>
          <h2>Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Understand how you interact with our website</li>
            <li>Measure the effectiveness of our marketing campaigns</li>
            <li>Improve our website performance and user experience</li>
          </ul>

          <h3>Google Analytics (GA4)</h3>
          <p>
            We use Google Analytics 4 to analyze website traffic and usage
            patterns. GA4 collects data such as pages visited, session duration,
            and demographic information. Google may use this data in accordance
            with its own privacy policy. You can opt out of Google Analytics by
            installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-green-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3>Managing Cookies</h3>
          <p>
            Most web browsers allow you to control cookies through their settings.
            You can set your browser to refuse all cookies or to indicate when a
            cookie is being sent. However, some features of our website may not
            function properly without cookies.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our lawn care services</li>
            <li>Process and fulfill service requests and appointments</li>
            <li>Communicate with you about services, quotes, and scheduling</li>
            <li>Send promotional emails and seasonal lawn care tips (with your consent)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Analyze website usage to improve our online experience</li>
            <li>Comply with legal obligations and protect our rights</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            We may share your information with trusted third-party service
            providers who assist us in operating our business, including:
          </p>
          <ul>
            <li>Payment processors for secure transaction handling</li>
            <li>Email marketing platforms for newsletters and promotions</li>
            <li>Customer relationship management (CRM) tools</li>
            <li>Analytics providers (Google Analytics)</li>
            <li>Cloud hosting and data storage services</li>
          </ul>
          <p>
            These third parties are contractually obligated to protect your
            information and may only use it for the purposes we specify.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information, including SSL/TLS encryption for data
            transmitted through our website, secure data storage, and access
            controls. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2>Your Rights Under CCPA (California Residents)</h2>
          <p>
            If you are a California resident, you have the right to:
          </p>
          <ul>
            <li>Know what personal information we collect and how it is used</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of the sale of your personal information (we do not sell personal information)</li>
            <li>Non-discrimination for exercising your privacy rights</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided below.
          </p>
        </section>

        <section>
          <h2>Your Rights Under GDPR (European Residents)</h2>
          <p>
            If you are located in the European Economic Area, you have the right
            to:
          </p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Rectify inaccurate personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Restrict or object to processing of your personal data</li>
            <li>Data portability — receive your data in a structured, machine-readable format</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
          </ul>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, comply with
            legal obligations, resolve disputes, and enforce our agreements.
            Service-related records are typically retained for seven years for
            tax and legal compliance purposes.
          </p>
        </section>

        <section>
          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website and services are not directed at children under the age
            of 13. We do not knowingly collect personal information from children
            under 13. If we become aware that we have collected personal
            information from a child under 13, we will take steps to delete that
            information.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page and
            updating the &quot;Last updated&quot; date. Your continued use of our
            website and services after changes constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise
            your privacy rights, please contact us:
          </p>
          <ul>
            <li>Email: info@murphysturf.com</li>
            <li>Phone: (720) 555-0147</li>
            <li>Mail: Murphy&apos;s Turf, 1847 Green Valley Rd, Denver, CO 80203</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
