import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata(
  "Terms of Service",
  "Review the Murphy's Turf terms of service. Understand our service agreements, liability limitations, and dispute resolution policies.",
  "/terms-of-service"
);

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      <p className="mb-6 text-sm text-gray-500">
        Last updated: January 1, 2026
      </p>

      <div className="space-y-8 text-gray-700 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-gray-900 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6">
        <section>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using the Murphy&apos;s Turf website
            (murphysturf.com) and services, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use our
            website or services.
          </p>
        </section>

        <section>
          <h2>Services</h2>
          <p>
            Murphy&apos;s Turf provides professional lawn care and turf
            maintenance services throughout Colorado, including but not limited
            to lawn cleaning, aeration, seeding, fertilization, pest control, and
            seasonal maintenance.
          </p>
          <p>
            All services are subject to availability, weather conditions, and
            scheduling. We reserve the right to reschedule services due to
            adverse weather or other circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2>Service Agreements</h2>
          <p>
            When you schedule a service with Murphy&apos;s Turf, you enter into a
            service agreement that includes:
          </p>
          <ul>
            <li>A description of the services to be performed</li>
            <li>The agreed-upon price or pricing structure</li>
            <li>The scheduled date and approximate time of service</li>
            <li>Any specific instructions or requirements for your property</li>
          </ul>
          <p>
            Quotes provided are estimates based on the information available at
            the time. Final pricing may vary based on actual conditions found at
            the service location. We will communicate any significant price
            changes before proceeding.
          </p>
        </section>

        <section>
          <h2>Cancellation and Rescheduling</h2>
          <p>
            Cancellations or rescheduling requests must be made at least 24 hours
            before the scheduled service time. Cancellations made less than 24
            hours in advance may be subject to a cancellation fee of up to 50% of
            the service cost.
          </p>
          <p>
            Murphy&apos;s Turf reserves the right to cancel or reschedule
            services due to weather, safety concerns, or staffing issues. In such
            cases, we will notify you as soon as possible and reschedule at no
            additional cost.
          </p>
        </section>

        <section>
          <h2>Payment Terms</h2>
          <p>
            Payment is due upon completion of services unless other arrangements
            have been made in writing. We accept major credit cards, checks, and
            electronic payment methods.
          </p>
          <p>
            For recurring service plans, payment will be charged according to the
            billing cycle agreed upon at the time of enrollment. Past-due
            accounts may be subject to late fees of 1.5% per month on the
            outstanding balance.
          </p>
        </section>

        <section>
          <h2>Property Access and Conditions</h2>
          <p>
            You agree to provide safe and reasonable access to your property for
            the performance of services. This includes:
          </p>
          <ul>
            <li>Securing pets during service appointments</li>
            <li>Removing personal items and obstacles from the service area</li>
            <li>Informing us of any underground utilities, irrigation systems, or hazards</li>
            <li>Ensuring gates are unlocked or providing access codes as needed</li>
          </ul>
          <p>
            Murphy&apos;s Turf is not responsible for damage to items left in the
            service area or for pre-existing property conditions.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Murphy&apos;s Turf shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or related to the use of our website
            or services.
          </p>
          <p>
            Our total liability for any claim arising out of or relating to our
            services shall not exceed the amount paid by you for the specific
            service giving rise to the claim.
          </p>
          <p>
            We are not liable for damage caused by pre-existing conditions,
            including but not limited to diseased turf, pest infestations, soil
            conditions, or irrigation system malfunctions that were present
            before our service.
          </p>
        </section>

        <section>
          <h2>Warranty and Satisfaction</h2>
          <p>
            Murphy&apos;s Turf stands behind the quality of our work. If you are
            not satisfied with a service, please contact us within 48 hours of
            service completion. We will inspect the work and, at our discretion,
            re-perform the service or provide a partial refund.
          </p>
          <p>
            Results from lawn care services depend on many factors beyond our
            control, including weather, soil conditions, watering practices, and
            existing lawn health. We do not guarantee specific outcomes or results.
          </p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content on the Murphy&apos;s Turf website, including text,
            images, logos, graphics, and software, is the property of
            Murphy&apos;s Turf or its licensors and is protected by copyright,
            trademark, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative works
            from any content on our website without our prior written consent.
          </p>
        </section>

        <section>
          <h2>Dispute Resolution</h2>
          <p>
            Any dispute arising out of or relating to these Terms of Service or
            our services shall first be resolved through good-faith negotiation
            between the parties. If a resolution cannot be reached within 30
            days, the dispute shall be resolved through binding arbitration in
            Denver, Colorado, in accordance with the rules of the American
            Arbitration Association.
          </p>
          <p>
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the State of Colorado, without regard to
            its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Murphy&apos;s Turf, its
            officers, employees, and agents from any claims, damages, losses, or
            expenses (including reasonable attorney&apos;s fees) arising out of
            your violation of these terms or misuse of our services.
          </p>
        </section>

        <section>
          <h2>Modifications to Terms</h2>
          <p>
            Murphy&apos;s Turf reserves the right to modify these Terms of
            Service at any time. Changes will be posted on this page with an
            updated &quot;Last updated&quot; date. Your continued use of our
            website and services after any modification constitutes acceptance of
            the revised terms.
          </p>
        </section>

        <section>
          <h2>Severability</h2>
          <p>
            If any provision of these Terms of Service is found to be invalid or
            unenforceable, the remaining provisions shall continue in full force
            and effect.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact
            us:
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
