import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-slate-400">Last updated: January 2025</p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                By accessing or using AvyraXAi's services, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using or accessing our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Services Description</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                AvyraXAi provides AI-powered agent services designed to assist with various business operations
                including but not limited to content creation, marketing automation, software development, and data
                analytics. Our services are provided on a subscription or project basis as outlined in your service
                agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Performance and Results</h2>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-4">
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong className="text-white">Important Notice:</strong> While we strive to deliver exceptional
                  results through our AI agent services, we do not guarantee specific outcomes, performance metrics, or
                  business results. The effectiveness of our services depends on numerous factors including but not
                  limited to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                  <li>The quality and accuracy of information provided by the client</li>
                  <li>Market conditions and competitive landscape</li>
                  <li>Client's existing infrastructure and resources</li>
                  <li>Timely implementation of recommendations</li>
                  <li>External factors beyond our control</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  Results may vary significantly between clients and industries. Past performance or case studies do not
                  guarantee future results. You acknowledge that AI technology, while powerful, has inherent limitations
                  and may not always produce the desired outcomes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Payment Terms</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All fees are due as specified in your service agreement. Payment must be made in advance for
                subscription services or as outlined in project-based agreements. We accept major credit cards and other
                payment methods as specified during the checkout process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Refund Policy</h2>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-4">
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong className="text-white">No Refund Policy:</strong> All payments made to AvyraXAi are final and
                  non-refundable. This includes but is not limited to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                  <li>Consultation fees</li>
                  <li>Subscription payments</li>
                  <li>Project deposits and milestone payments</li>
                  <li>Setup and onboarding fees</li>
                  <li>Custom development charges</li>
                </ul>
                <p className="text-slate-300 leading-relaxed mb-4">
                  By engaging our services, you acknowledge that you have carefully reviewed our service offerings and
                  understand that no refunds will be provided under any circumstances, including but not limited to
                  dissatisfaction with results, changes in business needs, or early termination of services.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  For subscription services, you may cancel your subscription at any time, but you will remain
                  responsible for any fees incurred prior to cancellation, and no prorated refunds will be issued for
                  unused portions of the subscription period.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The AvyraXAi platform, including all software, algorithms, and proprietary technology, remains the
                exclusive property of AvyraXAi. Content and deliverables created specifically for your project will be
                transferred to you upon full payment, unless otherwise specified in your service agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                To the maximum extent permitted by law, AvyraXAi shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including but not limited to loss of profits, data, use,
                goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                <li>Your use or inability to use our services</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from our services</li>
                <li>Any bugs, viruses, or other harmful code transmitted through our services</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mb-4">
                Our total liability to you for all claims arising from or related to our services shall not exceed the
                amount you paid to AvyraXAi in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Client Responsibilities</h2>
              <p className="text-slate-300 leading-relaxed mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services in compliance with all applicable laws</li>
                <li>Not misuse or attempt to gain unauthorized access to our systems</li>
                <li>Respond to our communications in a timely manner</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We reserve the right to terminate or suspend your access to our services immediately, without prior
                notice or liability, for any reason, including but not limited to breach of these Terms. Upon
                termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. We will
                provide notice of any material changes by posting the new Terms on this page and updating the "Last
                updated" date. Your continued use of our services after any such changes constitutes your acceptance of
                the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                AvyraXAi operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-slate-300 leading-relaxed">
                Email: legal@avyraxai.com
                <br />
                Address: AvyraXAi, Inc.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Acknowledgment</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                By using AvyraXAi's services, you acknowledge that you have read, understood, and agree to be bound by
                these Terms of Service, including our no-refund policy and the understanding that we do not guarantee
                specific results or outcomes.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
