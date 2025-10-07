import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-400">Last updated: January 2025</p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                AvyraXAi ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our AI agent services and
                platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We collect information that you provide directly to us, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                <li>Name, email address, and contact information</li>
                <li>Company information and business details</li>
                <li>Payment and billing information</li>
                <li>Communications and correspondence with our team</li>
                <li>Usage data and analytics from our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                <li>Provide, maintain, and improve our AI agent services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Our platform may contain links to third-party websites or services. We are not responsible for the
                privacy practices of these third parties. We encourage you to review their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including
                the right to access, correct, or delete your data. To exercise these rights, please contact us at
                privacy@avyraxai.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-slate-300 leading-relaxed">
                Email: privacy@avyraxai.com
                <br />
                Address: AvyraXAi, Inc.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
